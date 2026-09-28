import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Boxes, 
  Building2, 
  TrendingUp, 
  Sparkles, 
  MailCheck, 
  History,
  Shield,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ActiveTab } from '../types';

interface SidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  pendingForecastsCount: number;
  emailsSentCount: number;
  highPriorityCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  pendingForecastsCount,
  emailsSentCount,
  highPriorityCount,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ActiveTab,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      desc: 'Overview & metrics',
    },
    {
      id: 'products' as ActiveTab,
      label: 'Products',
      icon: Package,
      badge: '5',
      desc: 'Finished goods catalog',
    },
    {
      id: 'bom' as ActiveTab,
      label: 'BOM',
      icon: Boxes,
      badge: '9',
      desc: 'Bill of Materials',
    },
    {
      id: 'suppliers' as ActiveTab,
      label: 'Suppliers',
      icon: Building2,
      badge: '6',
      desc: 'Vendor directory',
    },
    {
      id: 'forecast' as ActiveTab,
      label: 'Forecast',
      icon: TrendingUp,
      badge: pendingForecastsCount > 0 ? `${pendingForecastsCount} Pending` : null,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      desc: 'Demand variance matrix',
    },
    {
      id: 'ai-analysis' as ActiveTab,
      label: 'AI Analysis',
      icon: Sparkles,
      badge: highPriorityCount > 0 ? `${highPriorityCount} Urgent` : 'AI Core',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      desc: 'Smart variance reasoning',
    },
    {
      id: 'communication-log' as ActiveTab,
      label: 'Communication Log',
      icon: MailCheck,
      badge: `${emailsSentCount}`,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      desc: 'Vendor transmission history',
    },
    {
      id: 'change-history' as ActiveTab,
      label: 'Change History',
      icon: History,
      badge: null,
      desc: 'PLM engineering audit log',
    },
  ];

  return (
    <aside className="w-64 bg-[#0a1526] text-slate-300 flex flex-col shrink-0 border-r border-[#15233c] select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#162744]">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-black tracking-wider uppercase text-white flex items-center gap-1.5">
              <span>PLM NEXUS</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-bold bg-blue-500/30 text-blue-300 border border-blue-400/30">
                AI
              </span>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Enterprise Collaboration
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          PLM Modules
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-900/40'
                  : 'text-slate-300 hover:bg-[#12223c] hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center space-x-1.5 shrink-0">
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold border ${
                      isActive
                        ? 'bg-blue-800 text-blue-100 border-blue-400/40'
                        : item.badgeColor || 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-blue-200" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Academic / Enterprise Environment Footer */}
      <div className="p-4 border-t border-[#162744] bg-[#070e1a]">
        <div className="flex items-center space-x-2.5 text-xs">
          <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-blue-400 shrink-0 border border-slate-700">
            <Shield className="w-3.5 h-3.5" />
          </div>
          <div className="truncate">
            <div className="font-semibold text-slate-200 truncate">
              Academic Project Demo
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              Safe SMTP Sandbox • No Real Mails
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
