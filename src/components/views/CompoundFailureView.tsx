import React, { useState } from 'react';
import {
  Layers,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingDown,
  Sparkles,
  Info,
  CheckCircle2,
  AlertOctagon,
} from 'lucide-react';
import { COMPOUND_SCENARIOS } from '../../data/mockModels';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface CompoundFailureViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const CompoundFailureView: React.FC<CompoundFailureViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  const [hasPopShift, setHasPopShift] = useState(true);
  const [hasMissingData, setHasMissingData] = useState(true);
  const [hasDeviceShift, setHasDeviceShift] = useState(true);

  // Dynamic interactive calculation
  const base = 92;
  let dynamicScore = base;
  const activeList: string[] = [];

  if (hasPopShift) {
    dynamicScore -= 12;
    activeList.push('Population Demographic Shift');
  }
  if (hasMissingData) {
    dynamicScore -= 8;
    activeList.push('Missing Information (20% labs)');
  }
  if (hasDeviceShift) {
    dynamicScore -= 18;
    activeList.push('Device B Telemetry Profile');
  }

  // Synergistic compound decay penalty
  if (activeList.length === 2) dynamicScore -= 4;
  if (activeList.length === 3) dynamicScore -= 9;

  dynamicScore = Math.max(48, dynamicScore);
  const dynamicDrop = base - dynamicScore;

  return (
    <div id="view-compound-failure" className="space-y-6 font-sans">
      
      {/* 1. Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#D64545] font-bold uppercase">
              <Layers className="w-4 h-4" />
              NON-LINEAR STRESS ENGINE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              COMPOUND FAILURE LAB
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B]">
              In real hospitals, adverse conditions never arrive in isolation. When missing labs, sensor noise, and demographic shifts strike simultaneously, errors multiply non-linearly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] text-center shrink-0">
            <span className="text-[10px] uppercase text-[#D64545] font-bold block">
              SYNERGISTIC ACCURACY DROP
            </span>
            <span className="text-3xl font-black text-[#D64545]">
              -{dynamicDrop}%
            </span>
            <span className="text-xs text-[#D64545] font-bold block mt-0.5">Non-Linear Multiplier Active</span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Compound Toggle Matrix */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-[#DDE8E2] pb-4">
          <span className="text-xs font-bold text-[#16845B] uppercase">SIMULTANEOUS MULTI-VECTOR STRESS</span>
          <h2 className="text-xl font-extrabold text-[#17221D]">
            Synergistic Stress Injector
          </h2>
          <p className="text-xs text-[#64736B]">
            Toggle individual real-world stresses to witness how compound effects collapse model performance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => setHasMissingData(!hasMissingData)}
            className={`p-5 rounded-xl border cursor-pointer transition-all space-y-2 ${
              hasMissingData
                ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#17221D]">1. Missing Lab Panels</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                hasMissingData ? 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]' : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
              }`}>
                {hasMissingData ? 'ACTIVE' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-[#64736B]">
              Simulate rural clinic delays where troponin and lactate panels are unavailable.
            </p>
          </div>

          <div
            onClick={() => setHasDeviceShift(!hasDeviceShift)}
            className={`p-5 rounded-xl border cursor-pointer transition-all space-y-2 ${
              hasDeviceShift
                ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#17221D]">2. Device B Telemetry</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                hasDeviceShift ? 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]' : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
              }`}>
                {hasDeviceShift ? 'ACTIVE' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-[#64736B]">
              Downsamples sampling frequency to 50 Hz, removing micro-ST elevation dynamics.
            </p>
          </div>

          <div
            onClick={() => setHasPopShift(!hasPopShift)}
            className={`p-5 rounded-xl border cursor-pointer transition-all space-y-2 ${
              hasPopShift
                ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#17221D]">3. Geriatric Cohort Skew</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                hasPopShift ? 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]' : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
              }`}>
                {hasPopShift ? 'ACTIVE' : 'OFF'}
              </span>
            </div>
            <p className="text-xs text-[#64736B]">
              Shifts patient demographics toward elderly patients with blunted inflammatory responses.
            </p>
          </div>
        </div>

        {/* Live Result Outcome */}
        <div className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#64736B] uppercase">COMPOUND OUTCOME</span>
            <div className="text-2xl font-black text-[#D64545]">
              Simulated Clinical Accuracy: {dynamicScore}%
            </div>
            <span className="text-xs text-[#64736B]">
              Active Multi-stress Vectors: <strong>{activeList.length} simultaneous hazards</strong>
            </span>
          </div>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: 'Compound Stress Non-Linear Collapse',
                condition: activeList.join(' + ') || 'Baseline Conditions',
                baselineScore: 92,
                stressScore: dynamicScore,
                dropPercentage: dynamicDrop,
                details: 'When multiple real-world perturbations strike simultaneously, error compounding leads to catastrophic safety failure.',
              })
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#16845B]" />
            <span>EXPLAIN COMPOUND FAILURE</span>
          </button>
        </div>
      </div>

    </div>
  );
};
