import React from 'react';
import {
  Play,
  AlertOctagon,
  Wrench,
  FileCheck2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { NavigationTab } from '../types';

interface WorkflowNavBarProps {
  activeTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  hasRunTest?: boolean;
  retestedScore?: number;
}

export const WorkflowNavBar: React.FC<WorkflowNavBarProps> = ({
  activeTab,
  onSelectTab,
  hasRunTest = true,
  retestedScore = 58,
}) => {
  const tabs = [
    {
      id: 'test_model' as NavigationTab,
      number: '1',
      label: 'TEST MODEL',
      sublabel: 'Setup & Stress Audit',
      badge: '1,900 Cases',
      badgeColor: 'bg-[#F6FAF8] text-[#16845B] border-[#DDE8E2]',
      icon: Play,
    },
    {
      id: 'results' as NavigationTab,
      number: '2',
      label: 'RESULTS',
      sublabel: '5 Safety Dimensions',
      badge: '58/100 • NOT SAFE',
      badgeColor: 'bg-[#FDE8E8] text-[#D64545] border-[#F8B4B4]',
      icon: AlertOctagon,
    },
    {
      id: 'fix_retest' as NavigationTab,
      number: '3',
      label: 'FIX & RE-TEST',
      sublabel: 'Remediation Roadmap',
      badge: retestedScore >= 80 ? '84/100 • CONDITIONAL' : '5 Fixes',
      badgeColor: retestedScore >= 80 ? 'bg-[#FEF9C3] text-[#854D0E] border-[#FDE047]' : 'bg-[#E8F5EF] text-[#0F5132] border-[#DDE8E2]',
      icon: Wrench,
    },
    {
      id: 'audit_report' as NavigationTab,
      number: '4',
      label: 'AUDIT REPORT',
      sublabel: 'Governance Dossier',
      badge: 'Official Sign-off',
      badgeColor: 'bg-[#F6FAF8] text-[#17221D] border-[#DDE8E2]',
      icon: FileCheck2,
    },
  ];

  return (
    <div className="w-full space-y-3">
      
      {/* 1. Core Workflow Tabs Bar */}
      <div className="bg-[#FFFFFF] border border-[#DDE8E2] rounded-2xl p-2 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                id={`tab-nav-${tab.id}`}
                onClick={() => onSelectTab(tab.id)}
                className={`p-3 rounded-xl text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  isActive
                    ? 'bg-[#E8F5EF] border-2 border-[#16845B] ring-2 ring-[#16845B]/10 shadow-xs'
                    : 'bg-white border border-[#DDE8E2] hover:bg-[#F6FAF8]'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center ${
                        isActive
                          ? 'bg-[#16845B] text-white'
                          : 'bg-[#F6FAF8] text-[#64736B] border border-[#DDE8E2]'
                      }`}
                    >
                      {tab.number}
                    </span>
                    <span className="text-xs font-black text-[#17221D]">
                      {tab.label}
                    </span>
                  </div>

                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#16845B]' : 'text-[#64736B]'
                    }`}
                  />
                </div>

                <div className="flex items-center justify-between w-full pt-1">
                  <span className="text-[11px] text-[#64736B] font-medium hidden sm:inline truncate">
                    {tab.sublabel}
                  </span>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded border ${tab.badgeColor}`}
                  >
                    {tab.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Visual UX Workflow Principle Indicator:
          TEST → BREAK → EXPLAIN → FIX → RE-TEST → DEPLOYMENT DECISION */}
      <div className="px-3 py-2 rounded-xl bg-[#FAFDFB] border border-[#DDE8E2] flex items-center justify-between overflow-x-auto text-[11px] font-bold text-[#64736B] gap-2">
        <span className="text-[10px] uppercase font-black text-[#16845B] shrink-0">
          SAFETY WORKFLOW:
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <span className={activeTab === 'test_model' ? 'text-[#16845B] font-black' : ''}>
            TEST
          </span>
          <span className="text-[#DDE8E2]">&rarr;</span>

          <span className={activeTab === 'results' ? 'text-[#D64545] font-black' : ''}>
            BREAK
          </span>
          <span className="text-[#DDE8E2]">&rarr;</span>

          <span className={activeTab === 'results' ? 'text-[#17221D] font-black' : ''}>
            EXPLAIN
          </span>
          <span className="text-[#DDE8E2]">&rarr;</span>

          <span className={activeTab === 'fix_retest' ? 'text-[#16845B] font-black' : ''}>
            FIX
          </span>
          <span className="text-[#DDE8E2]">&rarr;</span>

          <span className={activeTab === 'fix_retest' ? 'text-[#0F5132] font-black' : ''}>
            RE-TEST
          </span>
          <span className="text-[#DDE8E2]">&rarr;</span>

          <span className={activeTab === 'audit_report' ? 'text-[#17221D] font-black' : ''}>
            DEPLOYMENT DECISION
          </span>
        </div>

        <span className="text-[10px] text-[#64736B] hidden md:inline shrink-0">
          *Supports clinical professionals &bull; Not a doctor replacement
        </span>
      </div>

    </div>
  );
};
