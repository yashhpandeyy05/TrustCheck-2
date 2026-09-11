import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Health check route
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    service: "TrustCheck AI Safety Lab API",
    aiEnabled: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// AI Explanation endpoint
app.post("/api/ai/explain", async (req: Request, res: Response) => {
  try {
    const {
      findingTitle,
      condition,
      baselineScore,
      stressScore,
      dropPercentage,
      details,
      role = "Healthcare Organization",
    } = req.body;

    const ai = getGemini();

    // If Gemini key is available, generate dynamic ML safety analysis
    if (ai) {
      const prompt = `You are the Lead ML Safety Engineer at TrustCheck, a healthcare AI crash-test laboratory.
Context:
The user is evaluating a healthcare predictive model ("ExampleCare AI v2.1") intended for risk assessment.
User Role: ${role}
Finding: ${findingTitle}
Tested Condition: ${condition}
Baseline Performance: ${baselineScore}%
Stress Test Performance: ${stressScore}%
Degradation: ${dropPercentage} percentage points
Additional Context: ${details}

Provide a structured, rigorous, highly objective evaluation explaining this failure condition.
IMPORTANT SAFETY RULE: This is a model evaluation aid. NEVER provide clinical diagnosis, patient medical advice, or treatment suggestions. Frame all insights strictly around machine learning reliability, generalization gap, distributional divergence, and clinical deployment safety boundaries.

Format your response strictly as JSON with the following keys:
{
  "whatHappened": "Clear factual explanation of performance shift",
  "whyItMatters": "Impact on patient risk stratification or clinical workflow reliability",
  "conditionCausedIt": "Underlying ML cause (e.g. covariate shift, feature reliance, calibration collapse)",
  "investigateNext": "Concrete action for the engineering/clinical validation team prior to any deployment"
}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text.trim());
        return res.json({ success: true, explanation: parsed, source: "gemini-3.8-flash" });
      }
    }

    // Deterministic fallback if API key is not configured or fails
    const fallbackExplanations: Record<string, any> = {
      "Device B Variation": {
        whatHappened: `Performance dropped from ${baselineScore}% to ${stressScore}% (-${dropPercentage}%) when tested on target imaging and telemetry hardware from Hospital B.`,
        whyItMatters: "Hardware sensor calibration differences, bit-depth variance, and vendor-specific pre-processing introduce high-frequency artifacts that derail feature representation.",
        conditionCausedIt: "Model was overfitted to the sensor acquisition profile of Hospital A's legacy hardware and lacked domain-invariant representations.",
        investigateNext: "Acquire multi-center calibration data across Device B and apply harmonization or domain-adversarial retraining before deployment.",
      },
      "Population Shift": {
        whatHappened: `Substantial accuracy drop of ${dropPercentage} percentage points observed when evaluating patient cohorts reflecting Hospital B's demographic distribution.`,
        whyItMatters: "Triage thresholds calibrated on Hospital A produce elevated false-negative rates in older cohorts and patients with atypical presentation profiles.",
        conditionCausedIt: "Covariate shift and prior probability skew between the training dataset and the target operational clinical environment.",
        investigateNext: "Conduct stratified sub-population validation and recalibrate decision boundaries with representative target hospital cohorts.",
      },
      "Compound Multi-Stressor": {
        whatHappened: `Simultaneous occurrence of population shift and missing clinical vitals reduced reliability to ${stressScore}% (a catastrophic drop of ${dropPercentage}%).`,
        whyItMatters: "While the model appears resilient to single isolated perturbations, real-world clinical shifts compound non-linearly, breaching acceptable safety floors.",
        conditionCausedIt: "Synergistic failure: missing primary features force the model to rely on demographic proxies that are themselves out-of-distribution.",
        investigateNext: "Implement strict hard gates refusing automated risk outputs whenever both missing data exceeds 15% and local demographic shift is present.",
      },
    };

    const fallback = fallbackExplanations[findingTitle] || {
      whatHappened: `Performance dropped from ${baselineScore}% to ${stressScore}% under ${condition}.`,
      whyItMatters: `A ${dropPercentage}% drop undermines clinical confidence and creates unpredictable false predictions under target operating conditions.`,
      conditionCausedIt: `Distributional divergence and lack of robustness constraints during model training on ${condition}.`,
      investigateNext: "Perform targeted local validation, audit feature attribution shifts, and establish hard trust boundaries.",
    };

    return res.json({ success: true, explanation: fallback, source: "deterministic-engine" });
  } catch (error) {
    console.error("AI Explanation error:", error);
    return res.json({
      success: true,
      explanation: {
        whatHappened: `Evaluated stress condition caused noticeable score degradation.`,
        whyItMatters: "Reliability under stress conditions is essential before clinical exposure.",
        conditionCausedIt: "Model sensitivity to non-development distributions.",
        investigateNext: "Perform local validation on target facility cohorts.",
      },
      source: "fallback",
    });
  }
});

// Start server with Vite middleware in dev or static serving in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TrustCheck AI Safety Lab running on http://localhost:${PORT}`);
  });
}

startServer();
