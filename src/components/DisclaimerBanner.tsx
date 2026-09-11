import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div
      id="disclaimer-banner"
      className="bg-[#E8F5EF] border-b border-[#DDE8E2] px-4 py-2 text-xs text-[#17221D] flex flex-wrap items-center justify-between gap-3 font-sans"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#16845B] shrink-0" />
        <span className="text-[#17221D]">
          <strong className="font-semibold text-[#0F5132]">Healthcare AI Safety Pre-Deployment Prototype:</strong> TrustCheck stress-tests algorithms to detect failure boundaries, bias, and dataset shift. It supports clinical decision committees and does <span className="underline decoration-[#16845B] font-medium">NOT</span> replace medical judgment or provide clinical diagnoses.
        </span>
      </div>
      <div className="flex items-center gap-2 text-[#64736B] shrink-0 text-[11px] font-medium">
        <Info className="w-3.5 h-3.5 text-[#16845B]" />
        <span>Pre-Deployment Verification Lab</span>
      </div>
    </div>
  );
};
