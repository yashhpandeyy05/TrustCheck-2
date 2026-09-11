import React, { useState } from 'react';
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  Info,
  Sparkles,
  ArrowRight,
  Sliders,
  Check,
  Zap,
  BarChart3,
  HelpCircle,
  AlertOctagon,
} from 'lucide-react';
import { DEMOGRAPHIC_SUBGROUPS } from '../../data/mockModels';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface FairnessViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const FairnessView: React.FC<FairnessViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  const [selectedSubgroupId, setSelectedSubgroupId] = useState<string>('subgroup-3');
  const [threshold, setThreshold] = useState<number>(0.50);
  const [calibrationMode, setCalibrationMode] = useState<'raw' | 'equal_opportunity' | 'demographic_parity'>('raw');
  const [chartMetric, setChartMetric] = useState<'accuracy' | 'recall' | 'fnr'>('recall');

  const selectedGroup = DEMOGRAPHIC_SUBGROUPS.find(g => g.id === selectedSubgroupId) || DEMOGRAPHIC_SUBGROUPS[2];

  // Dynamic calculations based on threshold and calibration mode
  const effectiveThreshold = calibrationMode === 'equal_opportunity' && selectedGroup.id === 'subgroup-3'
    ? 0.38
    : calibrationMode === 'demographic_parity' && selectedGroup.id === 'subgroup-3'
    ? 0.35
    : threshold;

  // Simulate confusion matrix dynamics based on threshold
  const basePositives = Math.round(selectedGroup.sampleCount * 0.20);
  const baseNegatives = selectedGroup.sampleCount - basePositives;

  const thresholdDelta = 0.50 - effectiveThreshold;
  const simulatedRecall = Math.min(99, Math.max(50, Math.round(selectedGroup.recall + (thresholdDelta * 60))));
  const simulatedAccuracy = Math.min(98, Math.max(65, Math.round(selectedGroup.accuracy + (thresholdDelta * 20))));
  const simulatedFNR = 100 - simulatedRecall;
  const simulatedFPR = Math.min(40, Math.max(2, Math.round(selectedGroup.falsePositiveRate + (thresholdDelta * 35))));

  const simulatedTP = Math.round((simulatedRecall / 100) * basePositives);
  const simulatedFN = basePositives - simulatedTP;
  const simulatedFP = Math.round((simulatedFPR / 100) * baseNegatives);
  const simulatedTN = baseNegatives - simulatedFP;

  // Disparity gap compared to Cohort A (at 94% recall)
  const currentDisparityGap = Math.max(0, 94 - simulatedRecall);

  return (
    <div id="view-fairness-lab" className="space-y-6 font-sans">
      
      {/* Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#16845B] font-bold uppercase">
              <Scale className="w-4 h-4" />
              SUBGROUP PARITY &amp; DISPARITY ENGINE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              WHO DOES THE MODEL FAIL FOR?
            </h1>
            <p className="text-sm font-semibold text-[#D64545]">
              &ldquo;The model&apos;s average accuracy hides a clinically important subgroup failure.&rdquo;
            </p>
            <p className="text-xs sm:text-sm text-[#64736B]">
              While overall academic benchmark accuracy is reported as 92%, disaggregating by patient demographic cohorts reveals an unacceptable 18 percentage point disparity gap and a 4.6x higher false-negative rate for underrepresented patients.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-center shrink-0">
            <span className="text-[10px] uppercase text-[#D98C00] font-bold block">
              MAX PERFORMANCE GAP
            </span>
            <span className="text-3xl font-black text-[#D98C00]">
              18 Pt Gap
            </span>
            <span className="text-xs text-[#17221D] font-medium block mt-0.5">Group A (95%) vs Group B (77%)</span>
          </div>
        </div>

        {/* High-Level Parity Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-[#DDE8E2]">
          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1">
            <span className="text-xs text-[#64736B] uppercase font-bold">Group A (Majority)</span>
            <div className="text-2xl font-black text-[#16845B]">95% Accuracy</div>
            <span className="text-[11px] text-[#64736B] block">Baseline reference population (94% recall)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] space-y-1">
            <span className="text-xs text-[#D64545] uppercase font-bold">Group B (Underrepresented)</span>
            <div className="text-2xl font-black text-[#D64545]">77% Accuracy</div>
            <span className="text-[11px] text-[#D64545] block">Severe under-diagnosis risk (72% recall)</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] space-y-1">
            <span className="text-xs text-[#D64545] uppercase font-bold">False Negative Hazard</span>
            <div className="text-2xl font-black text-[#D64545]">28.0% vs 6.0%</div>
            <span className="text-[11px] text-[#D64545] block">4.6x higher missed deterioration in Group B</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] space-y-1">
            <span className="text-xs text-[#D98C00] uppercase font-bold">Geriatric Age Skew (&gt;65)</span>
            <div className="text-2xl font-black text-[#D98C00]">80% Accuracy</div>
            <span className="text-[11px] text-[#D98C00] block">Elevated risk in senior patients with comorbidities</span>
          </div>
        </div>
      </div>

      {/* Interactive Subgroup Deep-Dive & Threshold Simulator */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDE8E2]">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#16845B] font-bold uppercase">
              <Sliders className="w-4 h-4" />
              INTERACTIVE DEMOGRAPHIC AUDIT
            </div>
            <h2 className="text-xl font-extrabold text-[#17221D] mt-1">
              Subgroup Disparity &amp; Decision Threshold Sandbox
            </h2>
            <p className="text-xs text-[#64736B]">
              Select a demographic cohort, adjust the decision threshold, and apply post-processing calibration algorithms to equalize recall.
            </p>
          </div>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: '18% Subgroup Disparity Gap in Group B',
                condition: 'Demographic Cohort Imbalance & Decision Threshold Rigidness',
                baselineScore: 95,
                stressScore: 77,
                dropPercentage: 18,
                details: 'Group B patients face 4.6x higher missed diagnosis rates because the algorithm was trained on 88% majority data.',
              })
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#16845B]" />
            <span>EXPLAIN THIS FAILURE</span>
          </button>
        </div>

        {/* Cohort Selector Tabs */}
        <div className="flex flex-wrap gap-2">
          {DEMOGRAPHIC_SUBGROUPS.map((g) => {
            const isSelected = g.id === selectedSubgroupId;
            return (
              <button
                key={g.id}
                onClick={() => setSelectedSubgroupId(g.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B] shadow-xs'
                    : 'bg-[#F6FAF8] text-[#17221D] border-[#DDE8E2] hover:bg-[#E8F5EF]'
                }`}
              >
                <span>{g.groupName}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    g.gapFromHighest > 10
                      ? 'bg-[#FDE8E8] text-[#D64545]'
                      : 'bg-[#E8F5EF] text-[#0F5132]'
                  }`}
                >
                  {g.accuracy}% Acc
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Cohort Metrics & Interactive Adjustments */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Column 1: Threshold & Calibration Engine */}
          <div className="space-y-4 p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] text-xs">
            <h3 className="font-extrabold text-[#17221D] uppercase text-xs">
              1. Decision Threshold Tuning
            </h3>
            
            <div className="space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-[#64736B]">Current Threshold:</span>
                <span className="text-[#16845B]">{effectiveThreshold.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.20}
                max={0.80}
                step={0.01}
                value={effectiveThreshold}
                disabled={calibrationMode !== 'raw'}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full accent-[#16845B] cursor-pointer"
              />
              <span className="text-[11px] text-[#64736B] block">
                Lowering the threshold catches more sick patients (increases recall) at the cost of more false alarms.
              </span>
            </div>

            <div className="space-y-2 pt-3 border-t border-[#DDE8E2]">
              <span className="font-bold text-[#17221D] block">Algorithmic Calibration:</span>
              <div className="grid grid-cols-1 gap-1.5">
                <button
                  onClick={() => setCalibrationMode('raw')}
                  className={`px-3 py-2 rounded-lg text-left font-bold transition-all border ${
                    calibrationMode === 'raw'
                      ? 'bg-[#FFFFFF] text-[#0F5132] border-[#16845B]'
                      : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
                  }`}
                >
                  Raw Model (No Optimization)
                </button>
                <button
                  onClick={() => setCalibrationMode('equal_opportunity')}
                  className={`px-3 py-2 rounded-lg text-left font-bold transition-all border ${
                    calibrationMode === 'equal_opportunity'
                      ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B]'
                      : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
                  }`}
                >
                  Equal Opportunity (Equal Recall)
                </button>
                <button
                  onClick={() => setCalibrationMode('demographic_parity')}
                  className={`px-3 py-2 rounded-lg text-left font-bold transition-all border ${
                    calibrationMode === 'demographic_parity'
                      ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B]'
                      : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
                  }`}
                >
                  Demographic Parity (Equal Positive Rate)
                </button>
              </div>
            </div>
          </div>

          {/* Column 2: Simulated Cohort Outcomes */}
          <div className="space-y-4 p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] text-xs">
            <h3 className="font-extrabold text-[#17221D] uppercase text-xs">
              2. Simulated Cohort Performance
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                <span className="text-[#64736B] block">Clinical Accuracy:</span>
                <span className="text-xl font-black text-[#17221D]">{simulatedAccuracy}%</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                <span className="text-[#64736B] block">Recall (Sensitivity):</span>
                <span className="text-xl font-black text-[#16845B]">{simulatedRecall}%</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                <span className="text-[#64736B] block">Missed Rate (FNR):</span>
                <span className="text-xl font-black text-[#D64545]">{simulatedFNR}%</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] rounded-lg border border-[#DDE8E2]">
                <span className="text-[#64736B] block">Disparity vs Group A:</span>
                <span className={`text-xl font-black ${currentDisparityGap > 5 ? 'text-[#D64545]' : 'text-[#16845B]'}`}>
                  {currentDisparityGap} pts
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#E8F5EF] border border-[#DDE8E2] text-[11px] text-[#0F5132] leading-relaxed">
              <strong>Clinical Interpretation:</strong>{' '}
              {currentDisparityGap > 5
                ? 'Model fails clinical equity standards. Group B patients face substantially higher risks of delayed critical care.'
                : 'Equal Opportunity adjustment successfully aligned sensitivity across cohorts.'}
            </div>
          </div>

          {/* Column 3: Confusion Matrix Sandbox */}
          <div className="space-y-4 p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] text-xs">
            <h3 className="font-extrabold text-[#17221D] uppercase text-xs">
              3. Dynamic Confusion Matrix (n={selectedGroup.sampleCount})
            </h3>

            <div className="grid grid-cols-2 gap-2 text-center font-bold">
              <div className="p-3 bg-[#FFFFFF] border border-[#DDE8E2] rounded-lg">
                <span className="text-[#0F5132] block">True Positive (TP)</span>
                <span className="text-lg text-[#17221D] font-black">{simulatedTP}</span>
                <span className="text-[10px] text-[#64736B] block">Detected sick</span>
              </div>
              <div className="p-3 bg-[#FDE8E8] border border-[#F8B4B4] rounded-lg">
                <span className="text-[#D64545] block">False Negative (FN)</span>
                <span className="text-lg text-[#D64545] font-black">{simulatedFN}</span>
                <span className="text-[10px] text-[#D64545] block">Missed sick patient!</span>
              </div>
              <div className="p-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-lg">
                <span className="text-[#D98C00] block">False Positive (FP)</span>
                <span className="text-lg text-[#D98C00] font-black">{simulatedFP}</span>
                <span className="text-[10px] text-[#D98C00] block">False alarm</span>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#DDE8E2] rounded-lg">
                <span className="text-[#0F5132] block">True Negative (TN)</span>
                <span className="text-lg text-[#17221D] font-black">{simulatedTN}</span>
                <span className="text-[10px] text-[#64736B] block">Correctly clear</span>
              </div>
            </div>

            <p className="text-[11px] text-[#64736B]">
              Every False Negative in a healthcare model represents an acute patient who was sent home or deprioritized.
            </p>
          </div>

        </div>

        {/* Step 6 Next Action Callout */}
        <div className="mt-8 pt-6 border-t border-[#DDE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#64736B]">
            Due to the 18-point disparity and 4.6× higher false negative rate, this model cannot be deployed safely.
          </div>

          <button
            onClick={() => onNavigateTab('safety_passport')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#D64545] hover:bg-[#b03030] text-white font-extrabold text-xs shadow-xs transition-colors"
          >
            <span>STEP 6: REVIEW DEPLOYMENT DECISION &rarr;</span>
          </button>
        </div>
      </div>

    </div>
  );
};
