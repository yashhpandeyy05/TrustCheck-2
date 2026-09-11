import React from 'react';
import {
  CheckSquare,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  FileCheck2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  FileText,
} from 'lucide-react';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface DeploymentGateViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const DeploymentGateView: React.FC<DeploymentGateViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  const pillars = [
    {
      id: 'robustness',
      name: '1. Robustness',
      status: 'WARNING',
      statusColor: 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]',
      score: '64% Resilience',
      summary: 'Passes mild noise tests, but experiences 18 percentage point drop under Device B telemetry.',
      tab: 'robustness',
    },
    {
      id: 'fairness',
      name: '2. Fairness',
      status: 'WARNING',
      statusColor: 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]',
      score: '18 Pt Gap',
      summary: 'Group B accuracy is 77% vs 95% majority, creating a 4.6x higher false negative hazard.',
      tab: 'fairness',
    },
    {
      id: 'compatibility',
      name: '3. Dataset Compatibility',
      status: 'FAIL',
      statusColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      score: '44% Similarity',
      summary: 'Severe environmental mismatch between Academic Hospital A and Rural Clinic point-of-care.',
      tab: 'dataset_shift',
    },
    {
      id: 'uncertainty',
      name: '4. Uncertainty',
      status: 'WARNING',
      statusColor: 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]',
      score: '0.18 ECE Error',
      summary: 'Overconfident in 90-100% confidence bucket (empirical accuracy is only 72%).',
      tab: 'uncertainty',
    },
    {
      id: 'edge_cases',
      name: '5. Edge Case Safety',
      status: 'FAIL',
      statusColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      score: 'Fatal Error #07',
      summary: '98% confidence on fatal contradictory vitals (septic shock masked by beta-blockers).',
      tab: 'edge_cases',
    },
  ];

  return (
    <div id="view-safety-gate" className="space-y-6 font-sans">
      
      {/* 1. Header */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#0F5132] font-bold uppercase">
              <CheckSquare className="w-4 h-4 text-[#16845B]" />
              INSTITUTIONAL DEPLOYMENT CLEARANCE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              TRUSTCHECK SAFETY GATE
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B]">
              Multi-pillar governance framework. An AI model cannot be certified for hospital deployment unless all 5 safety pillars satisfy institutional clearance thresholds.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onNavigateTab('audit_report')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D64545] hover:bg-[#b03030] text-white text-xs font-bold transition-all shadow-xs"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Generate Audit Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Five Pillars Status Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#64736B]">
          THE FIVE CLINICAL SAFETY PILLARS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              onClick={() => onNavigateTab(pillar.tab)}
              className="p-5 rounded-xl bg-[#FFFFFF] border border-[#DDE8E2] hover:border-[#16845B] cursor-pointer transition-all space-y-3 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${pillar.statusColor}`}>
                    {pillar.status}
                  </span>
                  <span className="text-xs font-bold text-[#17221D]">{pillar.score}</span>
                </div>
                <h4 className="text-sm font-bold text-[#17221D]">{pillar.name}</h4>
                <p className="text-xs text-[#64736B] leading-relaxed">
                  {pillar.summary}
                </p>
              </div>

              <div className="pt-2 border-t border-[#DDE8E2] flex items-center justify-between text-xs font-bold text-[#16845B]">
                <span>Inspect Pillar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Deployment Decision Hero */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FDE8E8] border-2 border-[#F8B4B4] space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-6 h-6 text-[#D64545]" />
              <h2 className="text-2xl font-black text-[#D64545] tracking-tight">
                DEPLOYMENT DECISION: 🔴 NOT READY
              </h2>
            </div>
            <p className="text-sm font-semibold text-[#17221D]">
              &ldquo;TrustCheck recommends additional validation before deployment.&rdquo;
            </p>
            <p className="text-xs text-[#64736B]">
              2 critical safety pillars failed clearance criteria. Model introduces unacceptable patient liability in the Rural Clinic.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('safety_passport')}
            className="px-5 py-2.5 rounded-xl bg-[#FFFFFF] hover:bg-[#F6FAF8] text-[#D64545] font-bold text-xs border border-[#F8B4B4] transition-colors shrink-0"
          >
            View Safety Passport
          </button>
        </div>

        {/* Breakdown: Failed Pillars & Required Remediation Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#F8B4B4] text-xs">
          <div className="space-y-2">
            <span className="font-bold text-[#D64545] uppercase block">
              SUMMARY OF FAILED PILLARS:
            </span>
            <ul className="space-y-1.5 text-[#17221D]">
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-[#D64545] shrink-0 mt-0.5" />
                <span><strong>Dataset Compatibility (44%):</strong> Hospital A training distribution diverges fundamentally from Rural Clinic hardware and laboratory availability.</span>
              </li>
              <li className="flex items-start gap-2">
                <XCircle className="w-4 h-4 text-[#D64545] shrink-0 mt-0.5" />
                <span><strong>Edge Case Safety (49%):</strong> 98% confident false reassurance on patients taking beta-blockers who present with severe sepsis.</span>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <span className="font-bold text-[#0F5132] uppercase block">
              REQUIRED ACTIONS BEFORE RE-EVALUATION:
            </span>
            <ul className="space-y-1.5 text-[#17221D]">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
                <span>Collect 2,000 prospective validation cases using Device B handheld hardware from the target clinic.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
                <span>Implement rule overrides that trigger emergency sepsis alerts when serum lactate is elevated, ignoring normal heart rates.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
                <span>Fine-tune model weights with demographic parity loss to eliminate the 18% accuracy gap in Group B.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
