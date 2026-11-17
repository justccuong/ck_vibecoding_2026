import React from 'react';
import { Wifi, Battery, Signal, Smartphone, Monitor } from 'lucide-react';

interface MobileFrameProps {
  isMobileFrame: boolean;
  onToggleFrame: () => void;
  children: React.ReactNode;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  isMobileFrame,
  onToggleFrame,
  children,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-start py-3 sm:py-6 px-2">
      {/* Floating Mode Toggle Pill */}
      <div className="mb-3 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-xs text-xs">
        <span className="text-slate-500 font-medium">Chế độ hiển thị:</span>
        <button
          onClick={onToggleFrame}
          className="flex items-center gap-1.5 font-bold text-sky-700 hover:text-sky-800 transition-colors"
        >
          {isMobileFrame ? (
            <>
              <Smartphone className="w-3.5 h-3.5 text-sky-600" />
              <span>Khung iPhone 375px (Đang bật)</span>
            </>
          ) : (
            <>
              <Monitor className="w-3.5 h-3.5 text-slate-600" />
              <span>Toàn màn hình</span>
            </>
          )}
        </button>
      </div>

      {isMobileFrame ? (
        <div className="w-full max-w-[390px] min-w-[360px] bg-slate-900 rounded-[44px] p-2.5 shadow-2xl border-4 border-slate-700/60 ring-1 ring-slate-800 transition-all duration-300">
          <div className="bg-slate-50 rounded-[36px] overflow-hidden flex flex-col relative min-h-[780px] max-h-[850px] border border-slate-200">
            {/* iOS Status Bar */}
            <div className="bg-white/90 backdrop-blur-md px-6 pt-3 pb-1.5 flex items-center justify-between text-xs font-semibold text-slate-800 sticky top-0 z-30 border-b border-slate-100 select-none">
              <span>09:41</span>
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-800 mr-2" />
                <div className="w-2.5 h-2.5 rounded-full bg-sky-950/80" />
              </div>
              <div className="flex items-center gap-1.5 text-slate-700">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Scrollable Viewport */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col scroll-smooth">
              {children}
            </div>

            {/* iOS Home Indicator */}
            <div className="h-4 bg-white flex items-center justify-center shrink-0 border-t border-slate-100 select-none">
              <div className="w-28 h-1 bg-slate-300 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <main className="w-full max-w-2xl bg-slate-50 rounded-3xl p-4 border border-slate-200 shadow-sm overflow-hidden">
          {children}
        </main>
      )}
    </div>
  );
};
