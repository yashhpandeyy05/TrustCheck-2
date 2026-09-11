import React, { useState } from 'react';
import {
  FileCheck2,
  Printer,
  Copy,
  Check,
} from 'lucide-react';
import { ModelProfile } from '../../types';

interface AuditReportViewProps {
  currentModel: ModelProfile;
  retestedScore?: number;
  onNavigateTab?: (tab: any) => void;
}

export const AuditReportView: React.FC<AuditReportViewProps> = ({
  currentModel,
  retestedScore = 58,
}) => {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `TRUSTCHECK PRE-DEPLOYMENT HEALTHCARE AI SAFETY REPORT
Model: ${currentModel.name} ${currentModel.version}
Intended Use: Emergency cardiac triage
Testing Environment: Rural Clinic (Device B Handheld Telemetry, 50 Hz)
Initial Safety Score: 58 / 100 (NOT SAFE TO DEPLOY)
Critical Failure Modes: 3 Blockers (Hardware Shift, 18% Fairness Gap, Beta-Blocker Masked Shock)
Simulated Remediation Score: ${retestedScore} / 100
Deployment Recommendation: ${retestedScore >= 80 ? 'CONDITIONAL PILOT APPROVAL WITH CLINICAL OVERRIDE' : 'REJECTED FOR CLINICAL TRIAGE'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sections = [
    {
      title: '1. Executive Summary',
      status: retestedScore >= 80 ? 'CONDITIONAL' : 'FAIL',
      statusClass: retestedScore >= 80 ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 'bg-red-50 text-red-800 border-red-200',
      summary:
        `This formal pre-deployment safety audit evaluated ${currentModel.name} ${currentModel.version} for emergency cardiac triage in the Rural Clinic environment. Despite 92.4% baseline lab accuracy, stress testing over 1,900 simulated clinical cases uncovered 3 critical failure modes. Initial safety score is 58/100 (NOT SAFE TO DEPLOY). ${retestedScore >= 80 ? 'With TrustCheck recommended transfer fine-tuning, fairness regularization, and deterministic beta-blocker clinical overrides, simulated readiness reaches 84/100 (Conditional Pilot Clearance).' : 'Unassisted clinical triage is strictly prohibited until certified remedies are applied.'}`,
    },
    {
      title: '2. Model Information',
      status: 'PASS',
      statusClass: 'bg-[var(--color-accent)] text-white border-transparent',
      summary:
        `Architecture: Temporal Convolutional Network with Spectral Normalization. Intended clinical use: Emergency cardiac triage priority classification. Prohibited use: Unmonitored discharge or solitary diagnostic authority without physician verification.`,
    },
    {
      title: '3. Testing Environment',
      status: 'FAIL',
      statusClass: 'bg-red-50 text-red-800 border-red-200',
      summary:
        'Target deployment facility: Rural Community Clinic. Hardware: Device B Handheld Telemetry (50 Hz downsampled vs 100 Hz hospital cart ECG). Operational realities: 25% delayed troponin/lactate turnaround (3-hour courier transport), median patient age 68.2 years.',
    },
    {
      title: '4. Robustness',
      status: 'FAIL',
      statusClass: 'bg-red-50 text-red-800 border-red-200',
      summary:
        'Biomarker missingness tests revealed severe vulnerability: delayed troponin drops accuracy from 92% to 80% (-12%) due to zero-imputation. Telemetry sensor noise and motion artifacts drop diagnostic recall by 18 percentage points.',
    },
    {
      title: '5. Fairness',
      status: 'FAIL',
      statusClass: 'bg-red-50 text-red-800 border-red-200',
      summary:
        'Demographic audit identified an 18 percentage point disparity gap (95% accuracy for majority cohort vs 77% for underrepresented rural minority cohort). False negative rate is 4.6× higher in the vulnerable population.',
    },
    {
      title: '6. Environment Shift',
      status: 'FAIL',
      statusClass: 'bg-red-50 text-red-800 border-red-200',
      summary:
        'Environment Compatibility Index measured at 44% (HIGH SHIFT RISK). Statistically significant shifts across sensor sampling rates (100 Hz vs 50 Hz), geriatric age distributions, and delayed lab turnaround.',
    },
    {
      title: '7. Edge Cases',
      status: 'FAIL',
      statusClass: 'bg-red-50 text-red-800 border-red-200',
      summary:
        '5 of 6 clinical edge case scenarios failed. Most dangerous failure: In a septic shock patient receiving chronic beta-blocker therapy, the model assigned 98% confidence to "Low Risk" due to blunted heart-rate response, masking life-threatening deterioration.',
    },
    {
      title: '8. Uncertainty',
      status: 'WARNING',
      statusClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      summary:
        'Model suffers from +17% epistemic overconfidence under degraded inputs. Average predicted confidence is 89% when empirical correctness drops to 72%. It fails to flag low-confidence warnings when inputs degrade.',
    },
    {
      title: '9. Critical Failure Modes',
      status: 'CRITICAL',
      statusClass: 'bg-red-50 text-red-800 border-red-200',
      summary:
        'Top 3 blockers: (1) Hardware Shift: 92% → 74% accuracy on Device B 50 Hz telemetry; (2) Fairness Gap: 95% → 77% accuracy for rural underrepresented patients; (3) Dangerous Edge Case: 98% confidence WRONG on beta-blocker masked septic shock.',
    },
    {
      title: '10. Affected Populations',
      status: 'WARNING',
      statusClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
      summary:
        'Cohorts facing acute clinical hazard: (a) Rural underrepresented patients experiencing 4.6× higher missed cardiac triage; (b) Geriatric patients on chronic beta-blockers presenting with atypical shock; (c) Patients evaluated on Device B handheld monitors.',
    },
    {
      title: '11. Deployment Recommendation',
      status: retestedScore >= 80 ? 'CONDITIONAL' : 'FAIL',
      statusClass: retestedScore >= 80 ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : 'bg-red-50 text-red-800 border-red-200',
      summary: retestedScore >= 80
        ? '🟡 CONDITIONAL CLINICAL PILOT AUTHORIZED. Model cleared strictly with mandatory physician oversight, Device B transfer calibration, and deterministic clinical rule override for all beta-blocker cases.'
        : '🔴 NOT SAFE TO DEPLOY (Score: 58/100). Autonomous triage is strictly prohibited. Deployment gate locked until certified algorithmic and clinical fixes are applied.',
    },
    {
      title: '12. Recommended Next Steps',
      status: 'PASS',
      statusClass: 'bg-[var(--color-accent)] text-white border-transparent',
      summary:
        'Five required actions: (1) Fine-tune model using 2,000 local Device B recordings; (2) Add missing-lab uncertainty handling; (3) Apply fairness regularization loss; (4) Enforce deterministic clinical rule override for beta-blockers; (5) Apply post-hoc temperature calibration.',
    },
  ];

  return (
    <div id="view-audit-report" className="max-w-5xl mx-auto space-y-8 font-sans pb-16">
      
      {/* Action Bar (No-Print) */}
      <div className="bg-white border-b border-gray-200 pb-6 mb-8 no-print flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest">
            <FileCheck2 className="w-3 h-3" />
            <span>Official Governance Audit</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-black text-gray-900 tracking-tight leading-none">
            Healthcare AI Safety Report.
          </h1>
          <p className="text-sm text-gray-600 max-w-2xl font-medium">
            Printable pre-deployment evaluation document for hospital ethics boards, clinical department heads, and AI safety committees.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 hover:bg-gray-50 text-gray-900 text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4 text-[var(--color-accent)]" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* The Official Report Paper (Print Styled) */}
      <div className="bg-white border-4 border-gray-900 p-8 sm:p-12 space-y-12 shadow-sm print:border-none print:p-0 print:shadow-none">
        
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-8 border-b-2 border-gray-900">
          <div className="space-y-4">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block">
              TRUSTCHECK AUDIT REF: TC-RUR-2026-09
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-gray-900 tracking-tight leading-none">
              Pre-Deployment Audit.
            </h2>
            <div className="text-xs text-gray-700 pt-2 flex flex-col gap-2">
              <span><strong className="text-gray-900">Model:</strong> {currentModel.name} {currentModel.version}</span>
              <span><strong className="text-gray-900">Environment:</strong> Rural Community Clinic</span>
              <span><strong className="text-gray-900">Date:</strong> September 2026</span>
              <span><strong className="text-gray-900">Evaluations:</strong> 1,900 Simulated Clinical Cases</span>
            </div>
          </div>

          <div className="shrink-0 flex sm:flex-col items-end gap-3 text-right border-l-2 border-gray-900 pl-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block">
              Final Verdict
            </span>
            <span
              className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border ${
                retestedScore >= 80
                  ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                  : 'bg-red-50 text-red-800 border-red-200'
              }`}
            >
              {retestedScore >= 80 ? 'Conditional Pilot' : 'Not Safe To Deploy'}
            </span>
            <span className="text-xs font-bold text-gray-900">
              Safety Score: {retestedScore} / 100
            </span>
          </div>
        </div>

        {/* 12 Standardized Audit Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((sec, idx) => (
            <div
              key={idx}
              className="p-6 bg-gray-50 border border-gray-200 flex flex-col space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-bold text-gray-900">
                  {sec.title}
                </h3>
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 border ${sec.statusClass} shrink-0`}>
                  {sec.status}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm">
                {sec.summary}
              </p>
            </div>
          ))}
        </div>

        {/* Clinical Disclaimer & Sign-off Block */}
        <div className="pt-8 border-t-2 border-gray-900 space-y-6">
          <p className="italic text-xs text-gray-500 leading-relaxed">
            Notice: TrustCheck is a decision support and safety testing platform for clinical professionals and healthcare institutions. TrustCheck never makes clinical decisions and does not replace the judgment of licensed physicians. Results are simulated for pre-deployment stress testing.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-4 bg-gray-50 border border-gray-200 space-y-2">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest block">Clinical AI Safety Officer</span>
              <span className="text-[var(--color-accent)] font-bold text-xs flex items-center gap-1">
                <Check className="w-3 h-3" /> Certified Sign-off
              </span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 space-y-2">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest block">Emergency Dept Director</span>
              <span className="text-gray-900 font-bold text-xs flex items-center gap-1">
                {retestedScore >= 80 ? (
                  <><Check className="w-3 h-3 text-[var(--color-accent)]" /> Approved for Monitored Pilot</>
                ) : (
                  'Pending Recommended Remediation'
                )}
              </span>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 space-y-2">
              <span className="text-xs font-bold text-gray-900 uppercase tracking-widest block">Hospital Ethics Committee</span>
              <span className="text-gray-900 font-bold text-xs">
                {retestedScore >= 80 ? 'Human-in-the-loop Mandated' : 'Gate Locked'}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
