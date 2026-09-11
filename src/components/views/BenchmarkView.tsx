import React, { useState } from 'react';
import {
  Scale,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Sliders,
  RotateCcw,
  Zap,
  Check,
  Building2,
} from 'lucide-react';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface BenchmarkViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const BenchmarkView: React.FC<BenchmarkViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  // Procurement Priority Weights
  const [weightAccuracy, setWeightAccuracy] = useState<number>(25);
  const [weightRobustness, setWeightRobustness] = useState<number>(35);
  const [weightFairness, setWeightFairness] = useState<number>(25);
  const [weightPredictability, setWeightPredictability] = useState<number>(15);

  const models = [
    {
      id: 'candidate',
      name: 'Candidate Model (SepsisWatch v2.1)',
      type: 'Deep Learning (Current Submission)',
      tag: 'Higher accuracy, lower robustness',
      accuracy: 94,
      robustness: 64,
      fairness: 77,
      predictability: 60,
      safetyScore: 68,
      status: 'NOT READY',
      statusColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      summary: 'Boasts the highest test-set accuracy (94%) but experiences severe drops on Device B monitors and high-confidence edge case failures.',
    },
    {
      id: 'alternative',
      name: 'Alternative Model (BioGuard Ensemble)',
      type: 'Calibrated Multimodal Architecture',
      tag: 'Slightly lower accuracy, much higher safety',
      accuracy: 91,
      robustness: 89,
      fairness: 90,
      predictability: 88,
      safetyScore: 89,
      status: 'RECOMMENDED',
      statusColor: 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]',
      summary: 'Sacrifices 3% raw accuracy in exchange for high resilience across devices, calibrated uncertainty, and subgroup equity.',
    },
    {
      id: 'baseline',
      name: 'Baseline System (qSOFA / MEWS)',
      type: 'Deterministic Clinical Decision Rule',
      tag: 'Moderate accuracy, 100% predictable',
      accuracy: 78,
      robustness: 98,
      fairness: 92,
      predictability: 100,
      safetyScore: 84,
      status: 'PREDICTABLE',
      statusColor: 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]',
      summary: 'Lower sensitivity on subtle presentations, but completely transparent with zero silent hallucination or hardware fragility.',
    },
  ];

  // Dynamic Procurement Score
  const totalWeight = weightAccuracy + weightRobustness + weightFairness + weightPredictability || 1;
  const scoredModels = models.map((m) => {
    const composite = Math.round(
      ((m.accuracy * weightAccuracy) +
        (m.robustness * weightRobustness) +
        (m.fairness * weightFairness) +
        (m.predictability * weightPredictability)) /
        totalWeight
    );
    return { ...m, composite };
  });

  return (
    <div id="view-benchmark" className="space-y-6 font-sans">
      
      {/* 1. Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#16845B] font-bold uppercase">
              <Scale className="w-4 h-4" />
              MODEL PROCUREMENT &amp; BENCHMARK LAB
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              MODEL-TO-MODEL COMPARISON
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B]">
              Hospital procurement committees often select models based purely on test accuracy. TrustCheck proves that higher accuracy does not always mean safer clinical care.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#E8F5EF] border border-[#DDE8E2] text-center shrink-0">
            <span className="text-[10px] uppercase text-[#0F5132] font-bold block">
              SAFETY-OPTIMAL CHOICE
            </span>
            <span className="text-xl font-extrabold text-[#0F5132]">
              Alternative Model
            </span>
            <span className="text-xs text-[#64736B] block mt-0.5">89% Composite Safety Index</span>
          </div>
        </div>
      </div>

      {/* 2. Three Model Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scoredModels.map((m) => (
          <div
            key={m.id}
            className={`p-6 rounded-2xl border bg-[#FFFFFF] shadow-xs space-y-4 flex flex-col justify-between ${
              m.id === 'alternative'
                ? 'border-2 border-[#16845B]'
                : 'border-[#DDE8E2]'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${m.statusColor}`}>
                  {m.status}
                </span>
                <span className="text-xs font-bold text-[#16845B]">
                  Index: {m.composite} pts
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-[#17221D]">{m.name}</h3>
                <span className="text-[11px] text-[#64736B] block">{m.type}</span>
                <div className="mt-1 text-xs font-bold text-[#0F5132]">{m.tag}</div>
              </div>

              <p className="text-xs text-[#64736B] leading-relaxed">
                {m.summary}
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                <div className="p-2.5 rounded-lg bg-[#F6FAF8] border border-[#DDE8E2]">
                  <span className="text-[10px] text-[#64736B] block">Accuracy:</span>
                  <span className="font-extrabold text-[#17221D]">{m.accuracy}%</span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F6FAF8] border border-[#DDE8E2]">
                  <span className="text-[10px] text-[#64736B] block">Robustness:</span>
                  <span className={`font-extrabold ${m.robustness < 70 ? 'text-[#D64545]' : 'text-[#16845B]'}`}>
                    {m.robustness}%
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F6FAF8] border border-[#DDE8E2]">
                  <span className="text-[10px] text-[#64736B] block">Fairness:</span>
                  <span className={`font-extrabold ${m.fairness < 80 ? 'text-[#D98C00]' : 'text-[#16845B]'}`}>
                    {m.fairness}%
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-[#F6FAF8] border border-[#DDE8E2]">
                  <span className="text-[10px] text-[#64736B] block">Predictability:</span>
                  <span className="font-extrabold text-[#17221D]">{m.predictability}%</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DDE8E2]">
              <span className="text-[11px] text-[#64736B] block">
                {m.id === 'candidate' && '⚠️ High risk of silent malpractice in rural facilities.'}
                {m.id === 'alternative' && '✅ Highest net hospital safety across all test suites.'}
                {m.id === 'baseline' && 'ℹ️ Gold standard for auditable clinical guidelines.'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Interactive Weight Sandbox */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-[#DDE8E2] pb-4">
          <span className="text-xs font-bold text-[#16845B] uppercase">DECISION MATRIX</span>
          <h3 className="text-lg font-extrabold text-[#17221D]">
            Hospital Procurement Priority Weighting
          </h3>
          <p className="text-xs text-[#64736B]">
            Adjust the weights below to see how clinical institutional priorities affect the safest model recommendation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-[#64736B]">Accuracy Weight:</span>
              <span className="text-[#16845B]">{weightAccuracy}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={weightAccuracy}
              onChange={(e) => setWeightAccuracy(parseInt(e.target.value))}
              className="w-full accent-[#16845B] cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-[#64736B]">Robustness Weight:</span>
              <span className="text-[#16845B]">{weightRobustness}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={weightRobustness}
              onChange={(e) => setWeightRobustness(parseInt(e.target.value))}
              className="w-full accent-[#16845B] cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-[#64736B]">Demographic Equity:</span>
              <span className="text-[#16845B]">{weightFairness}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={weightFairness}
              onChange={(e) => setWeightFairness(parseInt(e.target.value))}
              className="w-full accent-[#16845B] cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-[#64736B]">Predictability / Rules:</span>
              <span className="text-[#16845B]">{weightPredictability}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              value={weightPredictability}
              onChange={(e) => setWeightPredictability(parseInt(e.target.value))}
              className="w-full accent-[#16845B] cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-xs text-[#64736B]">
            When safety weights exceed 30%, calibrated ensemble architectures consistently beat overfitted high-accuracy models.
          </span>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: 'The Accuracy vs. Safety Paradox',
                condition: 'Candidate Model (94% Acc, 68 Safety) vs Alternative (91% Acc, 89 Safety)',
                baselineScore: 94,
                stressScore: 68,
                dropPercentage: 26,
                details: 'The candidate model achieves higher test accuracy by memorizing high-frequency hospital telemetry, but collapses under real-world clinic noise.',
              })
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16845B]" />
            <span>EXPLAIN THIS COMPARISON</span>
          </button>
        </div>
      </div>

    </div>
  );
};
