import React, { useState } from 'react';
import {
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  Sliders,
  Play,
  Flame,
  Zap,
} from 'lucide-react';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface EdgeCaseScenario {
  id: string;
  name: string;
  category: string;
  scenarioInput: string;
  aiPrediction: string;
  aiConfidence: number;
  expectedOutcome: string;
  isPass: boolean;
  isHighConfidenceFailure: boolean;
  clinicalImpact: string;
  whyItFailed: string;
}

interface EdgeCaseViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const EdgeCaseView: React.FC<EdgeCaseViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  // Six required scenario cards
  const scenarios: EdgeCaseScenario[] = [
    {
      id: 'missing-lab',
      name: 'Missing laboratory value',
      category: 'Incomplete Workup',
      scenarioInput: 'Acute chest pain in rural ER. Troponin and lactate lab panels suppressed (delayed lab send-out). Vital signs show borderline tachycardia (HR 102 bpm, BP 118/76).',
      aiPrediction: 'Low Cardiac Risk (Score: 0.12)',
      aiConfidence: 94,
      expectedOutcome: 'High Risk (Acute Coronary Syndrome Rule-Out Required)',
      isPass: false,
      isHighConfidenceFailure: true,
      clinicalImpact: 'Patient discharged prematurely without cardiac enzyme confirmation.',
      whyItFailed: 'Model relied on default zero imputation for missing troponin rather than flagging clinical uncertainty.',
    },
    {
      id: 'noisy-sensor',
      name: 'Noisy sensor',
      category: 'Motion Artifacts',
      scenarioInput: 'Shivering patient with muscular tremors introducing high-frequency baseline wander on telemetry Lead II. Normal Sinus Rhythm confirmed on 12-lead.',
      aiPrediction: 'Ventricular Tachycardia Warning (VTach)',
      aiConfidence: 91,
      expectedOutcome: 'Normal Sinus Rhythm with Motion Artifact',
      isPass: false,
      isHighConfidenceFailure: true,
      clinicalImpact: 'False code blue alert triggered, creating alarm fatigue and unnecessary antiarrhythmic medication.',
      whyItFailed: 'Neural net feature extractor interpreted mechanical tremor frequencies as ventricular fibrillatory waves.',
    },
    {
      id: 'unseen-device',
      name: 'Unseen device',
      category: 'Hardware Divergence',
      scenarioInput: 'Patient monitored on Device B portable telemetry (50 Hz downsampled waveform) instead of hospital-grade calibrated 100 Hz monitor.',
      aiPrediction: 'Normal Hemodynamic Profile',
      aiConfidence: 88,
      expectedOutcome: 'Subtle ST-Depression (Impending Ischemia)',
      isPass: false,
      isHighConfidenceFailure: true,
      clinicalImpact: 'Critical ischemia missed during rural clinic observation stay.',
      whyItFailed: 'Downsampling flattened high-frequency ST elevation/depression morphology.',
    },
    {
      id: 'contradictory-vitals',
      name: 'Contradictory vital signs',
      category: 'Masked Deterioration',
      scenarioInput: 'Patient on chronic beta-blocker therapy presents with severe septic shock. Elevated lactate (4.8 mmol/L), low MAP (68 mmHg), but heart rate remains "normal" (68 bpm).',
      aiPrediction: 'Low Risk Stable (Score: 0.08)',
      aiConfidence: 98,
      expectedOutcome: 'Septic Shock / Intensive Care Admission',
      isPass: false,
      isHighConfidenceFailure: true,
      clinicalImpact: 'Catastrophic false reassurance. Delayed resuscitation leads to multiorgan failure.',
      whyItFailed: 'Model relies heavily on reflex tachycardia to detect shock, which was pharmacologically blunted.',
    },
    {
      id: 'rare-profile',
      name: 'Rare patient profile',
      category: 'Atypical Presentation',
      scenarioInput: '84-year-old female with occult peritonitis. No fever (hypothermic 35.8°C), blunted WBC count, subtle confusion, resting tachycardia 94 bpm.',
      aiPrediction: 'Mild Dehydration / Non-Urgent',
      aiConfidence: 93,
      expectedOutcome: 'Acute Surgical Abdomen / Sepsis',
      isPass: false,
      isHighConfidenceFailure: true,
      clinicalImpact: 'Missed surgical emergency; delayed operating room transfer.',
      whyItFailed: 'Training dataset contained predominantly young adults with classic febrile responses to severe infection.',
    },
    {
      id: 'low-quality-scan',
      name: 'Low-quality scan',
      category: 'Poor Signal-to-Noise',
      scenarioInput: 'Low-bandwidth telemetry transmission resulted in 30% packet drop and interpolated signal segments during urgent transport.',
      aiPrediction: 'Stable Baseline Rhythm',
      aiConfidence: 89,
      expectedOutcome: 'Signal Quality Unacceptable for Interpretation',
      isPass: false,
      isHighConfidenceFailure: true,
      clinicalImpact: 'Unreliable output accepted as clinical truth during acute patient transport.',
      whyItFailed: 'Model lacked an epistemic reject option to flag data as uninterpretable.',
    },
  ];

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('contradictory-vitals');
  const activeScenario = scenarios.find((s) => s.id === selectedScenarioId) || scenarios[3];

  return (
    <div id="view-edge-cases" className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#D64545] font-bold uppercase">
              <AlertOctagon className="w-4 h-4" />
              CLINICAL ADVERSARIAL STRESS LAB
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              EDGE CASE SIMULATOR
            </h1>
            <p className="text-sm font-semibold text-[#0F5132]">
              &ldquo;Test unusual and contradictory clinical scenarios before deployment.&rdquo;
            </p>
            <p className="text-xs text-[#64736B]">
              Standard evaluations only test common cases. The Edge Case Simulator probes the dangerous corners where AI makes fatal mistakes with high confidence.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] text-center shrink-0">
            <span className="text-[10px] uppercase text-[#D64545] font-bold block">
              DANGEROUS FAILURES
            </span>
            <span className="text-3xl font-black text-[#D64545]">
              6 of 6
            </span>
            <span className="text-xs text-[#D64545] font-bold block mt-0.5">High-Confidence Errors</span>
          </div>
        </div>
      </div>

      {/* 2. Selectable Scenario Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64736B]">
            SELECTABLE CLINICAL SCENARIOS
          </h3>
          <span className="text-xs text-[#64736B]">6 Stress Test Profiles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {scenarios.map((scen) => {
            const isSelected = scen.id === selectedScenarioId;

            return (
              <div
                key={scen.id}
                onClick={() => setSelectedScenarioId(scen.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#DDE8E2] hover:border-[#16845B] hover:bg-[#F6FAF8]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]">
                    {scen.category}
                  </span>
                  <span className="text-xs font-black text-[#D64545]">FAIL</span>
                </div>
                <h4 className="text-sm font-bold text-[#17221D]">{scen.name}</h4>
                <p className="text-xs text-[#64736B] mt-1 line-clamp-2 leading-relaxed">
                  {scen.scenarioInput}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Detailed Inspection Card for Selected Scenario */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Title & Category */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDE8E2]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#16845B] uppercase">{activeScenario.category}</span>
              <span className="text-xs text-[#64736B]">&bull; Detailed Analysis</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#17221D] mt-0.5">
              Scenario: {activeScenario.name}
            </h2>
          </div>

          {/* High-Confidence Failure Critical Alert */}
          {activeScenario.isHighConfidenceFailure && (
            <div className="px-4 py-2 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] text-[#D64545] font-extrabold text-xs flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" />
              <span>CRITICAL: HIGH CONFIDENCE FAILURE</span>
            </div>
          )}
        </div>

        {/* Input Scenario Box */}
        <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1.5">
          <span className="text-xs font-extrabold text-[#17221D] uppercase">
            INPUT CLINICAL SCENARIO:
          </span>
          <p className="text-xs sm:text-sm text-[#17221D] leading-relaxed">
            {activeScenario.scenarioInput}
          </p>
        </div>

        {/* Prediction vs Expected Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* AI Prediction */}
          <div className="p-5 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#D64545] block">
              AI PREDICTION (INCORRECT)
            </span>
            <div className="text-lg font-black text-[#D64545]">
              {activeScenario.aiPrediction}
            </div>
            <span className="text-xs text-[#D64545] font-medium block">
              Result: <strong>FAIL</strong>
            </span>
          </div>

          {/* AI Confidence */}
          <div className="p-5 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#D98C00] block">
              AI REPORTED CONFIDENCE
            </span>
            <div className="text-3xl font-black text-[#D98C00]">
              {activeScenario.aiConfidence}%
            </div>
            <span className="text-xs text-[#D98C00] font-medium block">
              Dangerously overconfident
            </span>
          </div>

          {/* Expected Reference Outcome */}
          <div className="p-5 rounded-xl bg-[#E8F5EF] border border-[#DDE8E2] space-y-1">
            <span className="text-[10px] font-bold uppercase text-[#0F5132] block">
              EXPECTED CLINICAL OUTCOME
            </span>
            <div className="text-lg font-black text-[#0F5132]">
              {activeScenario.expectedOutcome}
            </div>
            <span className="text-xs text-[#0F5132] font-medium block">
              Reference Gold Standard
            </span>
          </div>

        </div>

        {/* Clinical Impact & Why It Failed */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1">
            <span className="font-bold text-[#D64545] block">Clinical Consequence / Hazard:</span>
            <p className="text-[#64736B] leading-relaxed">{activeScenario.clinicalImpact}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1">
            <span className="font-bold text-[#17221D] block">Why The AI Made This Error:</span>
            <p className="text-[#64736B] leading-relaxed">{activeScenario.whyItFailed}</p>
          </div>
        </div>

        {/* Explain Button */}
        <div className="flex items-center justify-between pt-4 border-t border-[#DDE8E2]">
          <span className="text-xs text-[#64736B]">
            Edge cases demonstrate why raw accuracy alone is insufficient for pre-deployment clearance.
          </span>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: `Edge Case Failure: ${activeScenario.name}`,
                condition: activeScenario.category,
                baselineScore: 92,
                stressScore: 0,
                dropPercentage: 92,
                details: `${activeScenario.scenarioInput} Model predicted ${activeScenario.aiPrediction} with ${activeScenario.aiConfidence}% confidence, but ground truth was ${activeScenario.expectedOutcome}.`,
              })
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors"
          >
            <Sparkles className="w-4 h-4 text-[#16845B]" />
            <span>EXPLAIN THIS FAILURE</span>
          </button>
        </div>

      </div>

    </div>
  );
};
