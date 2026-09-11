import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ChevronRight,
  ChevronLeft,
  X,
  Sparkles,
  ShieldCheck,
  AlertOctagon,
  CheckCircle2,
  FileCheck2,
  Wrench,
  HelpCircle,
  Eye,
  List,
} from 'lucide-react';
import { NavigationTab, SafetyDimension, CriticalFailureDetail } from '../types';
import { CRITICAL_FAILURES } from '../data/trustCheckSafetyData';

export interface DemoStep {
  id: number;
  title: string;
  quote: string;
  tab: NavigationTab;
  dimension?: SafetyDimension;
  openExplainFailure?: boolean;
  triggerSimulateFixes?: boolean;
  context: string;
  metricHighlight: string;
  badgeColor?: string;
}

export const DEMO_STEPS: DemoStep[] = [
  {
    id: 1,
    title: 'Select Model',
    quote: '"Here is our AI model: CardioScan Net v1.4."',
    tab: 'test_model',
    context: 'CardioScan Net v1.4 claims 92.4% baseline accuracy under pristine academic lab conditions at Hospital A Core Lab.',
    metricHighlight: 'Model: CardioScan Net v1.4 (92.4% Baseline)',
    badgeColor: 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]',
  },
  {
    id: 2,
    title: 'Target Deployment',
    quote: '"Now we define where it will actually be deployed: a Rural Clinic."',
    tab: 'test_model',
    context: 'The hospital plans to deploy this AI to a rural clinic with handheld Device B telemetry and 25% delayed troponin labs.',
    metricHighlight: 'Target: Rural Clinic & Device B Telemetry',
    badgeColor: 'bg-[#FAFDFB] text-[#16845B] border-[#DDE8E2]',
  },
  {
    id: 3,
    title: 'Run Safety Audit',
    quote: '"We click RUN TRUSTCHECK."',
    tab: 'test_model',
    context: 'Before a single patient is touched, TrustCheck launches a pre-deployment stress audit across realistic clinical conditions.',
    metricHighlight: 'Action: RUN TRUSTCHECK',
    badgeColor: 'bg-[#16845B] text-white',
  },
  {
    id: 4,
    title: '1,900 Simulated Cases',
    quote: '"TrustCheck tests 1,900 simulated clinical cases."',
    tab: 'results',
    dimension: 'all',
    context: 'TrustCheck stress-tests the neural network across missing labs, sensor noise, demographic cohorts, and clinical edge cases.',
    metricHighlight: '1,900 Curated Clinical Stress Cases Evaluated',
    badgeColor: 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]',
  },
  {
    id: 5,
    title: 'Not Safe To Deploy',
    quote: '"It returns: NOT SAFE TO DEPLOY (Safety Score: 58/100)."',
    tab: 'results',
    dimension: 'all',
    context: 'The candidate model fails clinical safety thresholds. Autonomous patient triage is immediately blocked.',
    metricHighlight: 'Safety Score: 58 / 100 &bull; 3 Critical Failures',
    badgeColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
  },
  {
    id: 6,
    title: '3 Critical Failures',
    quote: '"Here are the 3 reasons why: Hardware Shift, Fairness Gap, and Dangerous Edge Cases."',
    tab: 'results',
    dimension: 'all',
    context: 'Instead of an uninterpretable confusion matrix, clinicians immediately see the 3 unyielding safety blockers.',
    metricHighlight: '1. Hardware Shift &bull; 2. Fairness Gap &bull; 3. Dangerous Edge Case',
    badgeColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
  },
  {
    id: 7,
    title: 'Beta-Blocker Edge Case',
    quote: '"Let\'s click the beta-blocker edge case."',
    tab: 'results',
    dimension: 'edge_cases',
    openExplainFailure: true,
    context: 'TrustCheck simulates an elderly septic shock patient taking chronic metoprolol.',
    metricHighlight: 'Flagship Stress Test: Beta-Blocker Masked Shock',
    badgeColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
  },
  {
    id: 8,
    title: '98% Confidence — WRONG',
    quote: '"The model predicts Low Risk with 98% confidence — on a dying patient."',
    tab: 'results',
    dimension: 'edge_cases',
    openExplainFailure: true,
    context: 'High confidence does not equal safety. The neural network is falsely certain on an actively deteriorating patient.',
    metricHighlight: 'Model: 98% Confident "Low Risk" &bull; Actual: Severe Septic Shock',
    badgeColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
  },
  {
    id: 9,
    title: 'Why The Model Failed',
    quote: '"Why did it fail? The model relies on heart rate; beta-blockers suppress the tachycardia."',
    tab: 'results',
    dimension: 'edge_cases',
    openExplainFailure: true,
    context: 'Without adrenergic tachycardia, the neural net assumed the patient was stable, exposing the clinic to fatal under-triage.',
    metricHighlight: 'Root Cause: Pharmacological Blunting of Heart Rate',
    badgeColor: 'bg-[#FAFDFB] text-[#17221D] border-[#DDE8E2]',
  },
  {
    id: 10,
    title: 'Environment Shift',
    quote: '"Notice how the rural clinic differs from training: only 44% compatibility."',
    tab: 'results',
    dimension: 'environment_shift',
    context: 'Hospital A used 100 Hz cart ECGs and immediate labs; the rural clinic has 50 Hz telemetry and a 3-hour lab delay.',
    metricHighlight: '44% Compatibility &bull; 100 Hz → 50 Hz Telemetry &bull; 25% Delayed Labs',
    badgeColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
  },
  {
    id: 11,
    title: '18% Fairness Gap',
    quote: '"Underrepresented cohorts experience an 18-point performance drop."',
    tab: 'results',
    dimension: 'fairness',
    context: '95% accuracy for majority patients vs 77% for rural minority patients, with 4.6× higher false negative rates.',
    metricHighlight: '18-Point Disparity Gap &bull; 4.6× Higher Missed Triage',
    badgeColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
  },
  {
    id: 12,
    title: 'Recommended Fixes',
    quote: '"TrustCheck tells you exactly what to fix before deployment."',
    tab: 'fix_retest',
    context: '5 actionable remedies: Device B fine-tuning, missing-lab uncertainty, fairness regularization, and clinical rules.',
    metricHighlight: 'TrustCheck Remediation Roadmap (5 Prescriptions)',
    badgeColor: 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]',
  },
  {
    id: 13,
    title: 'Simulate Fixes',
    quote: '"We click SIMULATE FIXES."',
    tab: 'fix_retest',
    triggerSimulateFixes: true,
    context: 'TrustCheck recalculates safety scores after applying transfer learning and deterministic clinical rule overrides.',
    metricHighlight: 'Simulating Local Tuning & Clinical Safety Overrides...',
    badgeColor: 'bg-[#16845B] text-white',
  },
  {
    id: 14,
    title: 'Re-Test Model',
    quote: '"The model is automatically re-tested against the 1,900 cases."',
    tab: 'fix_retest',
    context: 'The simulated stress battery re-evaluates all failure boundaries with safeguards in place.',
    metricHighlight: 'Re-evaluation Complete &bull; 1,900 Cases Verified',
    badgeColor: 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]',
  },
  {
    id: 15,
    title: 'Improved Safety Score',
    quote: '"Score increases from 58 to 84: CONDITIONAL DEPLOYMENT approved."',
    tab: 'fix_retest',
    context: 'The clinical governance committee grants conditional pilot approval with mandatory physician oversight.',
    metricHighlight: 'Safety Score: 84 / 100 &bull; Conditional Deployment Cleared',
    badgeColor: 'bg-[#FEF9C3] text-[#854D0E] border-[#FDE047]',
  },
  {
    id: 16,
    title: 'Final Audit Report',
    quote: '"TrustCheck generates the official institutional pre-deployment safety report."',
    tab: 'audit_report',
    context: 'A complete, auditable governance dossier ready for the hospital ethics committee and medical director sign-off.',
    metricHighlight: 'Official Pre-Deployment Healthcare AI Safety Report',
    badgeColor: 'bg-[#17221D] text-white',
  },
];

interface GuidedDemoControllerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: NavigationTab) => void;
  onSelectDimension?: (dim: SafetyDimension) => void;
  onOpenExplainFailure?: (failure: CriticalFailureDetail) => void;
  onSimulateFixes?: () => void;
}

export const GuidedDemoController: React.FC<GuidedDemoControllerProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onSelectDimension,
  onOpenExplainFailure,
  onSimulateFixes,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isJumpMenuOpen, setIsJumpMenuOpen] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentStep = DEMO_STEPS[currentStepIndex];

  // Apply step actions on transition
  const applyStepActions = (step: DemoStep) => {
    onNavigateTab(step.tab);

    if (step.dimension && onSelectDimension) {
      onSelectDimension(step.dimension);
    }

    if (step.openExplainFailure && onOpenExplainFailure) {
      onOpenExplainFailure(CRITICAL_FAILURES[2]); // Flagship beta-blocker failure
    }

    if (step.triggerSimulateFixes && onSimulateFixes) {
      onSimulateFixes();
    }
  };

  const goToStep = (index: number) => {
    if (index >= 0 && index < DEMO_STEPS.length) {
      setCurrentStepIndex(index);
      applyStepActions(DEMO_STEPS[index]);
    }
  };

  const handleNext = () => {
    if (currentStepIndex < DEMO_STEPS.length - 1) {
      goToStep(currentStepIndex + 1);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentStepIndex]);

  // Autoplay 7s timer
  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < DEMO_STEPS.length - 1) {
          const nextIdx = prev + 1;
          applyStepActions(DEMO_STEPS[nextIdx]);
          return nextIdx;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    }, 7000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div
      id="guided-demo-hud"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl font-sans animate-in slide-in-from-bottom-6 duration-200"
    >
      <div className="bg-[#FFFFFF]/95 backdrop-blur-md border-2 border-[#16845B] rounded-3xl shadow-2xl p-4 sm:p-5 text-[#17221D] space-y-3">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between gap-2 border-b border-[#DDE8E2] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#16845B] text-white">
              <Sparkles className="w-3 h-3 text-[#7AE3B5]" />
              3-MIN LIVE DEMO
            </span>

            <span className="text-xs font-bold text-[#64736B]">
              Beat {currentStep.id} of {DEMO_STEPS.length}:
            </span>

            <span className="text-xs font-extrabold text-[#17221D]">
              {currentStep.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Jump Menu Toggle */}
            <button
              onClick={() => setIsJumpMenuOpen(!isJumpMenuOpen)}
              className="text-xs font-bold px-2.5 py-1 rounded-lg border border-[#DDE8E2] hover:bg-[#F6FAF8] text-[#64736B] flex items-center gap-1 cursor-pointer"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">All 16 Beats</span>
            </button>

            {/* Auto-Play Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`text-xs font-bold px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1 cursor-pointer ${
                isPlaying
                  ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B]'
                  : 'bg-white text-[#64736B] border-[#DDE8E2] hover:bg-[#F6FAF8]'
              }`}
            >
              {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isPlaying ? 'Auto-Play (7s)' : 'Auto-Play'}</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-[#64736B] hover:text-[#17221D] hover:bg-[#F6FAF8] cursor-pointer"
              title="Close Demo HUD (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Narrative Line (The Pitch Quote) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-black text-[#17221D] tracking-tight leading-snug">
              {currentStep.quote}
            </h4>
            <p className="text-xs text-[#64736B] leading-relaxed">
              {currentStep.context}
            </p>
          </div>

          {/* Metric Highlight Badge */}
          <div className="shrink-0">
            <span
              className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border block text-center ${
                currentStep.badgeColor || 'bg-[#F6FAF8] text-[#17221D] border-[#DDE8E2]'
              }`}
            >
              {currentStep.metricHighlight}
            </span>
          </div>
        </div>

        {/* Bottom Navigation Controls & Progress Bar */}
        <div className="flex items-center justify-between pt-1 gap-4">
          <span className="text-[11px] text-[#64736B] hidden sm:inline font-mono">
            Press <strong>&rarr;</strong> / <strong>Space</strong> for Next, <strong>&larr;</strong> for Prev
          </span>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#DDE8E2] text-xs font-bold text-[#64736B] hover:bg-[#F6FAF8] disabled:opacity-30 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentStepIndex === DEMO_STEPS.length - 1}
              className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white text-xs font-black shadow-xs disabled:opacity-30 cursor-pointer"
            >
              <span>Next Beat</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mini 16-Step Progress Dots */}
        <div className="flex items-center gap-1 pt-1">
          {DEMO_STEPS.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => goToStep(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentStepIndex
                  ? 'bg-[#16845B] flex-2'
                  : idx < currentStepIndex
                  ? 'bg-[#16845B]/40 flex-1'
                  : 'bg-[#DDE8E2] flex-1'
              }`}
              title={`Jump to Beat ${step.id}: ${step.title}`}
            />
          ))}
        </div>

        {/* Jump Menu Drawer */}
        {isJumpMenuOpen && (
          <div className="pt-2 border-t border-[#DDE8E2] grid grid-cols-2 sm:grid-cols-4 gap-1.5 max-h-48 overflow-y-auto">
            {DEMO_STEPS.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => {
                  goToStep(idx);
                  setIsJumpMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-left text-xs font-bold border transition-colors ${
                  idx === currentStepIndex
                    ? 'bg-[#E8F5EF] border-[#16845B] text-[#0F5132]'
                    : 'bg-white border-[#DDE8E2] hover:bg-[#F6FAF8] text-[#64736B]'
                }`}
              >
                <span className="text-[10px] font-mono block text-[#16845B]">#{step.id}</span>
                <span className="truncate block">{step.title}</span>
              </button>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
