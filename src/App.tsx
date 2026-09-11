import React, { useState } from 'react';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { Header } from './components/Header';
import { WorkflowNavBar } from './components/WorkflowNavBar';
import { AirportSecurityGateBanner } from './components/AirportSecurityGateBanner';
import { ExplainFailureModal } from './components/ExplainFailureModal';
import { GuidedDemoController } from './components/GuidedDemoController';

// 4 Core Redesigned Views
import { TestModelView } from './components/views/TestModelView';
import { ResultsView } from './components/views/ResultsView';
import { FixAndRetestView } from './components/views/FixAndRetestView';
import { AuditReportView } from './components/views/AuditReportView';

// Types & Data
import { NavigationTab, SafetyDimension, CriticalFailureDetail, ModelProfile } from './types';
import { DEMO_MODELS } from './data/mockModels';
import { CRITICAL_FAILURES } from './data/trustCheckSafetyData';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('test_model');
  const [activeDimension, setActiveDimension] = useState<SafetyDimension>('all');
  const [selectedModel, setSelectedModel] = useState<ModelProfile>(DEMO_MODELS[0]);
  const [retestedScore, setRetestedScore] = useState<number>(58);

  // Modals state
  const [isExplainModalOpen, setIsExplainModalOpen] = useState(false);
  const [selectedFailure, setSelectedFailure] = useState<CriticalFailureDetail | null>(null);
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  // Normalize legacy tab requests to one of the 4 core views
  const handleNavigateTab = (tab: NavigationTab) => {
    if (tab === 'test_model' || tab === 'results' || tab === 'fix_retest' || tab === 'audit_report') {
      setActiveTab(tab);
      return;
    }

    // Map legacy analytical tabs to Results with relevant dimension
    if (tab === 'fairness') {
      setActiveTab('results');
      setActiveDimension('fairness');
    } else if (tab === 'edge_cases') {
      setActiveTab('results');
      setActiveDimension('edge_cases');
    } else if (tab === 'uncertainty') {
      setActiveTab('results');
      setActiveDimension('uncertainty');
    } else if (tab === 'dataset_shift' || tab === 'deployment_setup') {
      setActiveTab('results');
      setActiveDimension('environment_shift');
    } else if (tab === 'robustness' || tab === 'break_my_ai') {
      setActiveTab('results');
      setActiveDimension('robustness');
    } else if (tab === 'safety_passport' || tab === 'deployment_gate') {
      setActiveTab('fix_retest');
    } else {
      setActiveTab('results');
      setActiveDimension('all');
    }
  };

  const handleOpenExplainFailure = (failure: CriticalFailureDetail) => {
    setSelectedFailure(failure);
    setIsExplainModalOpen(true);
  };

  const handleRunTestComplete = () => {
    setActiveTab('results');
    setActiveDimension('all');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      
      {/* 1. Mandatory Clinical Safety Notice */}
      <DisclaimerBanner />

      {/* 2. Top Header with Model Selector & 3-Min Live Demo Trigger */}
      <Header
        activeTab={activeTab}
        selectedModel={selectedModel}
        onSelectModel={setSelectedModel}
        onStartTour={() => setIsTourModalOpen(true)}
      />

      {/* 3. Main Workspace Body */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* Airport Security for Healthcare AI Visual Gate */}
        <AirportSecurityGateBanner
          currentModel={selectedModel}
          retestedScore={retestedScore}
          hasRunTest={activeTab !== 'test_model'}
        />

        {/* The 4-Step Primary Workflow Bar with Visual Workflow Principle */}
        <WorkflowNavBar
          activeTab={activeTab}
          onSelectTab={handleNavigateTab}
          retestedScore={retestedScore}
        />

        {/* 4. Active Screen Display */}
        <div className="pt-4">
          
          {/* SCREEN 1: TEST MODEL */}
          {activeTab === 'test_model' && (
            <TestModelView onRunTestComplete={handleRunTestComplete} />
          )}

          {/* SCREEN 2: RESULTS (Includes 5 Safety Dimensions) */}
          {activeTab === 'results' && (
            <ResultsView
              initialDimension={activeDimension}
              onExplainFailure={handleOpenExplainFailure}
              onNavigateTab={handleNavigateTab}
            />
          )}

          {/* SCREEN 3: FIX & RE-TEST */}
          {activeTab === 'fix_retest' && (
            <FixAndRetestView
              onNavigateTab={handleNavigateTab}
              onRetestComplete={(newScore) => setRetestedScore(newScore)}
            />
          )}

          {/* SCREEN 4: AUDIT REPORT */}
          {activeTab === 'audit_report' && (
            <AuditReportView
              currentModel={selectedModel}
              retestedScore={retestedScore}
              onNavigateTab={handleNavigateTab}
            />
          )}

        </div>

      </main>

      {/* 5. Explain Failure Modal (WHAT HAPPENED? WHY DID IT FAIL? WHO IS AFFECTED? WHY DOES IT MATTER? WHAT DO WE DO?) */}
      <ExplainFailureModal
        isOpen={isExplainModalOpen}
        onClose={() => setIsExplainModalOpen(false)}
        failure={selectedFailure}
        onFixNow={() => handleNavigateTab('fix_retest')}
      />

      {/* 6. 3-Minute Live Hackathon Demo Controller HUD (16 Beats) */}
      <GuidedDemoController
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
        onNavigateTab={handleNavigateTab}
        onSelectDimension={setActiveDimension}
        onOpenExplainFailure={handleOpenExplainFailure}
        onSimulateFixes={() => setRetestedScore(84)}
      />

      {/* 7. Professional Clinical Governance Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 px-4 sm:px-6 text-center text-xs text-gray-500 no-print mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-gray-900 tracking-wide">TrustCheck</span>
            <span className="text-gray-300">|</span>
            <span className="tracking-wide uppercase">Pre-Deployment Safety Testing Platform</span>
          </div>

          <span className="text-[var(--color-accent)] font-semibold tracking-wide">
            Not a medical device. For clinical evaluation only.
          </span>
        </div>
      </footer>

    </div>
  );
}
