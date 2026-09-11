import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Building2,
  Cpu,
  Users,
  Database,
  Stethoscope,
  Activity,
  ArrowRight,
  ShieldCheck,
  Clock,
} from 'lucide-react';

interface TestModelViewProps {
  onRunTestComplete: () => void;
}

export const TestModelView: React.FC<TestModelViewProps> = ({ onRunTestComplete }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const testSteps = [
    { title: 'Baseline Performance', detail: 'Evaluating academic core lab benchmark (100 Hz ECG, ideal troponin/lactate)' },
    { title: 'Missing Information Test', detail: 'Simulating 25% delayed troponin and courier turnaround delays' },
    { title: 'Hardware & Device Shift Test', detail: 'Stress-testing on rural Device B handheld telemetry with 50 Hz downsampling' },
    { title: 'Population Fairness Test', detail: 'Evaluating rural demographic cohorts and geriatric presentation variance' },
    { title: 'Edge-Case Attack Test', detail: 'Injecting beta-blocker masked shock, contradictory vitals, and sensor artifacts' },
    { title: 'Confidence Calibration Test', detail: 'Measuring epistemic overconfidence and true clinical uncertainty alignment' },
  ];

  const handleStartTest = () => {
    setIsRunning(true);
    setCurrentStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < testSteps.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsRunning(false);
          onRunTestComplete();
        }, 600);
      }
    }, 700);
  };

  return (
    <div id="view-test-model" className="max-w-6xl mx-auto space-y-12 font-sans pb-16">
      
      {/* 1. Header & Hero Value Proposition (Asymmetric Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-end">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 border border-gray-200 text-gray-800 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-gray-500" />
            <span>Pre-Deployment Reality Check</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black text-gray-900 leading-none">
            Break the model. <br />
            <span className="text-gray-400">Before it breaks in the clinic.</span>
          </h1>
        </div>

        <div className="lg:col-span-4 bg-gray-50 p-6 border-l-4 border-[var(--color-accent)] space-y-3">
          <p className="text-sm text-gray-800 font-medium leading-relaxed">
            I don't care about a 92% lab accuracy on clean data. We need to know exactly how this algorithm fails when the courier is late, the ECG is noisy, and the patient is atypical.
          </p>
          <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">— Chief Medical Information Officer</p>
        </div>
      </div>

      {/* The 5 Fundamental Pre-Deployment Questions (Dense asymmetric grid) */}
      <div className="bg-white border border-gray-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 bg-gray-900 text-white">
            Evaluation Matrix
          </span>
          <span className="text-sm font-bold text-gray-800">
            5 Vectors of Clinical Failure
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            { id: 1, title: 'Missing Inputs', sub: 'Delayed troponin & courier turnaround' },
            { id: 2, title: 'Hardware Shift', sub: 'Device B 50 Hz handheld telemetry' },
            { id: 3, title: 'Demographics', sub: 'Geriatric presentation variance' },
            { id: 4, title: 'Edge Cases', sub: 'Beta-blocker masked shock attacks' },
            { id: 5, title: 'Overconfidence', sub: 'Uncertainty calibration audit' },
          ].map((item) => (
            <div key={item.id} className="p-4 bg-gray-50 border border-gray-200 flex flex-col gap-2 hover:bg-gray-100 transition-colors">
              <span className="w-6 h-6 bg-gray-200 text-gray-700 font-black text-xs flex items-center justify-center rounded-none">
                {item.id}
              </span>
              <div>
                <strong className="block text-sm text-gray-900 mb-1">{item.title}</strong>
                <span className="text-xs text-gray-600 leading-tight block">{item.sub}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Setup Card: Asymmetric Density configuration */}
      <div className="bg-white border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <h2 className="text-2xl font-serif font-black text-gray-900 mb-2">
              Simulation Configuration
            </h2>
            <p className="text-sm text-gray-600 max-w-xl">
              Locking in the candidate model against the exact hardware and workflow constraints of the target rural clinic. No idealized assumptions.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 uppercase tracking-wide shrink-0">
            <Database className="w-4 h-4 text-gray-400" />
            <span>1,900 Curated Stress Cases</span>
          </span>
        </div>

        {/* Dense Config Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
          
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              <Activity className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Candidate Model</span>
            </div>
            <div className="text-lg font-bold text-gray-900">CardioScan Net v1.4</div>
            <p className="text-xs text-gray-600">Claimed 92.4% baseline lab accuracy.</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              <Stethoscope className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Intended Use</span>
            </div>
            <div className="text-lg font-bold text-gray-900">Emergency Triage</div>
            <p className="text-xs text-gray-600">Urgent vs non-urgent prioritization.</p>
          </div>

          <div className="space-y-1 lg:col-span-2 bg-gray-50 p-4 border border-gray-200">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              <Building2 className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Target Environment Constraints</span>
            </div>
            <div className="text-lg font-bold text-gray-900">Rural Clinic — Limited Resources</div>
            <p className="text-xs text-gray-600">
              3-hour lab turnaround. Expect 25% delayed troponin &amp; lactate inputs.
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              <Cpu className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Telemetry Hardware</span>
            </div>
            <div className="text-lg font-bold text-gray-900">Device B (Handheld)</div>
            <p className="text-xs text-gray-600">50 Hz sampling rate (noisy baseline).</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2">
              <Users className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>Demographics</span>
            </div>
            <div className="text-lg font-bold text-gray-900">Geriatric Majority</div>
            <p className="text-xs text-gray-600">High chronic beta-blocker prevalence.</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-gray-200 pt-8">
          <div className="flex items-center gap-4 text-sm text-gray-600 max-w-lg">
            <ShieldCheck className="w-8 h-8 text-[var(--color-accent)] shrink-0" />
            <p>
              <strong className="text-gray-900">Clinical Governance:</strong> This audit does not replace clinical judgment. It surfaces algorithmic fragility prior to live deployment.
            </p>
          </div>

          <button
            id="btn-run-trustcheck"
            onClick={handleStartTest}
            disabled={isRunning}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-bold uppercase tracking-wide transition-colors cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Clock className="w-5 h-5 animate-spin" />
                <span>Executing Audit...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>Run Safety Audit</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* 5. Live Testing Progress Modal */}
      {isRunning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm font-sans">
          <div className="bg-white border-4 border-[var(--color-accent)] w-full max-w-xl p-8 shadow-2xl animate-in fade-in duration-200">
            
            <div className="mb-8 border-b border-gray-200 pb-6">
              <span className="text-[10px] font-black uppercase text-[var(--color-accent)] tracking-widest mb-2 block">
                Active Execution
              </span>
              <h3 className="text-3xl font-serif font-black text-gray-900">
                Stress-testing CardioScan Net
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Running 1,900 edge cases against Rural Clinic parameters...
              </p>
            </div>

            <div className="space-y-3">
              {testSteps.map((step, idx) => {
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                const isPending = idx > currentStepIndex;

                return (
                  <div
                    key={step.title}
                    className={`p-4 border transition-colors flex items-start gap-4 ${
                      isPassed
                        ? 'bg-gray-50 border-gray-300'
                        : isCurrent
                        ? 'bg-white border-[var(--color-accent)] shadow-sm'
                        : 'bg-transparent border-dashed border-gray-200 opacity-50'
                    }`}
                  >
                    <div className="shrink-0 mt-0.5">
                      {isPassed ? (
                        <CheckCircle2 className="w-5 h-5 text-[var(--color-accent)]" />
                      ) : isCurrent ? (
                        <Clock className="w-5 h-5 text-[var(--color-accent)] animate-spin" />
                      ) : (
                        <div className="w-5 h-5 rounded-none border border-gray-300" />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-gray-900 flex items-center justify-between mb-1">
                        <span>{step.title}</span>
                        {isPassed && <span className="text-[10px] font-mono font-bold text-[var(--color-accent)]">PASS</span>}
                        {isCurrent && <span className="text-[10px] font-mono font-bold text-[var(--color-accent)]">EVALUATING</span>}
                      </div>
                      <p className="text-xs text-gray-600 truncate">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 w-full bg-gray-100 h-1 overflow-hidden">
              <div
                className="bg-[var(--color-accent)] h-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / testSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
