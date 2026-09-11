import React, { useState } from 'react';
import {
  Wrench,
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Activity,
} from 'lucide-react';
import { RECOMMENDED_FIXES, RecommendedFix } from '../../data/trustCheckSafetyData';

interface FixAndRetestViewProps {
  onNavigateTab: (tab: any) => void;
  onRetestComplete?: (newScore: number) => void;
}

export const FixAndRetestView: React.FC<FixAndRetestViewProps> = ({
  onNavigateTab,
  onRetestComplete,
}) => {
  const [fixes, setFixes] = useState<RecommendedFix[]>(RECOMMENDED_FIXES);
  const [isSimulating, setIsSimulating] = useState(false);
  const [hasSimulated, setHasSimulated] = useState(false);
  const [retestProgress, setRetestProgress] = useState(0);

  const toggleFix = (id: string) => {
    setFixes((prev) =>
      prev.map((f) => (f.id === id ? { ...f, applied: !f.applied } : f))
    );
  };

  const handleSimulateFixes = () => {
    setIsSimulating(true);
    setRetestProgress(0);

    const interval = setInterval(() => {
      setRetestProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          setHasSimulated(true);
          // Set all fixes to applied
          setFixes((fList) => fList.map((f) => ({ ...f, applied: true })));
          if (onRetestComplete) {
            onRetestComplete(84);
          }
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div id="view-fix-retest" className="max-w-5xl mx-auto space-y-12 font-sans pb-16">
      
      {/* 1. Header & Title */}
      <div className="space-y-4 max-w-3xl border-b border-gray-200 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest">
          <Wrench className="w-3 h-3" />
          <span>Remediation Protocol</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-serif font-black text-gray-900 tracking-tight leading-none">
          Engineering Fixes &amp; Re-Test.
        </h1>

        <p className="text-base text-gray-700 leading-relaxed font-medium">
          Identifying failures is insufficient. The deployment gate will remain locked until the following clinical and algorithmic mitigations are applied and verified via simulated re-testing.
        </p>
      </div>

      {/* 2. Before vs After Score Card (Asymmetric) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Current State */}
        <div className="bg-white border-2 border-red-800 p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-red-800 uppercase tracking-widest block">
              Pre-Remediation State
            </span>
            <h3 className="text-2xl font-serif font-black text-gray-900">
              Deployment Blocked
            </h3>
            <p className="text-sm text-gray-700">
              3 critical clinical failure modes detected. Hardware sensor shift, demographic disparity, and missing pharmacological guardrails.
            </p>
          </div>

          <div className="bg-red-50 p-4 border border-red-200 inline-flex flex-col gap-1 w-fit">
            <span className="text-[10px] font-bold uppercase tracking-widest text-red-800">
              Current Score
            </span>
            <div className="text-4xl font-black text-red-900">
              58 <span className="text-xl font-bold text-red-800/50">/100</span>
            </div>
          </div>
        </div>

        {/* Post-Fix State */}
        <div className={`bg-white border-2 p-8 flex flex-col justify-between space-y-6 transition-all duration-300 ${
          hasSimulated ? 'border-[var(--color-accent)]' : 'border-gray-200'
        }`}>
          <div className="space-y-2">
            <span className={`text-[10px] font-bold uppercase tracking-widest block ${hasSimulated ? 'text-[var(--color-accent)]' : 'text-gray-500'}`}>
              Post-Remediation State
            </span>
            <h3 className="text-2xl font-serif font-black text-gray-900">
              {hasSimulated ? 'Conditional Clearance' : 'Pending Simulation'}
            </h3>
            <p className="text-sm text-gray-700">
              {hasSimulated
                ? 'Human-in-the-loop pilot approved with strict deterministic safeguards in place.'
                : 'Apply required mitigations below and run the simulation to unlock the gate.'}
            </p>
          </div>

          <div className={`${hasSimulated ? 'bg-[var(--color-accent)] text-white' : 'bg-gray-50 text-gray-400 border border-gray-200'} p-4 inline-flex flex-col gap-1 w-fit transition-colors`}>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
              Projected Score
            </span>
            <div className="text-4xl font-black">
              {hasSimulated ? (
                <>84 <span className="text-xl font-bold opacity-60">/100</span></>
              ) : (
                '-- /100'
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. The Required Fixes */}
      <div className="space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] block mb-1">
            Required Actions
          </span>
          <h2 className="text-2xl font-serif font-black text-gray-900">
            Mandatory Mitigations
          </h2>
        </div>

        <div className="space-y-4">
          {fixes.map((fix) => {
            const isChecked = fix.applied || hasSimulated;

            return (
              <div
                key={fix.id}
                className={`p-6 border transition-all flex items-start gap-4 ${
                  isChecked
                    ? 'bg-gray-50 border-gray-900'
                    : 'bg-white border-gray-200 hover:border-gray-400'
                }`}
              >
                <button
                  onClick={() => toggleFix(fix.id)}
                  className="mt-1 shrink-0 cursor-pointer"
                >
                  {isChecked ? (
                    <CheckCircle2 className="w-6 h-6 text-gray-900" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 hover:border-gray-500 bg-white" />
                  )}
                </button>

                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-base font-bold text-gray-900">
                      {fix.number}. {fix.title}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-1 bg-white border border-gray-200 text-gray-600">
                      Impact: +{fix.scoreImpact} pts
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed max-w-4xl">
                    {fix.description}
                  </p>

                  <div className="text-xs font-bold text-[var(--color-accent)] pt-2 border-t border-gray-100 flex items-center gap-2 mt-2">
                    <Wrench className="w-3 h-3" />
                    <span>Enforced Safeguard: {fix.mechanism}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Post-Remediation Conditional Clearance Card (after simulation) */}
      {hasSimulated && (
        <div className="p-8 bg-white border-4 border-[var(--color-accent)] space-y-6 animate-in fade-in duration-200 shadow-sm">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
            <ShieldCheck className="w-4 h-4" />
            <span>Deployment Status Updated</span>
          </div>

          <h3 className="text-3xl font-serif font-black text-gray-900 leading-tight">
            Clearance granted for monitored clinical pilot.
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-gray-100">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-900 block">Hardware Shift Resolved</span>
              <p className="text-sm text-gray-600">Target device accuracy improved from 74% to 88% via calibration.</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-900 block">Fairness Gap Closed</span>
              <p className="text-sm text-gray-600">Disparity reduced from 18 pts down to 5 pts via demographic loss tuning.</p>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-900 block">Pharmacological Safeguard</span>
              <p className="text-sm text-gray-600">Deterministic gate forces manual review when beta-blockers are detected.</p>
            </div>
          </div>
        </div>
      )}

      {/* 5. Action Buttons & Progress Bar */}
      <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-xs text-gray-500 font-medium">
          <strong className="text-gray-900 font-bold">Note:</strong> This is a deterministic simulation based on clinical parameters.
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          {!hasSimulated ? (
            <button
              id="btn-simulate-fixes"
              onClick={handleSimulateFixes}
              disabled={isSimulating}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-gray-400" />
                  <span>Verifying ({retestProgress}%)...</span>
                </>
              ) : (
                <>
                  <Activity className="w-4 h-4" />
                  <span>Execute Simulation</span>
                </>
              )}
            </button>
          ) : (
            <button
              id="btn-view-audit-report"
              onClick={() => onNavigateTab('audit_report')}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              <span>View Final Audit Report</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
