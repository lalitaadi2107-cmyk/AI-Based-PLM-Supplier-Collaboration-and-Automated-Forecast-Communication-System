import { Product, BOMItem, Supplier, ForecastRecord, CommunicationLog, ChangeHistoryItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'PRD-001',
    code: 'SMT-SNS-100',
    name: 'Smart Sensor',
    category: 'Industrial IoT Sensing',
    revision: 'Rev B',
    lifecycleStage: 'Production',
    description: 'High-precision multi-spectral ambient vibration and thermal monitor for Industry 4.0 applications.',
    bomCount: 3,
    programManager: 'Sarah Jenkins (Supply Chain Lead)',
  },
  {
    id: 'PRD-002',
    code: 'CTL-UNT-220',
    name: 'Control Unit',
    category: 'Automotive & Embedded Systems',
    revision: 'Rev C',
    lifecycleStage: 'Production',
    description: 'Central dual-core gateway processing unit with dual CAN-FD and industrial Ethernet bus.',
    bomCount: 3,
    programManager: 'David Chen (PLM Systems Architect)',
  },
  {
    id: 'PRD-003',
    code: 'PWR-MOD-310',
    name: 'Power Module',
    category: 'Power Management',
    revision: 'Rev A',
    lifecycleStage: 'Production',
    description: 'Wide-input high-efficiency DC-DC step-down converter with built-in surge isolation.',
    bomCount: 2,
    programManager: 'Elena Rostova (Procurement Mgr)',
  },
  {
    id: 'PRD-004',
    code: 'TEL-GTW-404',
    name: 'Telemetry Gateway',
    category: 'Edge Communications',
    revision: 'Rev B',
    lifecycleStage: 'Ramp-Up',
    description: 'Ruggedized outdoor field telemetry router with fallback satellite link and 5G uplink.',
    bomCount: 2,
    programManager: 'Marcus Vance (NPI Director)',
  },
  {
    id: 'PRD-005',
    code: 'IND-HMI-550',
    name: 'Industrial HMI',
    category: 'Display & Operator Terminals',
    revision: 'Rev C',
    lifecycleStage: 'Production',
    description: 'IP67 rated glove-compatible touchscreen operator workstation with hardened safety relays.',
    bomCount: 2,
    programManager: 'Rachel Wei (Operations VP)',
  },
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'ABC Components',
    category: 'Sensors',
    email: 'planning@abccomponents.com',
    contactPerson: 'Marcus Thorne',
    phone: '+1 (555) 234-8901',
    location: 'Munich, Germany / Austin, USA',
    partsSupplied: ['SS-100', 'SS-142'],
    status: 'Active',
    slaScore: 98.4,
    riskRating: 'Low',
  },
  {
    id: 'SUP-002',
    name: 'XYZ Electronics',
    category: 'Electronics',
    email: 'planning@xyzelectronics.com',
    contactPerson: 'Kenji Sato',
    phone: '+1 (555) 456-9123',
    location: 'Osaka, Japan / San Jose, USA',
    partsSupplied: ['CU-220'],
    status: 'Active',
    slaScore: 94.2,
    riskRating: 'Moderate',
  },
  {
    id: 'SUP-003',
    name: 'Delta Parts',
    category: 'Power Components',
    email: 'planning@deltaparts.com',
    contactPerson: 'Claire Bennett',
    phone: '+1 (555) 890-1234',
    location: 'Hsinchu, Taiwan / Dallas, USA',
    partsSupplied: ['PM-310'],
    status: 'Active',
    slaScore: 99.1,
    riskRating: 'Low',
  },
  {
    id: 'SUP-004',
    name: 'Apex Micro',
    category: 'Semiconductor & Comms',
    email: 'planning@apexmicro-demo.com',
    contactPerson: 'Vikram Patel',
    phone: '+1 (555) 345-6789',
    location: 'Bengaluru, India / Phoenix, USA',
    partsSupplied: ['TG-404', 'SS-102', 'CU-225'],
    status: 'Active',
    slaScore: 91.5,
    riskRating: 'Moderate',
  },
  {
    id: 'SUP-005',
    name: 'Solis Display Corp',
    category: 'Displays & Optics',
    email: 'planning@solisdisplay.com',
    contactPerson: 'Astrid Lind',
    phone: '+1 (555) 678-9012',
    location: 'Seoul, South Korea',
    partsSupplied: ['HM-550'],
    status: 'Active',
    slaScore: 96.7,
    riskRating: 'Low',
  },
  {
    id: 'SUP-006',
    name: 'ForgeTech Plastics',
    category: 'Enclosures & Mechanical',
    email: 'planning@forgetech-demo.com',
    contactPerson: 'Robert Miller',
    phone: '+1 (555) 789-0123',
    location: 'Detroit, USA / Monterrey, Mexico',
    partsSupplied: ['SS-105', 'PM-315'],
    status: 'Preferred',
    slaScore: 97.9,
    riskRating: 'Low',
  },
];

export const INITIAL_BOM: BOMItem[] = [
  {
    id: 'BOM-001',
    productId: 'PRD-001',
    productName: 'Smart Sensor',
    partNumber: 'SS-100',
    component: 'Sensor Element (MEMS Accelerometer)',
    quantity: 1,
    supplierId: 'SUP-001',
    supplierName: 'ABC Components',
    revision: 'Rev B',
    unitCost: 14.8,
    leadTimeWeeks: 6,
    materialSpec: 'Silicon MEMS wafer with ceramic hermetic package',
  },
  {
    id: 'BOM-002',
    productId: 'PRD-001',
    productName: 'Smart Sensor',
    partNumber: 'SS-102',
    component: 'Microcontroller IC (32-Bit ARM Cortex)',
    quantity: 1,
    supplierId: 'SUP-004',
    supplierName: 'Apex Micro',
    revision: 'Rev A',
    unitCost: 8.5,
    leadTimeWeeks: 10,
    materialSpec: 'QFN-48 RoHS compliant automotive grade',
  },
  {
    id: 'BOM-003',
    productId: 'PRD-001',
    productName: 'Smart Sensor',
    partNumber: 'SS-105',
    component: 'Sensor Housing Enclosure (IP67 Anodized)',
    quantity: 1,
    supplierId: 'SUP-006',
    supplierName: 'ForgeTech Plastics',
    revision: 'Rev B',
    unitCost: 5.2,
    leadTimeWeeks: 4,
    materialSpec: 'CNC 6061-T6 Aluminum with Viton O-ring seal',
  },
  {
    id: 'BOM-004',
    productId: 'PRD-002',
    productName: 'Control Unit',
    partNumber: 'CU-220',
    component: 'Main Processing Board (Dual-Core Embedded PCB)',
    quantity: 1,
    supplierId: 'SUP-002',
    supplierName: 'XYZ Electronics',
    revision: 'Rev C',
    unitCost: 62.0,
    leadTimeWeeks: 8,
    materialSpec: '8-layer FR4 high-TG PCB with conformal coating',
  },
  {
    id: 'BOM-005',
    productId: 'PRD-002',
    productName: 'Control Unit',
    partNumber: 'CU-225',
    component: 'CAN-Bus Transceiver Sub-Assembly',
    quantity: 2,
    supplierId: 'SUP-004',
    supplierName: 'Apex Micro',
    revision: 'Rev A',
    unitCost: 4.1,
    leadTimeWeeks: 6,
    materialSpec: 'ISO 11898-2 standard galvanic isolation',
  },
  {
    id: 'BOM-006',
    productId: 'PRD-003',
    productName: 'Power Module',
    partNumber: 'PM-310',
    component: 'DC-DC Step Down Converter Subsystem',
    quantity: 1,
    supplierId: 'SUP-003',
    supplierName: 'Delta Parts',
    revision: 'Rev A',
    unitCost: 28.5,
    leadTimeWeeks: 5,
    materialSpec: 'Wide Vin 9-36V, 24V/5A continuous output',
  },
  {
    id: 'BOM-007',
    productId: 'PRD-003',
    productName: 'Power Module',
    partNumber: 'PM-315',
    component: 'Thermal Heat Sink & Mounting Bracket',
    quantity: 1,
    supplierId: 'SUP-006',
    supplierName: 'ForgeTech Plastics',
    revision: 'Rev A',
    unitCost: 7.4,
    leadTimeWeeks: 3,
    materialSpec: 'Extruded Black Anodized AL6063 with pre-applied TIM',
  },
  {
    id: 'BOM-008',
    productId: 'PRD-004',
    productName: 'Telemetry Gateway',
    partNumber: 'TG-404',
    component: 'LTE/5G Industrial Modem & RF Antenna Module',
    quantity: 1,
    supplierId: 'SUP-004',
    supplierName: 'Apex Micro',
    revision: 'Rev B',
    unitCost: 48.0,
    leadTimeWeeks: 12,
    materialSpec: 'Multi-band Cat-M1/NB-IoT with eSIM architecture',
  },
  {
    id: 'BOM-009',
    productId: 'PRD-005',
    productName: 'Industrial HMI',
    partNumber: 'HM-550',
    component: '10.1" Capacitive Touch Display Panel',
    quantity: 1,
    supplierId: 'SUP-005',
    supplierName: 'Solis Display Corp',
    revision: 'Rev C',
    unitCost: 95.0,
    leadTimeWeeks: 7,
    materialSpec: '1920x1200 IPS, 1000 nits sunlight viewable, bonded glass',
  },
];

export const INITIAL_FORECASTS: ForecastRecord[] = [
  {
    id: 'F001',
    productId: 'PRD-001',
    productName: 'Smart Sensor',
    partNumber: 'SS-100',
    componentName: 'Sensor Element',
    supplierId: 'SUP-001',
    supplierName: 'ABC Components',
    supplierEmail: 'planning@abccomponents.com',
    previousQty: 900,
    currentQty: 1200,
    changePct: 33.3,
    priority: 'HIGH',
    forecastDate: '28 Sep 2026',
    status: 'EMAIL SENT',
    reason: 'Forecast demand has increased significantly (+33.3%). Supplier capacity and lead time should be confirmed.',
    recommendedAction: 'Send supplier forecast update immediately.',
    leadTimeImpact: 'Requires 2-week early material release to maintain JIT safety stock.',
    capacityRisk: 'High (ABC Components fab line utilization currently exceeds 88%).',
    varianceCategory: 'Sharp Increase',
  },
  {
    id: 'F002',
    productId: 'PRD-002',
    productName: 'Control Unit',
    partNumber: 'CU-220',
    componentName: 'Main Processing Board',
    supplierId: 'SUP-002',
    supplierName: 'XYZ Electronics',
    supplierEmail: 'planning@xyzelectronics.com',
    previousQty: 750,
    currentQty: 850,
    changePct: 13.3,
    priority: 'MEDIUM',
    forecastDate: '28 Sep 2026',
    status: 'EMAIL SENT',
    reason: 'Moderate increase (+13.3%) aligned with automotive Q4 schedule ramp. Standard lead-time buffer sufficient.',
    recommendedAction: 'Send automated forecast advisory and lock slot with supplier planner.',
    leadTimeImpact: 'Lead time steady at 8 weeks; no expedite fee required.',
    capacityRisk: 'Moderate (Standard shift overtime accommodates volume).',
    varianceCategory: 'Moderate Increase',
  },
  {
    id: 'F003',
    productId: 'PRD-003',
    productName: 'Power Module',
    partNumber: 'PM-310',
    componentName: 'DC-DC Step Down Converter',
    supplierId: 'SUP-003',
    supplierName: 'Delta Parts',
    supplierEmail: 'planning@deltaparts.com',
    previousQty: 500,
    currentQty: 500,
    changePct: 0.0,
    priority: 'NORMAL',
    forecastDate: '28 Sep 2026',
    status: 'PENDING_REVIEW',
    reason: 'Demand volume flat (0% variance). Baseline run rates intact; supplier inventory targets on schedule.',
    recommendedAction: 'Routine confirmation; dispatch formal monthly baseline alignment.',
    leadTimeImpact: 'Normal 5-week order cycle undisturbed.',
    capacityRisk: 'Low (Within contract committed blanket order envelope).',
    varianceCategory: 'Stable',
  },
  {
    id: 'F004',
    productId: 'PRD-004',
    productName: 'Telemetry Gateway',
    partNumber: 'TG-404',
    componentName: 'LTE/5G Industrial Modem',
    supplierId: 'SUP-004',
    supplierName: 'Apex Micro',
    supplierEmail: 'planning@apexmicro-demo.com',
    previousQty: 300,
    currentQty: 480,
    changePct: 60.0,
    priority: 'HIGH',
    forecastDate: '28 Sep 2026',
    status: 'PENDING_REVIEW',
    reason: 'Demand spiked by +60.0% due to major smart-grid utility deployment win. Serious component bottleneck risk.',
    recommendedAction: 'Immediate Tier-1 escalation, confirm fab allocation, request expedited silicon wafer reservation.',
    leadTimeImpact: 'Lead time likely to expand from 12 to 16 weeks without prompt authorization.',
    capacityRisk: 'Critical (Apex Micro RF fab capacity constrained across telecom sector).',
    varianceCategory: 'Sharp Increase',
  },
  {
    id: 'F005',
    productId: 'PRD-005',
    productName: 'Industrial HMI',
    partNumber: 'HM-550',
    componentName: '10.1" Capacitive Touch Display Panel',
    supplierId: 'SUP-005',
    supplierName: 'Solis Display Corp',
    supplierEmail: 'planning@solisdisplay.com',
    previousQty: 1200,
    currentQty: 1100,
    changePct: -8.3,
    priority: 'NORMAL',
    forecastDate: '28 Sep 2026',
    status: 'PENDING_REVIEW',
    reason: 'Minor softening (-8.3%) in assembly demand due to seasonal maintenance downtime in EMEA manufacturing plants.',
    recommendedAction: 'Notify supplier of gentle tapering to prevent excess safety inventory carrying costs.',
    leadTimeImpact: 'Standard delivery schedules hold steady.',
    capacityRisk: 'Low (Vendor has flexible capacity).',
    varianceCategory: 'Demand Drop',
  },
  {
    id: 'F006',
    productId: 'PRD-001',
    productName: 'Smart Sensor',
    partNumber: 'SS-102',
    componentName: 'Microcontroller IC',
    supplierId: 'SUP-004',
    supplierName: 'Apex Micro',
    supplierEmail: 'planning@apexmicro-demo.com',
    previousQty: 900,
    currentQty: 1200,
    changePct: 33.3,
    priority: 'HIGH',
    forecastDate: '28 Sep 2026',
    status: 'PENDING_REVIEW',
    reason: 'Derived BOM requirement surge (+33.3%) matching Smart Sensor master build schedule revision Rev B.',
    recommendedAction: 'Engage Apex Micro procurement manager to verify silicon lead-times and raw material wafer inventory.',
    leadTimeImpact: 'High risk of delivery slipping past target sprint window.',
    capacityRisk: 'High (BOM dependency on SS-100 assembly line synchronization).',
    varianceCategory: 'Sharp Increase',
  },
];

export const INITIAL_COMMUNICATIONS: CommunicationLog[] = [
  {
    id: 'COM-001',
    forecastId: 'F001',
    supplier: 'ABC Components',
    supplierEmail: 'planning@abccomponents.com',
    product: 'Smart Sensor',
    partNumber: 'SS-100',
    subject: 'Forecast Update – Smart Sensor SS-100 – 33.3% Increase',
    to: 'planning@abccomponents.com',
    cc: 'supplychain@company-demo.com',
    body: `Dear ABC Components Team,

I hope you are doing well.

As part of our latest PLM forecast review, we would like to share an updated demand requirement for the Smart Sensor component SS-100.

Forecast Details:

Forecast ID: F001
Product: Smart Sensor
Part Number: SS-100
Previous Quantity: 900 units
Updated Quantity: 1,200 units
Change: +33.3%
Priority: HIGH

Due to the increase in forecast demand, please review your current production capacity and confirm whether the updated requirement can be supported within the expected lead time.

Kindly confirm:

• Available production capacity
• Expected lead time
• Material availability
• Any potential supply constraints

Please share your confirmation at the earliest so that we can update our PLM supply planning records accordingly.

Thank you for your support and cooperation.

Best Regards,

Supply Chain Planning Team
AI PLM Supplier Collaboration System`,
    sentDate: '28 Sep 2026',
    priority: 'HIGH',
    status: 'SENT',
    deliveryMetadata: {
      smtpServer: 'smtp-relay.corp-plm.net:587 (TLSv1.3)',
      protocol: 'RFC-5322 Enterprise PLM Dispatch Protocol',
      dispatchLatencyMs: 142,
      trackingId: 'TRK-PLM-F001-99812A',
    },
  },
  {
    id: 'COM-002',
    forecastId: 'F002',
    supplier: 'XYZ Electronics',
    supplierEmail: 'planning@xyzelectronics.com',
    product: 'Control Unit',
    partNumber: 'CU-220',
    subject: 'Forecast Update – Control Unit CU-220 – 13.3% Increase',
    to: 'planning@xyzelectronics.com',
    cc: 'supplychain@company-demo.com',
    body: `Dear XYZ Electronics Team,

I hope you are doing well.

As part of our latest PLM forecast review, we would like to share an updated demand requirement for the Control Unit component CU-220.

Forecast Details:

Forecast ID: F002
Product: Control Unit
Part Number: CU-220
Previous Quantity: 750 units
Updated Quantity: 850 units
Change: +13.3%
Priority: MEDIUM

Due to the moderate increase in forecast demand, please review your current production schedules and confirm whether the updated requirement can be supported within the expected lead time.

Kindly confirm:

• Available production capacity
• Expected lead time
• Material availability
• Any potential supply constraints

Please share your confirmation at the earliest so that we can update our PLM supply planning records accordingly.

Thank you for your support and cooperation.

Best Regards,

Supply Chain Planning Team
AI PLM Supplier Collaboration System`,
    sentDate: '28 Sep 2026',
    priority: 'MEDIUM',
    status: 'SENT',
    deliveryMetadata: {
      smtpServer: 'smtp-relay.corp-plm.net:587 (TLSv1.3)',
      protocol: 'RFC-5322 Enterprise PLM Dispatch Protocol',
      dispatchLatencyMs: 165,
      trackingId: 'TRK-PLM-F002-33104B',
    },
  },
];

export const INITIAL_CHANGE_HISTORY: ChangeHistoryItem[] = [
  {
    id: 'CHG-101',
    date: '28 Sep 2026',
    product: 'Smart Sensor',
    revision: 'Rev B',
    change: 'Forecast Quantity',
    previousValue: '900 units',
    newValue: '1200 units (+33.3%)',
    impact: 'Supplier capacity review required; potential lead time pressure',
    triggeredBy: 'PLM Demand Planning Engine (System)',
    forecastId: 'F001',
  },
  {
    id: 'CHG-102',
    date: '28 Sep 2026',
    product: 'Control Unit',
    revision: 'Rev C',
    change: 'Forecast Quantity',
    previousValue: '750 units',
    newValue: '850 units (+13.3%)',
    impact: 'Buffer stock safety maintained within 8-week production window',
    triggeredBy: 'Automotive OEM Client Schedule Revision',
    forecastId: 'F002',
  },
  {
    id: 'CHG-103',
    date: '27 Sep 2026',
    product: 'Power Module',
    revision: 'Rev A',
    change: 'Engineering Revision Release',
    previousValue: 'Rev A-1 (Prototype)',
    newValue: 'Rev A (Production Approved)',
    impact: 'ECN-401 closed; released for multi-vendor volume procurement',
    triggeredBy: 'Elena Rostova (Engineering Change Authority)',
    forecastId: 'F003',
  },
  {
    id: 'CHG-104',
    date: '26 Sep 2026',
    product: 'Telemetry Gateway',
    revision: 'Rev B',
    change: 'Demand Spike Surge',
    previousValue: '300 units',
    newValue: '480 units (+60.0%)',
    impact: 'Critical fab allocation requested for LTE/5G silicon modules',
    triggeredBy: 'Commercial Field Operations',
    forecastId: 'F004',
  },
  {
    id: 'CHG-105',
    date: '25 Sep 2026',
    product: 'Industrial HMI',
    revision: 'Rev C',
    change: 'Forecast Quantity',
    previousValue: '1200 units',
    newValue: '1100 units (-8.3%)',
    impact: 'Scheduled tapering to prevent inventory build-up at assembly dock',
    triggeredBy: 'Operations Demand Balancing Algorithm',
    forecastId: 'F005',
  },
];
