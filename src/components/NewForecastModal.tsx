import React, { useState } from 'react';
import { 
  X, 
  TrendingUp, 
  Sparkles, 
  Plus, 
  AlertCircle 
} from 'lucide-react';
import { Product, BOMItem, Supplier, ForecastRecord, PriorityLevel } from '../types';

interface NewForecastModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  bomItems: BOMItem[];
  suppliers: Supplier[];
  onAddForecast: (newForecast: ForecastRecord) => void;
}

export const NewForecastModal: React.FC<NewForecastModalProps> = ({
  isOpen,
  onClose,
  products,
  bomItems,
  suppliers,
  onAddForecast,
}) => {
  const [selectedBOMId, setSelectedBOMId] = useState(bomItems[0]?.id || '');
  const [previousQty, setPreviousQty] = useState(1000);
  const [currentQty, setCurrentQty] = useState(1350);

  if (!isOpen) return null;

  const activeBOM = bomItems.find((b) => b.id === selectedBOMId) || bomItems[0];
  const activeSupplier = suppliers.find((s) => s.id === activeBOM.supplierId) || suppliers[0];

  const diff = currentQty - previousQty;
  const pct = Math.round(((diff / (previousQty || 1)) * 100) * 10) / 10;
  const formattedChange = pct > 0 ? `+${pct}%` : `${pct}%`;

  let priority: PriorityLevel = 'NORMAL';
  if (Math.abs(pct) >= 20 || pct >= 20) {
    priority = 'HIGH';
  } else if (Math.abs(pct) >= 10) {
    priority = 'MEDIUM';
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newId = `F${Math.floor(100 + Math.random() * 900)}`;
    const newForecast: ForecastRecord = {
      id: newId,
      productId: activeBOM.productId,
      productName: activeBOM.productName,
      partNumber: activeBOM.partNumber,
      componentName: activeBOM.component,
      supplierId: activeBOM.supplierId,
      supplierName: activeBOM.supplierName,
      supplierEmail: activeSupplier?.email || 'planning@supplier-demo.com',
      previousQty,
      currentQty,
      changePct: pct,
      priority,
      forecastDate: new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'PENDING_REVIEW',
      reason: pct > 20
        ? `Forecast demand has increased significantly (${formattedChange}). Supplier capacity and lead time should be confirmed.`
        : pct > 10
        ? `Moderate demand variance detected (${formattedChange}). Buffer stock and tooling throughput should be locked with supplier planning desk.`
        : `Forecast variance (${formattedChange}) within standard tolerance envelope.`,
      recommendedAction: pct > 10
        ? 'Send supplier forecast update immediately.'
        : 'Dispatch routine baseline forecast confirmation to maintain collaborative visibility.',
      leadTimeImpact: pct > 20
        ? 'Requires 2-week early material release to maintain JIT safety stock.'
        : 'Standard delivery cycle maintained.',
      capacityRisk: pct > 20 ? 'High' : 'Moderate',
      varianceCategory: pct > 20 ? 'Sharp Increase' : pct > 10 ? 'Moderate Increase' : 'Stable',
    };

    onAddForecast(newForecast);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        <div className="bg-[#0b162c] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Simulate New Demand Forecast Shift
              </h3>
              <p className="text-[11px] text-slate-400">
                Create a live planning scenario to test automated AI priority evaluation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs md:text-sm">
          {/* Select BOM Item */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Select Product & BOM Component:
            </label>
            <select
              value={selectedBOMId}
              onChange={(e) => setSelectedBOMId(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              {bomItems.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.productName} – {b.partNumber} ({b.component}) – {b.supplierName}
                </option>
              ))}
            </select>
          </div>

          {/* Supplier Info Readout */}
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Assigned Vendor:</span>
              <span className="font-semibold text-slate-900">{activeBOM.supplierName}</span>
            </div>
            <div className="flex justify-between font-mono text-[11px]">
              <span className="text-slate-500">Contact:</span>
              <span>{activeSupplier?.email}</span>
            </div>
          </div>

          {/* Quantities */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Previous Qty (units):
              </label>
              <input
                type="number"
                min={1}
                value={previousQty}
                onChange={(e) => setPreviousQty(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Current Qty (units):
              </label>
              <input
                type="number"
                min={1}
                value={currentQty}
                onChange={(e) => setCurrentQty(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          </div>

          {/* Live Preview of Variance */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                Calculated Variance:
              </div>
              <div className="text-lg font-black text-blue-950 mt-0.5">
                {formattedChange}
              </div>
            </div>

            <div className="text-right">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                AI Priority:
              </div>
              <span
                className={`inline-block px-2.5 py-0.5 rounded text-xs font-black uppercase mt-0.5 ${
                  priority === 'HIGH'
                    ? 'bg-red-100 text-red-700 border border-red-300'
                    : priority === 'MEDIUM'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                }`}
              >
                {priority}
              </span>
            </div>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors"
            >
              Add Forecast Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
