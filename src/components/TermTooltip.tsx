import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

interface TermTooltipProps {
  term: string;
  explanation: string;
}

export const TermTooltip: React.FC<TermTooltipProps> = ({ term, explanation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <span className="relative inline-flex items-center ml-1 align-middle">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#16845B] hover:text-[#0F5132] bg-[#E8F5EF] hover:bg-[#DDE8E2] px-1.5 py-0.5 rounded cursor-pointer transition-colors"
        title="Click or hover to understand this healthcare AI term"
      >
        <HelpCircle className="w-3 h-3" />
        <span>? WHAT IS THIS?</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 w-72 p-3 bg-[#FFFFFF] border border-[#DDE8E2] rounded-xl shadow-lg z-50 text-xs text-[#17221D] font-normal leading-relaxed pointer-events-none">
          <div className="font-bold text-[#0F5132] mb-1">{term}</div>
          <p className="text-[#64736B]">{explanation}</p>
        </div>
      )}
    </span>
  );
};
