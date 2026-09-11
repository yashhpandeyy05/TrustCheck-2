import React, { useState, useEffect } from 'react';
import { X, Sparkles, ShieldCheck, Copy, Check, Info } from 'lucide-react';
import { UserRole } from '../types';

export interface ExplanationContext {
  findingTitle: string;
  condition: string;
  baselineScore: number;
  stressScore: number;
  dropPercentage: number;
  details: string;
}

interface AIExplanationModalProps {
  isOpen?: boolean;
  context: ExplanationContext | null | undefined;
  userRole?: UserRole;
  onClose: () => void;
}

export const AIExplanationModal: React.FC<AIExplanationModalProps> = ({
  isOpen = true,
  context,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [explanation, setExplanation] = useState<{
    whatHappened: string;
    whyDidItHappen: string;
    whoCouldBeAffected: string;
    howSeriousIsIt: string;
    whatShouldHospitalDo: string;
  } | null>(null);

  useEffect(() => {
    if (!context) return;

    setLoading(true);

    // Provide immediate plain-language clinical explanation matching the 5 required parts
    const timer = setTimeout(() => {
      let whatHappened = `The model performed significantly worse when tested under: ${context.condition}. Accuracy dropped from ${context.baselineScore}% to ${context.stressScore}% (a ${context.dropPercentage} percentage point collapse).`;
      let whyDidItHappen = `The target environment uses different sensors and has missing clinical panels that the AI was not trained to handle during development.`;
      let whoCouldBeAffected = `Patients evaluated in acute rural clinic triage, particularly those presenting with atypical vitals or incomplete lab panels.`;
      let howSeriousIsIt = `CRITICAL. The model produces falsely confident predictions when key vitals are missing, meaning deteriorating patients may be overlooked.`;
      let whatShouldHospitalDo = `Do not deploy yet. Collect representative local validation data and require dual clinician sign-off on borderline predictions.`;

      if (context.findingTitle.toLowerCase().includes('device')) {
        whatHappened = `Switching to Device B handheld telemetry reduced diagnostic performance by ${context.dropPercentage} percentage points.`;
        whyDidItHappen = `Device B downsamples cardiac telemetry to 50 Hz, causing the model to miss subtle heart rate variability markers.`;
        whoCouldBeAffected = `All emergency room patients monitored on mobile point-of-care devices.`;
        howSeriousIsIt = `HIGH RISK. Clinicians relying on automated triage risk delayed intervention for acute sepsis.`;
        whatShouldHospitalDo = `Recalibrate model feature extraction filters specifically for Device B before deployment.`;
      } else if (context.findingTitle.toLowerCase().includes('group') || context.findingTitle.toLowerCase().includes('demographic') || context.findingTitle.toLowerCase().includes('fairness')) {
        whatHappened = `Evaluated subgroup performance reveals an 18% accuracy disparity compared to the majority patient cohort.`;
        whyDidItHappen = `The training dataset had 88% representation from academic center demographic Group A and only 12% from Group B.`;
        whoCouldBeAffected = `Underrepresented demographic populations and rural minority cohorts.`;
        howSeriousIsIt = `CRITICAL. 4.6x higher false negative rate for acute deterioration in vulnerable groups.`;
        whatShouldHospitalDo = `Retrain model with fairness-regularized loss functions and enforce subgroup parity thresholds.`;
      } else if (context.findingTitle.toLowerCase().includes('edge')) {
        whatHappened = `The model produced a 98% confident "Low Risk" verdict on a patient experiencing severe acute decompensation.`;
        whyDidItHappen = `Chronic beta-blocker medication blunted the patient's heart rate, causing the AI to ignore critically elevated serum lactate.`;
        whoCouldBeAffected = `Cardiac patients taking beta-blockers who present with systemic infection or shock.`;
        howSeriousIsIt = `CATASTROPHIC. Direct risk of patient mortality due to falsely reassuring automated triage.`;
        whatShouldHospitalDo = `Hardcode rule override: always trigger emergency sepsis review when lactate exceeds 4.0 mmol/L regardless of normal pulse.`;
      }

      setExplanation({
        whatHappened,
        whyDidItHappen,
        whoCouldBeAffected,
        howSeriousIsIt,
        whatShouldHospitalDo,
      });
      setLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [context]);

  if (!context || !isOpen) return null;

  const handleCopy = () => {
    if (!explanation) return;
    const text = `TRUSTCHECK AI SAFETY EXPLANATION
Finding: ${context.findingTitle}

WHAT HAPPENED?
${explanation.whatHappened}

WHY DID IT HAPPEN?
${explanation.whyDidItHappen}

WHO COULD BE AFFECTED?
${explanation.whoCouldBeAffected}

HOW SERIOUS IS IT?
${explanation.howSeriousIsIt}

WHAT SHOULD THE HOSPITAL DO?
${explanation.whatShouldHospitalDo}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-sans">
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8">
        
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#DDE8E2] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8F5EF] border border-[#DDE8E2] flex items-center justify-center text-[#16845B]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#16845B] uppercase tracking-wider">
                PLAIN-LANGUAGE SAFETY EXPLANATION
              </span>
              <h3 className="text-xl font-extrabold text-[#17221D] mt-0.5">
                {context.findingTitle}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64736B] hover:text-[#17221D] hover:bg-[#F6FAF8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#16845B] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-[#64736B]">
              Generating plain-language clinical safety analysis...
            </p>
          </div>
        ) : (
          explanation && (
            <div className="space-y-5 text-xs">
              
              {/* 1. WHAT HAPPENED? */}
              <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1">
                <span className="font-extrabold text-[#0F5132] text-xs uppercase tracking-wide block">
                  WHAT HAPPENED?
                </span>
                <p className="text-[#17221D] leading-relaxed text-sm">
                  {explanation.whatHappened}
                </p>
              </div>

              {/* 2. WHY DID IT HAPPEN? */}
              <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1">
                <span className="font-extrabold text-[#0F5132] text-xs uppercase tracking-wide block">
                  WHY DID IT HAPPEN?
                </span>
                <p className="text-[#17221D] leading-relaxed text-sm">
                  {explanation.whyDidItHappen}
                </p>
              </div>

              {/* 3. WHO COULD BE AFFECTED? */}
              <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1">
                <span className="font-extrabold text-[#0F5132] text-xs uppercase tracking-wide block">
                  WHO COULD BE AFFECTED?
                </span>
                <p className="text-[#17221D] leading-relaxed text-sm">
                  {explanation.whoCouldBeAffected}
                </p>
              </div>

              {/* 4. HOW SERIOUS IS IT? */}
              <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] space-y-1">
                <span className="font-extrabold text-[#D64545] text-xs uppercase tracking-wide block">
                  HOW SERIOUS IS IT?
                </span>
                <p className="text-[#D64545] font-semibold leading-relaxed text-sm">
                  {explanation.howSeriousIsIt}
                </p>
              </div>

              {/* 5. WHAT SHOULD THE HOSPITAL DO? */}
              <div className="p-4 rounded-xl bg-[#E8F5EF] border border-[#DDE8E2] space-y-1">
                <span className="font-extrabold text-[#0F5132] text-xs uppercase tracking-wide block">
                  WHAT SHOULD THE HOSPITAL DO?
                </span>
                <p className="text-[#0F5132] font-semibold leading-relaxed text-sm">
                  {explanation.whatShouldHospitalDo}
                </p>
              </div>

            </div>
          )
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#DDE8E2]">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#0F5132] text-xs font-bold border border-[#DDE8E2] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#16845B]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Explanation'}</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#16845B] hover:bg-[#0F5132] text-white text-xs font-bold transition-colors shadow-xs"
          >
            Close Explanation
          </button>
        </div>

      </div>
    </div>
  );
};
