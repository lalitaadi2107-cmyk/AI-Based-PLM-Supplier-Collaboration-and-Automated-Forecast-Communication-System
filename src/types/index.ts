export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'NORMAL';
export type ForecastStatus = 'PENDING_REVIEW' | 'ANALYSIS_READY' | 'EMAIL_DRAFTED' | 'SENT' | 'EMAIL SENT';

export interface Product {
  id: string;
  code: string;
  name: string;
  category: string;
  revision: string;
  lifecycleStage: 'Concept' | 'Design' | 'Ramp-Up' | 'Production' | 'Maintenance';
  description: string;
  bomCount: number;
  programManager: string;
}

export interface BOMItem {
  id: string;
  productId: string;
  productName: string;
  partNumber: string;
  component: string;
  quantity: number;
  supplierId: string;
  supplierName: string;
  revision: string;
  unitCost: number;
  leadTimeWeeks: number;
  materialSpec: string;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  email: string;
  contactPerson: string;
  phone: string;
  location: string;
  partsSupplied: string[];
  status: 'Active' | 'Preferred' | 'Under Review';
  slaScore: number;
  riskRating: 'Low' | 'Moderate' | 'High';
}

export interface ForecastRecord {
  id: string; // e.g. F001
  productId: string;
  productName: string;
  partNumber: string;
  componentName: string;
  supplierId: string;
  supplierName: string;
  supplierEmail: string;
  previousQty: number;
  currentQty: number;
  changePct: number;
  priority: PriorityLevel;
  forecastDate: string;
  status: ForecastStatus;
  reason: string;
  recommendedAction: string;
  leadTimeImpact: string;
  capacityRisk: string;
  varianceCategory: 'Sharp Increase' | 'Moderate Increase' | 'Stable' | 'Demand Drop';
}

export interface CommunicationLog {
  id: string; // e.g. COM-001
  forecastId: string;
  supplier: string;
  supplierEmail: string;
  product: string;
  partNumber: string;
  subject: string;
  to: string;
  cc: string;
  body: string;
  sentDate: string;
  priority: PriorityLevel;
  status: 'SENT';
  deliveryMetadata?: {
    smtpServer: string;
    protocol: string;
    dispatchLatencyMs: number;
    trackingId: string;
  };
}

export interface ChangeHistoryItem {
  id: string;
  date: string;
  product: string;
  revision: string;
  change: string;
  previousValue: string;
  newValue: string;
  impact: string;
  triggeredBy: string;
  forecastId?: string;
}

export type ActiveTab =
  | 'dashboard'
  | 'products'
  | 'bom'
  | 'suppliers'
  | 'forecast'
  | 'ai-analysis'
  | 'communication-log'
  | 'change-history';
