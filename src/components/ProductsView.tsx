import React from 'react';
import { 
  Package, 
  Boxes, 
  TrendingUp, 
  ArrowRight, 
  Tag, 
  Layers,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Product, BOMItem, ForecastRecord } from '../types';

interface ProductsViewProps {
  products: Product[];
  bomItems: BOMItem[];
  forecasts: ForecastRecord[];
  onSelectProductBOM: (productName: string) => void;
  onSelectProductForecast: (productName: string) => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  bomItems,
  forecasts,
  onSelectProductBOM,
  onSelectProductForecast,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Product Lifecycle & Finished Goods Master
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {products.length} Finished Products
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Top-level end-item assemblies governed by engineering change revisions and synchronized demand plans.
          </p>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((prod) => {
          const productBOM = bomItems.filter((b) => b.productId === prod.id || b.productName === prod.name);
          const productForecasts = forecasts.filter((f) => f.productName === prod.name);
          const hasHighVariance = productForecasts.some((f) => f.priority === 'HIGH');

          return (
            <div
              key={prod.id}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {prod.revision}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {prod.lifecycleStage}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {prod.name}
                </h3>
                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                  Item Code: {prod.code}
                </div>

                <p className="mt-2.5 text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {prod.description}
                </p>

                {/* Sub info */}
                <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">BOM Parts</span>
                    <span className="font-bold text-slate-800">{productBOM.length} Components</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Active Forecasts</span>
                    <span className="font-bold text-slate-800">{productForecasts.length} Demands</span>
                  </div>
                </div>

                {hasHighVariance && (
                  <div className="mt-3 px-2.5 py-1 rounded-md bg-red-50 text-red-700 border border-red-200 text-xs font-medium flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
                    High Demand Variance Detected
                  </div>
                )}
              </div>

              {/* Card Footer Actions */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onSelectProductBOM(prod.name)}
                  className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer flex items-center"
                >
                  <Boxes className="w-3.5 h-3.5 mr-1" />
                  View BOM ({productBOM.length})
                </button>

                <button
                  onClick={() => onSelectProductForecast(prod.name)}
                  className="font-semibold text-slate-700 hover:text-slate-900 cursor-pointer flex items-center"
                >
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  Forecasts
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
