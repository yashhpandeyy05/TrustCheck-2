import React from 'react';
import { X, AlertTriangle, ShieldAlert, Users, Stethoscope, Wrench, CheckCircle2 } from 'lucide-react';
import { CriticalFailureDetail } from '../types';

interface ExplainFailureModalProps {
  isOpen: boolean;
  onClose: () => void;
  failure: CriticalFailureDetail | null;
  onFixNow?: () => void;
}

export const ExplainFailureModal: React.FC<ExplainFailureModalProps> = ({
  isOpen,
  onClose,
  failure,
  onFixNow,
}) => {
  if (!isOpen || !failure) return null;

  return (
    <div
      id="modal-explain-failure"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans animate-in fade-in duration-150"
    >
      <div className="bg-white border-4 border-red-800 max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-red-50 border-b border-red-200 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase px-2 py-1 bg-white text-red-800 border border-red-200">
                {failure.category} &bull; {failure.severity}
              </span>
              <span className="text-xs font-bold text-red-800">
                {failure.impactMetric}
              </span>
            </div>
            <h3 className="text-2xl font-serif font-black text-gray-900 tracking-tight leading-tight">
              {failure.title}
            </h3>
            <p className="text-xs text-red-900 font-medium">
              Clinical safety diagnosis for hospital ethics &amp; clinical governance review.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with the 5 Core Questions */}
        <div className="p-8 space-y-8 overflow-y-auto text-sm text-gray-900">
          
          {/* Quick Callout Box: Model Output vs Actual */}
          <div className="p-5 bg-gray-50 border border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Model Prediction &amp; Confidence
              </span>
              <div className="text-sm font-bold text-red-700">
                {failure.modelOutput}
              </div>
              <div className="text-xs font-mono text-gray-600">
                Confidence: <strong className="text-red-700">{failure.modelConfidence}</strong>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
                Actual Clinical Condition
              </span>
              <div className="text-sm font-bold text-gray-900">
                {failure.actualCondition}
              </div>
              <div className="text-xs text-gray-600">
                Confirmed by emergency physician review
              </div>
            </div>
          </div>

          {/* 1. WHAT HAPPENED? */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
              <AlertTriangle className="w-4 h-4 text-red-700" />
              <span>1. What Happened?</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed pl-6">
              {failure.whatHappened}
            </p>
          </div>

          {/* 2. WHY DID THE MODEL FAIL? */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
              <ShieldAlert className="w-4 h-4 text-red-700" />
              <span>2. Why Did The Model Fail?</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed pl-6">
              {failure.whyFailed}
            </p>
          </div>

          {/* 3. WHO IS AFFECTED? */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-900">
              <Users className="w-4 h-4 text-gray-900" />
              <span>3. Who Is Affected?</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed pl-6">
              {failure.patientsAtRisk}
            </p>
          </div>

          {/* 4. WHY DOES IT MATTER CLINICALLY? */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-700">
              <Stethoscope className="w-4 h-4 text-red-700" />
              <span>4. Why Does It Matter Clinically?</span>
            </div>
            <div className="p-4 bg-red-50 border border-red-200 text-red-900 text-xs font-medium leading-relaxed ml-6">
              {failure.clinicalRisk}
            </div>
          </div>

          {/* 5. WHAT SHOULD WE DO? */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
              <Wrench className="w-4 h-4 text-[var(--color-accent)]" />
              <span>5. What Should We Do?</span>
            </div>
            <div className="p-4 bg-[var(--color-accent)] text-white text-xs font-medium leading-relaxed ml-6">
              {failure.recommendedFix}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-[10px] uppercase font-bold text-gray-500">
            Verified via TrustCheck simulation
          </span>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-600 hover:text-gray-900 transition-colors cursor-pointer w-full sm:w-auto"
            >
              Close
            </button>

            {onFixNow && (
              <button
                onClick={() => {
                  onClose();
                  onFixNow();
                }}
                className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer w-full sm:w-auto"
              >
                <span>See Recommended Fixes</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
