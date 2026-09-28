import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Layers, 
  GitCommit, 
  Filter, 
  Calendar, 
  Tag, 
  FileCheck 
} from 'lucide-react';
import { ChangeHistoryItem } from '../types';

interface ChangeHistoryViewProps {
  changeHistory: ChangeHistoryItem[];
}

export const ChangeHistoryView: React.FC<ChangeHistoryViewProps> = ({
  changeHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = changeHistory.filter((item) => {
    return (
      item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.change.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.revision.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.impact.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              PLM Engineering & Forecast Change History
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Audit Trail
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Formal Engineering Change Order (ECO) and demand revision log tracking lifecycle impacts across all components.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search changes, products, impacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Main Table: Prompt Requirements:
        Date
        Product
        Revision
        Change
        Previous Value
        New Value
        Impact

        Example:
        Smart Sensor | Rev B | Forecast Quantity | 900 → 1200 | Supplier capacity review required
      */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4 text-center">Revision</th>
                <th className="py-3.5 px-4">Change Type</th>
                <th className="py-3.5 px-4 text-right">Previous Value</th>
                <th className="py-3.5 px-4 text-right">New Value</th>
                <th className="py-3.5 px-4">Impact Assessment</th>
                <th className="py-3.5 px-4">Triggered By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No change records match current search filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Date */}
                    <td className="py-3.5 px-4 text-slate-600 text-xs whitespace-nowrap">
                      {item.date}
                    </td>

                    {/* Product */}
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {item.product}
                    </td>

                    {/* Revision */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {item.revision}
                      </span>
                    </td>

                    {/* Change */}
                    <td className="py-3.5 px-4 font-semibold text-slate-800">
                      {item.change}
                    </td>

                    {/* Previous Value */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-500">
                      {item.previousValue}
                    </td>

                    {/* New Value */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      {item.newValue}
                    </td>

                    {/* Impact */}
                    <td className="py-3.5 px-4 text-slate-700 max-w-xs">
                      <span className="px-2 py-1 rounded bg-amber-50/70 border border-amber-200/70 text-amber-900 text-xs inline-block">
                        {item.impact}
                      </span>
                    </td>

                    {/* Triggered By */}
                    <td className="py-3.5 px-4 text-slate-500 text-xs">
                      {item.triggeredBy}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Enterprise PLM Change Governance Protocol (CMII Compliant)</span>
          <span className="font-mono text-[11px] text-slate-400">Total Entries: {filtered.length}</span>
        </div>
      </div>
    </div>
  );
};
