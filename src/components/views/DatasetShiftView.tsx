import React, { useState } from 'react';
import {
  GitCompare,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Info,
  Sliders,
  Play,
  RotateCcw,
  Zap,
  Building2,
  AlertOctagon,
} from 'lucide-react';
import { DATASET_SHIFTS } from '../../data/mockModels';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface DatasetShiftViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const DatasetShiftView: React.FC<DatasetShiftViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  const [selectedFeatureIdx, setSelectedFeatureIdx] = useState<number>(0);
  const [shiftSeverity, setShiftSeverity] = useState<number>(65); // 0 to 100
  const [isComputingDrift, setIsComputingDrift] = useState<boolean>(false);
  const [driftResult, setDriftResult] = useState<{
    ksStatistic: number;
    pValue: number;
    wassersteinDist: number;
    isSignificant: boolean;
  } | null>({
    ksStatistic: 0.384,
    pValue: 0.00004,
    wassersteinDist: 16.2,
    isSignificant: true,
  });

  const selectedFeature = DATASET_SHIFTS[selectedFeatureIdx] || DATASET_SHIFTS[0];
  const dynamicSimilarity = Math.max(25, Math.round(100 - (shiftSeverity * 0.72)));
  const dynamicRisk = dynamicSimilarity < 60 ? 'HIGH' : dynamicSimilarity < 80 ? 'MODERATE' : 'LOW';

  const handleRunStatisticalTest = () => {
    setIsComputingDrift(true);
    setDriftResult(null);

    setTimeout(() => {
      const ks = Number((0.2 + (shiftSeverity / 200)).toFixed(3));
      const pVal = shiftSeverity > 30 ? 0.00001 : 0.042;
      const wDist = Number((5 + (shiftSeverity * 0.2)).toFixed(1));

      setDriftResult({
        ksStatistic: ks,
        pValue: pVal,
        wassersteinDist: wDist,
        isSignificant: ks > 0.25,
      });
      setIsComputingDrift(false);
    }, 400);
  };

  return (
    <div id="view-dataset-shift" className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#D64545] font-bold uppercase">
              <GitCompare className="w-4 h-4" />
              ENVIRONMENT COMPATIBILITY VERIFICATION
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              DATASET SHIFT AUDIT
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B]">
              The environment where this AI will be deployed is significantly different from the environment used to develop it.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] text-center shrink-0">
            <span className="text-[10px] uppercase text-[#D64545] font-bold block">
              DATASET COMPATIBILITY
            </span>
            <span className="text-3xl font-black text-[#D64545]">
              44%
            </span>
            <span className="text-xs text-[#D64545] font-bold block mt-0.5">HIGH SHIFT RISK</span>
          </div>
        </div>
      </div>

      {/* 2. Visual Comparison Card: Training vs Target Environment */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-[#DDE8E2] pb-4">
          <span className="text-xs font-bold text-[#16845B] uppercase">ENVIRONMENTAL MISMATCH</span>
          <h2 className="text-xl font-extrabold text-[#17221D]">
            Training Environment vs. Target Rural Clinic
          </h2>
          <p className="text-xs text-[#64736B] mt-0.5">
            Statistical divergence between the training distribution and real hospital point-of-care workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Training Environment */}
          <div className="bg-[#F6FAF8] border border-[#DDE8E2] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#64736B]">DEVELOPMENT BASELINE</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2]">
                ORIGIN DATA
              </span>
            </div>
            <h3 className="text-base font-extrabold text-[#17221D]">
              Hospital A (Academic Core Lab)
            </h3>
            <ul className="text-xs text-[#64736B] space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                <span><strong>Demographics:</strong> Urban population with median age 52.4y</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                <span><strong>Hardware:</strong> High-end calibrated 12-lead ECG monitor (100 Hz)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                <span><strong>Laboratory:</strong> Complete blood gas, cardiac enzymes, low missingness (&lt;2%)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                <span><strong>Infrastructure:</strong> Low-latency fiber connection with immediate lab results</span>
              </li>
            </ul>
          </div>

          {/* Target Environment */}
          <div className="bg-[#FDE8E8] border border-[#F8B4B4] rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#D64545]">TARGET DEPLOYMENT</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]">
                HIGH DISPARITY
              </span>
            </div>
            <h3 className="text-base font-extrabold text-[#D64545]">
              Rural Clinic (Point-of-Care)
            </h3>
            <ul className="text-xs text-[#64736B] space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                <span><strong>Demographics:</strong> Rural geriatric cohort with median age 68.2y</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                <span><strong>Hardware:</strong> Point-of-care handheld telemetry (50 Hz downsampled)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                <span><strong>Laboratory:</strong> Missing laboratory values in 25% of acute patient encounters</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                <span><strong>Infrastructure:</strong> Intermittent bandwidth and 3-hour send-out lab turnaround</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-[#17221D] block">
              Clinical Takeaway for Hospital Decision Committee:
            </span>
            <p className="text-[#64736B]">
              Algorithms trained solely on tertiary hospital data fail when transferred to rural clinics because the features used for internal decisions (high-frequency QRS telemetry and rapid troponins) do not exist at the point of care.
            </p>
          </div>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: 'Dataset Compatibility Failure (44%)',
                condition: 'Academic Hospital A vs Rural Clinic Mismatch',
                baselineScore: 92,
                stressScore: 74,
                dropPercentage: 18,
                details: 'Hardware downsampling and missing troponin labs in the rural clinic cause a 18 percentage point accuracy drop.',
              })
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] font-bold transition-colors shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16845B]" />
            <span>EXPLAIN THIS FAILURE</span>
          </button>
        </div>
      </div>

      {/* 3. Interactive Feature Drift Inspector */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDE8E2]">
          <div>
            <span className="text-xs font-bold text-[#16845B] uppercase">STATISTICAL DRIFT ENGINE</span>
            <h3 className="text-lg font-extrabold text-[#17221D]">
              Feature Covariate Shift &amp; Drift Simulator
            </h3>
            <p className="text-xs text-[#64736B]">
              Select a clinical biomarker or sensor feature to inspect empirical distribution divergence.
            </p>
          </div>

          <button
            onClick={handleRunStatisticalTest}
            disabled={isComputingDrift}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white text-xs font-bold transition-colors disabled:opacity-50 shadow-xs"
          >
            {isComputingDrift ? <RotateCcw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>Re-run Drift Tests</span>
          </button>
        </div>

        {/* Feature Selector Pills */}
        <div className="flex flex-wrap gap-2">
          {DATASET_SHIFTS.map((shift, idx) => (
            <button
              key={shift.featureName}
              onClick={() => setSelectedFeatureIdx(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                selectedFeatureIdx === idx
                  ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B] shadow-xs'
                  : 'bg-[#F6FAF8] text-[#17221D] border-[#DDE8E2] hover:bg-[#E8F5EF]'
              }`}
            >
              {shift.featureName} ({shift.similarityScore}% Sim)
            </button>
          ))}
        </div>

        {/* Dynamic Controls & Statistical Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          <div className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-4">
            <h4 className="font-extrabold text-[#17221D] uppercase text-xs">
              1. Simulated Environment Shift Slider
            </h4>
            
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-[#64736B]">Rural Facility Difference:</span>
                <span className="text-[#D64545]">{shiftSeverity}% Divergence</span>
              </div>
              <input
                type="range"
                min={10}
                max={95}
                value={shiftSeverity}
                onChange={(e) => setShiftSeverity(parseInt(e.target.value))}
                className="w-full accent-[#16845B] cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                <span className="text-[#64736B] block">Distribution Similarity:</span>
                <span className="text-xl font-black text-[#17221D]">{dynamicSimilarity}%</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                <span className="text-[#64736B] block">Risk Classification:</span>
                <span className={`text-xl font-black ${dynamicRisk === 'HIGH' ? 'text-[#D64545]' : 'text-[#D98C00]'}`}>
                  {dynamicRisk} RISK
                </span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-3">
            <h4 className="font-extrabold text-[#17221D] uppercase text-xs">
              2. Formal Statistical Testing (K-S &amp; Wasserstein)
            </h4>

            {driftResult && (
              <div className="space-y-2">
                <div className="flex justify-between p-2.5 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                  <span className="text-[#64736B]">Kolmogorov-Smirnov Statistic (D):</span>
                  <span className="font-bold text-[#17221D]">{driftResult.ksStatistic}</span>
                </div>
                <div className="flex justify-between p-2.5 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                  <span className="text-[#64736B]">P-Value:</span>
                  <span className="font-bold text-[#D64545]">p &lt; {driftResult.pValue} (Statistically Significant)</span>
                </div>
                <div className="flex justify-between p-2.5 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                  <span className="text-[#64736B]">Wasserstein Distance:</span>
                  <span className="font-bold text-[#17221D]">{driftResult.wassersteinDist}</span>
                </div>
              </div>
            )}

            <p className="text-[11px] text-[#64736B] leading-relaxed">
              Statistically significant divergence proves that predictions produced in this environment cannot be assumed safe based solely on development benchmarks.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};
