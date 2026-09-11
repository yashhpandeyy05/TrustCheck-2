import { CriticalFailureDetail } from '../types';

export interface EnvironmentShiftRow {
  parameter: string;
  trainingEnv: string;
  targetEnv: string;
  clinicalImpact: string;
  riskLevel: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface EdgeCaseScenario {
  id: string;
  title: string;
  status: 'PASS' | 'FAIL';
  inputCondition: string;
  modelPrediction: string;
  modelConfidence: number;
  actualCondition: string;
  whyFailed: string;
  isFlagship?: boolean;
}

export interface RecommendedFix {
  id: string;
  number: number;
  title: string;
  description: string;
  mechanism: string;
  applied: boolean;
  scoreImpact: number;
}

export const CRITICAL_FAILURES: CriticalFailureDetail[] = [
  {
    id: 'hardware-shift',
    category: 'HARDWARE SHIFT',
    title: 'Hardware & Sampling Degradation',
    severity: 'CRITICAL',
    impactMetric: '92% → 74% accuracy',
    summary: 'Performance drops when moving from 100 Hz hospital ECG data to 50 Hz rural telemetry.',
    whatHappened:
      'When tested on Device B handheld monitors used in the rural clinic, the model suffered an 18-point drop in diagnostic accuracy (92% down to 74%).',
    modelOutput: 'Normal Sinus Rhythm / Low Risk (74% accuracy)',
    modelConfidence: '88% average confidence despite signal degradation',
    actualCondition: 'Acute ST-Elevation & Micro-Arrhythmias',
    whyFailed:
      'The model was trained exclusively on 100 Hz hospital cart ECGs. The rural clinic uses 50 Hz handheld units that blur high-frequency QRS morphological notches, creating blind spots for subtle ischemic changes.',
    patientsAtRisk: 'All patients triaged with rural handheld Device B telemetry units.',
    clinicalRisk: 'Patients with early non-ST elevation or atypical arrhythmias are triaged as non-urgent.',
    recommendedFix: 'Fine-tune model on 2,000 local Device B recordings with spectral bandpass normalization.',
  },
  {
    id: 'fairness-gap',
    category: 'FAIRNESS GAP',
    title: 'Demographic Parity Disparity',
    severity: 'CRITICAL',
    impactMetric: '95% → 77% accuracy',
    summary: 'Underrepresented patients experience substantially lower performance with 4.6× higher missed care.',
    whatHappened:
      'TrustCheck audited demographic cohorts and identified an 18-point performance gap: 95% accuracy for majority patients versus 77% for underrepresented rural minority patients.',
    modelOutput: 'Under-triage / Non-Emergency Classification',
    modelConfidence: '82% confidence in incorrect classifications',
    actualCondition: 'Acute Cardiac Decompensation',
    whyFailed:
      'Underrepresented cohorts comprise only 4.2% of the training dataset. Feature weights under-sample atypical symptom expressions, resulting in a 4.6× higher False Negative Rate.',
    patientsAtRisk: 'Rural minority and indigenous population cohorts.',
    clinicalRisk: 'Severe systemic under-triage causing delayed escalation of life-saving care.',
    recommendedFix: 'Implement demographic parity regularization loss during training and augment local cohort sampling.',
  },
  {
    id: 'dangerous-edge-case',
    category: 'DANGEROUS EDGE CASE',
    title: 'Beta-Blocker Masked Shock',
    severity: 'CRITICAL',
    impactMetric: '98% confidence — WRONG',
    summary: 'Beta-blocker therapy masks deterioration and causes a high-confidence Low Risk prediction on a dying patient.',
    whatHappened:
      'In a 72-year-old on chronic metoprolol presenting with severe septic shock, the model predicted "LOW RISK" with 98% confidence. The patient was hemodynamically collapsing.',
    modelOutput: 'Low Risk / Routine Monitoring',
    modelConfidence: '98% confidence (High Certainty)',
    actualCondition: 'Severe Deterioration / Impending Septic Shock',
    whyFailed:
      'The model relies heavily on heart-rate acceleration as a primary proxy for shock. Chronic beta-1 receptor blockade suppresses tachycardia, tricking the neural network into false certainty.',
    patientsAtRisk: 'Patients receiving chronic beta-blocker therapy presenting with atypical deterioration.',
    clinicalRisk: 'A critically unstable patient is assigned to an unmonitored waiting area without physician alert.',
    recommendedFix: 'Add deterministic clinical safety override: flag all beta-blocker patients with borderline vitals for immediate human review.',
  },
];

export const ENVIRONMENT_SHIFT_ROWS: EnvironmentShiftRow[] = [
  {
    parameter: 'Patient Population',
    trainingEnv: 'Academic Core Lab (Median Age 52.4)',
    targetEnv: 'Rural Clinic (Median Age 68.2)',
    clinicalImpact: 'Atypical presentation in geriatric census degrades shock detection',
    riskLevel: 'HIGH',
  },
  {
    parameter: 'ECG Sampling',
    trainingEnv: '100 Hz Hospital Cart ECG',
    targetEnv: '50 Hz Handheld Telemetry (Device B)',
    clinicalImpact: 'Downsampling removes high-frequency ischemic signatures',
    riskLevel: 'HIGH',
  },
  {
    parameter: 'Missing Labs',
    trainingEnv: '< 2% Delayed Biomarkers',
    targetEnv: '25% Delayed Troponin / Lactate',
    clinicalImpact: 'Model relies on zero-imputation, producing false negatives',
    riskLevel: 'HIGH',
  },
  {
    parameter: 'Infrastructure & Turnaround',
    trainingEnv: 'Immediate In-House STAT Lab',
    targetEnv: '3-Hour Courier Transport',
    clinicalImpact: 'Decisions must be made hours before lab confirmation arrives',
    riskLevel: 'HIGH',
  },
];

export const EDGE_CASE_SCENARIOS: EdgeCaseScenario[] = [
  {
    id: 'beta-blocker-shock',
    title: 'Beta-Blocker Masked Shock',
    status: 'FAIL',
    inputCondition: 'HR 72 bpm, BP 86/54, chronic metoprolol 50mg daily, lactate 4.1 mmol/L (delayed)',
    modelPrediction: 'Low Risk',
    modelConfidence: 98,
    actualCondition: 'Severe Deterioration / Septic Shock',
    whyFailed: 'Model relies on tachycardia to detect shock; beta-blockade suppresses adrenergic heart rate response.',
    isFlagship: true,
  },
  {
    id: 'missing-troponin',
    title: 'Missing Laboratory Values',
    status: 'FAIL',
    inputCondition: 'Troponin and lactate values delayed by rural courier (unavailable at triage)',
    modelPrediction: 'Low Risk / Stable',
    modelConfidence: 89,
    actualCondition: 'Acute Non-ST-Elevation Myocardial Infarction',
    whyFailed: 'Model silently substitutes 0 for missing biomarkers instead of expressing uncertainty.',
  },
  {
    id: 'noisy-sensor',
    title: 'Noisy Sensor Artifacts',
    status: 'FAIL',
    inputCondition: 'Baseline wandering and motion artifact from patient shivering during transport',
    modelPrediction: 'Ventricular Tachycardia (False Alarm)',
    modelConfidence: 94,
    actualCondition: 'Normal Sinus Rhythm with Muscle Tremor',
    whyFailed: 'Sensor noise frequency profile overlaps with training set ventricular tachycardia patterns.',
  },
  {
    id: 'unseen-device',
    title: 'Unseen Device Telemetry',
    status: 'FAIL',
    inputCondition: 'Single-lead continuous telemetry stream from Device B (50 Hz downsampled)',
    modelPrediction: 'Normal Variant',
    modelConfidence: 86,
    actualCondition: 'Early Posterior Myocardial Infarction',
    whyFailed: 'Filtering pipeline truncates high-frequency voltage spikes essential for detection.',
  },
  {
    id: 'contradictory-vitals',
    title: 'Contradictory Vital Signs',
    status: 'FAIL',
    inputCondition: 'Severe tachypnea (RR 34) and diaphoresis with normal SpO2 (98%) and normal BP',
    modelPrediction: 'Anxiety / Mild Distress',
    modelConfidence: 91,
    actualCondition: 'Acute Pulmonary Embolism with Respiratory Acidosis',
    whyFailed: 'Model gives 80% weight to SpO2 and blood pressure, ignoring tachypneic compensatory effort.',
  },
  {
    id: 'low-quality-scan',
    title: 'Low-Quality Signal / Baseline Drift',
    status: 'PASS',
    inputCondition: 'Minor baseline wander with intact QRS complexes and complete vitals panel',
    modelPrediction: 'Moderate Risk (Requires Clinical Verification)',
    modelConfidence: 73,
    actualCondition: 'Stable Angina / Moderate Risk',
    whyFailed: 'Properly flagged uncertainty and maintained accurate risk tier within noise margin.',
  },
];

export interface ProgressiveEvidenceCheck {
  id: string;
  stepNumber: number;
  questionNumber: number;
  coreQuestion: string;
  headlineStat: string;
  statLabel: string;
  comparisonBadge: string;
  whatDidWeTest: string;
  whatHappened: string;
  whyDoesItMatter: string;
  whoIsAffected: string;
  whatShouldWeDo: string;
  criticalVerdict: 'FAIL' | 'CRITICAL' | 'WARNING';
}

export const PROGRESSIVE_EVIDENCE_CHECKS: ProgressiveEvidenceCheck[] = [
  {
    id: 'device-shift',
    stepNumber: 1,
    questionNumber: 2,
    coreQuestion: 'Will the model work on the actual deployment device and hardware?',
    headlineStat: '92% → 74% Accuracy',
    statLabel: 'Hardware Shift on Target Device B',
    comparisonBadge: '92.4% Hospital A Lab Baseline vs 74.1% Rural Device B Telemetry',
    whatDidWeTest:
      'We tested whether CardioScan Net v1.4—trained on pristine 100 Hz cart ECGs at Hospital A Core Lab—retains its 92.4% baseline accuracy when operating on the rural clinic’s actual handheld telemetry units (Device B at 50 Hz).',
    whatHappened:
      'Accuracy dropped from 92.4% to 74.1% (-18.3 percentage points). The downsampled sampling rate and high-frequency sensor noise stripped morphological QRS notches, causing severe diagnostic misclassifications.',
    whyDoesItMatter:
      'In a rural clinic relying on handheld telemetry, 1 in 4 acute cardiac emergencies is misclassified as non-urgent, creating acute risk of unmonitored cardiac arrest in the waiting room.',
    whoIsAffected:
      'Every patient triaged with rural handheld Device B telemetry units.',
    whatShouldWeDo:
      'Fine-tune the model on 2,000 local Device B recordings with spectral bandpass normalization before clinical deployment.',
    criticalVerdict: 'CRITICAL',
  },
  {
    id: 'environment-shift',
    stepNumber: 2,
    questionNumber: 1,
    coreQuestion: 'Will the model still work with imperfect or missing inputs?',
    headlineStat: '44% Compatibility',
    statLabel: 'Target Rural Environment & Workflow Shift',
    comparisonBadge: '44% Match • 25% Delayed Labs • 3-Hour Courier Transport',
    whatDidWeTest:
      'We compared the training environment (urban academic center with immediate bedside troponin, 100 Hz cart ECGs, median patient age 52) against the target rural deployment clinic (3-hour courier lab transport, 25% delayed troponin/lactate, median patient age 68.2).',
    whatHappened:
      'Environment compatibility scored only 44% (High Shift Risk). When troponin is delayed—a routine reality in rural settings—the model zero-imputes the missing biomarker, dropping triage accuracy from 92% to 80% (-12%).',
    whyDoesItMatter:
      'The model was optimized for an academic environment that does not exist in rural healthcare. It silently assumes missing labs mean normal labs instead of expressing diagnostic uncertainty.',
    whoIsAffected:
      'Patients presenting during evening or weekend hours when lab couriers are delayed, and geriatric patients whose cardiac presentations depend heavily on biomarker kinetics.',
    whatShouldWeDo:
      'Add explicit missing-lab indicator channels and uncertainty bounds rather than zero-imputing pending laboratory values.',
    criticalVerdict: 'FAIL',
  },
  {
    id: 'fairness-disparity',
    stepNumber: 3,
    questionNumber: 3,
    coreQuestion: 'Who does the model perform worse for?',
    headlineStat: '18% Disparity Gap',
    statLabel: 'Demographic Fairness & Parity Failure',
    comparisonBadge: '95.1% Majority Accuracy vs 77.2% Rural Underrepresented (4.6× Missed Care)',
    whatDidWeTest:
      'We evaluated model triage accuracy and false negative rates across demographic and geographic cohorts within the 1,900 test cases to verify equal standard of care.',
    whatHappened:
      'An 18 percentage-point demographic disparity was uncovered: 95.1% accuracy for majority patients vs 77.2% for rural underrepresented patients. The false negative rate (missed emergency triage) was 4.6× higher in the vulnerable population.',
    whyDoesItMatter:
      'Deploying this algorithm would automate and worsen existing healthcare inequities, systematically under-triaging rural minority patients who already face long transport times to tertiary care centers.',
    whoIsAffected:
      'Underrepresented rural patient populations, particularly elderly rural residents and ethnic minorities presenting with atypical symptoms.',
    whatShouldWeDo:
      'Apply minimax fairness regularization loss during training and establish subgroup parity auditing thresholds (disparity tolerance < 4%) before deployment clearance.',
    criticalVerdict: 'CRITICAL',
  },
  {
    id: 'dangerous-edge-case',
    stepNumber: 4,
    questionNumber: 4,
    coreQuestion: 'Can we break it with unusual or dangerous edge cases?',
    headlineStat: '98% Confident — WRONG',
    statLabel: 'Beta-Blocker Masked Septic Shock',
    comparisonBadge: 'Model Predicted "Low Risk" (98% Confident) • Actual: Impending Septic Shock',
    whatDidWeTest:
      'We attacked the model with 6 realistic clinical edge cases, specifically an elderly patient in septic shock who takes chronic daily beta-blockers (metoprolol).',
    whatHappened:
      'The model predicted "Low Risk" with 98% confidence. Actual clinical status: Severe Septic Shock (Critical / Immediate Resuscitation Required). The patient was hemodynamically collapsing.',
    whyDoesItMatter:
      'The neural network heavily relies on tachycardia (high heart rate > 100 bpm) as its primary heuristic for shock. Because beta-blockers pharmacologically cap heart rate at 72 bpm, the model assumed the patient was resting and stable, hiding active hemodynamic collapse.',
    whoIsAffected:
      'The ~35% of cardiac and hypertensive elderly patients who take prescription beta-blockers.',
    whatShouldWeDo:
      'Enforce a hardcoded clinical safety override in the deployment pipeline: any patient on documented beta-blocker therapy with elevated lactate or altered perfusion must trigger mandatory high-acuity physician review, bypassing solitary AI triage.',
    criticalVerdict: 'CRITICAL',
  },
  {
    id: 'uncertainty-calibration',
    stepNumber: 5,
    questionNumber: 5,
    coreQuestion: 'Does the model know when it is uncertain?',
    headlineStat: '89% Conf vs 72% True',
    statLabel: '+17% Epistemic Overconfidence Gap',
    comparisonBadge: '89% Average Predicted Confidence vs 72% Empirical Correctness on Degraded Inputs',
    whatDidWeTest:
      'We tested whether the model knows when it is uncertain. We degraded input quality (telemetry noise, delayed troponin, motion artifacts) and compared reported confidence against empirical correctness.',
    whatHappened:
      'The model suffered from severe epistemic overconfidence. Under degraded inputs where true accuracy dropped to 72%, the model continued to report 89% average confidence (+17% overconfidence gap). It never raised an uncertainty flag.',
    whyDoesItMatter:
      'A clinical AI that does not know when it is confused is catastrophic. If an AI displays "95% Confident", busy triage nurses will trust it. It must reliably raise an "Uncertain — Doctor Review Required" flag when inputs are noisy or degraded.',
    whoIsAffected:
      'All borderline, noisy, or atypical clinical presentations where sensor artifacts or partial data degrade signal fidelity.',
    whatShouldWeDo:
      'Apply post-hoc temperature scaling and Monte Carlo dropout to calibrate predicted probabilities, establishing an automatic clinical referral threshold whenever uncertainty exceeds 20%.',
    criticalVerdict: 'WARNING',
  },
];

export const RECOMMENDED_FIXES: RecommendedFix[] = [
  {
    id: 'fix-1',
    number: 1,
    title: 'Fine-tune using 2,000 local Device-B cases',
    description: 'Calibrate feature extraction against 50 Hz rural telemetry waveform profiles.',
    mechanism: 'Bandpass normalization & transfer learning on rural telemetry data.',
    applied: false,
    scoreImpact: 11,
  },
  {
    id: 'fix-2',
    number: 2,
    title: 'Add missing-lab handling',
    description: 'Replace zero-imputation with explicit missingness masks and uncertainty escalation.',
    mechanism: 'Uncertainty propagation: whenever troponin/lactate is pending, flag as uncalibrated.',
    applied: false,
    scoreImpact: 6,
  },
  {
    id: 'fix-3',
    number: 3,
    title: 'Apply fairness regularization',
    description: 'Demographic parity constraint during training to equalize true positive rates.',
    mechanism: 'Penalize error disparities across age and ethnic cohorts to close 18% gap.',
    applied: false,
    scoreImpact: 4,
  },
  {
    id: 'fix-4',
    number: 4,
    title: 'Add clinical override for beta-blocker cases',
    description: 'Deterministic clinical rule prevents "Low Risk" triage if patient is on beta-blockers with abnormal BP.',
    mechanism: 'Rule-based safeguard: overrides 98% confident neural prediction with physician consult alert.',
    applied: false,
    scoreImpact: 3,
  },
  {
    id: 'fix-5',
    number: 5,
    title: 'Apply confidence temperature scaling',
    description: 'Post-hoc calibration reduces overconfidence on out-of-distribution inputs.',
    mechanism: 'Temperature scaling reduces average overconfidence from +17% to < 3%.',
    applied: false,
    scoreImpact: 2,
  },
];
