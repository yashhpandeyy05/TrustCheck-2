import React from 'react';
import {
  Building2,
  Stethoscope,
  AlertTriangle,
  Flame,
  ArrowRight,
  Activity,
  Clock,
  Wifi,
  Users,
  Cpu,
  Layers,
  Sparkles,
} from 'lucide-react';
import { ModelProfile } from '../../types';
import { ExplanationContext } from '../AIExplanationModal';

interface DeploymentSetupViewProps {
  currentModel: ModelProfile;
  onNavigateTab: (tabId: any) => void;
  onExplainFinding: (ctx: ExplanationContext) => void;
}

export const DeploymentSetupView: React.FC<DeploymentSetupViewProps> = ({
  currentModel,
  onNavigateTab,
  onExplainFinding,
}) => {
  return (
    <div id="view-deployment-setup" className="space-y-8 font-sans">
      
      {/* 1. Header & Context */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EF] text-[#0F5132] text-xs font-bold border border-[#DDE8E2]">
              <Building2 className="w-3.5 h-3.5 text-[#16845B]" />
              OPERATIONAL CONTEXT SPECIFICATION
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              Where will this AI actually be used?
            </h1>
            <p className="text-sm text-[#64736B] leading-relaxed">
              Medical models are rarely dangerous because of poor math. They become dangerous when deployed into operating environments that differ from the hospital where they were trained and validated.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('break_my_ai')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white font-bold text-xs shadow-xs transition-all shrink-0"
          >
            <Flame className="w-4 h-4" />
            <span>RUN CRASH TEST &rarr;</span>
          </button>
        </div>
      </div>

      {/* 2. Side-by-Side Comparison: DEVELOPMENT vs TARGET */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Panel 1: DEVELOPMENT ENVIRONMENT */}
        <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#DDE8E2] pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#64736B]">
                TRAINING &amp; VALIDATION BASELINE
              </span>
              <h2 className="text-lg font-extrabold text-[#17221D]">
                Hospital A &mdash; Academic Core Lab
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2]">
              BASELINE
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2]">
              <Users className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#17221D] block">Urban Patient Demographics</strong>
                <span className="text-[#64736B]">Median age: 52.4 years &bull; Well-balanced ethnic and socioeconomic cohorts.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2]">
              <Cpu className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#17221D] block">Calibrated 12-Lead Diagnostic ECG</strong>
                <span className="text-[#64736B]">Clinical gold standard cart &bull; 100 Hz calibrated telemetry bandpass.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2]">
              <Activity className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#17221D] block">Complete Laboratory Panels</strong>
                <span className="text-[#64736B]">Troponin, lactate, potassium, and ABG panels present in 99.4% of admissions.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2]">
              <Clock className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#17221D] block">Rapid Turnaround &amp; Infrastructure</strong>
                <span className="text-[#64736B]">15-minute stat lab turnaround &bull; High-speed hospital fiber network.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DDE8E2] text-xs text-[#64736B]">
            Validated Performance: <strong className="text-[#0F5132] font-bold">92% Empirical Accuracy</strong>
          </div>
        </div>

        {/* Panel 2: TARGET DEPLOYMENT */}
        <div className="bg-[#FFFFFF] border-2 border-[#F8B4B4] rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs relative">
          <div className="flex items-center justify-between border-b border-[#DDE8E2] pb-4">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D64545]">
                INTENDED POINT-OF-CARE ENVIRONMENT
              </span>
              <h2 className="text-lg font-extrabold text-[#17221D]">
                Rural Community Clinic
              </h2>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]">
              TARGET
            </span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDE8E8]/50 border border-[#F8B4B4]">
              <Users className="w-4 h-4 text-[#D64545] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#17221D] block">Geriatric-Heavy Cohort Shift</strong>
                <span className="text-[#64736B]">Median age: 68.2 years (+15.8 yr shift) &bull; High comorbidity and chronic beta-blockade.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDE8E8]/50 border border-[#F8B4B4]">
              <Cpu className="w-4 h-4 text-[#D64545] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#17221D] block">Device B Handheld Telemetry</strong>
                <span className="text-[#64736B]">50 Hz downsampled telemetry &bull; Strips cardiac micro-variability features.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDE8E8]/50 border border-[#F8B4B4]">
              <Activity className="w-4 h-4 text-[#D64545] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#17221D] block">Missing Laboratory Values (25% Delays)</strong>
                <span className="text-[#64736B]">Missing lab values in 25% of patient encounters prior to triage decision.</span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-[#FDE8E8]/50 border border-[#F8B4B4]">
              <Clock className="w-4 h-4 text-[#D64545] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#17221D] block">Delayed Turnaround &amp; Cellular Latency</strong>
                <span className="text-[#64736B]">3-hour external reference laboratory delay &bull; Intermittent clinic bandwidth.</span>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#DDE8E2] text-xs text-[#64736B]">
            Expected Rural Performance: <strong className="text-[#D64545] font-bold">74% Accuracy (-18% Drop)</strong>
          </div>
        </div>

      </div>

      {/* 3. ENVIRONMENT MISMATCH & HIGH SHIFT RISK CALLOUT */}
      <div className="bg-[#FFFFFF] border-2 border-[#D64545] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#D64545] uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-[#D64545]" />
              CRITICAL PRE-DEPLOYMENT FINDING
            </div>
            <h3 className="text-2xl font-black text-[#17221D] tracking-tight">
              ENVIRONMENT MISMATCH DETECTED
            </h3>
            <p className="text-sm text-[#17221D] font-semibold">
              &ldquo;The model was validated in conditions that do not exist at the target point of care.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#64736B] leading-relaxed">
              Statistical testing shows significant covariate shift across patient age, telemetry frequency, and lab availability. Deploying without stress testing risks catastrophic false negatives in vulnerable geriatric patients.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] text-center shrink-0 min-w-[220px]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#D64545] block">
              DATASET COMPATIBILITY
            </span>
            <span className="text-5xl font-black text-[#D64545] block my-1">
              44%
            </span>
            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-bold bg-[#D64545] text-white">
              HIGH SHIFT RISK
            </span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-6 border-t border-[#DDE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: 'Operational Environment Mismatch',
                condition: 'Hospital A Academic Lab vs. Rural Community Clinic',
                baselineScore: 92,
                stressScore: 74,
                dropPercentage: 18,
                details:
                  'The model relies on high-frequency 100 Hz telemetry signals and immediate laboratory panels. At the rural clinic, 50 Hz downsampling and 25% missing labs cause severe false reassurance.',
              })
            }
            className="flex items-center gap-2 text-xs font-bold text-[#0F5132] hover:text-[#16845B]"
          >
            <Sparkles className="w-4 h-4 text-[#16845B]" />
            <span>Explain clinical shift risk in plain language &rarr;</span>
          </button>

          <button
            onClick={() => onNavigateTab('break_my_ai')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D64545] hover:bg-[#b03030] text-white font-extrabold text-xs shadow-xs transition-colors"
          >
            <Flame className="w-4 h-4" />
            <span>STEP 3: RUN TRUST CRASH TEST &rarr;</span>
          </button>
        </div>
      </div>

    </div>
  );
};
