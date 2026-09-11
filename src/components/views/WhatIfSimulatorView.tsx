import React, { useState } from 'react';
import {
  Sliders,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  TrendingDown,
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
} from 'lucide-react';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface WhatIfSimulatorViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

export const WhatIfSimulatorView: React.FC<WhatIfSimulatorViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  // Required 4 controls:
  // 1. Missing data: 0% to 50%
  const [missingData, setMissingData] = useState<number>(20);
  // 2. Sensor noise: Low / Med / High
  const [sensorNoise, setSensorNoise] = useState<'Low' | 'Med' | 'High'>('Med');
  // 3. Device type: Device A / Device B / Device C
  const [deviceType, setDeviceType] = useState<'Device A' | 'Device B' | 'Device C'>('Device B');
  // 4. Patient age: Young / Adult / Geriatric
  const [patientAge, setPatientAge] = useState<'Young' | 'Adult' | 'Geriatric'>('Geriatric');

  // Dynamic calculations
  const baseScore = 92;
  const missingPenalty = Math.round(missingData * 0.35);
  const noisePenalty = sensorNoise === 'High' ? 12 : sensorNoise === 'Med' ? 6 : 0;
  const devicePenalty = deviceType === 'Device C' ? 22 : deviceType === 'Device B' ? 16 : 0;
  const agePenalty = patientAge === 'Geriatric' ? 14 : patientAge === 'Young' ? 4 : 0;

  const totalPenalty = missingPenalty + noisePenalty + devicePenalty + agePenalty;
  const updatedAccuracy = Math.max(54, baseScore - totalPenalty);
  const updatedTrustScore = Math.max(28, Math.round(88 - (totalPenalty * 1.15)));

  // Dynamic Risk Alerts
  const activeAlerts: { id: string; level: 'CRITICAL' | 'WARNING' | 'NOTICE'; text: string }[] = [];
  if (deviceType === 'Device B' || deviceType === 'Device C') {
    activeAlerts.push({
      id: 'dev-alert',
      level: deviceType === 'Device C' ? 'CRITICAL' : 'WARNING',
      text: `${deviceType} telemetry downsampling causes significant loss of high-frequency cardiac waveform features.`,
    });
  }
  if (missingData >= 25) {
    activeAlerts.push({
      id: 'missing-alert',
      level: 'CRITICAL',
      text: `${missingData}% missing laboratory values triggers default zero-imputation, masking acute patient deterioration.`,
    });
  }
  if (patientAge === 'Geriatric') {
    activeAlerts.push({
      id: 'age-alert',
      level: 'WARNING',
      text: 'Geriatric cohort exhibits blunted fever and subtle atypical vital signs, elevating false negative risk.',
    });
  }
  if (sensorNoise === 'High') {
    activeAlerts.push({
      id: 'noise-alert',
      level: 'WARNING',
      text: 'High sensor jitter and shivering motion artifacts cause frequent false ventricular tachycardia alarms.',
    });
  }

  const handleReset = () => {
    setMissingData(0);
    setSensorNoise('Low');
    setDeviceType('Device A');
    setPatientAge('Adult');
  };

  return (
    <div id="view-what-if-simulator" className="space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#16845B] font-bold uppercase">
              <Sliders className="w-4 h-4" />
              INTERACTIVE SYNTHETIC PROJECTION
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              &ldquo;WHAT IF?&rdquo; SIMULATOR
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B]">
              Test what happens when operating conditions change. Adjust missing data, noise, device types, and patient age demographics in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#F6FAF8] hover:bg-[#E8F5EF] text-[#17221D] border border-[#DDE8E2] text-xs font-bold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Baseline</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Controls Grid */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="border-b border-[#DDE8E2] pb-3">
          <h3 className="text-base font-extrabold text-[#17221D]">
            Simulation Parameters
          </h3>
          <p className="text-xs text-[#64736B]">
            Configure hypothetical hospital or clinic deployment environments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Control 1: Missing Data (0% to 50%) */}
          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-[#64736B]">Missing Data:</span>
              <span className="text-[#16845B]">{missingData}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              step={5}
              value={missingData}
              onChange={(e) => setMissingData(parseInt(e.target.value))}
              className="w-full accent-[#16845B] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#64736B]">
              <span>0% (Complete Labs)</span>
              <span>25% (Clinic Delay)</span>
              <span>50% (Extreme Gap)</span>
            </div>
          </div>

          {/* Control 2: Sensor Noise (Low / Med / High) */}
          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
            <span className="font-bold text-[#64736B] block">Sensor Noise &amp; Motion:</span>
            <div className="grid grid-cols-3 gap-2">
              {(['Low', 'Med', 'High'] as const).map((level) => (
                <button
                  key={level}
                  onClick={() => setSensorNoise(level)}
                  className={`py-2 rounded-lg font-bold border transition-all ${
                    sensorNoise === level
                      ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B]'
                      : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Control 3: Device Type (Device A / Device B / Device C) */}
          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
            <span className="font-bold text-[#64736B] block">Hardware Device:</span>
            <div className="grid grid-cols-3 gap-2">
              {(['Device A', 'Device B', 'Device C'] as const).map((dev) => (
                <button
                  key={dev}
                  onClick={() => setDeviceType(dev)}
                  className={`py-2 rounded-lg font-bold border transition-all ${
                    deviceType === dev
                      ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B]'
                      : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
                  }`}
                >
                  {dev}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-[#64736B] block">
              {deviceType === 'Device A' && 'Hospital A Academic Standard (100 Hz)'}
              {deviceType === 'Device B' && 'Rural Clinic Handheld Telemetry (50 Hz)'}
              {deviceType === 'Device C' && 'Wireless Wearable Sensor Patch (25 Hz)'}
            </span>
          </div>

          {/* Control 4: Patient Age (Young / Adult / Geriatric) */}
          <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
            <span className="font-bold text-[#64736B] block">Patient Age Group:</span>
            <div className="grid grid-cols-3 gap-2">
              {(['Young', 'Adult', 'Geriatric'] as const).map((age) => (
                <button
                  key={age}
                  onClick={() => setPatientAge(age)}
                  className={`py-2 rounded-lg font-bold border transition-all ${
                    patientAge === age
                      ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B]'
                      : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
                  }`}
                >
                  {age}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-[#64736B] block">
              {patientAge === 'Young' && 'Age 18-35 (Classic presentations)'}
              {patientAge === 'Adult' && 'Age 36-64 (Primary training cohort)'}
              {patientAge === 'Geriatric' && 'Age >65 (Complex comorbidities & blunted vitals)'}
            </span>
          </div>

        </div>
      </div>

      {/* 3. Output Metrics: Safe Trust Score & Accuracy */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Updated Safe Trust Score */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDE8E2] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#64736B]">
              UPDATED SAFE TRUST SCORE
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
              updatedTrustScore < 60
                ? 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]'
                : updatedTrustScore < 75
                ? 'bg-[#FEF3C7] text-[#D98C00] border-[#FDE68A]'
                : 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]'
            }`}>
              {updatedTrustScore < 60 ? 'UNSAFE' : updatedTrustScore < 75 ? 'CAUTION' : 'SAFE'}
            </span>
          </div>

          <div className="text-4xl font-black text-[#17221D]">
            {updatedTrustScore} <span className="text-base text-[#64736B]">/ 100</span>
          </div>

          <p className="text-xs text-[#64736B]">
            {updatedTrustScore < 60
              ? 'Model cannot be safely trusted under these conditions. Human clinical override required.'
              : 'Acceptable safety envelope for supervised clinical decision support.'}
          </p>
        </div>

        {/* Updated Accuracy */}
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDE8E2] shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-[#64736B]">
              UPDATED ACCURACY
            </span>
            <span className="text-xs font-bold text-[#D64545]">
              -{totalPenalty}% Drop vs Baseline
            </span>
          </div>

          <div className="text-4xl font-black text-[#17221D]">
            {updatedAccuracy}%
          </div>

          <p className="text-xs text-[#64736B]">
            Simulated empirical accuracy under selected hardware, noise, age, and lab missingness variables.
          </p>
        </div>

      </div>

      {/* 4. Real-time Risk Alerts */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#DDE8E2] pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-[#D98C00]" />
            <h3 className="font-extrabold text-[#17221D] text-sm">
              Active Simulation Risk Alerts ({activeAlerts.length})
            </h3>
          </div>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: `Simulation Degradation (Score: ${updatedTrustScore}/100)`,
                condition: `${deviceType}, ${missingData}% Missing Labs, ${patientAge} cohort`,
                baselineScore: 92,
                stressScore: updatedAccuracy,
                dropPercentage: totalPenalty,
                details: `Operating under ${deviceType} with ${missingData}% missing labs drops accuracy from 92% down to ${updatedAccuracy}%.`,
              })
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16845B]" />
            <span>EXPLAIN THIS SIMULATION</span>
          </button>
        </div>

        {activeAlerts.length === 0 ? (
          <div className="p-4 rounded-xl bg-[#E8F5EF] border border-[#DDE8E2] text-xs text-[#0F5132] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Optimal baseline operating conditions. All clinical safety metrics within nominal thresholds.</span>
          </div>
        ) : (
          <div className="space-y-2.5 text-xs">
            {activeAlerts.map((alt) => (
              <div
                key={alt.id}
                className="p-3 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] flex items-start gap-2.5"
              >
                <AlertOctagon className={`w-4 h-4 shrink-0 mt-0.5 ${
                  alt.level === 'CRITICAL' ? 'text-[#D64545]' : 'text-[#D98C00]'
                }`} />
                <span className="text-[#17221D] leading-relaxed">{alt.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
