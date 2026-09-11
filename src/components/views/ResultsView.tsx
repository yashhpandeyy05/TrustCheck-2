import React, { useState } from 'react';
import {
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  ShieldAlert,
  Users,
  Activity,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { CriticalFailureDetail, SafetyDimension } from '../../types';
import {
  CRITICAL_FAILURES,
  ENVIRONMENT_SHIFT_ROWS,
  EDGE_CASE_SCENARIOS,
  EdgeCaseScenario,
  PROGRESSIVE_EVIDENCE_CHECKS,
  ProgressiveEvidenceCheck,
} from '../../data/trustCheckSafetyData';

interface ResultsViewProps {
  onExplainFailure: (failure: CriticalFailureDetail) => void;
  onNavigateTab: (tab: any) => void;
  initialDimension?: SafetyDimension;
}

export const ResultsView: React.FC<ResultsViewProps> = ({
  onExplainFailure,
  onNavigateTab,
  initialDimension = 'all',
}) => {
  const [currentEvidenceIndex, setCurrentEvidenceIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'progressive' | 'all'>('progressive');
  const [activeDimension, setActiveDimension] = useState<SafetyDimension>(initialDimension);
  const [selectedEdgeCase, setSelectedEdgeCase] = useState<EdgeCaseScenario>(EDGE_CASE_SCENARIOS[0]);

  const currentCheck: ProgressiveEvidenceCheck | undefined =
    PROGRESSIVE_EVIDENCE_CHECKS[currentEvidenceIndex];

  const handleNextCheck = () => {
    if (currentEvidenceIndex < PROGRESSIVE_EVIDENCE_CHECKS.length) {
      setCurrentEvidenceIndex((prev) => prev + 1);
    }
  };

  const handlePrevCheck = () => {
    if (currentEvidenceIndex > 0) {
      setCurrentEvidenceIndex((prev) => prev - 1);
    }
  };

  return (
    <div id="view-results" className="max-w-6xl mx-auto space-y-12 font-sans pb-16">
      
      {/* 1. TOP GATE DECISION BANNER */}
      <div className="bg-white border-4 border-red-800 p-8 sm:p-12 shadow-sm space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 pb-8 border-b border-red-100">
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-red-50 text-red-800 border border-red-200 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Deployment Blocked
              </span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">
                Evidence based on 1,900 edge cases
              </span>
            </div>

            <div className="flex items-start gap-4">
              <AlertOctagon className="w-10 h-10 text-red-800 shrink-0 mt-1" />
              <h1 className="text-4xl sm:text-5xl font-serif font-black text-gray-900 tracking-tight leading-none">
                Not ready for <br /> clinical deployment.
              </h1>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              The candidate model (<strong className="text-gray-900 font-bold">CardioScan Net v1.4</strong>) shattered under simulated rural constraints. We discovered multiple catastrophic failure modes that would directly harm patients if pushed live today.
            </p>
          </div>

          {/* Asymmetric Score Summary */}
          <div className="flex flex-col gap-4 shrink-0 bg-red-50 p-6 border border-red-200 min-w-[200px]">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-800 block">
                Final Safety Score
              </span>
              <div className="text-5xl font-black text-red-900 tracking-tighter">
                58<span className="text-2xl text-red-800/50">/100</span>
              </div>
              <span className="text-xs font-bold text-red-800">
                Minimum passing: 80
              </span>
            </div>
            <div className="h-px w-full bg-red-200 my-2" />
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-red-800 block">
                Critical Blockers
              </span>
              <div className="text-2xl font-black text-red-900">
                3 Discovered
              </div>
            </div>
          </div>
        </div>

        {/* 2. PROGRESSIVE EVIDENCE STEPPER CONTROLS */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] block mb-1">
                Audit Dossier
              </span>
              <h2 className="text-xl font-serif font-black text-gray-900">
                The 5 Evidence Checks
              </h2>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-2 bg-gray-100 p-1 border border-gray-200 shrink-0">
              <button
                onClick={() => setViewMode('progressive')}
                className={`px-4 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'progressive'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Step-by-Step
              </button>
              <button
                onClick={() => setViewMode('all')}
                className={`px-4 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                  viewMode === 'all'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                View Dossier
              </button>
            </div>
          </div>

          {/* Stepper Tabs Bar (Dense grid) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {PROGRESSIVE_EVIDENCE_CHECKS.map((check, idx) => {
              const isActive = viewMode === 'progressive' && currentEvidenceIndex === idx;
              return (
                <button
                  key={check.id}
                  onClick={() => {
                    setViewMode('progressive');
                    setCurrentEvidenceIndex(idx);
                  }}
                  className={`p-3 text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-gray-900 border-2 border-gray-900 text-white'
                      : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-900'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                      Check {idx + 1}
                    </span>
                    <span className={`w-2 h-2 rounded-none ${check.criticalVerdict === 'CRITICAL' ? 'bg-red-600' : 'bg-yellow-500'}`} />
                  </div>
                  <div className="text-xs font-black truncate mb-1">
                    {check.headlineStat}
                  </div>
                  <span className={`text-[10px] truncate ${isActive ? 'text-gray-400' : 'text-gray-500'}`}>
                    {check.statLabel}
                  </span>
                </button>
              );
            })}

            {/* Step 6: Final Gate Decision */}
            <button
              onClick={() => {
                setViewMode('progressive');
                setCurrentEvidenceIndex(5);
              }}
              className={`p-3 text-left transition-all cursor-pointer flex flex-col justify-between ${
                viewMode === 'progressive' && currentEvidenceIndex === 5
                  ? 'bg-red-900 border-2 border-red-900 text-white'
                  : 'bg-red-50 border border-red-200 hover:bg-red-100 text-red-900'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${viewMode === 'progressive' && currentEvidenceIndex === 5 ? 'text-red-300' : 'text-red-700'}`}>
                  Final
                </span>
                <Lock className={`w-3 h-3 ${viewMode === 'progressive' && currentEvidenceIndex === 5 ? 'text-red-400' : 'text-red-700'}`} />
              </div>
              <div className="text-xs font-black truncate mb-1">
                Gate Locked
              </div>
              <span className={`text-[10px] truncate ${viewMode === 'progressive' && currentEvidenceIndex === 5 ? 'text-red-300' : 'text-red-700'}`}>
                NOT READY
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. PROGRESSIVE STEP-BY-STEP EVIDENCE CARD */}
      {viewMode === 'progressive' && currentEvidenceIndex < 5 && currentCheck && (
        <div className="bg-white border border-gray-200 p-8 shadow-sm space-y-8 animate-in fade-in duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-gray-200 gap-6">
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-gray-900 text-white">
                Evidence Check {currentCheck.stepNumber} of 5
              </span>
              <h3 className="text-3xl font-serif font-black text-gray-900 tracking-tight">
                {currentCheck.headlineStat}
              </h3>
              <div className="text-sm font-bold text-gray-500">
                {currentCheck.comparisonBadge}
              </div>
            </div>

            <div className="shrink-0 bg-gray-50 p-4 border border-gray-200 max-w-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Core Clinical Question</span>
              <span className="text-sm font-bold text-gray-900 italic">
                "{currentCheck.coreQuestion}"
              </span>
            </div>
          </div>

          {/* Asymmetric 4-panel grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            <div className="md:col-span-7 space-y-6">
              <div className="p-6 bg-gray-50 border border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <Activity className="w-4 h-4" />
                  <span>What Did We Test?</span>
                </div>
                <p className="text-sm text-gray-900 font-medium leading-relaxed">
                  {currentCheck.whatDidWeTest}
                </p>
              </div>

              <div className="p-6 bg-red-50 border border-red-200 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-red-800">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The Ground Truth Reality</span>
                </div>
                <p className="text-sm text-gray-900 font-bold leading-relaxed">
                  {currentCheck.whatHappened}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 space-y-6">
              <div className="p-6 bg-white border border-gray-200 space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Clinical Impact</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {currentCheck.whyDoesItMatter}
                </p>
              </div>

              <div className="p-6 bg-gray-900 text-white space-y-2">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <Users className="w-4 h-4" />
                  <span>Who Gets Hurt?</span>
                </div>
                <p className="text-sm font-medium leading-relaxed">
                  {currentCheck.whoIsAffected}
                </p>
              </div>
            </div>
          </div>

          {/* 5. Actionable Prescriptive Banner */}
          <div className="p-6 bg-[var(--color-accent)] text-white space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent-light)]">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Engineering Fix</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-white text-[var(--color-accent)]">
                Required Mitigation
              </span>
            </div>
            <p className="text-sm font-bold leading-relaxed">
              {currentCheck.whatShouldWeDo}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200 gap-4">
            <button
              onClick={handlePrevCheck}
              disabled={currentEvidenceIndex === 0}
              className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 text-xs font-bold uppercase tracking-wide text-gray-600 hover:bg-gray-50 disabled:opacity-30 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNextCheck}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer"
            >
              <span>{currentEvidenceIndex === 4 ? 'Review Final Verdict' : 'Next Check'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 4. FINAL GATE DECISION CARD */}
      {viewMode === 'progressive' && currentEvidenceIndex === 5 && (
        <div className="bg-white border-4 border-red-800 p-8 sm:p-16 shadow-md space-y-12 animate-in fade-in duration-200">
          
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-800 border border-red-200 text-xs font-bold uppercase tracking-widest">
              <Lock className="w-4 h-4" />
              <span>Gate Status: Locked</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-serif font-black text-red-900 tracking-tight leading-none">
              Not ready for patients.
            </h2>

            <p className="text-base text-gray-700 leading-relaxed font-medium">
              We cannot deploy CardioScan Net v1.4. The algorithm demonstrates unacceptable algorithmic fragility under real-world clinical stressors. Engineering must resolve these 3 critical blockers before a re-test is permitted.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CRITICAL_FAILURES.map((failure, idx) => (
              <div
                key={failure.id}
                className="p-6 bg-red-50 border border-red-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-red-800">
                      Blocker {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-white border border-red-200 text-red-800">
                      {failure.category}
                    </span>
                  </div>

                  <div className="text-xl font-black text-red-900 leading-tight">
                    {failure.impactMetric}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed">
                    {failure.summary}
                  </p>
                </div>

                <button
                  onClick={() => onExplainFailure(failure)}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-white border border-red-200 hover:bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Inspect Evidence</span>
                </button>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-6">
            <button
              onClick={() => onNavigateTab('fix_retest')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              <span>Proceed to Engineering Fixes</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* 5. DEEP DIVE TABS (View All Mode) */}
      {(viewMode === 'all' || activeDimension !== 'all') && (
        <div className="bg-white border border-gray-200 p-8 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-6 border-b border-gray-200 gap-6">
            <div>
              <h3 className="text-2xl font-serif font-black text-gray-900">
                Raw Evaluation Data
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                Inspect the granular performance telemetry across all 5 safety vectors.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {(
                [
                  { id: 'all', label: 'Overview' },
                  { id: 'environment_shift', label: 'Environment Shift' },
                  { id: 'fairness', label: 'Demographics' },
                  { id: 'edge_cases', label: 'Edge Cases' },
                  { id: 'uncertainty', label: 'Calibration' },
                ] as const
              ).map((dim) => (
                <button
                  key={dim.id}
                  onClick={() => setActiveDimension(dim.id)}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors cursor-pointer border ${
                    activeDimension === dim.id
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {dim.label}
                </button>
              ))}
            </div>
          </div>

          {/* Render active dimension content below (keeping it simple for brevity, using human tone) */}
          <div className="p-6 bg-gray-50 border border-gray-200 text-sm text-gray-800 leading-relaxed font-medium">
             We refuse to hide behind aggregated AUC scores. Below is the unvarnished truth of how the model behaves when pushed to the margins of its training distribution. 
             (Select a dimension above to inspect the specific telemetry vectors.)
          </div>
        </div>
      )}
    </div>
  );
};
