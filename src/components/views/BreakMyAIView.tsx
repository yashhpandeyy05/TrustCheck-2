import React, { useState, useEffect } from 'react';
import {
  Flame,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  AlertOctagon,
  Play,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  FileText,
  Activity,
  Compass,
  Cpu,
  Users,
  ShieldAlert,
} from 'lucide-react';
import { ModelProfile, StressTestExecutionResult } from '../../types';
import { ExplanationContext } from '../AIExplanationModal';

interface BreakMyAIViewProps {
  currentModel: ModelProfile;
  stressTests: StressTestExecutionResult[];
  onRunTestComplete: () => void;
  onNavigateTab: (tabId: any) => void;
  onExplainFinding: (ctx: ExplanationContext) => void;
  initialExpandedId?: string;
}

interface CrashTestItem {
  id: string;
  name: string;
  category: string;
  whatChanged: string;
  whatModelDid: string;
  whyDangerous: string;
  whoAffected: string;
  baselineMetric: string;
  stressMetric: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'PASSED' | 'WARNING' | 'FAILED';
  targetTab: string;
}

export const BreakMyAIView: React.FC<BreakMyAIViewProps> = ({
  currentModel,
  onRunTestComplete,
  onNavigateTab,
  onExplainFinding,
  initialExpandedId,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(true); // Default true to allow instant inspection
  const [expandedId, setExpandedId] = useState<string | null>(initialExpandedId || 'device_change');
  const [simulatedScore, setSimulatedScore] = useState<number>(58);

  React.useEffect(() => {
    if (initialExpandedId) {
      setExpandedId(initialExpandedId);
    }
  }, [initialExpandedId]);

  const crashTests: CrashTestItem[] = [
    {
      id: 'missing_info',
      name: '1. Missing Information Test',
      category: 'Missing Data',
      whatChanged: '25% of lab panels suppressed (troponin, lactate, potassium delayed in rural care)',
      whatModelDid: 'Employed default zero-imputation; retained 89% reported confidence despite absent biomarker anchors',
      whyDangerous: 'Clinicians receive falsely reassuring predictions while patient silently develops myocardial ischemia',
      whoAffected: 'Patients admitted during off-hours or rural clinics with >2-hour reference lab turnarounds',
      baselineMetric: '92% Baseline Accuracy',
      stressMetric: '80% Stress Accuracy (-12% Drop)',
      riskLevel: 'HIGH',
      status: 'FAILED',
      targetTab: 'robustness',
    },
    {
      id: 'noisy_sensor',
      name: '2. Noisy Sensor Test',
      category: 'Signal Quality',
      whatChanged: 'Injected patient shivering artifacts and high-impedance lead motion jitter',
      whatModelDid: 'High-frequency noise corrupted ST-segment wavelets, spuriously triggering false ventricular tachycardia alarms',
      whyDangerous: 'Triggers alarm fatigue; clinicians begin overriding or silencing automated cardiac monitor alerts',
      whoAffected: 'Ambulatory patients, shivering geriatric patients, and post-operative recovery beds',
      baselineMetric: '92% Baseline Accuracy',
      stressMetric: '84% Stress Accuracy (-8% Drop)',
      riskLevel: 'MEDIUM',
      status: 'WARNING',
      targetTab: 'robustness',
    },
    {
      id: 'device_change',
      name: '3. Device Change (Telemetry Downsampling)',
      category: 'Hardware Mismatch',
      whatChanged: 'Hospital A 100 Hz calibrated diagnostic cart → Device B 50 Hz handheld rural telemetry',
      whatModelDid: 'Accuracy collapsed as micro-ST elevation dynamics and subtle T-wave alternans were eliminated by downsampling',
      whyDangerous: 'Acute coronary syndrome and NSTEMI events missed during first-line triage',
      whoAffected: 'All point-of-care patients evaluated using handheld clinic telemetry monitors',
      baselineMetric: '92% Baseline Accuracy',
      stressMetric: '74% Stress Accuracy (-18% Drop)',
      riskLevel: 'CRITICAL',
      status: 'FAILED',
      targetTab: 'deployment_setup',
    },
    {
      id: 'population_shift',
      name: '4. Population Demographic Shift',
      category: 'Covariate Shift',
      whatChanged: 'Shifted evaluation cohort from development median age 52.4y to rural clinic median age 68.2y (+15.8y skew)',
      whatModelDid: 'Misclassified atypical presentations; failed to recognize blunted fever responses as severe septic infection',
      whyDangerous: 'Elderly patients decompensate rapidly without exhibiting classical tachycardia or high fevers',
      whoAffected: 'Geriatric cohort (>65 years) presenting with multiple underlying comorbidities',
      baselineMetric: '92% Baseline Accuracy',
      stressMetric: '78% Stress Accuracy (-14% Drop)',
      riskLevel: 'HIGH',
      status: 'FAILED',
      targetTab: 'dataset_shift',
    },
    {
      id: 'demographic_fairness',
      name: '5. Demographic Fairness & Disparity',
      category: 'Subgroup Parity',
      whatChanged: 'Evaluated parity across demographic subgroups: Majority Group A vs Underrepresented Group B',
      whatModelDid: 'Maintained 95% accuracy for Group A but dropped to 77% accuracy for Group B (18 percentage point gap)',
      whyDangerous: 'False-negative rate is 4.6x higher for acute cardiac deterioration in underrepresented patients',
      whoAffected: 'Underrepresented minority patients and rural community subgroups',
      baselineMetric: '95% Group A Accuracy',
      stressMetric: '77% Group B Accuracy (4.6x False Negatives)',
      riskLevel: 'CRITICAL',
      status: 'FAILED',
      targetTab: 'fairness',
    },
    {
      id: 'edge_cases',
      name: '6. Dangerous Clinical Edge Cases',
      category: 'Hemodynamic Conflict',
      whatChanged: 'Patient on chronic beta-blocker therapy presenting with severe occult septic shock (Edge Case #07)',
      whatModelDid: 'Assigned 98% confidence to "LOW RISK" because beta-blockade suppressed the expected tachycardia reflex',
      whyDangerous: 'High-confidence false negative: the AI provides authoritative false reassurance on an actively dying patient',
      whoAffected: 'Cardiovascular patients on chronic beta-blockers, calcium-channel blockers, or pacemakers',
      baselineMetric: 'High Confidence Expected',
      stressMetric: '98% CONFIDENCE / WRONG PREDICTION',
      riskLevel: 'CRITICAL',
      status: 'FAILED',
      targetTab: 'edge_cases',
    },
    {
      id: 'calibration_uncertainty',
      name: '7. Calibration & Uncertainty Under Stress',
      category: 'Epistemic Calibration',
      whatChanged: 'Evaluated top-bucket confidence reliability under partial and noisy clinic observations',
      whatModelDid: 'Output 96% reported softmax confidence on predictions that were only 72% empirically correct',
      whyDangerous: 'Severe overconfidence (24-point gap) prevents clinicians from knowing when to seek second opinions',
      whoAffected: 'All high-acuity cases where clinicians rely on AI confidence scores for discharge decisions',
      baselineMetric: '0.04 Baseline Calibration Error',
      stressMetric: '24-Point Overconfidence Gap',
      riskLevel: 'HIGH',
      status: 'FAILED',
      targetTab: 'uncertainty',
    },
  ];

  const handleRunCrashTest = () => {
    setIsRunning(true);
    setHasCompleted(false);
    setCurrentStepIndex(0);
    setSimulatedScore(92);

    const scoreDrops = [92, 86, 80, 74, 71, 65, 58];
    let idx = 0;

    const timer = setInterval(() => {
      idx++;
      if (idx < crashTests.length) {
        setCurrentStepIndex(idx);
        setSimulatedScore(scoreDrops[idx] || 58);
      } else {
        clearInterval(timer);
        setIsRunning(false);
        setHasCompleted(true);
        setSimulatedScore(58);
        onRunTestComplete();
      }
    }, 450);
  };

  return (
    <div id="view-trust-test" className="space-y-8 font-sans">
      
      {/* 1. Hero Crash Test Header */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDE8E8] text-[#D64545] text-xs font-bold border border-[#F8B4B4]">
              <Flame className="w-3.5 h-3.5 text-[#D64545]" />
              HERO SAFETY EVALUATION &bull; STRESS ENGINE
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-[#17221D] tracking-tight">
              TRUST CRASH TEST
            </h1>
            
            <p className="text-base font-semibold text-[#0F5132]">
              Watch how CardioScan Net v1.4 breaks under real-world hospital conditions.
            </p>
            
            <p className="text-xs sm:text-sm text-[#64736B] leading-relaxed">
              We subject the model to 7 rigorous stress vectors: missing lab values, noisy sensors, hardware downsampling, population shifts, demographic disparities, and dangerous clinical edge cases.
            </p>
          </div>

          {/* Large Hero Button */}
          <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
            {!isRunning ? (
              <button
                id="btn-run-trust-crash-test"
                onClick={handleRunCrashTest}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-[#D64545] hover:bg-[#b03030] text-white font-black text-sm tracking-wide shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Play className="w-5 h-5 fill-white" />
                <span>&bull; RUN TRUST CRASH TEST</span>
              </button>
            ) : (
              <div className="px-8 py-4 rounded-2xl bg-[#FDE8E8] border-2 border-[#D64545] text-[#D64545] text-xs font-black flex items-center gap-3 shadow-xs animate-pulse">
                <span className="w-4 h-4 border-2 border-[#D64545] border-t-transparent rounded-full animate-spin" />
                <span>INJECTING STRESS PROFILE {currentStepIndex + 1}/7...</span>
              </div>
            )}

            <span className="text-[11px] text-[#64736B]">
              Simulates 10,000 synthetic patient encounters
            </span>
          </div>
        </div>

        {/* Dynamic Score Decay Progress Bar (During Running or Completed) */}
        <div className="mt-8 pt-6 border-t border-[#DDE8E2] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase text-[#64736B]">
                REAL-TIME PERFORMANCE DECAY:
              </span>
              <span className="text-xs font-bold text-[#17221D]">
                Baseline 92% &rarr; <span className="text-[#D64545] font-black">{simulatedScore}%</span>
              </span>
            </div>

            <div className="text-xs font-bold text-[#D64545]">
              {isRunning
                ? `Running: ${crashTests[currentStepIndex]?.name}`
                : 'Crash sequence evaluated (6 of 6 dangerous stress vectors failed)'}
            </div>
          </div>

          <div className="w-full bg-[#E8F5EF] h-3 rounded-full overflow-hidden p-0.5 border border-[#DDE8E2]">
            <div
              className="h-full bg-gradient-to-r from-[#16845B] via-[#D98C00] to-[#D64545] rounded-full transition-all duration-300"
              style={{ width: `${(simulatedScore / 92) * 100}%` }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-[#64736B] font-semibold">
            <span>Hospital A Baseline (92%)</span>
            <span>-12% Missing Labs (80%)</span>
            <span>-18% Device B (74%)</span>
            <span>-18% Group B (77%)</span>
            <span className="text-[#D64545] font-bold">Crash: 98% Conf / WRONG</span>
          </div>
        </div>
      </div>

      {/* 2. Dramatic Result Banner (When Completed) */}
      {hasCompleted && (
        <div className="bg-[#FFFFFF] border-2 border-[#D64545] rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] flex items-center justify-center text-[#D64545] font-black text-xl shrink-0">
                <AlertOctagon className="w-7 h-7 text-[#D64545]" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#D64545] uppercase">
                  <span>PRE-DEPLOYMENT EVALUATION RESULT</span>
                </div>
                <h2 className="text-2xl font-black text-[#17221D]">
                  CRASH TEST FAILED &bull; 6 OF 6 DANGEROUS PROFILES FAILED
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateTab('failure_map')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white font-bold text-xs transition-colors"
              >
                <span>4. VIEW FAILURE MAP</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onNavigateTab('safety_passport')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2] font-bold text-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>5. TRUST PASSPORT</span>
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-[#64736B] leading-relaxed">
            The candidate model passed standard academic benchmark testing (92% accuracy), but suffered non-linear performance collapse under simulated rural clinic conditions. Deploying this model in its current state introduces catastrophic clinical liability.
          </p>
        </div>
      )}

      {/* 3. Detailed Failure Breakdown: WHAT CHANGED? WHAT DID MODEL DO? WHY DANGEROUS? WHO AFFECTED? */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64736B]">
            STRESS VECTOR FAILURE CATALOG ({crashTests.length} EVALUATIONS)
          </h3>
          <span className="text-xs text-[#64736B]">
            Click any card to expand clinical cause and effect
          </span>
        </div>

        <div className="space-y-3">
          {crashTests.map((test) => {
            const isExpanded = expandedId === test.id;

            return (
              <div
                key={test.id}
                className={`bg-[#FFFFFF] border rounded-2xl transition-all overflow-hidden ${
                  test.riskLevel === 'CRITICAL'
                    ? 'border-[#F8B4B4] hover:border-[#D64545]'
                    : 'border-[#DDE8E2] hover:border-[#16845B]'
                }`}
              >
                {/* Header Row */}
                <div
                  onClick={() => setExpandedId(isExpanded ? null : test.id)}
                  className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#F6FAF8] transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border uppercase ${
                        test.status === 'FAILED'
                          ? 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]'
                          : 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]'
                      }`}>
                        {test.status} &bull; {test.riskLevel} RISK
                      </span>
                      <span className="text-xs font-bold text-[#64736B]">
                        {test.category}
                      </span>
                    </div>

                    <h4 className="text-base font-extrabold text-[#17221D]">
                      {test.name}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <div className="text-xs font-extrabold text-[#D64545]">
                        {test.stressMetric}
                      </div>
                      <div className="text-[11px] text-[#64736B]">
                        vs {test.baselineMetric}
                      </div>
                    </div>

                    <div className="p-1 rounded-lg bg-[#F6FAF8] text-[#64736B]">
                      {isExpanded ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded 4 Critical Questions View */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-[#DDE8E2] bg-[#F6FAF8]/50 space-y-4 text-xs">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Q1: WHAT CHANGED? */}
                      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#DDE8E2] space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#64736B] block">
                          1. WHAT CHANGED? (STRESS PERTURBATION)
                        </span>
                        <p className="text-[#17221D] leading-relaxed font-semibold">
                          {test.whatChanged}
                        </p>
                      </div>

                      {/* Q2: WHAT DID THE MODEL DO? */}
                      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#DDE8E2] space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D64545] block">
                          2. WHAT DID THE MODEL DO? (OBSERVED BEHAVIOR)
                        </span>
                        <p className="text-[#17221D] leading-relaxed font-semibold">
                          {test.whatModelDid}
                        </p>
                      </div>

                      {/* Q3: WHY IS IT DANGEROUS? */}
                      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#F8B4B4] space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#D64545] block">
                          3. WHY IS IT DANGEROUS? (CLINICAL PATIENT RISK)
                        </span>
                        <p className="text-[#D64545] leading-relaxed font-bold">
                          {test.whyDangerous}
                        </p>
                      </div>

                      {/* Q4: WHO IS AFFECTED? */}
                      <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#DDE8E2] space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F5132] block">
                          4. WHO IS AFFECTED? (VULNERABLE COHORT)
                        </span>
                        <p className="text-[#0F5132] leading-relaxed font-semibold">
                          {test.whoAffected}
                        </p>
                      </div>

                    </div>

                    {/* Explainer / Deep Dive Action Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <button
                        onClick={() =>
                          onExplainFinding({
                            findingTitle: test.name,
                            condition: test.whatChanged,
                            baselineScore: 92,
                            stressScore: 74,
                            dropPercentage: 18,
                            details: `${test.whatModelDid}. ${test.whyDangerous}.`,
                          })
                        }
                        className="flex items-center gap-1.5 text-[#0F5132] hover:text-[#16845B] font-bold"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#16845B]" />
                        <span>Explain in plain language for hospital committee &rarr;</span>
                      </button>

                      <button
                        onClick={() => onNavigateTab(test.targetTab)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] font-bold transition-colors shrink-0"
                      >
                        <span>Inspect in {test.category} Lab</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Step 4 Next Action Callout */}
        <div className="mt-8 pt-6 border-t border-[#DDE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#64736B]">
            Now that the model has broken under stress, trace how failure conditions propagate topologically.
          </div>

          <button
            onClick={() => onNavigateTab('failure_map')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white font-extrabold text-xs shadow-xs transition-colors"
          >
            <span>STEP 4: INSPECT FAILURE CONDITIONS &rarr;</span>
          </button>
        </div>
      </div>

    </div>
  );
};
