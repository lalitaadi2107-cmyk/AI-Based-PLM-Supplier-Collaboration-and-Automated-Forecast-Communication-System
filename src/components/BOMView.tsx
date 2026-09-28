import React, { useState } from 'react';
import { 
  Boxes, 
  Search, 
  Filter, 
  ExternalLink, 
  Tag, 
  Layers, 
  Building2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { BOMItem, ForecastRecord } from '../types';

interface BOMViewProps {
  bomItems: BOMItem[];
  forecasts: ForecastRecord[];
  onSelectForecastForPart: (partNumber: string) => void;
}

export const BOMView: React.FC<BOMViewProps> = ({
  bomItems,
  forecasts,
  onSelectForecastForPart,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productFilter, setProductFilter] = useState('ALL');

  const productsList = Array.from(new Set(bomItems.map((b) => b.productName)));

  const filtered = bomItems.filter((item) => {
    const matchesSearch =
      item.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.component.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplierName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProduct = productFilter === 'ALL' || item.productName === productFilter;

    return matchesSearch && matchesProduct;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Engineering Bill of Materials (BOM) Explorer
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {filtered.length} Items
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Hierarchical multi-level engineering breakdown mapping components, assigned suppliers, and revision states.
          </p>
        </div>

        {/* Product Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-slate-500">Filter Product:</span>
          <select
            value={productFilter}
            onChange={(e) => setProductFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 text-slate-800 text-xs md:text-sm font-semibold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="ALL">All Products</option>
            {productsList.map((prod) => (
              <option key={prod} value={prod}>
                {prod}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Component, Part Number, Supplier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Main Table: Prompt Requirements:
        Product
        Part Number
        Component
        Quantity
        Supplier
        Revision

        Example:
        Smart Sensor | SS-100 | Sensor Element | 1 | ABC Components | Rev B
      */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Part Number</th>
                <th className="py-3.5 px-4">Component Description</th>
                <th className="py-3.5 px-4 text-center">Quantity (per Unit)</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4 text-center">Revision</th>
                <th className="py-3.5 px-4 text-right">Lead Time</th>
                <th className="py-3.5 px-4 text-center">Forecast Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    No BOM components match filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const linkedForecast = forecasts.find((f) => f.partNumber === item.partNumber);
                  return (
                    <tr key={item.id} className="hover:bg-blue-50/30 transition-colors">
                      {/* Product */}
                      <td className="py-3.5 px-4 font-bold text-slate-900">
                        {item.productName}
                      </td>

                      {/* Part Number */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-blue-700">
                        <span className="px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                          {item.partNumber}
                        </span>
                      </td>

                      {/* Component */}
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        <div>{item.component}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {item.materialSpec}
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="py-3.5 px-4 text-center font-bold text-slate-900">
                        {item.quantity}
                      </td>

                      {/* Supplier */}
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        <div className="flex items-center space-x-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.supplierName}</span>
                        </div>
                      </td>

                      {/* Revision */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          {item.revision}
                        </span>
                      </td>

                      {/* Lead Time */}
                      <td className="py-3.5 px-4 text-right text-slate-600 font-medium">
                        {item.leadTimeWeeks} weeks
                      </td>

                      {/* Forecast Link */}
                      <td className="py-3.5 px-4 text-center">
                        {linkedForecast ? (
                          <button
                            onClick={() => onSelectForecastForPart(item.partNumber)}
                            className="inline-flex items-center px-2.5 py-1 rounded text-xs font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 transition-colors cursor-pointer"
                            title="Go to AI Forecast Analysis for this BOM component"
                          >
                            <Sparkles className="w-3 h-3 mr-1 text-indigo-600" />
                            {linkedForecast.id}
                          </button>
                        ) : (
                          <span className="text-slate-400 text-xs">No Shift</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span>Enterprise Engineering Bill of Materials (CAD/PDM Integrated)</span>
          <span className="font-mono text-[11px] text-slate-400">Total BOM Records: {filtered.length}</span>
        </div>
      </div>
    </div>
  );
};
