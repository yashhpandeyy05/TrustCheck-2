import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Flame,
  Network,
  Users,
  FileCheck2,
  SlidersHorizontal,
  GitCompare,
  AlertOctagon,
  Gauge,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  onOpenSettings?: () => void;
  onOpenHelp?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenHelp,
}) => {
  // THE 6-STEP PRE-DEPLOYMENT SAFETY STORY
  // MODEL -> REAL DEPLOYMENT -> CRASH TEST -> FAILURE CONDITIONS -> WHO IS AFFECTED -> DEPLOYMENT DECISION
  const storySteps: {
    id: NavigationTab;
    stepNum: string;
    label: string;
    sublabel: string;
    icon: React.FC<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[] = [
    {
      id: 'overview',
      stepNum: '1',
      label: 'Model Profile',
      sublabel: 'Safe operating envelope',
      icon: LayoutDashboard,
    },
    {
      id: 'deployment_setup',
      stepNum: '2',
      label: 'Real Deployment',
      sublabel: 'Rural clinic mismatch',
      icon: Building2,
      badge: '44% Match',
      badgeColor: 'bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]',
    },
    {
      id: 'break_my_ai',
      stepNum: '3',
      label: 'Crash Test',
      sublabel: 'Simulate clinical stress',
      icon: Flame,
      badge: 'Hero Test',
      badgeColor: 'bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]',
    },
    {
      id: 'failure_map',
      stepNum: '4',
      label: 'Failure Conditions',
      sublabel: 'Topological trust boundary',
      icon: Network,
      badge: '6 Nodes',
      badgeColor: 'bg-[#FEF3C7] text-[#D98C00] border border-[#FDE68A]',
    },
    {
      id: 'fairness',
      stepNum: '5',
      label: 'Who Is Affected',
      sublabel: 'Subgroup disparity audit',
      icon: Users,
      badge: '18% Gap',
      badgeColor: 'bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]',
    },
    {
      id: 'safety_passport',
      stepNum: '6',
      label: 'Deployment Decision',
      sublabel: 'Trust passport & gate',
      icon: FileCheck2,
      badge: '🔴 Blocked',
      badgeColor: 'bg-[#FDE8E8] text-[#D64545] border border-[#F8B4B4]',
    },
  ];

  // Deep Diagnostic Labs (Supporting evidence)
  const diagnosticLabs: {
    id: NavigationTab;
    label: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'uncertainty', label: 'Calibration & Overconfidence', icon: Gauge },
    { id: 'robustness', label: 'Missing Data & Sensor Noise', icon: SlidersHorizontal },
    { id: 'dataset_shift', label: 'Hardware & Sampling Shift', icon: GitCompare },
    { id: 'edge_cases', label: 'Hemodynamic Edge Cases', icon: AlertOctagon },
  ];

  return (
    <aside
      id="app-sidebar"
      className="w-64 bg-[#FFFFFF] border-r border-[#DDE8E2] flex flex-col justify-between shrink-0 min-h-[calc(100vh-104px)] font-sans"
    >
      <div className="p-4 space-y-6">
        
        {/* Core Narrative Header */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[11px] font-black uppercase tracking-wider text-[#64736B] flex items-center justify-between">
            <span>EVALUATION WORKFLOW</span>
            <span className="text-[10px] text-[#16845B] font-bold">6 STEPS</span>
          </div>

          {/* 6 Sequential Steps */}
          <div className="space-y-1">
            {storySteps.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  id={`sidebar-step-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all text-left group ${
                    isActive
                      ? 'bg-[#E8F5EF] text-[#0F5132] border border-[#16845B] shadow-xs'
                      : 'text-[#17221D] hover:bg-[#F6FAF8] hover:text-[#0F5132]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 ${
                      isActive
                        ? 'bg-[#16845B] text-white'
                        : 'bg-[#F6FAF8] text-[#64736B] group-hover:bg-[#E8F5EF] group-hover:text-[#0F5132]'
                    }`}>
                      {item.stepNum}
                    </span>

                    <div className="truncate">
                      <div className="text-xs font-black truncate">{item.label}</div>
                      <div className="text-[10px] text-[#64736B] truncate">{item.sublabel}</div>
                    </div>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0 ml-1 ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Diagnostics Drawer */}
        <div className="space-y-1 pt-4 border-t border-[#DDE8E2]">
          <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#64736B]">
            DEEP DIAGNOSTICS
          </div>

          {diagnosticLabs.map((lab) => {
            const Icon = lab.icon;
            const isActive = activeTab === lab.id;

            return (
              <button
                key={lab.id}
                onClick={() => onSelectTab(lab.id)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#E8F5EF] text-[#0F5132]'
                    : 'text-[#64736B] hover:bg-[#F6FAF8] hover:text-[#17221D]'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{lab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-[#DDE8E2] bg-[#F6FAF8] space-y-2 text-xs">
        <div className="flex items-center gap-2 text-[#0F5132] font-bold">
          <ShieldCheck className="w-4 h-4 text-[#16845B] shrink-0" />
          <span>Clinical Safety Protocol</span>
        </div>
        <p className="text-[11px] text-[#64736B]">
          Pre-deployment gate for Hospital Ethics &amp; Procurement Committees.
        </p>
      </div>
    </aside>
  );
};
