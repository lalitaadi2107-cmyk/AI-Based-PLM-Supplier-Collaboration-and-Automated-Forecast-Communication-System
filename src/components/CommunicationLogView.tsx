import React, { useState } from 'react';
import { 
  MailCheck, 
  Search, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  FileText, 
  X, 
  ShieldCheck, 
  Download,
  AlertTriangle
} from 'lucide-react';
import { CommunicationLog } from '../types';

interface CommunicationLogViewProps {
  communications: CommunicationLog[];
}

export const CommunicationLogView: React.FC<CommunicationLogViewProps> = ({
  communications,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComm, setSelectedComm] = useState<CommunicationLog | null>(null);

  const filtered = communications.filter((c) => {
    return (
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.forecastId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg md:text-xl font-bold text-slate-900">
              Supplier Communication Log
            </h2>
            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {communications.length} Dispatched Records
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-500 mt-1">
            Complete audit trail of all automated AI-generated supplier notices and forecast release advisories.
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search Comm ID, Supplier, Product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 text-xs md:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Main Table: Prompt Requirements:
        Communication ID
        Forecast ID
        Supplier
        Product
        Subject
        Sent Date
        Priority
        Status
      */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Communication ID</th>
                <th className="py-3.5 px-4">Forecast ID</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Product</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Sent Date</th>
                <th className="py-3.5 px-4 text-center">Priority</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs md:text-sm text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No communication records found matching search.
                  </td>
                </tr>
              ) : (
                filtered.map((comm) => {
                  const isHigh = comm.priority === 'HIGH';
                  const isMedium = comm.priority === 'MEDIUM';

                  return (
                    <tr
                      key={comm.id}
                      onClick={() => setSelectedComm(comm)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      {/* Communication ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900 group-hover:text-blue-700">
                        {comm.id}
                      </td>

                      {/* Forecast ID */}
                      <td className="py-3.5 px-4 font-mono font-semibold text-blue-700">
                        <span className="px-1.5 py-0.5 rounded bg-blue-50 border border-blue-200">
                          {comm.forecastId}
                        </span>
                      </td>

                      {/* Supplier */}
                      <td className="py-3.5 px-4 font-medium text-slate-900">
                        <div>{comm.supplier}</div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {comm.supplierEmail || comm.to}
                        </div>
                      </td>

                      {/* Product */}
                      <td className="py-3.5 px-4 font-medium text-slate-800">
                        {comm.product}
                      </td>

                      {/* Subject */}
                      <td className="py-3.5 px-4 text-slate-800 max-w-xs truncate font-medium">
                        {comm.subject}
                      </td>

                      {/* Sent Date */}
                      <td className="py-3.5 px-4 text-slate-600 text-xs whitespace-nowrap">
                        {comm.sentDate}
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-bold border ${
                            isHigh
                              ? 'bg-red-50 text-red-700 border-red-200'
                              : isMedium
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          }`}
                        >
                          {comm.priority}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                          {comm.status}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedComm(comm);
                          }}
                          className="px-2.5 py-1 rounded-md text-xs font-semibold text-blue-600 hover:text-blue-800 hover:bg-blue-50 border border-transparent hover:border-blue-200 transition-all cursor-pointer inline-flex items-center"
                        >
                          <ExternalLink className="w-3.5 h-3.5 mr-1" />
                          View
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
          <span>Click any row to open the complete sent email transmission</span>
          <span className="font-mono text-[11px] text-slate-400">SMTP Sandbox Status: ONLINE</span>
        </div>
      </div>

      {/* Complete Email Viewer Modal: Prompt requirement: "Clicking a communication should open the complete email." */}
      {selectedComm && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="bg-[#0c1830] text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                  <MailCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      Transmission Record: {selectedComm.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      STATUS: SENT
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    Linked to Forecast: <span className="font-mono text-blue-300">{selectedComm.forecastId}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedComm(null)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Email Metadata Fields */}
            <div className="p-6 pb-4 bg-slate-50/70 border-b border-slate-200 space-y-2 text-xs md:text-sm">
              <div className="flex items-center">
                <span className="w-20 font-bold text-slate-500 uppercase text-[11px] tracking-wider">
                  To:
                </span>
                <span className="font-mono text-slate-900 font-semibold px-2 py-0.5 rounded bg-white border border-slate-200">
                  {selectedComm.to}
                </span>
                <span className="text-slate-500 ml-2">({selectedComm.supplier})</span>
              </div>

              <div className="flex items-center">
                <span className="w-20 font-bold text-slate-500 uppercase text-[11px] tracking-wider">
                  CC:
                </span>
                <span className="font-mono text-slate-700 px-2 py-0.5 rounded bg-white border border-slate-200 text-xs">
                  {selectedComm.cc}
                </span>
              </div>

              <div className="flex items-center">
                <span className="w-20 font-bold text-slate-500 uppercase text-[11px] tracking-wider">
                  Sent Date:
                </span>
                <span className="text-slate-800 font-medium flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
                  {selectedComm.sentDate}
                </span>
              </div>

              <div className="flex items-center pt-2 border-t border-slate-200">
                <span className="w-20 font-bold text-slate-500 uppercase text-[11px] tracking-wider">
                  Subject:
                </span>
                <span className="font-bold text-slate-900">
                  {selectedComm.subject}
                </span>
              </div>
            </div>

            {/* Full Email Body */}
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 text-slate-800 text-xs md:text-sm whitespace-pre-wrap font-sans leading-relaxed">
                {selectedComm.body}
              </div>

              {/* Delivery Receipt Metadata Card */}
              <div className="mt-4 p-4 rounded-xl bg-slate-100 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                <div className="font-bold text-slate-800 flex items-center mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                  PLM Dispatch Audit Receipt
                </div>
                <div>Relay Node: {selectedComm.deliveryMetadata?.smtpServer || 'smtp-relay.corp-plm.net:587 (TLSv1.3)'}</div>
                <div>Tracking ID: <span className="font-mono font-semibold">{selectedComm.deliveryMetadata?.trackingId || `TRK-PLM-${selectedComm.id}`}</span></div>
                <div>Protocol: {selectedComm.deliveryMetadata?.protocol || 'RFC-5322 Enterprise PLM Dispatch Protocol'}</div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedComm(null)}
                className="px-5 py-2 rounded-xl text-xs md:text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Close Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
