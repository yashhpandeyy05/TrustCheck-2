export type UserRole = 'hospital' | 'developer' | 'researcher';

export type DeploymentStatus = 'READY' | 'CONDITIONAL' | 'NOT READY';

export type TestSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type TestStatus = 'PASSED' | 'WARNING' | 'FAILED' | 'CRITICAL';

export type NavigationTab =
  | 'test_model'
  | 'results'
  | 'fix_retest'
  | 'audit_report'
  // Legacy aliases for backward safety
  | 'overview'
  | 'deployment_setup'
  | 'break_my_ai'
  | 'failure_map'
  | 'fairness'
  | 'robustness'
  | 'dataset_shift'
  | 'edge_cases'
  | 'uncertainty'
  | 'deployment_gate'
  | 'safety_passport'
  | 'compound_failure'
  | 'trust_boundary'
  | 'benchmark'
  | 'monitoring'
  | 'what_if'
  | 'learning_lab';

export type SafetyDimension =
  | 'all'
  | 'robustness'
  | 'fairness'
  | 'environment_shift'
  | 'edge_cases'
  | 'uncertainty';

export interface CriticalFailureDetail {
  id: string;
  category: 'HARDWARE SHIFT' | 'FAIRNESS GAP' | 'DANGEROUS EDGE CASE' | string;
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  impactMetric: string;
  summary: string;
  whatHappened: string;
  modelOutput: string;
  modelConfidence: string;
  actualCondition: string;
  whyFailed: string;
  patientsAtRisk: string;
  clinicalRisk: string;
  recommendedFix: string;
}

export interface ModelProfile {
  id: string;
  name: string;
  version: string;
  type: string;
  devEnvironment: string;
  targetEnvironment: string;
  description: string;
  intendedUse: string;
  architecture: string;
  trainingSamples: number;
  trainingDataSize?: string;
  evalSamples: number;
  overallReadiness: number;
  metrics: {
    baselineAccuracy: number;
    baselinePrecision: number;
    baselineRecall: number;
    baselineF1: number;
    robustness: number;
    fairness: number;
    compatibility: number;
    calibration: number;
    edgeCaseSafety: number;
  };
  deploymentStatus: DeploymentStatus;
  statusReason: string;
}

export interface StressConditionConfig {
  id: string;
  name: string;
  category: 'robustness' | 'distribution' | 'fairness' | 'calibration' | 'edge_cases' | 'compound';
  description: string;
  selected: boolean;
}

export interface StressTestExecutionResult {
  id: string;
  conditionId: string;
  name: string;
  category: string;
  baselineScore: number;
  stressScore: number;
  dropPercentage: number;
  status: TestStatus;
  severity: TestSeverity;
  rootCause: string;
  clinicalImpact: string;
  recommendedAction: string;
  affectedCohort?: string;
}

export interface DemographicSubgroup {
  id: string;
  groupName: string;
  category: 'Age' | 'Biological Sex' | 'Clinical Sub-type' | 'Socio-demographic' | string;
  sampleCount: number;
  accuracy: number;
  recall: number;
  falsePositiveRate: number;
  falseNegativeRate: number;
  gapFromHighest: number;
  status: 'acceptable' | 'warning' | 'disparity';
}

export interface DatasetFeatureShift {
  featureName: string;
  category: 'Demographic' | 'Vitals' | 'Lab Values' | 'Imaging / Sensor' | 'Timing' | 'Clinical Sub-type' | string;
  devDistribution: string;
  targetDistribution: string;
  similarityScore: number;
  divergenceDetected: boolean;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  observation: string;
}

export interface EdgeCaseRecord {
  id: string;
  caseNumber: string;
  title: string;
  patientArchetype: string;
  inputCondition: string;
  modelPrediction: string;
  modelConfidence: number;
  benchmarkTruth: string;
  failureStatus: 'OVERCONFIDENT FAILURE' | 'SILENT MISCLASSIFICATION' | 'ACCEPTABLE UNCERTAINTY' | 'ROBUST PASS';
  clinicalRisk: string;
}

export interface CalibrationBucket {
  binLabel: string;
  confidenceRange: [number, number];
  predictedConfidenceAvg: number;
  actualCorrectness: number;
  sampleCount: number;
  isOverconfident: boolean;
  deltaGap: number;
}

export interface CompoundFailureScenario {
  id: string;
  stressorCount: number;
  title: string;
  stressors: string[];
  performance: number;
  dropFromBaseline: number;
  trustZone: 'GREEN' | 'YELLOW' | 'RED';
  observation: string;
}

export interface FailureMapNode {
  id: string;
  axis: 'Device' | 'Population' | 'Missing Data' | 'Noise' | 'Demographics' | 'Edge Cases' | 'Calibration' | 'Dataset Shift';
  title: string;
  severity: 'stable' | 'warning' | 'failure';
  baselineScore: number;
  stressScore: number;
  drop: number;
  affectedTarget: string;
  contributingFactors: string;
  recommendedAction: string;
}

export interface MonitoringMonthRecord {
  month: string;
  dateStr?: string;
  accuracy: number;
  driftVsBaseline: number;
  zone: 'GREEN' | 'YELLOW' | 'RED';
  triggerActive: boolean;
  sampleCount: number;
  notes: string;
  performanceScore?: number;
  baselineScore?: number;
  datasetDivergencePct?: number;
  fairnessGapPts?: number;
  highConfidenceErrorRate?: number;
  alertsTriggered?: string[];
  operationalVolume?: number;
}

export interface TrustBoundaryCriterion {
  id: string;
  parameter: string;
  safeGreenBoundary: string;
  warningYellowBoundary: string;
  unsafeRedBoundary: string;
  currentObserved: string;
  currentZone: 'GREEN' | 'YELLOW' | 'RED';
  rationale: string;
}

export interface WhatIfSimulationParams {
  missingInfoPercent: number;
  noiseLevel: 'low' | 'medium' | 'high';
  populationShiftPercent: number;
  device: 'Device A' | 'Device B';
}
