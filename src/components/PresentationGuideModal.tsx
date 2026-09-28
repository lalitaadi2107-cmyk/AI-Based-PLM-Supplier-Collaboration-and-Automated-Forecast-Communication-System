import React from 'react';
import { 
  X, 
  Sparkles, 
  Layers, 
  Cpu, 
  Send, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  GraduationCap, 
  TrendingUp,
  Building2,
  Boxes
} from 'lucide-react';

interface PresentationGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PresentationGuideModal: React.FC<PresentationGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0b162c] to-[#122347] text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  College Project Architecture & Demonstration Walkthrough
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  ACADEMIC DEFENSE GUIDE
                </span>
              </div>
              <p className="text-xs text-slate-300">
                “AI-Based PLM Supplier Collaboration and Automated Forecast Communication System”
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

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
          {/* Executive Overview */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
            <h4 className="font-bold text-blue-900 text-sm flex items-center mb-1">
              <Sparkles className="w-4 h-4 mr-1.5 text-blue-600" />
              Project Objective & Problem Statement
            </h4>
            <p className="text-slate-700">
              In modern manufacturing enterprises (Automotive, Aerospace, Industrial IoT), engineering revisions in Product Lifecycle Management (PLM) frequently alter component requirements. When customer demand surges or drops, traditional manual emails and disconnected spreadsheets create severe communication lag with Tier-1 suppliers, resulting in assembly line starvation, excess inventory, and missed customer SLAs.
            </p>
            <p className="mt-2 text-slate-700 font-semibold">
              This system establishes a closed-loop automated pipeline integrating BOM parts, demand forecasting, AI variance risk analysis, automated email drafting, and audit logging.
            </p>
          </div>

          {/* 6-Stage Core Workflow Walkthrough */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center">
              <Layers className="w-4 h-4 mr-1.5 text-indigo-600" />
              6-Stage Demonstration Script (Step-by-Step for Evaluators)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-bold text-blue-700">Stage 1: Product & BOM</span>
                <p className="mt-1 text-slate-600">
                  Navigate to <strong>BOM</strong> to inspect how the <em>Smart Sensor (Rev B)</em> is broken down into component <em>SS-100</em>, single-sourced from <em>ABC Components</em>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-bold text-blue-700">Stage 2: Demand Forecast Matrix</span>
                <p className="mt-1 text-slate-600">
                  Go to <strong>Forecast</strong> tab. Point out Forecast <strong>F001</strong> where demand jumped from <strong>900 → 1200 units (+33.3%)</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
                <span className="font-bold text-indigo-700">Stage 3: AI Forecast Analysis</span>
                <p className="mt-1 text-slate-600">
                  Click <strong>“Analyze & Generate Email”</strong>. The AI evaluates variance, flags <strong>HIGH Priority</strong>, computes capacity saturation risk, and recommends immediate vendor verification.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-indigo-200 bg-indigo-50/50">
                <span className="font-bold text-indigo-700">Stage 4: Automated Email Draft</span>
                <p className="mt-1 text-slate-600">
                  Click <strong>“Generate Supplier Email”</strong>. A corporate RFC-formatted email composer opens with recipient, CC, structured forecast table, lead time checklist, and an <strong>“Edit Email”</strong> toggle.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <span className="font-bold text-emerald-700">Stage 5: Simulated Safe Dispatch</span>
                <p className="mt-1 text-slate-600">
                  Click <strong>“Send Email”</strong>. The simulation shows a verified success modal, updates the status to <strong>SENT</strong>, and safely avoids real external recipients.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="font-bold text-slate-800">Stage 6: Communication Log & Audit</span>
                <p className="mt-1 text-slate-600">
                  Open <strong>Communication Log</strong> to verify <strong>COM-001</strong> is logged with timestamp, and view <strong>Dashboard</strong> to observe the <em>Emails Sent</em> counter increment in real-time.
                </p>
              </div>
            </div>
          </div>

          {/* Key Academic Technical Highlights */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h4 className="font-bold text-slate-900 text-sm mb-2">
              Key Technical & Engineering Capabilities
            </h4>
            <ul className="space-y-1.5 list-disc pl-4 text-xs text-slate-600">
              <li><strong>Zero-Backend Pure Browser Execution:</strong> Fully interactive React state machine with persistent mock data models.</li>
              <li><strong>Enterprise PLM Ergonomics:</strong> Dark blue sidebar, clean tabular typography, standard ISO/IEC revision tracking.</li>
              <li><strong>Dynamic Variance Calculations:</strong> Editable quantities that recalculate change percentage and priority bands in real-time.</li>
              <li><strong>Built-in Safeguards:</strong> Sandboxed corporate demo email addresses preventing accidental external email transmission.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Start Demonstration
          </button>
        </div>
      </div>
    </div>
  );
};
