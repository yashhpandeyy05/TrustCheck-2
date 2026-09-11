import React, { useState } from 'react';
import {
  Network,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  XCircle,
  Cpu,
  Users,
  Activity,
  Zap,
  ChevronRight,
  FileText,
  Flame,
  Info,
} from 'lucide-react';
import { ExplanationContext } from '../AIExplanationModal';

interface FailureNode {
  id: string;
  name: string;
  shortTag: string;
  metric: string;
  severity: 'CRITICAL' | 'HIGH RISK';
  severityColor: string;
  nodeSize: 'large' | 'medium';
  clinicalPatient: string;
  clinicalReality: string;
  observedOutput: string;
  modelConfidence: string;
  underlyingProblem: string;
  safetyImplication: string;
  recommendedSafeguard: string;
  affectedGroup: string;
  targetTab: string;
}

interface FailureMapViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
  initialNodeId?: string;
}

export const FailureMapView: React.FC<FailureMapViewProps> = ({
  onExplainFinding,
  onNavigateTab,
  initialNodeId,
}) => {
  const failureNodes: FailureNode[] = [
    {
      id: 'edge-case-septic',
      name: 'Masked Septic Shock (Edge Case #07)',
      shortTag: 'EDGE CASE',
      metric: '98% Conf / WRONG',
      severity: 'CRITICAL',
      severityColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      nodeSize: 'large',
      clinicalPatient: '72-year-old on chronic beta-blocker therapy (Metoprolol 50mg BID)',
      clinicalReality: 'Severe hyperlactatemia (4.8 mmol/L), refractory hypotension, septic shock',
      observedOutput: 'LOW RISK (Score 0.12)',
      modelConfidence: '98% Softmax Confidence',
      underlyingProblem: 'Beta-blockade blunted the expected physiological heart-rate reflex (HR stayed at 74 bpm instead of 130 bpm). The neural network over-weighted normal heart rate as proof of stability.',
      safetyImplication: 'The model confidently underestimates deterioration. Clinicians receive false reassurance while patient decompensates in untreated shock.',
      recommendedSafeguard: 'Hardcoded clinical rule override: Trigger mandatory physician alert whenever serum lactate > 3.0 mmol/L, regardless of heart rate or AI stability score.',
      affectedGroup: 'Cardiovascular patients on beta-blockers or anti-arrhythmic agents',
      targetTab: 'edge_cases',
    },
    {
      id: 'device-shift',
      name: 'Device B Telemetry Downsampling',
      shortTag: 'DEVICE SHIFT',
      metric: '74% Accuracy (-18%)',
      severity: 'CRITICAL',
      severityColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      nodeSize: 'large',
      clinicalPatient: 'Point-of-care patient monitored on rural handheld telemetry',
      clinicalReality: 'Subtle acute coronary syndrome (NSTEMI) with microvolt T-wave alternans',
      observedOutput: 'Normal Sinus Rhythm / Low Risk',
      modelConfidence: '87% Reported Confidence',
      underlyingProblem: 'Switching from Hospital A 100 Hz calibrated cart to rural 50 Hz handheld strips the high-frequency temporal components of ST segments.',
      safetyImplication: 'NSTEMI and evolving ischemia events go undetected at initial triage.',
      recommendedSafeguard: 'Re-train waveform convolutional filters using 2,000 local Device B telemetry records before deployment.',
      affectedGroup: 'Rural emergency & observation bed patients',
      targetTab: 'deployment_setup',
    },
    {
      id: 'demographic-gap',
      name: 'Underrepresented Demographic Disparity',
      shortTag: 'DEMOGRAPHIC GAP',
      metric: '18% Point Gap (77% vs 95%)',
      severity: 'CRITICAL',
      severityColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      nodeSize: 'large',
      clinicalPatient: 'Minority Cohort B patient presenting with acute decompensated heart failure',
      clinicalReality: 'Acute decompensated heart failure with pulmonary edema',
      observedOutput: 'De-escalated Priority / Stable',
      modelConfidence: '81% Reported Confidence',
      underlyingProblem: 'Development dataset contained 88% Majority Group A and only 12% Group B. The model learned decision boundaries skewed to Majority baselines.',
      safetyImplication: '4.6x higher false negative rate in underrepresented patients.',
      recommendedSafeguard: 'Apply equalized odds regularization and calibrate separate subgroup decision thresholds.',
      affectedGroup: 'Underrepresented minority and rural indigenous populations',
      targetTab: 'fairness',
    },
    {
      id: 'dataset-shift',
      name: 'Environment Covariate Shift',
      shortTag: 'DATASET SHIFT',
      metric: '44% Compatibility',
      severity: 'CRITICAL',
      severityColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      nodeSize: 'large',
      clinicalPatient: 'Rural clinic admissions with combined geriatric shift and lab delays',
      clinicalReality: 'Simultaneous geriatric shift (+15.8y), missing labs, and lower hardware fidelity',
      observedOutput: 'Erratic classification with wide confidence variance',
      modelConfidence: 'High variance / poor calibration',
      underlyingProblem: 'The target clinic environment differs on every fundamental operational dimension compared to Hospital A.',
      safetyImplication: 'The model exceeds its safe operational envelope across 5 of 7 clinical dimensions.',
      recommendedSafeguard: 'Conduct prospective local observational trial before allowing AI automated triage.',
      affectedGroup: 'Entire target clinic patient census',
      targetTab: 'dataset_shift',
    },
    {
      id: 'missing-labs',
      name: 'Missing Laboratory Markers',
      shortTag: 'MISSING LABS',
      metric: '80% Accuracy (-12%)',
      severity: 'HIGH RISK',
      severityColor: 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]',
      nodeSize: 'medium',
      clinicalPatient: 'Patient awaiting 3-hour send-out cardiac enzyme panels',
      clinicalReality: 'Evolving myocardial injury without immediate lab confirmation',
      observedOutput: 'Assumes normal lab values via zero-imputation',
      modelConfidence: '89% Overconfidence',
      underlyingProblem: 'Model fails to express epistemic uncertainty when essential biomarkers are absent.',
      safetyImplication: 'Clinicians receive an algorithmic decision based on placeholder zeros.',
      recommendedSafeguard: 'Implement automated gating that refuses to output risk scores when troponin is unmeasured.',
      affectedGroup: 'Off-hours admissions and remote clinics with delayed lab turnaround',
      targetTab: 'robustness',
    },
    {
      id: 'calibration-error',
      name: 'Severe Epistemic Overconfidence',
      shortTag: 'CALIBRATION',
      metric: '89% Conf / 72% Actual',
      severity: 'HIGH RISK',
      severityColor: 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]',
      nodeSize: 'medium',
      clinicalPatient: 'Atypical presentation with contradictory vitals and borderline labs',
      clinicalReality: 'Empirical correctness is only 72% for cases in the highest confidence decile',
      observedOutput: '96% Softmax Confidence',
      modelConfidence: 'Overconfident by 24 percentage points',
      underlyingProblem: 'Standard softmax cross-entropy loss produces overconfident probability spikes on out-of-distribution inputs.',
      safetyImplication: 'Clinicians trust the high confidence score and skip routine manual verification.',
      recommendedSafeguard: 'Apply post-hoc temperature scaling and integrate conformal prediction intervals.',
      affectedGroup: 'Borderline or atypical high-acuity patients',
      targetTab: 'uncertainty',
    },
  ];

  const [activeNodeId, setActiveNodeId] = useState<string>(initialNodeId || 'edge-case-septic');
  const activeNode = failureNodes.find((n) => n.id === activeNodeId) || failureNodes[0];

  React.useEffect(() => {
    if (initialNodeId) {
      setActiveNodeId(initialNodeId);
    }
  }, [initialNodeId]);

  return (
    <div id="view-failure-map" className="space-y-8 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EF] text-[#0F5132] text-xs font-bold border border-[#DDE8E2]">
              <Network className="w-3.5 h-3.5 text-[#16845B]" />
              TOPOLOGICAL VULNERABILITY BOUNDARY
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-[#17221D] tracking-tight">
              FAILURE MAP &bull; TRUST BOUNDARY
            </h1>
            
            <p className="text-base font-semibold text-[#D64545]">
              Discovered conditions under which model safety collapses into patient risk.
            </p>
            
            <p className="text-xs sm:text-sm text-[#64736B] leading-relaxed">
              This interactive map connects candidate model <strong>CardioScan Net v1.4</strong> to its empirical failure points. Click any failure node to inspect the exact clinical mechanism and discover hidden failure modes.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-2 shrink-0">
            <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] text-center min-w-[200px]">
              <span className="text-[10px] font-bold uppercase text-[#D64545] block">
                IMPACT ON DEPLOYMENT
              </span>
              <span className="text-xl font-black text-[#D64545] block my-0.5">
                DEPLOYMENT BLOCKED
              </span>
              <span className="text-xs text-[#64736B]">4 Critical &bull; 2 High-Risk Nodes</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE VISUAL FAILURE MAP (Center: Model -> Failure Nodes -> DEPLOYMENT RISK) */}
      <div className="bg-[#FFFFFF] border-2 border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DDE8E2] pb-4">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64736B]">
              INTERACTIVE TRUST BOUNDARY TOPOLOGY
            </h3>
            <span className="text-xs text-[#17221D] font-medium">
              Click any node to open the clinical &ldquo;Why This Matters&rdquo; case inspection
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 font-bold text-[#D64545]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D64545] animate-ping" />
              Critical Blocker
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[#D98C00]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D98C00]" />
              High Risk
            </span>
          </div>
        </div>

        {/* Constellation Topology Grid */}
        <div className="relative p-6 sm:p-8 rounded-2xl bg-[#F6FAF8] border border-[#DDE8E2] overflow-hidden">
          
          {/* Top Center: The Model */}
          <div className="max-w-md mx-auto mb-8 p-4 rounded-2xl bg-[#FFFFFF] border-2 border-[#16845B] shadow-sm text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#16845B] block">
              EVALUATED MODEL UNDER CRASH TEST
            </span>
            <h2 className="text-xl font-black text-[#17221D]">
              CardioScan Net v1.4
            </h2>
            <div className="text-xs text-[#64736B]">
              Intended Target: <strong>Rural Community Clinic</strong>
            </div>
          </div>

          {/* Radial Nodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {failureNodes.map((node) => {
              const isActive = activeNodeId === node.id;
              const isCritical = node.severity === 'CRITICAL';

              return (
                <div
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer space-y-3 relative ${
                    isActive
                      ? 'bg-[#FFFFFF] border-[#D64545] ring-2 ring-[#D64545]/20 shadow-md scale-[1.02]'
                      : isCritical
                      ? 'bg-[#FFFFFF] border-[#F8B4B4] hover:border-[#D64545]'
                      : 'bg-[#FFFFFF] border-[#DDE8E2] hover:border-[#D98C00]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded uppercase ${
                      isCritical ? 'bg-[#FDE8E8] text-[#D64545]' : 'bg-[#FEF3C7] text-[#D98C00]'
                    }`}>
                      {node.shortTag}
                    </span>

                    <span className="text-xs font-black text-[#D64545]">
                      {node.metric}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-[#17221D] leading-tight">
                      {node.name}
                    </h4>
                    <p className="text-[11px] text-[#64736B] line-clamp-2 mt-1">
                      {node.underlyingProblem}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#DDE8E2] flex items-center justify-between text-[11px]">
                    <span className="text-[#D64545] font-bold">
                      &bull; Connects to: DEPLOYMENT RISK
                    </span>
                    <span className="font-bold text-[#16845B] flex items-center gap-1">
                      Inspect <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner: Terminal Risk Aggregator */}
          <div className="mt-8 p-4 rounded-xl bg-[#FFFFFF] border-2 border-[#D64545] shadow-xs text-center space-y-1">
            <div className="text-xs font-black uppercase text-[#D64545] tracking-wider flex items-center justify-center gap-2">
              <AlertOctagon className="w-4 h-4 text-[#D64545]" />
              <span>TERMINAL DEPLOYMENT RISK</span>
            </div>
            <p className="text-xs text-[#17221D] font-medium max-w-xl mx-auto">
              All 6 failure nodes violate the safe operating envelope of the Rural Community Clinic. Pre-deployment authorization is blocked.
            </p>
          </div>
        </div>
      </div>

      {/* 3. CLINICAL CASE STUDY INSPECTION: "WHY THIS MATTERS" */}
      <div
        id="section-why-this-matters"
        className="bg-[#FFFFFF] border-2 border-[#D64545] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE8E2] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded border uppercase ${activeNode.severityColor}`}>
                {activeNode.severity} &bull; {activeNode.shortTag}
              </span>
              <span className="text-xs font-bold text-[#64736B]">
                &bull; Case Inspection
              </span>
            </div>

            <h2 className="text-2xl font-black text-[#17221D] tracking-tight">
              WHY THIS MATTERS &mdash; {activeNode.name.toUpperCase()}
            </h2>
          </div>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: activeNode.name,
                condition: activeNode.metric,
                baselineScore: 92,
                stressScore: 74,
                dropPercentage: 18,
                details: `${activeNode.clinicalPatient}. ${activeNode.underlyingProblem}. Safety implication: ${activeNode.safetyImplication}`,
              })
            }
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] font-bold text-xs transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#16845B]" />
            <span>EXPLAIN IN CLINICAL TERMS</span>
          </button>
        </div>

        {/* Structured Clinical Breakdown: Patient, Reality, Output, Problem, Implication, Safeguard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64736B] block">
              PATIENT PROFILE
            </span>
            <p className="text-sm font-extrabold text-[#17221D]">
              {activeNode.clinicalPatient}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D64545] block">
              CLINICAL REALITY (GROUND TRUTH)
            </span>
            <p className="text-sm font-extrabold text-[#D64545]">
              {activeNode.clinicalReality}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#DDE8E2] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64736B] block">
              OBSERVED MODEL OUTPUT &amp; CONFIDENCE
            </span>
            <div className="text-sm font-extrabold text-[#17221D]">
              Output: {activeNode.observedOutput}
            </div>
            <div className="text-xs font-bold text-[#D64545]">
              Confidence: {activeNode.modelConfidence}
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#FFFFFF] border border-[#DDE8E2] space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F5132] block">
              AFFECTED PATIENT GROUP
            </span>
            <p className="text-xs font-semibold text-[#0F5132]">
              {activeNode.affectedGroup}
            </p>
          </div>

        </div>

        {/* Problem & Safety Implication */}
        <div className="space-y-3 text-xs">
          <div className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#64736B] block">
              WHY THE MODEL FAILED (UNDERLYING MECHANISM)
            </span>
            <p className="text-xs text-[#17221D] leading-relaxed font-medium">
              {activeNode.underlyingProblem}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#D64545] block">
              PATIENT SAFETY IMPLICATION
            </span>
            <p className="text-xs text-[#D64545] leading-relaxed font-bold">
              {activeNode.safetyImplication}
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#E8F5EF] border border-[#16845B] space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F5132] block">
              RECOMMENDED SAFEGUARD BEFORE DEPLOYMENT
            </span>
            <p className="text-xs text-[#0F5132] leading-relaxed font-bold">
              {activeNode.recommendedSafeguard}
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-4 border-t border-[#DDE8E2] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs text-[#64736B]">
            All 6 failure nodes disproportionately harm specific patient populations. Trace subgroup disparity next.
          </span>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('fairness')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white font-extrabold text-xs shadow-xs transition-colors shrink-0"
            >
              <span>STEP 5: DISCOVER WHO IS AFFECTED</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onNavigateTab('safety_passport')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#0F5132] border border-[#DDE8E2] font-bold text-xs transition-colors shrink-0"
            >
              <span>Skip to Passport</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
