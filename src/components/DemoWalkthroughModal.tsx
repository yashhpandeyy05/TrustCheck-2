import React, { useState } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Flame,
  CheckCircle2,
  Sparkles,
  Layers,
  Network,
  Compass,
  Sliders,
  Scale,
  GitCompare,
  AlertOctagon,
  ShieldCheck,
  FileCheck2,
  Building2,
  CheckSquare,
  FileText,
  AlertTriangle,
} from 'lucide-react';
import { NavigationTab } from '../types';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tabId: NavigationTab) => void;
}

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      stepNum: 1,
      stepTitle: 'STEP 1: Here is the model.',
      badge: 'MODEL AUDIT',
      tab: 'overview' as NavigationTab,
      headline: 'CardioScan Net v1.4 (Academic Benchmark: 92%)',
      description:
        'We begin with a candidate healthcare AI developed for acute cardiac and sepsis risk triage. In standard hospital benchmark testing, the model looks excellent with 92% reported accuracy. But can we trust it in production?',
      actionNote: 'Overview displays model credentials and Safe Operating Envelope.',
    },
    {
      stepNum: 2,
      stepTitle: 'STEP 2: Here is where it was trained.',
      badge: 'DEVELOPMENT LAB',
      tab: 'deployment_setup' as NavigationTab,
      headline: 'Hospital A &mdash; Academic Core Lab',
      description:
        'The model was trained in an urban academic medical center with calibrated 12-lead ECG carts (100 Hz), instant 15-minute stat lab turnarounds, and balanced demographic cohorts (median age 52.4).',
      actionNote: 'Viewing baseline training and validation parameters.',
    },
    {
      stepNum: 3,
      stepTitle: 'STEP 3: Here is where we want to deploy it.',
      badge: 'TARGET MISMATCH',
      tab: 'deployment_setup' as NavigationTab,
      headline: 'Rural Community Clinic (44% Compatibility)',
      description:
        'The hospital plans to deploy this AI to a rural clinic with handheld 50 Hz telemetry, 3-hour send-out lab delays (25% missing panels), and an older geriatric cohort (median age 68.2). The conditions do NOT match!',
      actionNote: 'Examining the critical operational environment mismatch.',
    },
    {
      stepNum: 4,
      stepTitle: 'STEP 4: Now let\'s crash-test it.',
      badge: 'CRASH TEST',
      tab: 'break_my_ai' as NavigationTab,
      headline: 'Running the Trust Crash Test',
      description:
        'Instead of waiting for real patient harm to occur, TrustCheck injects 7 realistic stress vectors into the model: missing laboratory panels, sensor shivering noise, device downsampling, and rare hemodynamic combinations.',
      actionNote: 'Navigating to the Trust Crash Test console.',
    },
    {
      stepNum: 5,
      stepTitle: 'STEP 5: Watch performance collapse under realistic conditions.',
      badge: 'STRESS COLLAPSE',
      tab: 'break_my_ai' as NavigationTab,
      headline: '92% Baseline Plunges to 58% Deployment Readiness',
      description:
        'Missing labs drop accuracy to 80%. Rural 50 Hz handheld telemetry drops accuracy to 74%. In 6 of 6 dangerous stress vectors, the model fails to maintain safe diagnostic bounds.',
      actionNote: 'Reviewing empirical failure rates in the stress catalog.',
    },
    {
      stepNum: 6,
      stepTitle: 'STEP 6: Here are the failure conditions & edge cases.',
      badge: 'FAILURE CONDITIONS',
      tab: 'failure_map' as NavigationTab,
      headline: 'Masked Septic Shock & 98% Confident False Reassurance',
      description:
        'On Edge Case #07 (patient on chronic beta-blockers presenting with severe septic shock), blunted heart rate tricks the neural network into assigning 98% confidence to "LOW RISK" on an actively dying patient.',
      actionNote: 'Inspecting clinical failure mechanisms on the Failure Map.',
    },
    {
      stepNum: 7,
      stepTitle: 'STEP 7: Now discover WHO gets failed by the model.',
      badge: 'WHO IS AFFECTED',
      tab: 'fairness' as NavigationTab,
      headline: '18 Percentage Point Disparity Gap (4.6x Higher Missed Care)',
      description:
        'The model\'s average accuracy hides a clinically important subgroup failure. While Majority Cohort A experiences 95% accuracy, underrepresented Cohort B drops to 77% (4.6x higher false negative rate).',
      actionNote: 'Auditing demographic disparity and testing decision thresholds.',
    },
    {
      stepNum: 8,
      stepTitle: 'STEP 8: TrustCheck blocks deployment.',
      badge: 'DEPLOYMENT DECISION',
      tab: 'safety_passport' as NavigationTab,
      headline: '🔴 DEPLOYMENT BLOCKED (Readiness: 58%)',
      description:
        'TrustCheck acts as an unyielding pre-deployment gate. Four critical safety blockers were triggered. Patient triage cannot proceed autonomously under these unsafe conditions.',
      actionNote: 'Viewing explainable gate decision and institutional blockers.',
    },
    {
      stepNum: 9,
      stepTitle: 'STEP 9: Here is exactly what must be fixed.',
      badge: 'TRUST PASSPORT',
      tab: 'safety_passport' as NavigationTab,
      headline: 'Trust Passport & Remediation Roadmap',
      description:
        'The generated AI Trust Passport provides an actionable certification: what the model is safe for, what it is NOT safe for, and the 5 specific engineering and clinical overrides needed before re-evaluation.',
      actionNote: 'Viewing and exporting the certified AI Trust Passport.',
    },
  ];

  const activeStep = steps[currentStep];
  const isFinalStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const next = currentStep + 1;
      setCurrentStep(next);
      onNavigateTab(steps[next].tab);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      const prev = currentStep - 1;
      setCurrentStep(prev);
      onNavigateTab(steps[prev].tab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans">
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="p-6 bg-[#F6FAF8] border-b border-[#DDE8E2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8F5EF] border border-[#16845B] flex items-center justify-center text-[#16845B]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#16845B] uppercase tracking-wider block">
                INTERACTIVE 3-MINUTE GUIDED STORY
              </span>
              <h3 className="text-base font-black text-[#17221D]">
                TrustCheck Healthcare AI Safety Demo
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64736B] hover:text-[#17221D] hover:bg-[#E8F5EF] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            
            {/* Step indicator */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#0F5132] bg-[#E8F5EF] px-3.5 py-1 rounded-full border border-[#DDE8E2]">
                {activeStep.stepTitle}
              </span>
              <span className="text-xs text-[#64736B] font-bold">
                Step {activeStep.stepNum} of 9
              </span>
            </div>

            {/* Step Headline & Description */}
            <div className="space-y-2">
              <h4 className="text-xl font-black text-[#17221D]">
                {activeStep.headline}
              </h4>
              <p className="text-sm text-[#64736B] leading-relaxed">
                {activeStep.description}
              </p>
            </div>

            {/* Action Note */}
            <div className="p-3.5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] text-xs text-[#0F5132] font-semibold flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#16845B] shrink-0" />
              <span>{activeStep.actionNote}</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation Bar */}
        <div className="p-4 bg-[#F6FAF8] border-t border-[#DDE8E2] flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold text-[#64736B] hover:text-[#17221D] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          {/* Progress dots for 9 steps */}
          <div className="flex items-center gap-1">
            {steps.map((s, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all ${
                  currentStep === idx ? 'w-5 bg-[#16845B]' : 'w-2 bg-[#DDE8E2]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white text-xs font-black transition-colors shadow-xs"
          >
            <span>{isFinalStep ? 'Finish Demo' : 'Next Step'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
