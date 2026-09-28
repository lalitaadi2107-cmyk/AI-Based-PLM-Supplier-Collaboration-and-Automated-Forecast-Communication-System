import { ForecastRecord, PriorityLevel } from '../types';

export interface AIAnalysisResult {
  forecastId: string;
  productName: string;
  partNumber: string;
  supplierName: string;
  supplierEmail: string;
  previousQty: number;
  currentQty: number;
  changePct: number;
  formattedChange: string;
  priority: PriorityLevel;
  reason: string;
  recommendedAction: string;
  capacityRisk: string;
  leadTimeImpact: string;
  varianceScore: number;
  confidenceScore: number;
  bufferRunwayWeeks: number;
}

export interface GeneratedEmailDraft {
  to: string;
  cc: string;
  subject: string;
  body: string;
  generatedAt: string;
  tone: 'Professional Corporate' | 'Urgent Expedite' | 'Formal Quarterly Baseline';
}

/**
 * Perform comprehensive AI forecast variance analysis
 */
export function runAIForecastAnalysis(forecast: ForecastRecord): AIAnalysisResult {
  const prev = forecast.previousQty || 1;
  const curr = forecast.currentQty;
  const diff = curr - prev;
  const pct = Math.round(((diff / prev) * 100) * 10) / 10;
  const formattedChange = pct > 0 ? `+${pct}%` : `${pct}%`;

  let priority: PriorityLevel = 'NORMAL';
  let reason = '';
  let recommendedAction = '';
  let capacityRisk = '';
  let leadTimeImpact = '';

  if (Math.abs(pct) >= 20 || pct >= 20) {
    priority = 'HIGH';
    reason = `Forecast demand has increased significantly (${formattedChange}). Supplier capacity and lead time should be confirmed.`;
    recommendedAction = 'Send supplier forecast update immediately.';
    capacityRisk = 'High risk of vendor production line saturation. Requires immediate line slot reservation.';
    leadTimeImpact = 'Lead time may stretch by 2-4 weeks unless raw wafer/material commitments are authorized.';
  } else if (Math.abs(pct) >= 10) {
    priority = 'MEDIUM';
    reason = `Moderate demand variance detected (${formattedChange}). Buffer stock and tooling throughput should be locked with supplier planning desk.`;
    recommendedAction = 'Send supplier forecast update and request schedule alignment.';
    capacityRisk = 'Moderate; within manageable overtime buffer, but requires advance purchase order signaling.';
    leadTimeImpact = 'Lead time stable if confirmed within 5 business days.';
  } else {
    priority = 'NORMAL';
    reason = pct === 0 
      ? 'Demand run-rate is perfectly balanced (0% variance). Standard contractual delivery schedules remain aligned.'
      : `Minor adjustment (${formattedChange}) within expected tolerance band. No immediate line disruption detected.`;
    recommendedAction = 'Dispatch routine baseline forecast confirmation to maintain collaborative visibility.';
    capacityRisk = 'Low; standard production runs support current volumes.';
    leadTimeImpact = 'Standard contract lead-time maintained.';
  }

  // If the record itself already had a custom reason, combine or preserve
  if (forecast.reason && forecast.reason.length > 10 && !reason) {
    reason = forecast.reason;
  }

  return {
    forecastId: forecast.id,
    productName: forecast.productName,
    partNumber: forecast.partNumber,
    supplierName: forecast.supplierName,
    supplierEmail: forecast.supplierEmail,
    previousQty: forecast.previousQty,
    currentQty: forecast.currentQty,
    changePct: pct,
    formattedChange,
    priority,
    reason,
    recommendedAction,
    capacityRisk,
    leadTimeImpact,
    varianceScore: Math.min(100, Math.round(Math.abs(pct) * 1.8)),
    confidenceScore: 98.4,
    bufferRunwayWeeks: pct > 25 ? 2.4 : 6.8,
  };
}

/**
 * Generate corporate supplier forecast update email
 */
export function generateSupplierEmail(
  analysis: AIAnalysisResult,
  tone: 'Professional Corporate' | 'Urgent Expedite' | 'Formal Quarterly Baseline' = 'Professional Corporate'
): GeneratedEmailDraft {
  const isHigh = analysis.priority === 'HIGH';
  const isIncrease = analysis.changePct >= 0;

  let changeDescription = `${analysis.formattedChange} Increase`;
  if (analysis.changePct < 0) {
    changeDescription = `${Math.abs(analysis.changePct)}% Adjustment`;
  } else if (analysis.changePct === 0) {
    changeDescription = `Baseline Alignment`;
  }

  const subject = `Forecast Update – ${analysis.productName} ${analysis.partNumber} – ${changeDescription}`;
  const to = analysis.supplierEmail || 'planning@supplier-demo.com';
  const cc = 'supplychain@company-demo.com';

  const body = `Dear ${analysis.supplierName} Team,

I hope you are doing well.

As part of our latest PLM forecast review, we would like to share an updated demand requirement for the ${analysis.productName} component ${analysis.partNumber}.

Forecast Details:

Forecast ID: ${analysis.forecastId}
Product: ${analysis.productName}
Part Number: ${analysis.partNumber}
Previous Quantity: ${analysis.previousQty.toLocaleString()} units
Updated Quantity: ${analysis.currentQty.toLocaleString()} units
Change: ${analysis.formattedChange}
Priority: ${analysis.priority}

Due to the ${isIncrease ? 'increase' : 'adjustment'} in forecast demand, please review your current production capacity and confirm whether the updated requirement can be supported within the expected lead time.

Kindly confirm:

• Available production capacity
• Expected lead time
• Material availability
• Any potential supply constraints

Please share your confirmation at the earliest so that we can update our PLM supply planning records accordingly.

Thank you for your support and cooperation.

Best Regards,

Supply Chain Planning Team
AI PLM Supplier Collaboration System`;

  return {
    to,
    cc,
    subject,
    body,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    tone,
  };
}
