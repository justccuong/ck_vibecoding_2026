import React, { useEffect } from 'react';
import { useStarbucksStore } from '../../store/useStarbucksStore';
import { X, Sparkles, Award, Crown, Shield } from 'lucide-react';
import confetti from 'canvas-confetti';

export const TierUpgradeModal: React.FC = () => {
  const { upgradedTier, setUpgradedTier, currentMemberId, members } = useStarbucksStore();

  useEffect(() => {
    if (upgradedTier) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [upgradedTier]);

  if (!upgradedTier) return null;

  const currentMember = members.find((m) => m.id === currentMemberId);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in zoom-in-95 duration-200">
      <div className="bg-gradient-to-b from-amber-50 to-white rounded-3xl max-w-sm w-full p-6 border-2 border-amber-300 shadow-2xl relative text-center space-y-4">
        <button
          onClick={() => setUpgradedTier(null)}
          className="absolute right-3.5 top-3.5 p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30 animate-bounce">
          {upgradedTier === 'Vàng' ? (
            <Crown className="w-8 h-8 text-amber-950" />
          ) : (
            <Shield className="w-8 h-8 text-slate-800" />
          )}
        </div>

        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
            CHÚC MỪNG THĂNG HẠNG!
          </span>
          <h3 className="text-xl font-black text-slate-900 mt-2">
            LÊN HẠNG {upgradedTier.toUpperCase()}
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            Thành viên <strong className="text-slate-900">{currentMember?.name}</strong> đã tích lũy đủ điểm và được nâng cấp lên thẻ thành viên <strong>{upgradedTier}</strong>!
          </p>
        </div>

        <button
          onClick={() => setUpgradedTier(null)}
          className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-amber-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95"
        >
          Trải nghiệm thẻ mới ngay!
        </button>
      </div>
    </div>
  );
};
