import React from 'react';
import { 
  Package, 
  Building2, 
  Boxes, 
  TrendingUp, 
  AlertTriangle, 
  MailCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  Send, 
  Clock, 
  Layers,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { Product, Supplier, BOMItem, ForecastRecord, CommunicationLog, ChangeHistoryItem, ActiveTab } from '../types';

interface DashboardViewProps {
  products: Product[];
  suppliers: Supplier[];
  bomItems: BOMItem[];
  forecasts: ForecastRecord[];
  communications: CommunicationLog[];
  changeHistory: ChangeHistoryItem[];
  onNavigateTab: (tab: ActiveTab) => void;
  onAnalyzeForecast: (forecast: ForecastRecord) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  products,
  suppliers,
  bomItems,
  forecasts,
  communications,
  changeHistory,
  onNavigateTab,
  onAnalyzeForecast,
}) => {
  // Metrics calculation
  const totalProducts = products.length;
  const totalSuppliers = suppliers.length;
  const totalBOMParts = bomItems.length;
  const forecastRecordsCount = forecasts.length;
  const highPriorityCount = forecasts.filter((f) => f.priority === 'HIGH').length;
  const emailsSentCount = communications.length;

  const urgentPendingForecasts = forecasts.filter(
    (f) => f.priority === 'HIGH' && f.status !== 'EMAIL SENT'
  );

  return (
    <div className="space-y-6">
      {/* Welcome & Executive Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-10">
          <Layers className="w-80 h-80 text-white" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-400/30 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>AI PLM Closed-Loop Orchestration</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">
            PLM Supplier Collaboration & AI Forecast Desk
          </h2>
          <p className="mt-1.5 text-slate-300 text-xs md:text-sm leading-relaxed">
            Real-time synchronization between Engineering Bill of Materials (BOM) revisions, ERP demand forecast shifts, and automated supplier email communication.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {urgentPendingForecasts.length > 0 ? (
              <button
                onClick={() => onAnalyzeForecast(urgentPendingForecasts[0])}
                className="inline-flex items-center px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
              >
                <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
                Analyze High-Priority Forecast ({urgentPendingForecasts[0].id})
              </button>
            ) : (
              <button
                onClick={() => onNavigateTab('forecast')}
                className="inline-flex items-center px-4 py-2 rounded-lg text-xs md:text-sm font-semibold text-slate-900 bg-white hover:bg-slate-100 transition-colors cursor-pointer shadow-sm"
              >
                <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                View All Forecast Records
              </button>
            )}

            <button
              onClick={() => onNavigateTab('communication-log')}
              className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs md:text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
            >
              <MailCheck className="w-4 h-4 mr-2 text-emerald-400" />
              View Communication Log ({emailsSentCount})
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Products */}
        <div 
          onClick={() => onNavigateTab('products')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Products</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalProducts}</div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center">
            Active PLM Programs
          </div>
        </div>

        {/* Total Suppliers */}
        <div 
          onClick={() => onNavigateTab('suppliers')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Suppliers</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalSuppliers}</div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center">
            Tier-1 & Tier-2 Vendors
          </div>
        </div>

        {/* Total BOM Parts */}
        <div 
          onClick={() => onNavigateTab('bom')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Total BOM Parts</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Boxes className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalBOMParts}</div>
          <div className="mt-1 text-[11px] text-slate-500 flex items-center">
            Engineering Revisions
          </div>
        </div>

        {/* Forecast Records */}
        <div 
          onClick={() => onNavigateTab('forecast')}
          className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-blue-400 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Forecast Records</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-900">{forecastRecordsCount}</div>
          <div className="mt-1 text-[11px] text-amber-700 font-medium flex items-center">
            Q4 Active Demands
          </div>
        </div>

        {/* High Priority Changes */}
        <div 
          onClick={() => onNavigateTab('forecast')}
          className="bg-white p-4 rounded-xl border border-red-200 shadow-xs hover:border-red-400 transition-all cursor-pointer group bg-gradient-to-b from-white to-red-50/30"
        >
          <div className="flex items-center justify-between text-red-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">High Priority</span>
            <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-red-700">{highPriorityCount}</div>
          <div className="mt-1 text-[11px] text-red-600 font-medium flex items-center">
            &gt; 20% Variance Alert
          </div>
        </div>

        {/* Emails Sent */}
        <div 
          onClick={() => onNavigateTab('communication-log')}
          className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs hover:border-emerald-400 transition-all cursor-pointer group bg-gradient-to-b from-white to-emerald-50/30"
        >
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Emails Sent</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700">{emailsSentCount}</div>
          <div className="mt-1 text-[11px] text-emerald-700 font-medium flex items-center">
            Simulated Outbox
          </div>
        </div>
      </div>

      {/* Main PLM 6-Stage Process Workflow Ribbon */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center">
              <Layers className="w-4 h-4 mr-2 text-blue-600" />
              PLM Closed-Loop Supplier Collaboration Workflow
            </h3>
            <p className="text-xs text-slate-500">
              End-to-end automated pipeline from finished engineering goods to closed-loop vendor communication
            </p>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
            Interactive Architecture
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
          {[
            { step: '01', title: 'Product', desc: 'Finished item', tab: 'products' as ActiveTab, icon: Package },
            { step: '02', title: 'BOM', desc: 'Parts breakdown', tab: 'bom' as ActiveTab, icon: Boxes },
            { step: '03', title: 'Part', desc: 'SS-100, CU-220', tab: 'bom' as ActiveTab, icon: Boxes },
            { step: '04', title: 'Supplier', desc: 'ABC Components', tab: 'suppliers' as ActiveTab, icon: Building2 },
            { step: '05', title: 'Forecast', desc: 'Demand run rates', tab: 'forecast' as ActiveTab, icon: TrendingUp },
            { step: '06', title: 'AI Analysis', desc: 'Variance & risk', tab: 'ai-analysis' as ActiveTab, icon: Sparkles },
            { step: '07', title: 'AI Email', desc: 'Formatted memo', tab: 'ai-analysis' as ActiveTab, icon: Send },
            { step: '08', title: 'Comm Log', desc: 'SENT audit trail', tab: 'communication-log' as ActiveTab, icon: MailCheck },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigateTab(item.tab)}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50/60 hover:border-blue-300 transition-all text-left group cursor-pointer"
              >
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-blue-600">
                  <span>STEP {item.step}</span>
                  <Icon className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
                </div>
                <div className="text-xs font-bold text-slate-800 group-hover:text-blue-900 mt-1">
                  {item.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate">
                  {item.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Recent Activity (Required by prompt) & Quick Action Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity Card (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900">
                Recent PLM & Forecast Activity
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('change-history')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center cursor-pointer"
            >
              View Full Audit History <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Example 1 from prompt: Forecast F001 Smart Sensor ABC Components Forecast increased from 900 → 1200 Priority: HIGH Status: EMAIL SENT */}
            <div className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 border border-red-200 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-900">Forecast F001</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-700">Smart Sensor</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-600">ABC Components</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
                    Forecast increased from <span className="line-through text-slate-400">900</span> → <span className="font-bold text-slate-900">1200 units</span>
                    <span className="text-xs font-bold text-red-600">(+33.3%)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                      Priority: HIGH
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Status: EMAIL SENT
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => {
                    const f = forecasts.find((item) => item.id === 'F001');
                    if (f) onAnalyzeForecast(f);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                >
                  View Analysis
                </button>
              </div>
            </div>

            {/* Example 2: F002 Control Unit */}
            <div className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-900">Forecast F002</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-700">Control Unit</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-600">XYZ Electronics</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
                    Forecast increased from <span className="line-through text-slate-400">750</span> → <span className="font-bold text-slate-900">850 units</span>
                    <span className="text-xs font-bold text-amber-600">(+13.3%)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                      Priority: MEDIUM
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center">
                      <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" /> Status: EMAIL SENT
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => {
                    const f = forecasts.find((item) => item.id === 'F002');
                    if (f) onAnalyzeForecast(f);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                >
                  View Analysis
                </button>
              </div>
            </div>

            {/* Example 3: F004 Telemetry Gateway (Pending Urgent) */}
            <div className="p-4 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-lg bg-red-100 text-red-700 border border-red-300 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-4 h-4 animate-bounce" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-xs text-slate-900">Forecast F004</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-semibold text-slate-700">Telemetry Gateway</span>
                    <span className="text-xs text-slate-400">•</span>
                    <span className="text-xs font-medium text-slate-600">Apex Micro</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-medium">
                    Demand spiked from <span className="line-through text-slate-400">300</span> → <span className="font-bold text-slate-900">480 units</span>
                    <span className="text-xs font-bold text-red-700">(+60.0%)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                      Priority: HIGH
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300">
                      Status: PENDING REVIEW
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => {
                    const f = forecasts.find((item) => item.id === 'F004');
                    if (f) onAnalyzeForecast(f);
                  }}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer flex items-center"
                >
                  <Sparkles className="w-3.5 h-3.5 mr-1" />
                  Analyze & Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Breakdown & Supplier Readiness Card */}
        <div className="space-y-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center justify-between">
              <span>Demand Variance Distribution</span>
              <span className="text-[11px] text-slate-400">Q4 Cycle</span>
            </h3>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-red-700 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5"></span>
                    High Priority (&gt; 20% shift)
                  </span>
                  <span className="font-bold text-slate-900">{highPriorityCount} records</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(highPriorityCount / forecastRecordsCount) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-amber-700 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5"></span>
                    Medium Priority (10 - 20%)
                  </span>
                  <span className="font-bold text-slate-900">
                    {forecasts.filter((f) => f.priority === 'MEDIUM').length} records
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-amber-500 h-2 rounded-full" 
                    style={{ 
                      width: `${(forecasts.filter((f) => f.priority === 'MEDIUM').length / forecastRecordsCount) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-emerald-700 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span>
                    Normal / Baseline (&lt; 10%)
                  </span>
                  <span className="font-bold text-slate-900">
                    {forecasts.filter((f) => f.priority === 'NORMAL').length} records
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-2 rounded-full" 
                    style={{ 
                      width: `${(forecasts.filter((f) => f.priority === 'NORMAL').length / forecastRecordsCount) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
              AI engine automatically routes forecasts exceeding ±20% threshold for immediate vendor capacity sign-off.
            </div>
          </div>

          {/* Supplier Collaboration Readiness Card */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-5 rounded-xl text-white shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-300">
                Supplier Portal Status
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                All 6 Active
              </span>
            </div>
            <div className="text-sm font-semibold">Tier-1 Automated Dispatch Gateway</div>
            <p className="mt-1 text-xs text-slate-300">
              Suppliers receive formatted RFC-compliant forecast advisories with immediate response tracking.
            </p>
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
              <span>Avg Vendor SLA</span>
              <span className="font-bold text-white">96.3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
