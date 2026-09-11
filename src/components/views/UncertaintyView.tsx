import React, { useState } from 'react';
import {
  Gauge,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  Info,
  Sliders,
  Play,
  RotateCcw,
  Zap,
  AlertOctagon,
  ArrowRight,
  Network,
  XCircle,
} from 'lucide-react';
import { CALIBRATION_DATA } from '../../data/mockModels';
import { ExplanationContext } from '../AIExplanationModal';

interface UncertaintyViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const UncertaintyView: React.FC<UncertaintyViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  const [temperature, setTemperature] = useState<number>(1.0);
  const [rejectionThreshold, setRejectionThreshold] = useState<number>(85);

  const distFromOptimal = Math.abs(temperature - 1.8);
  const dynamicECE = Number((0.025 + (distFromOptimal * 0.19)).toFixed(3));

  // 0.9-1.0 top confidence bin calculation
  const reportedTopBin = 96;
  const actualCorrectnessTopBin = Math.min(95, Math.round(72 + (temperature > 1.0 ? (temperature - 1.0) * 12 : 0)));
  const overconfidenceGap = Math.max(0, reportedTopBin - actualCorrectnessTopBin);

  const conditionsNotToTrust = [
    {
      condition: 'Missing Laboratory Data',
      detail: 'When troponin, lactate, or ABG panels are pending or unmeasured, the model substitutes placeholder zeroes and reports false reassurance.',
      impact: 'Overconfident false negatives on evolving myocardial injury or sepsis.',
    },
    {
      condition: 'Low-Quality Telemetry & Noise',
      detail: 'Patient movement, shivering, or lead impedance noise causes spurious ventricular arrhythmia alarms with high softmax spikes.',
      impact: 'Alarm fatigue leading clinicians to mute critical bedside monitors.',
    },
    {
      condition: 'Device Shift (50 Hz Handheld Telemetry)',
      detail: 'Hardware downsampling flattens microvolt ST segment dynamics; the model expresses high confidence despite missing vital wavelets.',
      impact: '18% drop in empirical accuracy hidden behind 87% average confidence.',
    },
    {
      condition: 'Rare Clinical Presentations & Contradictory Vitals',
      detail: 'In beta-blocker septic shock (Edge Case #07), normal heart rate masks profound hypotension; model assigns 98% confidence to "LOW RISK".',
      impact: 'Lethal false reassurance on actively decompensating patients.',
    },
  ];

  return (
    <div id="view-uncertainty-lab" className="space-y-8 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FEF3C7] text-[#D98C00] text-xs font-bold border border-[#FDE68A]">
              <Gauge className="w-3.5 h-3.5 text-[#D98C00]" />
              EPISTEMIC UNCERTAINTY &amp; CALIBRATION AUDIT
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-[#17221D] tracking-tight">
              WHEN SHOULD WE NOT TRUST THE MODEL?
            </h1>
            
            <p className="text-base font-extrabold text-[#D64545]">
              &ldquo;High confidence does not mean high reliability.&rdquo;
            </p>
            
            <p className="text-xs sm:text-sm text-[#64736B] leading-relaxed">
              Standard healthcare AI models are notoriously overconfident on out-of-distribution inputs. When clinical inputs are noisy, incomplete, or contradictory, CardioScan Net v1.4 often outputs 95%+ confidence while being empirically incorrect.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FDE8E8] border border-[#F8B4B4] text-center shrink-0 min-w-[220px]">
            <span className="text-[10px] uppercase font-bold text-[#D64545] block">
              TOP-BIN OVERCONFIDENCE GAP
            </span>
            <span className="text-4xl font-black text-[#D64545] block my-1">
              +{overconfidenceGap} Pts
            </span>
            <span className="text-xs font-bold text-[#17221D] block">
              96% Reported vs {actualCorrectnessTopBin}% Actual
            </span>
          </div>
        </div>
      </div>

      {/* 2. MODEL CONFIDENCE vs ACTUAL CORRECTNESS (The 24-Point Gap) */}
      <div className="bg-[#FFFFFF] border-2 border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDE8E2] pb-4">
          <div>
            <span className="text-xs font-bold text-[#16845B] uppercase">EMPIRICAL CALIBRATION BENCHMARK</span>
            <h2 className="text-xl font-black text-[#17221D]">
              Model Confidence vs. Actual Correctness
            </h2>
            <p className="text-xs text-[#64736B]">
              Examining empirical accuracy across predicted probability brackets.
            </p>
          </div>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: '24-Point Overconfidence in Top Confidence Decile',
                condition: 'Missing Lab Panels & Handheld Telemetry Downsampling',
                baselineScore: 96,
                stressScore: 72,
                dropPercentage: 24,
                details:
                  'High confidence does not mean high reliability. For cases predicted with 0.9–1.0 confidence, empirical correctness was only 72%. Clinicians trust high numbers and fail to notice evolving decompensation.',
              })
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#16845B]" />
            <span>EXPLAIN THIS OVERCONFIDENCE</span>
          </button>
        </div>

        {/* Highlighted Top Decile Card */}
        <div className="p-6 rounded-2xl bg-[#FDE8E8]/60 border-2 border-[#F8B4B4] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-0.5">
              <span className="text-xs font-extrabold uppercase text-[#D64545]">
                CRITICAL HAZARD BRACKET &bull; 0.90 &ndash; 1.00 PREDICTED CONFIDENCE
              </span>
              <h3 className="text-lg font-black text-[#17221D]">
                OVERCONFIDENT BY {overconfidenceGap} PERCENTAGE POINTS
              </h3>
            </div>

            <span className="px-3 py-1 rounded-lg bg-[#D64545] text-white font-bold text-xs">
              HIGH RISK OF FALSE REASSURANCE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white border border-[#DDE8E2] space-y-1">
              <span className="text-[#64736B] block">What the AI reports to the doctor:</span>
              <div className="text-2xl font-black text-[#17221D]">
                96% Confidence (&ldquo;Certain&rdquo;)
              </div>
              <p className="text-[#64736B]">The doctor believes the diagnosis is definitive.</p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#F8B4B4] space-y-1">
              <span className="text-[#D64545] block font-bold">Empirical Reality in Patient Outcomes:</span>
              <div className="text-2xl font-black text-[#D64545]">
                {actualCorrectnessTopBin}% Correctness
              </div>
              <p className="text-[#D64545] font-semibold">1 in every 4 &ldquo;certain&rdquo; cases is dead wrong.</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WHEN SHOULD WE NOT TRUST THE MODEL? (Connecting to Failure Map) */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDE8E2] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D64545] uppercase">
              <XCircle className="w-4 h-4 text-[#D64545]" />
              EXPLICIT CLINICAL CONTRAINDICATIONS
            </div>
            <h2 className="text-xl font-black text-[#17221D]">
              WHEN SHOULD WE NOT TRUST THE MODEL?
            </h2>
            <p className="text-xs text-[#64736B]">
              Hospital safety rules should prohibit autonomous reliance under these four identified triggers:
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('failure_map')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2] font-bold text-xs transition-colors shrink-0"
          >
            <Network className="w-4 h-4 text-[#16845B]" />
            <span>SEE ON FAILURE MAP</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {conditionsNotToTrust.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2 hover:border-[#D64545] transition-colors"
            >
              <div className="flex items-center gap-2 font-extrabold text-[#17221D] text-sm">
                <span className="w-2 h-2 rounded-full bg-[#D64545]" />
                <span>{item.condition}</span>
              </div>
              <p className="text-[#64736B] leading-relaxed">
                {item.detail}
              </p>
              <div className="pt-2 border-t border-[#DDE8E2] text-[#D64545] font-semibold">
                <strong>Safety hazard:</strong> {item.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Interactive Safety Controls: Temperature Scaling & Physician Deferral */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        
        {/* Temperature Scaling */}
        <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#DDE8E2] pb-3">
            <h3 className="font-extrabold text-[#17221D] uppercase text-xs">
              1. Temperature Scaling Softener
            </h3>
            <span className="text-[#16845B] font-bold">T = {temperature.toFixed(2)}</span>
          </div>

          <p className="text-[#64736B]">
            Softens overconfident probability spikes so clinicians are alerted to genuine uncertainty.
          </p>

          <input
            type="range"
            min={0.5}
            max={2.5}
            step={0.05}
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
            className="w-full accent-[#16845B] cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-[#64736B]">
            <span>Raw Model (T=1.0)</span>
            <span>Recommended (T=1.80)</span>
            <span>Dampened (T=2.5)</span>
          </div>
        </div>

        {/* Human Clinician Deferral */}
        <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#DDE8E2] pb-3">
            <h3 className="font-extrabold text-[#17221D] uppercase text-xs">
              2. Physician Deferral Safety Floor
            </h3>
            <span className="text-[#0F5132] font-bold">{rejectionThreshold}% Floor</span>
          </div>

          <p className="text-[#64736B]">
            Automatically suppresses autonomous decisions below this confidence bar, routing cases to human doctors.
          </p>

          <input
            type="range"
            min={50}
            max={95}
            step={1}
            value={rejectionThreshold}
            onChange={(e) => setRejectionThreshold(parseInt(e.target.value))}
            className="w-full accent-[#16845B] cursor-pointer"
          />

          <div className="p-3 bg-[#E8F5EF] rounded-lg border border-[#DDE8E2] text-[#0F5132] font-semibold">
            Protected Triage: Deferring lowest 22% of uncertain cases boosts overall clinic accuracy from 74% to 89%.
          </div>
        </div>

      </div>

    </div>
  );
};
