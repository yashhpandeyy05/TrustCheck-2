import React from 'react';
import {
  ShieldCheck,
  PlayCircle,
  Building2,
  AlertCircle
} from 'lucide-react';
import { ModelProfile, UserRole } from '../types';
import { DEMO_MODELS } from '../data/mockModels';

interface HeaderProps {
  currentModel?: ModelProfile;
  selectedModel?: ModelProfile;
  onSelectModel: (model: ModelProfile) => void;
  userRole?: UserRole;
  activeRole?: UserRole;
  onSelectRole?: (role: UserRole) => void;
  isTesting?: boolean;
  hasRunStressTest?: boolean;
  onOpenTour?: () => void;
  onStartTour?: () => void;
  onOpenAiExplainer?: () => void;
  activeTab?: string;
}

export const Header: React.FC<HeaderProps> = ({
  selectedModel: selectedModelProp,
  currentModel: currentModelProp,
  onSelectModel,
  onStartTour,
  onOpenTour,
  onOpenAiExplainer,
}) => {
  const model = selectedModelProp || currentModelProp || DEMO_MODELS[0];
  const handleTour = onStartTour || onOpenTour;

  return (
    <header id="app-header" className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          
          {/* Left: Branding & Tagline */}
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-none bg-[var(--color-accent)] flex items-center justify-center text-white shrink-0 mt-1">
              <ShieldCheck className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-serif font-black tracking-tight text-gray-900">
                  TrustCheck
                </span>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[var(--color-accent)] bg-gray-100 px-3 py-1 border border-gray-200">
                  Safety Gate
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1 max-w-md leading-snug">
                Clinical safety evaluation gate. Stress-test healthcare models before patient exposure.
              </p>
            </div>
          </div>

          {/* Center / Right: Model, Environment, Status Badge & 3-Minute Demo */}
          <div className="flex flex-wrap items-center gap-4">
            
            {/* Model Selector Dropdown Pill */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-900">
              <span className="text-gray-500 font-medium">Model:</span>
              <select
                id="header-model-select"
                value={model.id}
                onChange={(e) => {
                  const m = DEMO_MODELS.find((dm) => dm.id === e.target.value);
                  if (m) onSelectModel(m);
                }}
                className="bg-transparent font-bold text-gray-900 focus:outline-none cursor-pointer"
              >
                {DEMO_MODELS.map((dm) => (
                  <option key={dm.id} value={dm.id}>
                    {dm.name} {dm.version}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Environment Badge */}
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-2 text-sm text-gray-900">
              <Building2 className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 font-medium">Environment:</span>
              <span className="font-bold">{model.targetEnvironment.split('(')[0].trim()}</span>
            </div>

            {/* Status Badge: Red/Amber Pill */}
            <div
              id="header-deployment-status-badge"
              className="flex items-center gap-2 px-3 py-2 text-xs font-bold bg-red-50 text-red-700 border border-red-200 tracking-wide uppercase"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Block Deployment</span>
            </div>

            {/* Prominent Demo button */}
            {handleTour && (
              <button
                id="btn-header-3min-demo"
                onClick={handleTour}
                className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-sm font-bold transition-colors cursor-pointer rounded-none border border-transparent focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]"
              >
                <PlayCircle className="w-4 h-4" />
                <span className="tracking-wide uppercase">Live Demo</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
