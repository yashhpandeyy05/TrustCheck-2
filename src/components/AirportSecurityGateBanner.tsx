import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Building2,
  Activity,
  ArrowRight,
  AlertOctagon,
  Lock,
  Unlock,
  Sparkles,
} from 'lucide-react';
import { ModelProfile } from '../types';

interface AirportSecurityGateBannerProps {
  currentModel: ModelProfile;
  retestedScore?: number;
  hasRunTest?: boolean;
}

export const AirportSecurityGateBanner: React.FC<AirportSecurityGateBannerProps> = ({
  currentModel,
  retestedScore = 58,
  hasRunTest = true,
}) => {
  const isConditional = retestedScore >= 80;

  return (
    <div
      id="airport-security-gate-banner"
      className="w-full bg-[#FFFFFF] border-2 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 font-sans border-[#DDE8E2]"
    >
      {/* Top Banner Tagline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DDE8E2] pb-3">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#16845B] text-white flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#7AE3B5]" />
            SAFETY GATE CHECKPOINT
          </span>
          <span className="text-xs font-bold text-[#17221D]">
            Airport Security for Healthcare AI
          </span>
        </div>

        <p className="text-[11px] text-[#64736B] font-medium">
          &ldquo;The AI model wants to enter the real world. TrustCheck tests it before letting it through.&rdquo;
        </p>
      </div>

      {/* The 3-Node Physical Gate Visualization: [Model] ──> [Gate] ──> [Hospital] */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        
        {/* Node 1: AI Model (Applicant) */}
        <div className="md:col-span-4 p-4 rounded-2xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#64736B] flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-[#16845B]" />
              APPLICANT AI MODEL
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2]">
              92.4% Lab Baseline
            </span>
          </div>

          <div className="text-sm sm:text-base font-black text-[#17221D]">
            {currentModel.name} {currentModel.version}
          </div>

          <p className="text-[11px] text-[#64736B] leading-tight">
            Trained at Hospital A Core Lab &bull; Emergency cardiac triage
          </p>
        </div>

        {/* Transition Arrow 1 */}
        <div className="hidden md:flex md:col-span-1 justify-center text-[#64736B]">
          <ArrowRight className="w-5 h-5 text-[#16845B]" />
        </div>

        {/* Node 2: TrustCheck Safety Gate (Security Scanner) */}
        <div
          className={`md:col-span-3 p-4 rounded-2xl border-2 text-center space-y-1.5 shadow-xs transition-all ${
            isConditional
              ? 'bg-[#FEF9C3]/70 border-[#FDE047] text-[#854D0E]'
              : 'bg-[#FDE8E8] border-[#D64545] text-[#D64545]'
          }`}
        >
          <div className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-wider">
            {isConditional ? (
              <Unlock className="w-3.5 h-3.5 text-[#854D0E]" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-[#D64545]" />
            )}
            <span>GATE STATUS</span>
          </div>

          <div className="text-base sm:text-lg font-black tracking-tight">
            {isConditional ? 'CONDITIONAL PILOT' : 'GATE LOCKED'}
          </div>

          <div className="text-xs font-black">
            {isConditional ? (
              <span className="text-[#854D0E]">
                Safety Score: <strong>84 / 100</strong>
              </span>
            ) : (
              <span className="text-[#D64545]">
                NOT READY FOR DEPLOYMENT (58/100)
              </span>
            )}
          </div>
        </div>

        {/* Transition Arrow 2 */}
        <div className="hidden md:flex md:col-span-1 justify-center text-[#64736B]">
          <ArrowRight className="w-5 h-5 text-[#16845B]" />
        </div>

        {/* Node 3: Target Clinical Deployment (The Real World) */}
        <div className="md:col-span-3 p-4 rounded-2xl bg-[#FAFDFB] border border-[#DDE8E2] space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#64736B] flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-[#16845B]" />
              TARGET DEPLOYMENT
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]">
              Device B (50 Hz)
            </span>
          </div>

          <div className="text-sm sm:text-base font-black text-[#17221D]">
            Rural Community Clinic
          </div>

          <p className="text-[11px] text-[#64736B] leading-tight">
            Real human patients &bull; 3-hr lab delay &bull; Handheld telemetry
          </p>
        </div>

      </div>

    </div>
  );
};
