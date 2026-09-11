import React, { useState } from 'react';
import {
  FileCheck2,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  Building2,
  Calendar,
  AlertOctagon,
  ArrowRight,
  ShieldAlert,
  Download,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileText,
} from 'lucide-react';
import { ModelProfile } from '../../types';

interface SafetyPassportViewProps {
  currentModel: ModelProfile;
  onNavigateTab?: (tabId: any) => void;
}

export const SafetyPassportView: React.FC<SafetyPassportViewProps> = ({
  currentModel,
  onNavigateTab,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `TRUSTCHECK AI TRUST PASSPORT
Model: ${currentModel.name} ${currentModel.version}
Target Environment: ${currentModel.targetEnvironment}
Status: 🔴 NOT READY FOR DEPLOYMENT (Readiness: 58%)

SAFE FOR:
• Original Hospital A academic environment
• Complete laboratory inputs (<5% missing)
• Original calibrated 100 Hz ECG telemetry

NOT SAFE FOR:
• Device B handheld telemetry (50 Hz downsampled)
• Missing laboratory values (>10% delayed/missing)
• High-risk demographic subgroup (Group B)
• Beta-blocker + septic shock clinical edge cases

CRITICAL BLOCKERS:
1. 18-point device performance collapse (92% -> 74%)
2. 18-point demographic disparity gap (95% -> 77%, 4.6x false negatives)
3. High-confidence masked deterioration (98% confidence on dying patient)
4. Severe calibration overconfidence (24-point gap)

RECOMMENDED BEFORE RE-EVALUATION:
✓ Fine-tune on 2,000 local Device B recordings
✓ Apply demographic fairness regularization
✓ Add beta-blocker + elevated-lactate clinical rule override
✓ Apply temperature scaling confidence calibration
✓ Re-run Trust Crash Test

DECISION: Deployment is blocked until critical failures are resolved.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
    handlePrint();
  };

  const gateBlockers = [
    {
      unsafeBecause: 'Telemetry Downsampling Degradation',
      affected: 'Rural clinic observation & emergency beds using handheld monitors',
      evidence: 'Crash Test: 92% -> 74% accuracy drop (-18 percentage points)',
      remediation: 'Fine-tune feature weights on 2,000 local Device B waveforms',
    },
    {
      unsafeBecause: 'Severe Subgroup Disparity Gap',
      affected: 'Underrepresented demographic Group B patients',
      evidence: 'Fairness Audit: 77% accuracy vs 95% majority (4.6x higher false negative rate)',
      remediation: 'Apply fairness loss regularization and recalibrate subgroup decision threshold',
    },
    {
      unsafeBecause: 'High-Confidence Masked Sepsis Decompensation',
      affected: 'Cardiovascular patients on chronic beta-blocker therapy',
      evidence: 'Edge Case #07: Assigned 98% confidence to "LOW RISK" while patient in septic shock',
      remediation: 'Implement hardcoded clinical rule override for elevated lactate (>3.0 mmol/L)',
    },
    {
      unsafeBecause: 'Overconfidence Under Delayed Lab Turnarounds',
      affected: 'Patients awaiting 3-hour send-out cardiac enzyme panels',
      evidence: 'Calibration Audit: 24-point gap between reported confidence (96%) and accuracy (72%)',
      remediation: 'Apply temperature scaling (T=1.80) and enforce automated doctor referral below 85%',
    },
  ];

  return (
    <div id="view-safety-passport" className="space-y-8 font-sans">
      
      {/* 1. Header & Actions */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 no-print shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F5EF] text-[#0F5132] text-xs font-bold border border-[#DDE8E2]">
              <FileCheck2 className="w-3.5 h-3.5 text-[#16845B]" />
              INSTITUTIONAL DEPLOYMENT CREDENTIAL
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#17221D] tracking-tight">
              AI TRUST PASSPORT
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B] leading-relaxed">
              The certified deployment passport summarizing empirical boundaries, verified safe conditions, critical safety blockers, and required remediation steps before hospital deployment.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#0F5132] text-xs font-bold border border-[#DDE8E2] transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-[#16845B]" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Passport Text'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{downloaded ? 'Generating PDF...' : 'DOWNLOAD SAFETY REPORT'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. THE OFFICIAL CERTIFICATE / PASSPORT */}
      <div className="bg-[#FFFFFF] border-2 border-[#16845B] rounded-3xl p-6 sm:p-10 space-y-8 shadow-sm relative overflow-hidden print:border-none print:p-0">
        
        {/* Certificate Top Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#16845B] via-[#0F5132] to-[#16845B]" />

        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DDE8E2] pt-2">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-[#E8F5EF] border border-[#16845B] flex items-center justify-center font-black text-[#16845B] text-xl">
              TC
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#64736B] font-bold block">
                TRUSTCHECK &bull; HEALTHCARE AI SAFETY ACCREDITATION
              </span>
              <h2 className="text-2xl font-black text-[#17221D]">
                TRUSTCHECK AI TRUST PASSPORT
              </h2>
            </div>
          </div>

          <div className="text-left sm:text-right text-xs">
            <div className="text-[#64736B]">PASSPORT ID: <strong className="text-[#17221D]">TC-2026-CS88</strong></div>
            <div className="text-base font-black text-[#D64545] mt-0.5 flex items-center sm:justify-end gap-1.5">
              <span>🔴</span>
              <span>NOT READY FOR DEPLOYMENT</span>
            </div>
          </div>
        </div>

        {/* Model & Target Overview Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2]">
            <span className="text-[#64736B] block uppercase font-bold text-[10px]">CANDIDATE MODEL:</span>
            <strong className="text-base text-[#17221D] block mt-0.5">CardioScan Net v1.4</strong>
            <span className="text-[#64736B]">Deep Convolutional ECG &amp; Sepsis Classifier</span>
          </div>

          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2]">
            <span className="text-[#64736B] block uppercase font-bold text-[10px]">TARGET CLINIC ENVIRONMENT:</span>
            <strong className="text-base text-[#17221D] block mt-0.5">Rural Community Clinic</strong>
            <span className="text-[#64736B]">Handheld Telemetry &bull; Delayed Send-Out Labs</span>
          </div>

          <div className="p-4 rounded-xl bg-[#FDE8E8] border border-[#F8B4B4]">
            <span className="text-[#D64545] block uppercase font-bold text-[10px]">TRUST READINESS SCORE:</span>
            <strong className="text-2xl text-[#D64545] block mt-0.5">58%</strong>
            <span className="text-[#D64545] font-bold">4 Critical Safety Blockers</span>
          </div>
        </div>

        {/* SAFE FOR vs NOT SAFE FOR (Side-by-Side) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* SAFE FOR */}
          <div className="p-6 rounded-2xl bg-[#E8F5EF]/60 border border-[#16845B] space-y-3">
            <div className="flex items-center gap-2 font-black text-sm text-[#0F5132] uppercase">
              <CheckCircle2 className="w-5 h-5 text-[#16845B]" />
              <span>SAFE FOR:</span>
            </div>

            <ul className="space-y-2 text-[#0F5132] font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                Original Hospital A academic core lab environment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                Complete laboratory inputs (&lt;5% missing markers)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                Original calibrated 100 Hz 12-lead ECG telemetry
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16845B]" />
                Standard adult demographic populations (Age 35-64)
              </li>
            </ul>
          </div>

          {/* NOT SAFE FOR */}
          <div className="p-6 rounded-2xl bg-[#FDE8E8]/70 border border-[#F8B4B4] space-y-3">
            <div className="flex items-center gap-2 font-black text-sm text-[#D64545] uppercase">
              <XCircle className="w-5 h-5 text-[#D64545]" />
              <span>NOT SAFE FOR:</span>
            </div>

            <ul className="space-y-2 text-[#D64545] font-semibold">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                Device B handheld telemetry (50 Hz downsampled)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                Missing laboratory values (&gt;10% delayed/missing troponin)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                Underrepresented demographic subgroup (Group B)
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D64545]" />
                Beta-blocker + septic shock clinical edge cases
              </li>
            </ul>
          </div>

        </div>

        {/* 4 Critical Blockers */}
        <div className="p-6 rounded-2xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-3 text-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#D64545] block">
            CRITICAL PRE-DEPLOYMENT BLOCKERS (4 DETECTED)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[#17221D]">
            <div className="p-3.5 rounded-xl bg-white border border-[#DDE8E2]">
              <strong className="text-[#D64545] block mb-1">1. 18-Point Device Performance Collapse</strong>
              <p className="text-[#64736B]">92% accuracy drops to 74% under rural 50 Hz handheld telemetry downsampling.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#DDE8E2]">
              <strong className="text-[#D64545] block mb-1">2. 18-Point Demographic Disparity Gap</strong>
              <p className="text-[#64736B]">Underrepresented Cohort B suffers 4.6x higher missed deterioration rates.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#DDE8E2]">
              <strong className="text-[#D64545] block mb-1">3. High-Confidence Masked Deterioration</strong>
              <p className="text-[#64736B]">Assigned 98% confidence to &ldquo;LOW RISK&rdquo; on an actively dying septic shock patient.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-[#DDE8E2]">
              <strong className="text-[#D64545] block mb-1">4. Severe Epistemic Overconfidence</strong>
              <p className="text-[#64736B]">24-point gap between reported confidence (96%) and empirical correctness (72%).</p>
            </div>
          </div>
        </div>

        {/* RECOMMENDED BEFORE RE-EVALUATION */}
        <div className="p-6 rounded-2xl bg-[#E8F5EF] border border-[#16845B] space-y-3 text-xs">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#0F5132] block">
            RECOMMENDED ACTIONS BEFORE RE-EVALUATION
          </span>

          <div className="space-y-2 text-[#0F5132] font-semibold">
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <span>Fine-tune feature weights on 2,000 local Device B telemetry cases</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <span>Apply fairness regularization loss and separate subgroup decision thresholds</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <span>Add hardcoded beta-blocker + elevated-lactate (&gt;3.0 mmol/L) clinical rule override</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <span>Apply temperature scaling calibration (T=1.80) and physician deferral safety floor</span>
            </div>
            <div className="flex items-start gap-2">
              <Check className="w-4 h-4 text-[#16845B] shrink-0 mt-0.5" />
              <span>Re-run Trust Crash Test to verify elimination of the 4 critical blockers</span>
            </div>
          </div>
        </div>

        {/* Final Decision Statement */}
        <div className="p-5 rounded-2xl bg-[#FDE8E8] border-2 border-[#D64545] text-center space-y-1">
          <div className="text-sm font-black uppercase text-[#D64545] tracking-wide">
            DEPLOYMENT DECISION: 🔴 BLOCKED
          </div>
          <p className="text-xs font-bold text-[#17221D]">
            &ldquo;Deployment is blocked until critical failures are resolved.&rdquo;
          </p>
          <span className="text-[10px] text-[#64736B] block">
            Certified by TrustCheck Clinical AI Safety Evaluation Protocol &bull; ISO/IEC 42001
          </span>
        </div>

      </div>

      {/* 3. EXPLAINABLE DEPLOYMENT GATE PANEL */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE8E2] pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D64545] uppercase">
              <AlertOctagon className="w-4 h-4 text-[#D64545]" />
              EXPLAINABLE DEPLOYMENT GATE
            </div>
            <h3 className="text-xl font-black text-[#17221D] mt-0.5">
              Why Was Deployment Blocked?
            </h3>
            <p className="text-xs text-[#64736B]">
              Every blocked decision requires auditable rationale across cause, affected population, evidence, and remediation.
            </p>
          </div>

          <span className="px-4 py-1.5 rounded-xl bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4] font-black text-xs shrink-0">
            4 / 4 CRITICAL GATES FAILED
          </span>
        </div>

        {/* 4 Blockers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {gateBlockers.map((b, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2 hover:border-[#D64545] transition-colors"
            >
              <div className="font-extrabold text-sm text-[#17221D] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D64545]" />
                <span>UNSAFE BECAUSE: {b.unsafeBecause}</span>
              </div>

              <div className="text-[#64736B]">
                <strong className="text-[#17221D]">AFFECTED:</strong> {b.affected}
              </div>

              <div className="p-2.5 rounded-lg bg-white border border-[#F8B4B4] text-[#D64545] font-semibold">
                <strong>EVIDENCE:</strong> {b.evidence}
              </div>

              <div className="p-2.5 rounded-lg bg-[#E8F5EF] border border-[#DDE8E2] text-[#0F5132] font-semibold">
                <strong>REMEDIATION:</strong> {b.remediation}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
