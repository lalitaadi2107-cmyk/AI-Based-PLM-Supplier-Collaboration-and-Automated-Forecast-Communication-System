import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Clock, 
  Edit3, 
  Plus, 
  RefreshCw,
  Mail,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { ForecastRecord, PriorityLevel, ForecastStatus } from '../types';

interface ForecastViewProps {
  forecasts: ForecastRecord[];
  onAnalyzeForecast: (forecast: ForecastRecord) => void;
  onUpdateForecastQty: (id: string, newQty: number) => void;
  onAddNewForecastModal: () => void;
}

export const ForecastView: React.FC<ForecastViewProps> = ({
  forecasts,
  onAnalyzeForecast,
  onUpdateForecastQty,
  onAddNewForecastModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<'ALL' | PriorityLevel>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'SENT' | 'PENDING'>('ALL');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQtyValue, setEditQtyValue] = useState<number>(0);

  // Filtered forecasts
  const filtered = forecasts.filter((f) => {
    const matchesSearch =
      f.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.supplierName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = priorityFilter === 'ALL' || f.priority === priorityFilter;
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'SENT' && f.status === 'EMAIL SENT') ||
      (statusFilter === 'PENDING' && f.status !== 'EMAIL SENT');

    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleStartEdit = (f: ForecastRecord) => {
    setEditingId(f.id);
    setEditQtyValue(f.currentQty);
  };

  const handleSaveEdit = (id: string) => {
    if (editQtyValue > 0) {
      onUpdateForecastQty(id, editQtyValue);
    }
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Demand Forecast Variance Matrix
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {filtered.length} Forecasts
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Analyze shifts between historical baseline and current operational requirements to synchronize supply chain readiness.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={onAddNewForecastModal}
            className="inline-flex items-center px-3.5 py-2 rounded-lg text-xs md:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Forecast Scenario
          </button>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search ID, Product, Part, Supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Priority and Status Filters */}
        <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
            <span className="text-[11px] text-slate-500 px-2">Priority:</span>
            {(['ALL', 'HIGH', 'MEDIUM', 'NORMAL'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  priorityFilter === p
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-medium">
            <span className="text-[11px] text-slate-500 px-2">Status:</span>
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === 'ALL'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('PENDING')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === 'PENDING'
                  ? 'bg-white text-amber-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('SENT')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                statusFilter === 'SENT'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Sent
            </button>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Forecast ID</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Part Number</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4 text-right">Previous Qty</th>
                <th className="py-3.5 px-4 text-right">Current Qty</th>
                <th className="py-3.5 px-4 text-center">Change %</th>
                <th className="py-3.5 px-4 text-center">Priority</th>
                <th className="py-3.5 px-4">Forecast Date</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-slate-400">
                    No forecast records matching criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((f) => {
                  const isSent = f.status === 'EMAIL SENT';
                  const isEditing = editingId === f.id;
                  const isHigh = f.priority === 'HIGH';
                  const isMedium = f.priority === 'MEDIUM';

                  return (
                    <tr
                      key={f.id}
                      className={`hover:bg-blue-50/30 transition-colors ${
                        isHigh ? 'bg-red-50/15' : ''
                      }`}
                    >
                      {/* Forecast ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {f.id}
                      </td>

                      {/* Product */}
                      <td className="py-3.5 px-4 font-semibold text-slate-900">
                        {f.productName}
                      </td>

                      {/* Part Number */}
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-800 text-xs">
                          {f.partNumber}
                        </span>
                      </td>

                      {/* Supplier */}
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        <div>{f.supplierName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {f.supplierEmail}
                        </div>
                      </td>

                      {/* Previous Qty */}
                      <td className="py-3.5 px-4 text-right font-medium text-slate-500">
                        {f.previousQty.toLocaleString()}
                      </td>

                      {/* Current Qty (With inline simulation edit) */}
                      <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                        {isEditing ? (
                          <div className="inline-flex items-center space-x-1">
                            <input
                              type="number"
                              value={editQtyValue}
                              onChange={(e) => setEditQtyValue(parseInt(e.target.value) || 0)}
                              className="w-20 px-1.5 py-0.5 text-right border border-blue-400 rounded text-xs focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSaveEdit(f.id)}
                              className="px-1.5 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px]"
                            >
                              X
                            </button>
                          </div>
                        ) : (
                          <div className="inline-flex items-center space-x-1 justify-end group/edit">
                            <span>{f.currentQty.toLocaleString()}</span>
                            <button
                              onClick={() => handleStartEdit(f)}
                              title="Simulate Demand Change (Edit Quantity)"
                              className="opacity-0 group-hover/edit:opacity-100 p-0.5 text-slate-400 hover:text-blue-600 transition-opacity cursor-pointer"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Change % */}
                      <td className="py-3.5 px-4 text-center font-bold">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${
                            f.changePct > 0
                              ? f.changePct >= 20
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-800'
                              : f.changePct < 0
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {f.changePct > 0 && <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                          {f.changePct < 0 && <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                          {f.changePct > 0 ? `+${f.changePct}%` : `${f.changePct}%`}
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide uppercase border ${
                            isHigh
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : isMedium
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {f.priority}
                        </span>
                      </td>

                      {/* Forecast Date */}
                      <td className="py-3.5 px-4 text-slate-600 text-xs">
                        {f.forecastDate}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {isSent ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                            EMAIL SENT
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 mr-1 text-amber-600" />
                            PENDING REVIEW
                          </span>
                        )}
                      </td>

                      {/* Action Button: Required: “Analyze & Generate Email” */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onAnalyzeForecast(f)}
                          className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold tracking-tight transition-all cursor-pointer shadow-xs ${
                            isSent
                              ? 'bg-slate-100 hover:bg-blue-50 text-blue-700 border border-slate-300'
                              : isHigh
                              ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                          title="Run AI Forecast Analysis and generate supplier notification draft"
                        >
                          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-300" />
                          <span>Analyze & Generate Email</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Guide */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Showing <span className="font-semibold text-slate-800">{filtered.length}</span> of{' '}
            <span className="font-semibold text-slate-800">{forecasts.length}</span> total forecasts
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="flex items-center text-slate-600">
              <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span> HIGH (&gt;20% variance)
            </span>
            <span className="flex items-center text-slate-600">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-1"></span> MEDIUM (10-20%)
            </span>
            <span className="flex items-center text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span> NORMAL (&lt;10%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
