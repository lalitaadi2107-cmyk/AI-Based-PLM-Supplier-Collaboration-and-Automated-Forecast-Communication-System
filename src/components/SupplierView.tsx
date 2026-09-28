import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Mail, 
  ShieldCheck, 
  Tag, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { Supplier, ForecastRecord } from '../types';

interface SupplierViewProps {
  suppliers: Supplier[];
  forecasts: ForecastRecord[];
  onViewSupplierForecasts: (supplierName: string) => void;
}

export const SupplierView: React.FC<SupplierViewProps> = ({
  suppliers,
  forecasts,
  onViewSupplierForecasts,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = suppliers.filter((s) => {
    return (
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.partsSupplied.some((p) => p.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Approved Supplier & Vendor Master Directory
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {filtered.length} Active Partners
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Certified Tier-1 manufacturing suppliers configured for automated AI forecast synchronization.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search supplier, category, part..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Demo Safe Notice Banner */}
      <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl flex items-center justify-between text-xs text-blue-900">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Simulated Environment:</strong> All vendor contacts use sandboxed corporate demo emails. Real external email servers are disengaged.
          </span>
        </div>
        <span className="font-mono text-[11px] text-blue-700 font-bold hidden sm:inline">
          RFC 5322 SANDBOX
        </span>
      </div>

      {/* Main Table: Prompt Requirements:
        Supplier
        Category
        Email
        Parts Supplied
        Status

        Example:
        ABC Components | Sensors | planning@abccomponents.com | SS-100 | Active
        XYZ Electronics | Electronics | planning@xyzelectronics.com | CU-220 | Active
        Delta Parts | Power Components | planning@deltaparts.com | PM-310 | Active
      */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Demo Email Address</th>
                <th className="py-3.5 px-4">Parts Supplied</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Connected Forecasts</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No suppliers match search term.
                  </td>
                </tr>
              ) : (
                filtered.map((supplier) => {
                  const linkedForecasts = forecasts.filter(
                    (f) => f.supplierName === supplier.name
                  );

                  return (
                    <tr key={supplier.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Supplier */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        <div className="flex items-center space-x-2">
                          <div className="w-7 h-7 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-200">
                            {supplier.name.charAt(0)}
                          </div>
                          <div>
                            <div>{supplier.name}</div>
                            <div className="text-[11px] text-slate-400 font-normal">
                              {supplier.location}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 font-semibold text-slate-700">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-xs">
                          {supplier.category}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="py-3.5 px-4 font-mono text-slate-800 text-xs">
                        <div className="flex items-center space-x-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{supplier.email}</span>
                        </div>
                      </td>

                      {/* Parts Supplied */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {supplier.partsSupplied.map((p) => (
                            <span
                              key={p}
                              className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-50 text-blue-800 border border-blue-200"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                          {supplier.status}
                        </span>
                      </td>

                      {/* Connected Forecasts */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-bold text-slate-900">
                          {linkedForecasts.length} Active
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => onViewSupplierForecasts(supplier.name)}
                          className="px-3 py-1 rounded-md text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors cursor-pointer"
                        >
                          View Forecasts
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Enterprise Approved Vendor List (AVL) Registry</span>
          <span className="font-mono text-[11px] text-slate-400">Total Suppliers: {filtered.length}</span>
        </div>
      </div>
    </div>
  );
};
