import React, { useRef } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  Flame,
  ArrowRight,
  TrendingDown,
  Info,
  CheckCircle,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Layers,
  Compass,
  Building2,
  AlertOctagon,
  Scale,
  GitCompare,
  Gauge,
  SlidersHorizontal,
  CheckSquare,
  XCircle,
  ChevronRight,
  Users,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { ModelProfile, StressTestExecutionResult } from '../../types';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface OverviewViewProps {
  currentModel: ModelProfile;
  onNavigateTab: (tabId: any) => void;
  onExplainFinding: (ctx: ExplanationContext) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  currentModel,
  onNavigateTab,
  onExplainFinding,
}) => {
  const envelopeRef = useRef<HTMLDivElement>(null);
  const whySectionRef = useRef<HTMLDivElement>(null);

  const scrollToWhy = () => {
    whySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Safe Operating Envelope Dimensions (Safe -> Warning -> Unsafe)
  const envelopeDimensions = [
    {
      dimension: 'Hospital Environment',
      safe: 'Hospital A (Academic Core Lab)',
      warning: 'Regional Suburban Facility',
      unsafe: 'Rural Community Clinic (Target)',
      activeZone: 'UNSAFE',
      note: 'Covariate shift in infrastructure & telemetry',
    },
    {
      dimension: 'Patient Population',
      safe: 'Adult Cohort (Age 35-64)',
      warning: 'Elderly / Older Population (65-74)',
      unsafe: 'Geriatric (Age > 75) + Comorbidities',
      activeZone: 'WARNING',
      note: 'Target clinic median age is 68.2 years',
    },
    {
      dimension: 'Telemetry & Device',
      safe: 'Calibrated 12-Lead Diagnostic Cart (100 Hz)',
      warning: 'Point-of-Care Cart (75 Hz)',
      unsafe: 'Device B Handheld Telemetry (50 Hz downsampled)',
      activeZone: 'UNSAFE',
      note: '18% drop when high-frequency cardiac signals lost',
    },
    {
      dimension: 'Missing Data / Labs',
      safe: 'Complete Labs (<5% missing)',
      warning: 'Missing Laboratory Values (10-25%)',
      unsafe: 'Severe Missingness (>30% missing troponin/lactate)',
      activeZone: 'WARNING',
      note: 'Rural clinic encounters 25% missing panels',
    },
    {
      dimension: 'Signal Quality',
      safe: 'Low Noise / Rest State',
      warning: 'Moderate Motion / Shivering Artifacts',
      unsafe: 'High Impedance Jitter / Tremors',
      activeZone: 'WARNING',
      note: 'High false-positive rate under baseline noise',
    },
    {
      dimension: 'Demographic Subgroup',
      safe: 'Majority Group A (95% accuracy)',
      warning: 'Subgroup C (86% accuracy)',
      unsafe: 'Underrepresented Group B (77% accuracy)',
      activeZone: 'UNSAFE',
      note: '18-point disparity gap; 4.6x false negatives',
    },
    {
      dimension: 'Clinical Edge Cases',
      safe: 'Classic Acute Coronary Syndrome',
      warning: 'Atypical Presentation without Fever',
      unsafe: 'Beta-Blocker + Septic Shock Decompensation',
      activeZone: 'UNSAFE',
      note: 'Model assigns 98% confidence to LOW RISK on dying patient',
    },
  ];

  // 6 Evaluated Safety Pillars
  const keyScores = [
    {
      id: 'overall',
      title: 'Overall Readiness',
      value: 58,
      status: 'Critical',
      statusColor: 'text-[#D64545] bg-[#FDE8E8] border-[#F8B4B4]',
      barColor: 'bg-[#D64545]',
      explanation: 'Composite deployment readiness across all clinical safety suites.',
      tooltip: 'Combines performance across noise, missing data, demographic fairness, and edge cases.',
    },
    {
      id: 'robustness',
      title: 'Robustness',
      value: 64,
      status: 'Needs Review',
      statusColor: 'text-[#D98C00] bg-[#FEF3C7] border-[#FDE68A]',
      barColor: 'bg-[#D98C00]',
      explanation: 'Tolerance to missing laboratory values and sensor noise artifacts.',
      tooltip: 'Checks whether the AI continues to work when information is missing, noisy or changed.',
      tab: 'robustness',
    },
    {
      id: 'fairness',
      title: 'Fairness',
      value: 71,
      status: 'Needs Review',
      statusColor: 'text-[#D98C00] bg-[#FEF3C7] border-[#FDE68A]',
      barColor: 'bg-[#D98C00]',
      explanation: 'Parity across demographic subgroups and vulnerable cohorts.',
      tooltip: 'Evaluates if the model performs equally well across different ethnicities, ages, and sexes.',
      tab: 'fairness',
    },
    {
      id: 'compatibility',
      title: 'Dataset Compatibility',
      value: 44,
      status: 'Critical',
      statusColor: 'text-[#D64545] bg-[#FDE8E8] border-[#F8B4B4]',
      barColor: 'bg-[#D64545]',
      explanation: 'Similarity between training hospital data and target rural clinic.',
      tooltip: 'Checks whether the environment where the AI will be used is different from where it was trained.',
      tab: 'dataset_shift',
    },
    {
      id: 'calibration',
      title: 'Calibration',
      value: 69,
      status: 'Needs Review',
      statusColor: 'text-[#D98C00] bg-[#FEF3C7] border-[#FDE68A]',
      barColor: 'bg-[#D98C00]',
      explanation: 'Agreement between reported AI confidence and empirical truth.',
      tooltip: 'Checks whether the AI confidence matches how often it is actually correct.',
      tab: 'uncertainty',
    },
    {
      id: 'edge_cases',
      title: 'Edge Case Safety',
      value: 49,
      status: 'Critical',
      statusColor: 'text-[#D64545] bg-[#FDE8E8] border-[#F8B4B4]',
      barColor: 'bg-[#D64545]',
      explanation: 'Handling of contradictory vitals and rare hemodynamic profiles.',
      tooltip: 'Tests whether the AI makes dangerous mistakes on unusual, conflicting patient signals.',
      tab: 'edge_cases',
    },
  ];

  // Primary failure reasons
  const topFailureReasons = [
    {
      id: 'reason-1',
      title: '1. Device B Telemetry Downsampling',
      severity: 'CRITICAL',
      severityColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      whatHappened:
        'Accuracy plunges from 92% to 74% when switching from Hospital A 100 Hz cart to rural 50 Hz handheld telemetry.',
      whyItMatters:
        'The deep learning feature extractor relies heavily on high-frequency ST segment dynamics that get stripped by downsampling.',
      recommendedAction:
        'Collect 2,000 local Device B recordings to re-tune waveform feature extraction filters.',
      tab: 'deployment_setup',
    },
    {
      id: 'reason-2',
      title: '2. Underrepresented Demographic Disparity',
      severity: 'HIGH RISK',
      severityColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      whatHappened:
        'Subgroup B experiences an 18 percentage point accuracy drop (77% vs 95% majority).',
      whyItMatters:
        'False negative rate is 4.6x higher for acute cardiac deterioration in underrepresented patients.',
      recommendedAction:
        'Apply fairness regularization and calibrate subgroup decision thresholds before patient use.',
      tab: 'fairness',
    },
    {
      id: 'reason-3',
      title: '3. High Confidence Masked Deterioration',
      severity: 'CRITICAL',
      severityColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      whatHappened:
        'In beta-blocker septic shock (Edge Case #07), the model assigns 98% confidence to "LOW RISK".',
      whyItMatters:
        'Beta-blockers blunt tachycardia. The model mistakes normal heart rate for safety while patient decompensates.',
      recommendedAction:
        'Hardcode clinical safety override rules when elevated lactate coincides with beta-blockers.',
      tab: 'edge_cases',
    },
    {
      id: 'reason-4',
      title: '4. Overconfident Calibration with Missing Labs',
      severity: 'HIGH RISK',
      severityColor: 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]',
      whatHappened:
        'Reported confidence is 96% in the top bin, but actual correctness is only 72% (24-point gap).',
      whyItMatters:
        'Clinicians receive false reassurance when labs are delayed or missing in rural care.',
      recommendedAction:
        'Apply temperature scaling calibration and flag uncertainty whenever troponin panels are absent.',
      tab: 'uncertainty',
    },
  ];

  return (
    <div id="view-overview" className="space-y-8 font-sans">
      
      {/* 1. Hero Statement & Model Information */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#16845B] uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#16845B]" />
              TRUSTCHECK &bull; HEALTHCARE AI SAFETY &amp; READINESS
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-[#17221D] tracking-tight leading-tight">
              Should this AI be trusted here?
            </h1>
            
            <p className="text-base font-semibold text-[#16845B]">
              Pre-deployment crash testing for healthcare AI.
            </p>

            <p className="text-xs sm:text-sm text-[#64736B] leading-relaxed pt-1">
              Evaluating candidate model <strong className="text-[#17221D]">CardioScan Net v1.4</strong> against target deployment environment <strong className="text-[#17221D]">Rural Community Clinic</strong>. We test where the AI works, where it breaks, and who it may fail for before it ever touches a patient.
            </p>
          </div>

          {/* Large Deployment Status Banner */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <div
              id="baseline-development-badge"
              className="p-4 rounded-2xl bg-[#E8F5EF] border border-[#16845B] text-center min-w-[240px] space-y-1 shadow-xs"
            >
              <span className="text-[10px] font-black uppercase tracking-wider text-[#0F5132] block">
                DEVELOPMENT BENCHMARK
              </span>
              <div className="text-3xl font-black text-[#0F5132] tracking-tight">
                92.4% Accurate
              </div>
              <p className="text-[11px] font-semibold text-[#16845B]">
                Hospital A Core Lab &bull; Clean Ideal Data
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDE8E8] border-2 border-[#F8B4B4] text-center min-w-[240px] space-y-1 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#D64545] block">
                TARGET CLINIC STATUS
              </span>
              <div className="text-2xl font-black text-[#D64545] flex items-center justify-center gap-1.5">
                <span>🔴</span>
                <span>NOT READY</span>
              </div>
              <div className="text-xs text-[#D64545] font-semibold">
                Trust Readiness: <strong className="text-base font-black">58%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Workflow Action Bar */}
        <div className="pt-6 border-t border-[#DDE8E2] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#64736B]">
            <span className="font-bold text-[#17221D]">Evaluation Workflow:</span>
            <span>1. Define &rarr; 2. Crash Test &rarr; 3. Failure Map &rarr; 4. Trust Passport</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('deployment_setup')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2] font-bold text-xs transition-colors"
            >
              <span>1. DEPLOYMENT SETUP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigateTab('break_my_ai')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white font-bold text-xs shadow-xs transition-all"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>2. RUN TRUST CRASH TEST</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE CORE DIFFERENTIATOR: SAFE OPERATING ENVELOPE */}
      <div
        ref={envelopeRef}
        id="section-safe-operating-envelope"
        className="bg-[#FFFFFF] border-2 border-[#16845B] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DDE8E2] pb-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#16845B] uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#16845B]" />
              THE CORE INNOVATION: TRUST BOUNDARY
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#17221D] tracking-tight">
              SAFE OPERATING ENVELOPE
            </h2>
            <p className="text-xs sm:text-sm text-[#17221D] font-medium">
              &ldquo;This model isn&apos;t universally bad. It is unsafe under specific operating conditions.&rdquo;
            </p>
            <p className="text-xs text-[#64736B]">
              Responsible healthcare engineering establishes where the model operates safely, where caution is required, and where deployment must be blocked.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold shrink-0">
            <span className="px-2.5 py-1 rounded bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2]">SAFE</span>
            <span>&rarr;</span>
            <span className="px-2.5 py-1 rounded bg-[#FEF3C7] text-[#D98C00] border border-[#FDE68A]">WARNING</span>
            <span>&rarr;</span>
            <span className="px-2.5 py-1 rounded bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]">UNSAFE</span>
          </div>
        </div>

        {/* Horizontal Safe -> Warning -> Unsafe Matrix */}
        <div className="space-y-3 text-xs">
          {envelopeDimensions.map((dim, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2 hover:border-[#16845B] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-extrabold text-[#17221D] text-sm flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#16845B]" />
                  {dim.dimension}
                </span>

                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border uppercase ${
                  dim.activeZone === 'UNSAFE'
                    ? 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]'
                    : dim.activeZone === 'WARNING'
                    ? 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]'
                    : 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]'
                }`}>
                  Current Target Clinic: {dim.activeZone}
                </span>
              </div>

              {/* 3 Zones Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 text-[11px]">
                <div className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                  dim.activeZone === 'SAFE' ? 'bg-[#E8F5EF] border-[#16845B]' : 'bg-[#FFFFFF] border-[#DDE8E2]'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#16845B] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0F5132] block">SAFE ZONE</strong>
                    <span className="text-[#64736B]">{dim.safe}</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                  dim.activeZone === 'WARNING' ? 'bg-[#FEF3C7] border-[#D98C00]' : 'bg-[#FFFFFF] border-[#DDE8E2]'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-[#D98C00] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#D98C00] block">WARNING ZONE</strong>
                    <span className="text-[#64736B]">{dim.warning}</span>
                  </div>
                </div>

                <div className={`p-2.5 rounded-lg border flex items-start gap-2 ${
                  dim.activeZone === 'UNSAFE' ? 'bg-[#FDE8E8] border-[#D64545]' : 'bg-[#FFFFFF] border-[#DDE8E2]'
                }`}>
                  <XCircle className="w-3.5 h-3.5 text-[#D64545] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#D64545] block">UNSAFE ZONE</strong>
                    <span className="text-[#64736B]">{dim.unsafe}</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-[#64736B] pt-0.5">
                <strong>Empirical finding:</strong> {dim.note}
              </div>
            </div>
          ))}
        </div>

        {/* Explanatory footer */}
        <div className="p-4 rounded-xl bg-[#E8F5EF] border border-[#DDE8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#0F5132]">
            <Info className="w-4 h-4 text-[#16845B] shrink-0" />
            <span>The model operates reliably inside Hospital A academic parameters, but exceeds its trust boundary under rural clinic telemetry and lab delays.</span>
          </div>

          <button
            onClick={() => onNavigateTab('failure_map')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#16845B] hover:bg-[#0F5132] text-white font-bold text-xs transition-colors shrink-0"
          >
            <span>INSPECT FAILURE MAP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 3. Six Key Safety Pillars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#64736B]">
            EVALUATED SAFETY PILLARS
          </h3>
          <span className="text-xs text-[#64736B]">Click any card to deep-dive</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyScores.map((score) => (
            <div
              key={score.id}
              onClick={() => score.tab && onNavigateTab(score.tab)}
              className={`bg-[#FFFFFF] border border-[#DDE8E2] rounded-xl p-5 space-y-3 transition-all ${
                score.tab ? 'hover:border-[#16845B] hover:shadow-xs cursor-pointer' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#17221D] flex items-center">
                    {score.title}
                    <TermTooltip term={score.title} explanation={score.tooltip} />
                  </h4>
                  <span className="text-2xl font-extrabold text-[#17221D] mt-1 block">
                    {score.value}%
                  </span>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${score.statusColor}`}>
                  {score.status}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#E8F5EF] h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full ${score.barColor}`}
                  style={{ width: `${score.value}%` }}
                />
              </div>

              <p className="text-xs text-[#64736B] leading-relaxed">
                {score.explanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. WHY IS THIS MODEL NOT READY? (4 CRITICAL REASONS) */}
      <div
        ref={whySectionRef}
        id="section-why-not-ready"
        className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs"
      >
        <div className="border-b border-[#DDE8E2] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D64545] uppercase mb-1">
            <AlertOctagon className="w-4 h-4 text-[#D64545]" />
            PRIMARY SAFETY OBSTACLES
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#17221D] tracking-tight">
            WHY IS THIS MODEL NOT READY?
          </h2>
          <p className="text-xs sm:text-sm text-[#64736B] mt-1">
            TrustCheck identified 4 critical failure modes that introduce serious patient risk if deployed in the current target environment.
          </p>
        </div>

        {/* 4 Reasons List */}
        <div className="space-y-4">
          {topFailureReasons.map((reason) => (
            <div
              key={reason.id}
              className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-3 hover:border-[#16845B] transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-[#17221D]">{reason.title}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${reason.severityColor}`}>
                  {reason.severity}
                </span>
              </div>

              <p className="text-xs text-[#17221D] leading-relaxed">
                <strong>What happened:</strong> {reason.whatHappened}
              </p>

              <p className="text-xs text-[#64736B] leading-relaxed">
                <strong>Why it matters:</strong> {reason.whyItMatters}
              </p>

              <div className="pt-2 border-t border-[#DDE8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <span className="text-[#0F5132]">
                  <strong>Recommended action:</strong> {reason.recommendedAction}
                </span>

                <button
                  onClick={() => onNavigateTab(reason.tab)}
                  className="text-xs font-bold text-[#16845B] hover:text-[#0F5132] flex items-center gap-1 shrink-0"
                >
                  <span>Inspect details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action footer */}
        <div className="pt-4 border-t border-[#DDE8E2] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#64736B]">
            All 4 blockers must be remediated or clinically bounded before institutional clearance.
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('deployment_setup')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white font-extrabold text-xs shadow-xs transition-colors"
            >
              <span>STEP 2: COMPARE REAL DEPLOYMENT</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('break_my_ai')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2] font-bold text-xs transition-colors"
            >
              <Flame className="w-3.5 h-3.5 text-[#D64545]" />
              <span>Skip to Crash Test</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
