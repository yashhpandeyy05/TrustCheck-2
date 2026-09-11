import React, { useState } from 'react';
import {
  SlidersHorizontal,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  Sparkles,
  ArrowRight,
  Database,
  Activity,
  HardDrive,
  Users,
  Play,
  RotateCcw,
  Sliders,
  AlertOctagon,
} from 'lucide-react';
import { ExplanationContext } from '../AIExplanationModal';
import { TermTooltip } from '../TermTooltip';

interface RobustnessViewProps {
  onExplainFinding: (ctx: ExplanationContext) => void;
  onNavigateTab: (tabId: any) => void;
}

type RobustnessSubTab = 'all' | 'missing' | 'noise' | 'devices' | 'populations';

export const RobustnessView: React.FC<RobustnessViewProps> = ({
  onExplainFinding,
  onNavigateTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<RobustnessSubTab>('all');

  // 1. Missing Information
  const [missingPercent, setMissingPercent] = useState<number>(25);
  const [imputationStrategy, setImputationStrategy] = useState<'zero' | 'mean' | 'forward_fill' | 'iterative'>('forward_fill');
  const [selectedMissingLabs, setSelectedMissingLabs] = useState<Record<string, boolean>>({
    troponin: true,
    lactate: true,
    abg_pao2: false,
    cbc_platelets: false,
    art_line_bp: false,
  });

  // 2. Noisy Inputs
  const [noiseMagnitude, setNoiseMagnitude] = useState<number>(35);
  const [noiseType, setNoiseType] = useState<'motion' | 'baseline_wander' | 'resp_jitter' | 'adc_quant'>('motion');

  // 3. Different Devices
  const [selectedDevice, setSelectedDevice] = useState<'device_a' | 'device_b' | 'device_c'>('device_b');

  // 4. Unseen Populations
  const [selectedPopulation, setSelectedPopulation] = useState<'hosp_a' | 'rural_poc' | 'subacute'>('rural_poc');
  const [ageSkewModifier, setAgeSkewModifier] = useState<number>(15);

  const [isTestingLive, setIsTestingLive] = useState(false);
  const [liveTestFeedback, setLiveTestFeedback] = useState<string | null>(null);

  // Calculations
  const missingLabsCount = Object.values(selectedMissingLabs).filter(Boolean).length;
  const missingImpactScore = Math.max(
    60,
    Math.round(92 - (missingPercent * 0.4) - (missingLabsCount * 2.5) + (imputationStrategy === 'iterative' ? 4 : imputationStrategy === 'zero' ? -6 : 0))
  );
  const missingDrop = 92 - missingImpactScore;

  const noiseImpactScore = Math.max(
    68,
    Math.round(92 - (noiseMagnitude * 0.22) - (noiseType === 'motion' ? 4 : 2))
  );
  const noiseDrop = 92 - noiseImpactScore;

  const deviceScores = {
    device_a: { name: 'Device A (Hospital A Standard 100Hz)', score: 92, drop: 0, status: 'PASS', desc: 'Calibrated high-bandwidth 12-lead baseline' },
    device_b: { name: 'Device B (Rural Clinic Handheld 50Hz)', score: 76, drop: 16, status: 'FAIL', desc: 'Hardware downsampling & analog filter strips subtle peak dynamics' },
    device_c: { name: 'Device C (Wearable Telemetry 25Hz)', score: 70, drop: 22, status: 'FAIL', desc: 'High motion artifact & compressed analog dynamic range' },
  };
  const activeDeviceData = deviceScores[selectedDevice];

  const handleRunLiveStress = (scenarioName: string) => {
    setIsTestingLive(true);
    setLiveTestFeedback(`Injecting stress perturbation: ${scenarioName}...`);
    setTimeout(() => {
      setIsTestingLive(false);
      setLiveTestFeedback(`Test complete. Captured performance degradation.`);
    }, 400);
  };

  return (
    <div id="view-robustness" className="space-y-6 font-sans">
      
      {/* Banner */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-[#16845B] font-bold uppercase">
              <SlidersHorizontal className="w-4 h-4" />
              PERTURBATION &amp; STRESS SIMULATOR
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17221D] tracking-tight">
              ROBUSTNESS TESTING LAB
            </h1>
            <p className="text-xs sm:text-sm text-[#64736B]">
              Healthcare AI must withstand realistic clinic conditions: missing lab results, shivering motion artifacts, and alternate hardware monitors.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] text-center shrink-0">
            <span className="text-[10px] uppercase text-[#D98C00] font-bold block">
              ROBUSTNESS RESILIENCE
            </span>
            <span className="text-3xl font-black text-[#D98C00]">
              64%
            </span>
            <span className="text-xs text-[#17221D] font-medium block mt-0.5">NEEDS REVIEW</span>
          </div>
        </div>

        {/* 4 Interactive Test Vectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6 pt-6 border-t border-[#DDE8E2]">
          <button
            onClick={() => setActiveSubTab('missing')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeSubTab === 'missing'
                ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
            }`}
          >
            <span className="text-xs font-bold text-[#17221D] block">1. Missing Information</span>
            <span className="text-xl font-black text-[#D98C00] block mt-1">{missingImpactScore}%</span>
            <span className="text-[11px] text-[#64736B]">25% lab panels suppressed</span>
          </button>

          <button
            onClick={() => setActiveSubTab('noise')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeSubTab === 'noise'
                ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
            }`}
          >
            <span className="text-xs font-bold text-[#17221D] block">2. Noisy Inputs</span>
            <span className="text-xl font-black text-[#D98C00] block mt-1">{noiseImpactScore}%</span>
            <span className="text-[11px] text-[#64736B]">Motion &amp; jitter artifacts</span>
          </button>

          <button
            onClick={() => setActiveSubTab('devices')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeSubTab === 'devices'
                ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
            }`}
          >
            <span className="text-xs font-bold text-[#17221D] block">3. Different Devices</span>
            <span className="text-xl font-black text-[#D64545] block mt-1">{activeDeviceData.score}%</span>
            <span className="text-[11px] text-[#D64545] font-semibold">Device B downsampling</span>
          </button>

          <button
            onClick={() => setActiveSubTab('populations')}
            className={`p-4 rounded-xl border text-left transition-all ${
              activeSubTab === 'populations'
                ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
            }`}
          >
            <span className="text-xs font-bold text-[#17221D] block">4. Unseen Populations</span>
            <span className="text-xl font-black text-[#D64545] block mt-1">74%</span>
            <span className="text-[11px] text-[#64736B]">Rural Clinic geriatric cohort</span>
          </button>
        </div>
      </div>

      {/* Interactive Controls Sandbox */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
        
        {/* Sub-tab Content: Missing Information */}
        {(activeSubTab === 'all' || activeSubTab === 'missing') && (
          <div className="space-y-4 pb-6 border-b border-[#DDE8E2]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-extrabold text-[#17221D]">
                  Missing Information Simulator
                </h3>
                <p className="text-xs text-[#64736B]">
                  Simulate delayed or uncollected blood lab panels commonly experienced in community clinics.
                </p>
              </div>

              <button
                onClick={() => handleRunLiveStress('Missing Laboratory Panels')}
                className="px-3.5 py-1.5 rounded-lg bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors w-fit"
              >
                Inject Missing Labs
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
                <div className="flex justify-between font-bold">
                  <span className="text-[#64736B]">Data Missingness Ratio:</span>
                  <span className="text-[#D64545]">{missingPercent}% Suppressed</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={missingPercent}
                  onChange={(e) => setMissingPercent(parseInt(e.target.value))}
                  className="w-full accent-[#16845B] cursor-pointer"
                />
              </div>

              <div className="p-4 rounded-xl bg-[#F6FAF8] border border-[#DDE8E2] space-y-2">
                <span className="font-bold text-[#17221D] block">Imputation Strategy:</span>
                <div className="flex flex-wrap gap-2">
                  {(['zero', 'forward_fill', 'iterative'] as const).map((strat) => (
                    <button
                      key={strat}
                      onClick={() => setImputationStrategy(strat)}
                      className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${
                        imputationStrategy === strat
                          ? 'bg-[#E8F5EF] text-[#0F5132] border-[#16845B]'
                          : 'bg-[#FFFFFF] text-[#64736B] border-[#DDE8E2]'
                      }`}
                    >
                      {strat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sub-tab Content: Hardware Devices */}
        {(activeSubTab === 'all' || activeSubTab === 'devices') && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-[#17221D]">
                Device Hardware Shift
              </h3>
              <p className="text-xs text-[#64736B]">
                Hospital A models trained on 100 Hz high-fidelity monitors degrade when transferred to 50 Hz mobile telemetry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {(Object.keys(deviceScores) as (keyof typeof deviceScores)[]).map((devKey) => {
                const d = deviceScores[devKey];
                const isSelected = selectedDevice === devKey;

                return (
                  <div
                    key={devKey}
                    onClick={() => setSelectedDevice(devKey)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                      isSelected
                        ? 'bg-[#E8F5EF] border-[#16845B] shadow-xs'
                        : 'bg-[#F6FAF8] border-[#DDE8E2] hover:bg-[#E8F5EF]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#17221D]">{d.name}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                        d.status === 'PASS'
                          ? 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]'
                          : 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]'
                      }`}>
                        {d.status}
                      </span>
                    </div>
                    <div className="text-lg font-black text-[#17221D]">{d.score}% Accuracy</div>
                    <p className="text-[11px] text-[#64736B]">{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Explain Finding Action */}
        <div className="flex items-center justify-between pt-4 border-t border-[#DDE8E2]">
          <span className="text-xs text-[#64736B]">
            Testing under stress reveals vulnerabilities before algorithms touch real patients.
          </span>

          <button
            onClick={() =>
              onExplainFinding({
                findingTitle: 'Telemetry Hardware Incompatibility (Device B)',
                condition: '50 Hz Hardware Downsampling',
                baselineScore: 92,
                stressScore: 76,
                dropPercentage: 16,
                details: 'Device B telemetry compresses waveform frequencies, causing an 16 percentage point accuracy loss.',
              })
            }
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#E8F5EF] hover:bg-[#DDE8E2] text-[#0F5132] text-xs font-bold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#16845B]" />
            <span>EXPLAIN THIS FAILURE</span>
          </button>
        </div>

      </div>

    </div>
  );
};
