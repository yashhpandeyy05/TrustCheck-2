import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Info,
  Layers,
  FileCheck2,
} from 'lucide-react';
import { TRUST_BOUNDARIES } from '../../data/mockModels';
import { TrustBoundaryCriterion } from '../../types';

interface TrustBoundaryViewProps {
  onNavigateTab: (tabId: any) => void;
}

export const TrustBoundaryView: React.FC<TrustBoundaryViewProps> = ({ onNavigateTab }) => {
  const [selectedBoundary, setSelectedBoundary] = useState<TrustBoundaryCriterion>(TRUST_BOUNDARIES[0]);

  return (
    <div id="view-trust-boundary" className="space-y-6 font-sans">
      
      {/* Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#16845B] font-bold uppercase">
              <Compass className="w-4 h-4" />
              OPERATIONAL SAFETY ENVELOPE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              TRUST BOUNDARY MATRIX
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B]">
              Responsible healthcare engineering never claims <em className="text-[#17221D]">&ldquo;This AI is safe.&rdquo;</em> Instead, TrustCheck establishes the exact bounds of safe operation: defining where the model is safe, where caution is warranted, and where it must be blocked.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('deployment_gate')}
            className="px-5 py-3 rounded-xl bg-[#D64545] hover:bg-[#b03030] text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            Check Deployment Gate &rarr;
          </button>
        </div>

        {/* 3 Zone Definitions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-6 pt-6 border-t border-[#DDE8E2]">
          <div className="p-4 rounded-xl bg-[#E8F5EF] border border-[#DDE8E2] space-y-1.5">
            <div className="flex items-center gap-2 text-[#0F5132] font-bold text-xs">
              <CheckCircle2 className="w-4 h-4 text-[#16845B]" />
              <span>GREEN ZONE (SAFE ENVELOPE)</span>
            </div>
            <p className="text-xs text-[#64736B]">
              Model behaves within acceptable statistical tolerances under tested conditions. Standard clinical monitoring applies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] space-y-1.5">
            <div className="flex items-center gap-2 text-[#D98C00] font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-[#D98C00]" />
              <span>YELLOW ZONE (SUPERVISED CAUTION)</span>
            </div>
            <p className="text-xs text-[#64736B]">
              Mild degradation observed. Decision-support permitted ONLY with compulsory attending physician sign-off.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] space-y-1.5">
            <div className="flex items-center gap-2 text-[#D64545] font-bold text-xs">
              <XCircle className="w-4 h-4 text-[#D64545]" />
              <span>RED ZONE (PROHIBITED DEPLOYMENT)</span>
            </div>
            <p className="text-xs text-[#64736B]">
              Severe performance collapse, biased errors, or hallucinated confidence. Model execution blocked.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Boundary Table */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="border-b border-[#DDE8E2] pb-3">
          <h2 className="text-lg font-extrabold text-[#17221D]">
            Domain Safety Envelope Criteria
          </h2>
          <p className="text-xs text-[#64736B]">
            Empirical criteria dictating operational zoning across clinical deployment vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TRUST_BOUNDARIES.map((tb) => {
            const isSelected = selectedBoundary.id === tb.id;

            return (
              <div
                key={tb.id}
                onClick={() => setSelectedBoundary(tb)}
                className={`p-5 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                  isSelected
                    ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                    : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[#17221D]">{tb.parameter}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    tb.currentZone === 'GREEN'
                      ? 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]'
                      : tb.currentZone === 'YELLOW'
                      ? 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]'
                      : 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]'
                  }`}>
                    {tb.currentZone} ZONE
                  </span>
                </div>

                <p className="text-xs text-[#64736B] leading-relaxed">
                  <strong>Current Model Finding:</strong> {tb.currentObserved}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#DDE8E2]">
                    <span className="text-[#0F5132] font-bold block">Green:</span>
                    <span className="text-[#64736B]">{tb.safeGreenBoundary}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#DDE8E2]">
                    <span className="text-[#D98C00] font-bold block">Yellow:</span>
                    <span className="text-[#64736B]">{tb.warningYellowBoundary}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#FFFFFF] border border-[#DDE8E2]">
                    <span className="text-[#D64545] font-bold block">Red:</span>
                    <span className="text-[#64736B]">{tb.unsafeRedBoundary}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
