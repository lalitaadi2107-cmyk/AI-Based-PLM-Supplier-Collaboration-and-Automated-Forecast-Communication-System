import React from 'react';
import { 
  Cpu, 
  Send, 
  Sparkles, 
  RotateCcw, 
  HelpCircle, 
  Bell, 
  ShieldCheck, 
  Layers
} from 'lucide-react';

interface HeaderProps {
  onResetData: () => void;
  onOpenTour: () => void;
  sentCount: number;
  pendingCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onResetData,
  onOpenTour,
  sentCount,
  pendingCount,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="px-6 py-3.5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Title & Subtitle */}
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">
                AI-Based PLM Supplier Collaboration
              </h1>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                PLM v4.8 AI-CORE
              </span>
              <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 mr-1" /> DEMO SAFEGUARD ACTIVE
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 font-medium">
              AI-Enabled Forecast Communication & Supplier Collaboration
            </p>
          </div>
        </div>

        {/* Action Controls & Demo Indicators */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Quick Stats Pills */}
          <div className="hidden xl:flex items-center space-x-2 text-xs font-medium">
            <div className="flex items-center px-2.5 py-1 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500 mr-1.5 animate-pulse"></span>
              {pendingCount} Forecasts Pending
            </div>
            <div className="flex items-center px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
              <Send className="w-3 h-3 mr-1.5 text-emerald-600" />
              {sentCount} Emails Dispatched
            </div>
          </div>

          {/* Project Presentation Guide Button */}
          <button
            onClick={onOpenTour}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer shadow-xs"
            title="View College Project Architecture & Demonstration Walkthrough"
          >
            <HelpCircle className="w-4 h-4 mr-1.5 text-indigo-600" />
            Project Architecture Guide
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetData}
            className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            title="Reset data to initial demonstration state"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* Enterprise Breadcrumb / PLM Stage Tracker Banner */}
      <div className="bg-slate-50/80 px-6 py-1.5 border-t border-slate-200/80 text-[11px] text-slate-500 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <span className="font-semibold text-slate-700 flex items-center">
            <Layers className="w-3 h-3 mr-1 text-blue-600" /> PLM Pipeline:
          </span>
          <span className="text-slate-400">Product</span>
          <span>→</span>
          <span className="text-slate-400">BOM</span>
          <span>→</span>
          <span className="text-slate-400">Part</span>
          <span>→</span>
          <span className="text-slate-400">Supplier</span>
          <span>→</span>
          <span className="text-blue-700 font-semibold">Forecast</span>
          <span>→</span>
          <span className="text-indigo-700 font-semibold flex items-center">
            <Sparkles className="w-2.5 h-2.5 mr-0.5 text-indigo-600" /> AI Forecast Analysis
          </span>
          <span>→</span>
          <span className="text-indigo-700 font-semibold">AI Generated Email</span>
          <span>→</span>
          <span className="text-emerald-700 font-semibold">Send Email</span>
          <span>→</span>
          <span className="text-slate-600 font-medium">Communication Log</span>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-slate-400">
          <span>Enterprise Instance: GLOBAL-PLM-US-EAST</span>
          <span>•</span>
          <span className="text-slate-600 font-medium">Simulation Sandbox</span>
        </div>
      </div>
    </header>
  );
};
