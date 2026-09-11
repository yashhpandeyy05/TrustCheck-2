import React, { useState } from 'react';
import {
  Activity,
  AlertTriangle,
  TrendingDown,
  Clock,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Play,
  Sliders,
  ShieldCheck,
  ShieldX,
  AlertOctagon,
  FileText,
} from 'lucide-react';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface MonitoringViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const MonitoringView: React.FC<MonitoringViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  const [selectedMonthIdx, setSelectedMonthIdx] = useState<number>(3); // Default April
  const [injectedMayData, setInjectedMayData] = useState<boolean>(false);
  const [safetyPolicyMode, setSafetyPolicyMode] = useState<'dual_review' | 'autonomous' | 'fallback'>('dual_review');

  const timelineData = [
    {
      month: 'Month 1 (Jan)',
      accuracy: 94,
      disparityGap: 8,
      status: 'NORMAL',
      statusColor: 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]',
      driftScore: '2% Drift',
      notes: 'Initial clinical deployment across Academic Hospital A cardiology wards.',
    },
    {
      month: 'Month 2 (Feb)',
      accuracy: 91,
      disparityGap: 11,
      status: 'STABLE',
      statusColor: 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]',
      driftScore: '5% Drift',
      notes: 'Seasonal respiratory influx introduced minor vital sign variance.',
    },
    {
      month: 'Month 3 (Mar)',
      accuracy: 86,
      disparityGap: 14,
      status: 'WARNING',
      statusColor: 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]',
      driftScore: '14% Drift',
      notes: 'Pilot expansion to Community Clinic begins; first batch of Device B telemetry introduced.',
    },
    {
      month: 'Month 4 (Apr)',
      accuracy: 81,
      disparityGap: 18,
      status: 'CRITICAL',
      statusColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      driftScore: '24% Drift',
      notes: 'Full clinic adoption. Delayed lab send-outs and 50 Hz monitors cause rapid accuracy erosion.',
    },
    ...(injectedMayData
      ? [
          {
            month: 'Month 5 (May - Live Stream)',
            accuracy: 74,
            disparityGap: 24,
            status: 'HAZARD',
            statusColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
            driftScore: '38% Drift',
            notes: 'Synthetic streaming batch: 80% beds on Device B telemetry. High-frequency cardiac feature loss induced further collapse.',
          },
        ]
      : []),
  ];

  const activeMonth = timelineData[selectedMonthIdx] || timelineData[timelineData.length - 1];

  const driftAlerts = [
    {
      id: 'alert-1',
      severity: 'CRITICAL',
      title: 'Device Sampling Rate Shift Detected',
      time: '2 hours ago',
      desc: 'Significant divergence in frequency band power on Telemetry Ward 4B. 50 Hz downsampled hardware identified.',
    },
    {
      id: 'alert-2',
      severity: 'HIGH',
      title: 'Lab Missingness Exceeded 20% Floor',
      time: '1 day ago',
      desc: 'Send-out turnaround times delayed troponin results for 32 consecutive chest pain presentations.',
    },
    {
      id: 'alert-3',
      severity: 'HIGH',
      title: 'Subgroup Disparity Alarm Triggered',
      time: '3 days ago',
      desc: 'Demographic Group B false negative rate rose to 28.0% over rolling 14-day window.',
    },
  ];

  const incidentLogs = [
    {
      id: 'INC-2026-088',
      date: 'April 14, 2026',
      unit: 'Rural Clinic ED',
      event: 'Beta-Blocker Sepsis Masking (Edge Case #07)',
      impact: 'AI emitted Low Risk (98% conf). Nurse caught hypotension manually; ICU transfer delayed by 90 minutes.',
      resolution: 'Fallback policy engaged. Clinical rule override mandated for all patients on beta-blockers.',
    },
    {
      id: 'INC-2026-061',
      date: 'March 28, 2026',
      unit: 'Telemetry Ward 3',
      event: 'Tremor-Induced False VTach Alarm',
      impact: 'Shivering patient triggered 3 false arrhythmia alerts in 45 minutes.',
      resolution: 'Bandpass filter smoothing activated at bedside monitor.',
    },
  ];

  return (
    <div id="view-monitoring" className="space-y-6 font-sans">
      
      {/* 1. Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#16845B] font-bold uppercase">
              <Activity className="w-4 h-4" />
              SURVEILLANCE &amp; SAFETY TELEMETRY
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              POST-DEPLOYMENT MONITORING
            </h1>
            <p className="text-sm font-semibold text-[#0F5132]">
              &ldquo;Safety testing doesn&apos;t stop at deployment.&rdquo;
            </p>
            <p className="text-xs text-[#64736B]">
              Continuous telemetry tracks real-world data drift, performance decay, demographic disparities, and clinical incidents over time.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!injectedMayData ? (
              <button
                onClick={() => {
                  setInjectedMayData(true);
                  setSelectedMonthIdx(4);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#16845B] hover:bg-[#0F5132] text-white text-xs font-bold transition-all shadow-xs"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Simulate Month 5 Batch</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  setInjectedMayData(false);
                  setSelectedMonthIdx(3);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#17221D] border border-[#DDE8E2] text-xs font-bold transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Simulation</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Top Row: Drift Alerts & Subgroup Disparity Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Drift Alerts */}
        <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#DDE8E2] pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#D64545]" />
              <h3 className="font-extrabold text-[#17221D] text-sm">
                Active Drift Alerts ({driftAlerts.length})
              </h3>
            </div>
            <span className="text-xs text-[#D64545] font-bold">2 Action Required</span>
          </div>

          <div className="space-y-3 text-xs">
            {driftAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-3.5 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    alert.severity === 'CRITICAL'
                      ? 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]'
                      : 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]'
                  }`}>
                    {alert.severity}
                  </span>
                  <span className="text-[#64736B] text-[10px]">{alert.time}</span>
                </div>
                <h4 className="font-bold text-[#17221D]">{alert.title}</h4>
                <p className="text-[#64736B] leading-relaxed">{alert.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Subgroup Disparity Over Time */}
        <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#DDE8E2] pb-3">
            <h3 className="font-extrabold text-[#17221D] text-sm">
              Subgroup Disparity Over Time
            </h3>
            <span className="text-xs text-[#D64545] font-bold">Gap Widened (+10 pts)</span>
          </div>

          <p className="text-xs text-[#64736B]">
            Monthly tracking reveals that equity degrades faster than aggregate accuracy as rural facility adoption increases.
          </p>

          <div className="space-y-3 text-xs">
            {timelineData.map((d, idx) => (
              <div
                key={d.month}
                onClick={() => setSelectedMonthIdx(idx)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedMonthIdx === idx
                    ? 'bg-[#E8F5EF] border-[#16845B]'
                    : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-[#17221D] block">{d.month}</span>
                  <span className="text-[#64736B] text-[11px]">{d.driftScore}</span>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div>
                    <span className="text-[#64736B] text-[10px] block">Disparity Gap:</span>
                    <strong className={d.disparityGap > 15 ? 'text-[#D64545]' : 'text-[#D98C00]'}>
                      {d.disparityGap} pts
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#64736B] text-[10px] block">Accuracy:</span>
                    <strong className={d.accuracy < 85 ? 'text-[#D64545]' : 'text-[#16845B]'}>
                      {d.accuracy}%
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 3. Performance Degradation Tracker (Monthly Trend) */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#DDE8E2]">
          <div>
            <span className="text-xs font-bold text-[#16845B] uppercase">LONGITUDINAL TELEMETRY</span>
            <h3 className="text-lg font-extrabold text-[#17221D]">
              Performance Degradation Tracker
            </h3>
            <p className="text-xs text-[#64736B]">
              Detailed notes and clinical context for selected deployment period ({activeMonth.month}).
            </p>
          </div>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: `Post-Deployment Drift (${activeMonth.month})`,
                condition: activeMonth.driftScore,
                baselineScore: 94,
                stressScore: activeMonth.accuracy,
                dropPercentage: 94 - activeMonth.accuracy,
                details: activeMonth.notes,
              })
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors shrink-0"
          >
            <Sparkles className="w-4 h-4 text-[#16845B]" />
            <span>EXPLAIN THIS DRIFT</span>
          </button>
        </div>

        <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-[#17221D] text-sm">{activeMonth.month} Clinical Notes:</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${activeMonth.statusColor}`}>
              {activeMonth.status}
            </span>
          </div>
          <p className="text-[#64736B] leading-relaxed">{activeMonth.notes}</p>
        </div>
      </div>

      {/* 4. Incident Log */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div className="border-b border-[#DDE8E2] pb-3">
          <h3 className="font-extrabold text-[#17221D] text-sm">
            Clinical Incident &amp; Adverse Event Log
          </h3>
          <p className="text-xs text-[#64736B]">
            Real-world occurrences where model failure intersected with patient care.
          </p>
        </div>

        <div className="space-y-3 text-xs">
          {incidentLogs.map((inc) => (
            <div
              key={inc.id}
              className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2 font-bold text-[#17221D]">
                  <span className="text-[#D64545]">{inc.id}</span>
                  <span>&bull; {inc.event}</span>
                </div>
                <div className="flex items-center gap-2 text-[#64736B] text-[11px]">
                  <span>{inc.unit}</span>
                  <span>&bull; {inc.date}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#DDE8E2] space-y-1">
                <span className="font-bold text-[#D64545] block">Clinical Impact:</span>
                <p className="text-[#64736B]">{inc.impact}</p>
              </div>

              <div className="text-[11px] text-[#0F5132]">
                <strong>Hospital Mitigation:</strong> {inc.resolution}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
