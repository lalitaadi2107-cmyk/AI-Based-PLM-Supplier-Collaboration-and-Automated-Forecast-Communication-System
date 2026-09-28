import React from 'react';
import { 
  CheckCircle2, 
  Send, 
  Clock, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  FileText 
} from 'lucide-react';

interface SendConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewCommLog: () => void;
  confirmationData: {
    recipient: string;
    forecastId: string;
    productName: string;
    time: string;
    commId: string;
  } | null;
}

export const SendConfirmationModal: React.FC<SendConfirmationModalProps> = ({
  isOpen,
  onClose,
  onViewCommLog,
  confirmationData,
}) => {
  if (!isOpen || !confirmationData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Celebration Accent Bar */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 h-2"></div>

        <div className="p-6 md:p-8 text-center">
          {/* Success Check Icon */}
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4 shadow-sm animate-bounce duration-700">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          {/* Heading (Matching prompt: ✓ Email sent successfully) */}
          <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
            ✓ Email sent successfully
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Simulated dispatch completed & verified by PLM Automated Outbox
          </p>

          {/* Structured Confirmation Card (Matching Prompt) */}
          <div className="mt-6 p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-3.5 text-xs md:text-sm">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <span className="font-bold text-slate-500 uppercase text-[11px] tracking-wider">
                Recipient:
              </span>
              <span className="font-mono font-semibold text-slate-900 text-xs">
                {confirmationData.recipient}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <span className="font-bold text-slate-500 uppercase text-[11px] tracking-wider">
                Forecast:
              </span>
              <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 text-xs">
                {confirmationData.forecastId}
              </span>
            </div>

            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <span className="font-bold text-slate-500 uppercase text-[11px] tracking-wider">
                Time:
              </span>
              <span className="text-slate-800 font-medium text-xs flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                {confirmationData.time}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="font-bold text-slate-500 uppercase text-[11px] tracking-wider">
                Forecast Status:
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300 text-xs">
                SENT
              </span>
            </div>
          </div>

          {/* Safe environment disclaimer */}
          <div className="mt-4 p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-200 text-[11px] text-emerald-800 flex items-center justify-center space-x-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              Recorded under Communication ID: <strong className="font-mono">{confirmationData.commId}</strong>
            </span>
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs md:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Done
            </button>

            <button
              onClick={() => {
                onClose();
                onViewCommLog();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
            >
              <span>View in Communication Log</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
