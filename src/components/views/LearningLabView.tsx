import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  FlaskConical,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Layers,
  Network,
  Compass,
} from 'lucide-react';
import { ExplanationContext } from '../AIExplanationModal';

interface LearningLabViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const LearningLabView: React.FC<LearningLabViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);

  const lessons = [
    {
      id: 'lesson-1',
      title: 'Why Do Models Break When Moving Between Hospitals?',
      subtitle: 'Covariate Shift, Device Heterogeneity, & Practice Pattern Variation',
      summary:
        'An algorithm trained on millions of patient records at Hospital A often fails immediately at Hospital B. Why? Machine learning models rely on statistical correlations that differ across facilities: differing patient demographics, distinct bedside monitor hardware, local laboratory turnaround latencies, and differing physician prescribing patterns.',
      experimentTitle: 'Mini-Experiment: The Device Sampling Shift',
      experimentDesc:
        'Hospital A records telemetry at 100 Hz calibrated bandpass. Hospital B downsamples to 50 Hz to conserve bandwidth. Observe how downsampling strips cardiac micro-variability features, dropping prediction confidence by 18 percentage points.',
      targetTab: 'dataset_shift',
      tabLabel: 'Inspect Dataset Shift Lab',
    },
    {
      id: 'lesson-2',
      title: 'What is an Overconfident Failure, and Why Is It Dangerous?',
      subtitle: 'Softmax Probability vs. True Epistemic Calibration',
      summary:
        'A model predicting with 98% confidence is not necessarily 98% accurate. Standard deep learning cross-entropy loss encourages overconfidence on out-of-distribution inputs. In clinical triage, an overconfident error gives clinicians false reassurance on an acutely deteriorating patient.',
      experimentTitle: 'Mini-Experiment: Contradictory Hemodynamics (Edge Case #07)',
      experimentDesc:
        'Feed contradictory vital signs (sepsis + chronic beta-blocker dosage). Observe how the model outputs 98% confidence on a benign classification despite high mortality risk.',
      targetTab: 'edge_cases',
      tabLabel: 'Inspect Edge Case Lab',
    },
    {
      id: 'lesson-3',
      title: 'The Fallacy of Single-Variable Testing: The Case for Compound Stress',
      subtitle: 'Why Isolated Stress Testing Misses 80% of Real-World Crashes',
      summary:
        'Most safety evaluations test variables in isolation: test missing data (86%), test noise (86%). In reality, bad conditions cluster together: an overloaded clinic experiences missing vitals, noisy sensors, AND unusual patient demographics simultaneously. Multiple stressors deplete model redundancy and cause catastrophic non-linear failure.',
      experimentTitle: 'Mini-Experiment: 1 + 1 != 2 Degradation',
      experimentDesc:
        'Activate Population Shift alone (-12 pts). Activate Missing Data alone (-8 pts). Activate both simultaneously and observe a -30 pt compound drop into the Red Zone.',
      targetTab: 'compound_failure',
      tabLabel: 'Inspect Compound Failure Lab',
    },
  ];

  const currentLesson = lessons[selectedLessonIdx];

  return (
    <div id="view-learning-lab" className="space-y-6 font-sans">
      
      {/* Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#16845B] font-bold uppercase">
              <GraduationCap className="w-4 h-4" />
              EDUCATIONAL AI CLINICAL GOVERNANCE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              SAFETY LEARNING LAB
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B]">
              Understanding failure mechanisms before deployment. Learn why healthcare algorithms fail under real-world hospital stress and how to evaluate safety scientifically.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('break_my_ai')}
            className="px-5 py-3 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white font-bold text-xs shadow-xs transition-colors shrink-0"
          >
            Launch Crash-Test Console &rarr;
          </button>
        </div>
      </div>

      {/* Lesson Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {lessons.map((lesson, idx) => {
          const isSelected = selectedLessonIdx === idx;

          return (
            <button
              key={lesson.id}
              onClick={() => setSelectedLessonIdx(idx)}
              className={`p-4 rounded-xl text-left border transition-all space-y-1 ${
                isSelected
                  ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                  : 'bg-[#FFFFFF] border-[#DDE8E2] hover:bg-[#F6FAF8]'
              }`}
            >
              <div className="text-[10px] font-bold uppercase text-[#16845B]">
                MODULE 0{idx + 1}
              </div>
              <h3 className="font-extrabold text-xs text-[#17221D] line-clamp-2">
                {lesson.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Selected Lesson Card */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-[#DDE8E2] pb-4 space-y-1">
          <span className="text-xs font-bold text-[#16845B] uppercase">
            LESSON 0{selectedLessonIdx + 1} DEEP-DIVE
          </span>
          <h2 className="text-xl font-extrabold text-[#17221D]">
            {currentLesson.title}
          </h2>
          <p className="text-xs text-[#64736B]">{currentLesson.subtitle}</p>
        </div>

        <div className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] text-xs text-[#17221D] leading-relaxed">
          {currentLesson.summary}
        </div>

        <div className="p-5 rounded-xl bg-[#E8F5EF] border border-[#DDE8E2] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#0F5132]">
            <FlaskConical className="w-4 h-4 text-[#16845B]" />
            <span>{currentLesson.experimentTitle}</span>
          </div>
          <p className="text-xs text-[#64736B] leading-relaxed">
            {currentLesson.experimentDesc}
          </p>

          <button
            onClick={() => onNavigateTab(currentLesson.targetTab)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white text-xs font-bold transition-all shadow-xs"
          >
            <span>{currentLesson.tabLabel}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
};
