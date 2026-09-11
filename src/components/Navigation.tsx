import React from 'react';
import {
  LayoutDashboard,
  Flame,
  Network,
  Layers,
  SlidersHorizontal,
  Compass,
  Scale,
  GitCompare,
  AlertOctagon,
  Gauge,
  LineChart,
  Activity,
  CheckSquare,
  FileCheck2,
  FileText,
  BookOpen,
} from 'lucide-react';

export type NavTabId =
  | 'overview'
  | 'break_my_ai'
  | 'failure_map'
  | 'compound_failure'
  | 'trust_boundary'
  | 'robustness'
  | 'fairness'
  | 'dataset_shift'
  | 'edge_cases'
  | 'uncertainty'
  | 'benchmark'
  | 'monitoring'
  | 'what_if'
  | 'deployment_gate'
  | 'safety_passport'
  | 'audit_report'
  | 'learning_lab';

interface NavigationProps {
  activeTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  failureCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  failureCount,
}) => {
  const navItems: { id: NavTabId; label: string; icon: React.FC<{ className?: string }>; badge?: string | number; badgeColor?: string; isHero?: boolean }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'break_my_ai', label: '💥 Break My AI', icon: Flame, isHero: true, badge: 'HERO', badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40' },
    { id: 'failure_map', label: 'Failure Map', icon: Network, badge: failureCount > 0 ? failureCount : undefined, badgeColor: 'bg-red-950 text-red-300 border-red-800' },
    { id: 'compound_failure', label: 'Compound Failure', icon: Layers, badge: 'Catastrophic', badgeColor: 'bg-amber-950 text-amber-300 border-amber-800' },
    { id: 'trust_boundary', label: 'Trust Boundary', icon: Compass },
    { id: 'robustness', label: 'Robustness Lab', icon: SlidersHorizontal },
    { id: 'fairness', label: 'Fairness Lab', icon: Scale },
    { id: 'dataset_shift', label: 'Dataset Shift', icon: GitCompare, badge: 'Shift Detected', badgeColor: 'bg-orange-950 text-orange-300 border-orange-800' },
    { id: 'edge_cases', label: 'Edge Cases', icon: AlertOctagon, badge: '6 Cases', badgeColor: 'bg-rose-950 text-rose-300 border-rose-800' },
    { id: 'uncertainty', label: 'Uncertainty & Calibration', icon: Gauge },
    { id: 'what_if', label: 'What If? Simulator', icon: SlidersHorizontal },
    { id: 'benchmark', label: 'Model Benchmark', icon: LineChart },
    { id: 'monitoring', label: 'Post-Deployment Drift', icon: Activity },
    { id: 'deployment_gate', label: 'Deployment Gate', icon: CheckSquare, badge: 'NOT READY', badgeColor: 'bg-red-950 text-red-300 border-red-700' },
    { id: 'safety_passport', label: 'Safety Passport', icon: FileCheck2 },
    { id: 'audit_report', label: 'Audit Report', icon: FileText },
    { id: 'learning_lab', label: 'Learning Lab', icon: BookOpen, badge: 'Student Mode', badgeColor: 'bg-blue-950 text-blue-300 border-blue-800' },
  ];

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 sticky top-[98px] z-30 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          id="main-navigation-tabs"
          className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent text-xs no-scrollbar"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? item.isHero
                      ? 'bg-red-600 text-white shadow-md shadow-red-900/30'
                      : 'bg-cyan-600 text-white shadow-md shadow-cyan-950/40'
                    : item.isHero
                    ? 'bg-red-950/40 text-red-300 hover:bg-red-900/40 border border-red-700/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.isHero ? 'text-red-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 text-[10px] font-mono-telemetry font-bold px-1.5 py-0.2 rounded border ${
                      isActive ? 'bg-white/20 text-white border-white/30' : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
