import React, { useState } from 'react';
import { 
  Mail, 
  Send, 
  Edit3, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Copy, 
  Check, 
  Paperclip, 
  Lock, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { AIAnalysisResult, GeneratedEmailDraft, generateSupplierEmail } from '../utils/aiForecast';

interface EmailPreviewModalProps {
  analysis: AIAnalysisResult;
  isOpen: boolean;
  onClose: () => void;
  onSendEmail: (draft: {
    to: string;
    cc: string;
    subject: string;
    body: string;
    analysis: AIAnalysisResult;
  }) => void;
}

export const EmailPreviewModal: React.FC<EmailPreviewModalProps> = ({
  analysis,
  isOpen,
  onClose,
  onSendEmail,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Generate initial draft
  const initialDraft = generateSupplierEmail(analysis);
  const [to, setTo] = useState(initialDraft.to);
  const [cc, setCc] = useState(initialDraft.cc);
  const [subject, setSubject] = useState(initialDraft.subject);
  const [body, setBody] = useState(initialDraft.body);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setIsSending(true);
    // Simulate brief enterprise SMTP dispatch latency
    setTimeout(() => {
      setIsSending(false);
      onSendEmail({
        to,
        cc,
        subject,
        body,
        analysis,
      });
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
      >
        {/* Email Client App Header */}
        <div className="bg-[#0b162c] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold tracking-tight text-white">
                  Enterprise Supplier Email Composer
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/30 text-blue-200 border border-blue-400/30">
                  AI DRAFT
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Automated forecast dispatch for Forecast ID: <span className="font-mono text-blue-300 font-bold">{analysis.forecastId}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="hidden sm:inline-flex items-center text-[11px] text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
              <ShieldCheck className="w-3 h-3 mr-1" /> DEMO SAFEGUARD ACTIVE
            </span>
            <button
              onClick={onClose}
              disabled={isSending}
              className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="bg-amber-50/80 px-6 py-2 border-b border-amber-200 text-xs text-amber-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
            <span>
              This is a DEMO simulation. Emails are sent to a safe sandbox log and will not contact real recipients.
            </span>
          </div>
          <button
            onClick={handleCopy}
            className="hidden sm:flex items-center text-[11px] font-semibold text-amber-900 hover:underline cursor-pointer ml-3 shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 mr-1 text-emerald-600" /> Copied
              </>
            ) : (
              <>
                <Copy className="w-3 h-3 mr-1" /> Copy Draft
              </>
            )}
          </button>
        </div>

        {/* Email Header Fields (To, CC, Subject) */}
        <div className="p-6 pb-4 space-y-3 bg-slate-50/50 border-b border-slate-200 text-xs md:text-sm">
          {/* To Field */}
          <div className="flex items-center">
            <span className="w-16 font-bold text-slate-500 uppercase text-[11px] tracking-wider">
              To:
            </span>
            {isEditing ? (
              <input
                type="email"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <div className="flex-1 flex items-center space-x-2">
                <span className="font-mono text-slate-900 font-medium px-2 py-1 rounded bg-white border border-slate-200">
                  {to}
                </span>
                <span className="text-[11px] text-slate-400 font-sans">
                  ({analysis.supplierName})
                </span>
              </div>
            )}
          </div>

          {/* CC Field */}
          <div className="flex items-center">
            <span className="w-16 font-bold text-slate-500 uppercase text-[11px] tracking-wider">
              CC:
            </span>
            {isEditing ? (
              <input
                type="email"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <div className="flex-1">
                <span className="font-mono text-slate-700 px-2 py-1 rounded bg-white border border-slate-200 text-xs">
                  {cc}
                </span>
              </div>
            )}
          </div>

          {/* Subject Field */}
          <div className="flex items-center pt-1 border-t border-slate-200/60">
            <span className="w-16 font-bold text-slate-500 uppercase text-[11px] tracking-wider">
              Subject:
            </span>
            {isEditing ? (
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-900 font-semibold text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            ) : (
              <div className="flex-1 font-bold text-slate-900">
                {subject}
              </div>
            )}
          </div>
        </div>

        {/* Email Body Area */}
        <div className="p-6 flex-1 overflow-y-auto">
          {isEditing ? (
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Edit Email Body:
              </label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={14}
                className="w-full p-4 rounded-xl border border-slate-300 text-slate-800 font-sans text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium leading-relaxed"
              />
            </div>
          ) : (
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-800 text-xs md:text-sm whitespace-pre-wrap font-sans leading-relaxed">
              {body}
            </div>
          )}
        </div>

        {/* Action Buttons Bar: Required: “Edit Email”, “Send Email”, “Cancel” */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {/* Button: “Edit Email” */}
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              disabled={isSending}
              className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-all cursor-pointer w-full sm:w-auto ${
                isEditing
                  ? 'bg-blue-50 text-blue-700 border-blue-300 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5 mr-1.5" />
              {isEditing ? 'Save & Preview' : 'Edit Email'}
            </button>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
            {/* Button: “Cancel” */}
            <button
              type="button"
              onClick={onClose}
              disabled={isSending}
              className="px-4 py-2 rounded-xl text-xs md:text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/60 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            {/* Button: “Send Email” */}
            <button
              type="button"
              onClick={handleSend}
              disabled={isSending}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs md:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Simulating SMTP Dispatch...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Email
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
