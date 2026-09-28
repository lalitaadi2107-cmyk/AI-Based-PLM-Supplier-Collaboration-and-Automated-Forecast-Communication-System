import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Building2, 
  Package, 
  Clock, 
  ShieldAlert, 
  Cpu, 
  ArrowRight,
  Layers,
  RefreshCw,
  Sliders,
  ChevronDown
} from 'lucide-react';
import { ForecastRecord } from '../types';
import { runAIForecastAnalysis, AIAnalysisResult } from '../utils/aiForecast';

interface AIAnalysisPanelProps {
  forecast: ForecastRecord | null;
  allForecasts: ForecastRecord[];
  onSelectForecast: (f: ForecastRecord) => void;
  onGenerateEmail: (analysis: AIAnalysisResult) => void;
  onBackToForecasts: () => void;
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({
  forecast,
  allForecasts,
  onSelectForecast,
  onGenerateEmail,
  onBackToForecasts,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // If no forecast is selected, default to the first one
  const currentForecast = forecast || allForecasts[0] || null;

  if (!currentForecast) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center">
        <p className="text-slate-500">No forecast record available for analysis.</p>
        <button
          onClick={onBackToForecasts}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold cursor-pointer"
        >
          Return to Forecasts
        </button>
      </div>
    );
  }

  const analysis = runAIForecastAnalysis(currentForecast);

  const handleSimulateDeepAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  const isHigh = analysis.priority === 'HIGH';
  const isMedium = analysis.priority === 'MEDIUM';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner / Selector */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              AI Forecast Analysis & Variance Reasoning
            </h2>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Automated PLM reasoning engine detecting component capacity thresholds, supply chain volatility, and vendor lead times.
          </p>
        </div>

        {/* Forecast Record Selector Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-slate-500">Active Record:</span>
          <div className="relative">
            <select
              value={currentForecast.id}
              onChange={(e) => {
                const found = allForecasts.find((f) => f.id === e.target.value);
                if (found) onSelectForecast(found);
              }}
              className="appearance-none bg-slate-50 border border-slate-300 text-slate-800 text-xs md:text-sm font-semibold rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
            >
              {allForecasts.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.id} – {f.productName} ({f.partNumber}) [{f.changePct > 0 ? `+${f.changePct}%` : `${f.changePct}%`}]
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Main AI Forecast Analysis Card (Matching prompt layout) */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-md overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-900 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono tracking-wider uppercase text-blue-200 font-bold">
              AI FORECAST ANALYSIS ENGINE
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs font-mono text-slate-300">
              Confidence Score: {analysis.confidenceScore}%
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSimulateDeepAnalysis}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors flex items-center cursor-pointer"
              title="Re-run neural inference"
            >
              <RefreshCw className={`w-3 h-3 mr-1 ${isAnalyzing ? 'animate-spin' : ''}`} />
              Re-Scan Variance
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6">
          {/* Metadata Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-6 border-b border-slate-100">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Forecast ID
              </div>
              <div className="text-base font-mono font-bold text-slate-900 mt-0.5">
                {analysis.forecastId}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Product
              </div>
              <div className="text-base font-semibold text-slate-900 mt-0.5">
                {analysis.productName}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                Part: {analysis.partNumber}
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Supplier
              </div>
              <div className="text-base font-semibold text-slate-900 mt-0.5">
                {analysis.supplierName}
              </div>
              <div className="text-xs text-slate-500 font-mono">
                {analysis.supplierEmail}
              </div>
            </div>
          </div>

          {/* Variance Breakdown Display */}
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 p-5 rounded-xl border border-blue-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Previous Forecast
              </div>
              <div className="text-2xl font-bold text-slate-700 mt-1">
                {analysis.previousQty.toLocaleString()} <span className="text-xs font-normal text-slate-500">units</span>
              </div>
            </div>

            <div className="border-x border-slate-200">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Current Forecast
              </div>
              <div className="text-2xl font-black text-slate-900 mt-1">
                {analysis.currentQty.toLocaleString()} <span className="text-xs font-normal text-slate-500">units</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Change
              </div>
              <div
                className={`text-2xl font-black mt-1 ${
                  analysis.changePct > 0
                    ? analysis.changePct >= 20
                      ? 'text-red-600'
                      : 'text-amber-600'
                    : analysis.changePct < 0
                    ? 'text-blue-600'
                    : 'text-slate-600'
                }`}
              >
                {analysis.formattedChange}
              </div>
            </div>
          </div>

          {/* AI Priority Banner */}
          <div className="flex items-center justify-between p-4 rounded-xl border bg-slate-50">
            <div className="flex items-center space-x-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                  isHigh
                    ? 'bg-red-100 text-red-700'
                    : isMedium
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  AI Priority
                </div>
                <div
                  className={`text-lg font-black tracking-wide ${
                    isHigh
                      ? 'text-red-700'
                      : isMedium
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}
                >
                  {analysis.priority}
                </div>
              </div>
            </div>

            <div className="text-right text-xs text-slate-500">
              <div>Automated Threshold Rule:</div>
              <span className="font-semibold text-slate-700">
                {isHigh ? 'Variance exceeds +20% Critical Band' : isMedium ? 'Variance within 10-20% Warning Band' : 'Variance within Normal Band (<10%)'}
              </span>
            </div>
          </div>

          {/* Reason Section (Required in prompt) */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
              Reason:
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 font-medium leading-relaxed">
              {analysis.reason}
            </div>
          </div>

          {/* Recommended Action Section (Required in prompt) */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Recommended Action:
            </div>
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-sm text-blue-900 font-semibold flex items-start space-x-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>{analysis.recommendedAction}</span>
            </div>
          </div>

          {/* Supplementary Supply Chain Constraints & Lead Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
              <div className="text-xs font-bold text-slate-700">Capacity & Production Risk</div>
              <div className="text-xs text-slate-600 mt-1">{analysis.capacityRisk}</div>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50">
              <div className="text-xs font-bold text-slate-700">Lead Time & Inventory Exposure</div>
              <div className="text-xs text-slate-600 mt-1">{analysis.leadTimeImpact}</div>
            </div>
          </div>

          {/* Big Action: Required: “Generate Supplier Email” */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={onBackToForecasts}
              className="text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer order-2 sm:order-1"
            >
              ← Back to Forecast Table
            </button>

            <button
              onClick={() => onGenerateEmail(analysis)}
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm md:text-base font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all cursor-pointer group order-1 sm:order-2"
            >
              <Sparkles className="w-4 h-4 mr-2 text-indigo-200 group-hover:rotate-12 transition-transform" />
              <span>Generate Supplier Email</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
