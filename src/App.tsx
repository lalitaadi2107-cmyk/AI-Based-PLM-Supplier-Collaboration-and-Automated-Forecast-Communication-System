import React, { useState } from 'react';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_SUPPLIERS, 
  INITIAL_BOM, 
  INITIAL_FORECASTS, 
  INITIAL_COMMUNICATIONS, 
  INITIAL_CHANGE_HISTORY 
} from './data/mockData';
import { 
  Product, 
  BOMItem, 
  Supplier, 
  ForecastRecord, 
  CommunicationLog, 
  ChangeHistoryItem, 
  ActiveTab,
  PriorityLevel 
} from './types';
import { runAIForecastAnalysis, AIAnalysisResult } from './utils/aiForecast';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { ForecastView } from './components/ForecastView';
import { AIAnalysisPanel } from './components/AIAnalysisPanel';
import { EmailPreviewModal } from './components/EmailPreviewModal';
import { SendConfirmationModal } from './components/SendConfirmationModal';
import { CommunicationLogView } from './components/CommunicationLogView';
import { ChangeHistoryView } from './components/ChangeHistoryView';
import { BOMView } from './components/BOMView';
import { SupplierView } from './components/SupplierView';
import { ProductsView } from './components/ProductsView';
import { PresentationGuideModal } from './components/PresentationGuideModal';
import { NewForecastModal } from './components/NewForecastModal';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');

  // Core PLM State
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [bomItems, setBomItems] = useState<BOMItem[]>(INITIAL_BOM);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [forecasts, setForecasts] = useState<ForecastRecord[]>(INITIAL_FORECASTS);
  const [communications, setCommunications] = useState<CommunicationLog[]>(INITIAL_COMMUNICATIONS);
  const [changeHistory, setChangeHistory] = useState<ChangeHistoryItem[]>(INITIAL_CHANGE_HISTORY);

  // Workflow Dialogs & Focus State
  const [selectedForecast, setSelectedForecast] = useState<ForecastRecord | null>(forecasts[0] || null);
  const [activeAnalysis, setActiveAnalysis] = useState<AIAnalysisResult | null>(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    recipient: string;
    forecastId: string;
    productName: string;
    time: string;
    commId: string;
  } | null>(null);

  // Presentation Guide & Creation Modals
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isNewForecastOpen, setIsNewForecastOpen] = useState(false);

  // Computed Counters
  const pendingCount = forecasts.filter((f) => f.status !== 'EMAIL SENT').length;
  const emailsSentCount = communications.length;
  const highPriorityCount = forecasts.filter((f) => f.priority === 'HIGH').length;

  // Step 2 -> Step 3: Trigger AI Forecast Analysis
  const handleAnalyzeForecast = (forecast: ForecastRecord) => {
    setSelectedForecast(forecast);
    const analysis = runAIForecastAnalysis(forecast);
    setActiveAnalysis(analysis);
    setActiveTab('ai-analysis');
  };

  // Step 3 -> Step 4: Generate Supplier Email
  const handleGenerateEmail = (analysis: AIAnalysisResult) => {
    setActiveAnalysis(analysis);
    setIsEmailModalOpen(true);
  };

  // Step 4 -> Step 5: Send Email (Simulated Dispatch)
  const handleSendEmail = (draft: {
    to: string;
    cc: string;
    subject: string;
    body: string;
    analysis: AIAnalysisResult;
  }) => {
    setIsEmailModalOpen(false);

    // Format current demo time e.g., "28 Sep 2026, 04:45 PM"
    const now = new Date();
    const formattedDate = '28 Sep 2026';
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const fullTimestamp = `${formattedDate}, ${formattedTime}`;

    // Generate new communication ID e.g., COM-003
    const nextCommNum = communications.length + 1;
    const newCommId = `COM-00${nextCommNum}`;

    // 1. Create Communication Log Record
    const newCommLog: CommunicationLog = {
      id: newCommId,
      forecastId: draft.analysis.forecastId,
      supplier: draft.analysis.supplierName,
      supplierEmail: draft.to,
      product: draft.analysis.productName,
      partNumber: draft.analysis.partNumber,
      subject: draft.subject,
      to: draft.to,
      cc: draft.cc,
      body: draft.body,
      sentDate: formattedDate,
      priority: draft.analysis.priority,
      status: 'SENT',
      deliveryMetadata: {
        smtpServer: 'smtp-relay.corp-plm.net:587 (TLSv1.3)',
        protocol: 'RFC-5322 Enterprise PLM Dispatch Protocol',
        dispatchLatencyMs: 135,
        trackingId: `TRK-PLM-${draft.analysis.forecastId}-${Math.floor(10000 + Math.random() * 90000)}`,
      },
    };

    setCommunications((prev) => [newCommLog, ...prev]);

    // 2. Change Forecast status to SENT
    setForecasts((prev) =>
      prev.map((f) =>
        f.id === draft.analysis.forecastId
          ? { ...f, status: 'EMAIL SENT' }
          : f
      )
    );

    // If current selected forecast is this one, update it as well
    if (selectedForecast && selectedForecast.id === draft.analysis.forecastId) {
      setSelectedForecast((prev) => (prev ? { ...prev, status: 'EMAIL SENT' } : null));
    }

    // 3. Record Audit Trail Entry in PLM Change History
    const newChangeItem: ChangeHistoryItem = {
      id: `CHG-${Math.floor(100 + Math.random() * 900)}`,
      date: formattedDate,
      product: draft.analysis.productName,
      revision: 'Rev B',
      change: `Automated Forecast Email Dispatch (${draft.analysis.forecastId})`,
      previousValue: 'Status: PENDING REVIEW',
      newValue: 'Status: SENT to ' + draft.to,
      impact: `Tier-1 supplier capacity alignment requested (${draft.analysis.formattedChange} variance)`,
      triggeredBy: 'AI PLM Automated Outbox',
      forecastId: draft.analysis.forecastId,
    };
    setChangeHistory((prev) => [newChangeItem, ...prev]);

    // 4. Show Confirmation Modal
    setConfirmationData({
      recipient: draft.to,
      forecastId: draft.analysis.forecastId,
      productName: draft.analysis.productName,
      time: fullTimestamp,
      commId: newCommId,
    });
    setIsConfirmationModalOpen(true);
  };

  // Live Quantity Edit in Forecast Matrix (Triggers dynamic recalculation)
  const handleUpdateForecastQty = (id: string, newQty: number) => {
    setForecasts((prev) =>
      prev.map((f) => {
        if (f.id === id) {
          const diff = newQty - f.previousQty;
          const pct = Math.round(((diff / (f.previousQty || 1)) * 100) * 10) / 10;
          let priority: PriorityLevel = 'NORMAL';
          if (Math.abs(pct) >= 20 || pct >= 20) priority = 'HIGH';
          else if (Math.abs(pct) >= 10) priority = 'MEDIUM';

          const updated: ForecastRecord = {
            ...f,
            currentQty: newQty,
            changePct: pct,
            priority,
            status: 'PENDING_REVIEW', // reset status so user can demo sending email again!
          };
          return updated;
        }
        return f;
      })
    );
  };

  // Add a newly simulated forecast scenario
  const handleAddForecast = (newForecast: ForecastRecord) => {
    setForecasts((prev) => [newForecast, ...prev]);
    handleAnalyzeForecast(newForecast);
  };

  // Reset Demo Data
  const handleResetData = () => {
    setForecasts(INITIAL_FORECASTS);
    setCommunications(INITIAL_COMMUNICATIONS);
    setChangeHistory(INITIAL_CHANGE_HISTORY);
    setSelectedForecast(INITIAL_FORECASTS[0]);
    setActiveAnalysis(null);
  };

  // Fast navigation helpers
  const handleSelectProductBOM = (productName: string) => {
    setActiveTab('bom');
  };

  const handleSelectProductForecast = (productName: string) => {
    setActiveTab('forecast');
  };

  const handleSelectForecastForPart = (partNumber: string) => {
    const f = forecasts.find((item) => item.partNumber === partNumber);
    if (f) {
      handleAnalyzeForecast(f);
    } else {
      setActiveTab('forecast');
    }
  };

  const handleViewSupplierForecasts = (supplierName: string) => {
    setActiveTab('forecast');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden">
      {/* 1. Dark Blue Sidebar (Prompt Requirement) */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        pendingForecastsCount={pendingCount}
        emailsSentCount={emailsSentCount}
        highPriorityCount={highPriorityCount}
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          onResetData={handleResetData}
          onOpenTour={() => setIsTourOpen(true)}
          sentCount={emailsSentCount}
          pendingCount={pendingCount}
        />

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {/* TAB 1: Dashboard */}
          {activeTab === 'dashboard' && (
            <DashboardView
              products={products}
              suppliers={suppliers}
              bomItems={bomItems}
              forecasts={forecasts}
              communications={communications}
              changeHistory={changeHistory}
              onNavigateTab={setActiveTab}
              onAnalyzeForecast={handleAnalyzeForecast}
            />
          )}

          {/* TAB 2: Products */}
          {activeTab === 'products' && (
            <ProductsView
              products={products}
              bomItems={bomItems}
              forecasts={forecasts}
              onSelectProductBOM={handleSelectProductBOM}
              onSelectProductForecast={handleSelectProductForecast}
            />
          )}

          {/* TAB 3: BOM */}
          {activeTab === 'bom' && (
            <BOMView
              bomItems={bomItems}
              forecasts={forecasts}
              onSelectForecastForPart={handleSelectForecastForPart}
            />
          )}

          {/* TAB 4: Suppliers */}
          {activeTab === 'suppliers' && (
            <SupplierView
              suppliers={suppliers}
              forecasts={forecasts}
              onViewSupplierForecasts={handleViewSupplierForecasts}
            />
          )}

          {/* TAB 5: Forecast Table */}
          {activeTab === 'forecast' && (
            <ForecastView
              forecasts={forecasts}
              onAnalyzeForecast={handleAnalyzeForecast}
              onUpdateForecastQty={handleUpdateForecastQty}
              onAddNewForecastModal={() => setIsNewForecastOpen(true)}
            />
          )}

          {/* TAB 6: AI Forecast Analysis Panel */}
          {activeTab === 'ai-analysis' && (
            <AIAnalysisPanel
              forecast={selectedForecast}
              allForecasts={forecasts}
              onSelectForecast={(f) => {
                setSelectedForecast(f);
                setActiveAnalysis(runAIForecastAnalysis(f));
              }}
              onGenerateEmail={handleGenerateEmail}
              onBackToForecasts={() => setActiveTab('forecast')}
            />
          )}

          {/* TAB 7: Communication Log */}
          {activeTab === 'communication-log' && (
            <CommunicationLogView communications={communications} />
          )}

          {/* TAB 8: PLM Change History */}
          {activeTab === 'change-history' && (
            <ChangeHistoryView changeHistory={changeHistory} />
          )}
        </main>
      </div>

      {/* MODAL 1: Email Preview & Composer */}
      {isEmailModalOpen && activeAnalysis && (
        <EmailPreviewModal
          analysis={activeAnalysis}
          isOpen={isEmailModalOpen}
          onClose={() => setIsEmailModalOpen(false)}
          onSendEmail={handleSendEmail}
        />
      )}

      {/* MODAL 2: Send Confirmation Modal */}
      {isConfirmationModalOpen && confirmationData && (
        <SendConfirmationModal
          isOpen={isConfirmationModalOpen}
          onClose={() => setIsConfirmationModalOpen(false)}
          onViewCommLog={() => {
            setIsConfirmationModalOpen(false);
            setActiveTab('communication-log');
          }}
          confirmationData={confirmationData}
        />
      )}

      {/* MODAL 3: Academic Presentation Guide */}
      <PresentationGuideModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
      />

      {/* MODAL 4: New Forecast Scenario Simulation */}
      <NewForecastModal
        isOpen={isNewForecastOpen}
        onClose={() => setIsNewForecastOpen(false)}
        products={products}
        bomItems={bomItems}
        suppliers={suppliers}
        onAddForecast={handleAddForecast}
      />
    </div>
  );
}
