import React from 'react';

export interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number | string;
}

interface BottomNavProps {
  tabs: TabItem[];
  activeTab: string;
  onChangeTab: (tabId: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ tabs, activeTab, onChangeTab }) => {
  return (
    <nav className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-2 py-1.5 flex items-center justify-around sticky bottom-0 z-30 select-none">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative ${
              isActive
                ? 'text-sky-600 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-600 font-medium'
            }`}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge !== undefined && (
                <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[9px] font-bold px-1 rounded-full">
                  {tab.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] leading-none">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
