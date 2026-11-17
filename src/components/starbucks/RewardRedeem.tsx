import React, { useState } from 'react';
import { useStarbucksStore } from '../../store/useStarbucksStore';
import { BarcodeView } from '../ui/BarcodeView';
import {
  Star,
  Gift,
  Ticket,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Check,
  Coffee,
  Tag,
  Clock,
  ScanLine,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const RewardRedeem: React.FC = () => {
  const {
    members,
    currentMemberId,
    rewards,
    vouchers,
    redeemReward,
    useVoucher,
  } = useStarbucksStore();

  const [activeTab, setActiveTab] = useState<'all' | 'drinks' | 'vouchers' | 'wallet'>('all');
  const [selectedSize, setSelectedSize] = useState<Record<string, 'Tall' | 'Grande' | 'Venti'>>({});

  const currentMember = members.find((m) => m.id === currentMemberId);
  const userVouchers = vouchers.filter((v) => v.memberId === currentMemberId);

  const handleRedeem = (rewardId: string) => {
    if (!currentMember) return;
    const res = redeemReward(currentMember.id, rewardId);
    if (res.success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.65 } });
      setActiveTab('wallet');
    }
  };

  if (!currentMember) {
    return (
      <div className="p-6 text-center text-xs text-slate-400 bg-white rounded-3xl border border-slate-200">
        Vui lòng chọn thành viên để xem danh mục ưu đãi.
      </div>
    );
  }

  // Filter rewards based on tab
  const filteredRewards = rewards.filter((r) => {
    if (activeTab === 'drinks') return r.category === 'drink';
    if (activeTab === 'vouchers') return r.category === 'voucher';
    return true; // 'all'
  });

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-3.5 font-sans">
      {/* Title & Stars Balance Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h2 className="text-sm font-black text-[#1E3932] flex items-center gap-1.5 tracking-tight">
            <Gift className="w-4 h-4 text-[#006241]" />
            <span>Đổi Thưởng & Ví Ưu Đãi</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Số dư khả dụng:{' '}
            <strong className="text-[#006241] font-black">
              {currentMember.points.toLocaleString()} Stars
            </strong>
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex p-1 bg-[#F7F5F0] rounded-xl text-[11px] font-bold border border-slate-200/70">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === 'all'
                ? 'bg-[#006241] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setActiveTab('drinks')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              activeTab === 'drinks'
                ? 'bg-[#006241] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Đồ uống</span>
          </button>
          <button
            onClick={() => setActiveTab('vouchers')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              activeTab === 'vouchers'
                ? 'bg-[#006241] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Voucher
          </button>
          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 ${
              activeTab === 'wallet'
                ? 'bg-[#006241] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Ví Voucher</span>
            {userVouchers.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-amber-400 text-[#1E3932] text-[9px] font-black flex items-center justify-center">
                {userVouchers.filter((v) => v.status === 'Chưa dùng').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CATALOG VIEW: ALL / DRINKS / VOUCHERS */}
      {/* ========================================================================= */}
      {activeTab !== 'wallet' && (
        <div className="space-y-3">
          {filteredRewards.map((reward) => {
            const canAfford = currentMember.points >= reward.pointsRequired;
            const isDrink = reward.category === 'drink';
            const size = selectedSize[reward.id] || 'Grande';

            return (
              <div
                key={reward.id}
                className="p-3.5 bg-[#FBF9F5] rounded-2xl border border-slate-200/80 hover:border-[#006241]/40 transition-all shadow-2xs group flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative overflow-hidden"
              >
                {/* Background decorative leaf */}
                {isDrink && (
                  <div className="absolute -right-4 -bottom-4 w-20 h-20 opacity-5 pointer-events-none">
                    <img
                      src="/assets/images/illustrations/leafs.png"
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}

                <div className="flex items-start gap-3 relative z-10">
                  {/* Visual Item Avatar with Pure SVG icons (No emoji) */}
                  {isDrink && reward.image ? (
                    <div className="w-16 h-16 rounded-2xl bg-white border border-[#D4E9E2] p-1 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-105 transition-transform">
                      <img
                        src={reward.image}
                        alt={reward.name}
                        className="w-full h-full object-contain drop-shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#D4E9E2] flex items-center justify-center shadow-xs shrink-0 text-[#006241]">
                      {reward.id === 'KT-VCH-01' ? (
                        <Tag className="w-6 h-6 text-[#006241]" />
                      ) : reward.id === 'KT-VCH-02' ? (
                        <Ticket className="w-6 h-6 text-[#006241]" />
                      ) : (
                        <Gift className="w-6 h-6 text-amber-600" />
                      )}
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-xs font-black text-[#1E3932] block leading-tight">
                        {reward.name}
                      </strong>
                      {reward.flavor && (
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#D4E9E2] text-[#006241]">
                          {reward.flavor}
                        </span>
                      )}
                    </div>

                    <p className="text-[10px] text-slate-500 leading-normal line-clamp-2 max-w-xs">
                      {reward.description}
                    </p>

                    {/* Star Rating Widget from redesign-starbucks */}
                    {reward.rating && (
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: reward.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-2.5 h-2.5 text-[#7EC518] fill-[#7EC518]"
                          />
                        ))}
                        <span className="text-[9px] font-bold text-slate-400 ml-1">
                          {reward.rating}.0
                        </span>
                      </div>
                    )}

                    {/* Drink Size Selector if applicable */}
                    {isDrink && (
                      <div className="flex items-center gap-1.5 pt-0.5">
                        {(['Tall', 'Grande', 'Venti'] as const).map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() =>
                              setSelectedSize((prev) => ({ ...prev, [reward.id]: s }))
                            }
                            className={`px-2 py-0.5 rounded-md text-[9px] font-bold transition-all ${
                              size === s
                                ? 'bg-[#006241] text-white shadow-2xs'
                                : 'bg-slate-200/60 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Star Cost & Redeem Button */}
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 relative z-10 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <div className="flex items-baseline gap-1">
                    <Star className="w-3.5 h-3.5 fill-[#006241] text-[#006241]" />
                    <span className="text-sm font-black text-[#006241]">
                      {reward.pointsRequired.toLocaleString()}
                    </span>
                    <span className="text-[10px] font-bold text-slate-500">Stars</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRedeem(reward.id)}
                    disabled={!canAfford}
                    className={`min-h-[36px] px-4 py-1.5 rounded-xl text-xs font-black transition-all ${
                      canAfford
                        ? 'bg-[#006241] hover:bg-[#00754A] text-white shadow-md shadow-[#006241]/20 active:scale-95 cursor-pointer'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Đổi ngay' : 'Thiếu Stars'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* WALLET VIEW: MY VOUCHERS WITH AUTHENTIC BARCODE RENDER */}
      {/* ========================================================================= */}
      {activeTab === 'wallet' && (
        <div className="space-y-3">
          {userVouchers.length === 0 ? (
            <div className="text-center py-10 bg-[#F7F5F0] rounded-2xl border border-dashed border-slate-200 text-slate-400 text-xs space-y-2">
              <Ticket className="w-8 h-8 mx-auto text-slate-300" />
              <p>Ví của bạn chưa có voucher hoặc đồ uống nào.</p>
              <button
                onClick={() => setActiveTab('all')}
                className="text-[11px] font-bold text-[#006241] hover:underline"
              >
                Khám phá đổi ưu đãi ngay &rarr;
              </button>
            </div>
          ) : (
            userVouchers.map((v) => {
              const isUnused = v.status === 'Chưa dùng';
              return (
                <div
                  key={v.id}
                  className={`p-4 rounded-3xl border transition-all relative overflow-hidden ${
                    isUnused
                      ? 'bg-[#F1F8F5] border-[#006241]/30 text-[#1E3932] shadow-sm'
                      : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                  }`}
                >
                  {/* Top Bar: Reward Name & Status */}
                  <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#D4E9E2] flex items-center justify-center text-xs shadow-2xs">
                        <Ticket className="w-4 h-4 text-[#006241]" />
                      </div>
                      <div>
                        <strong className="text-xs font-black text-[#1E3932]">
                          {v.rewardName}
                        </strong>
                        <span className="text-[10px] text-slate-500 block flex items-center gap-1 font-mono">
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span>Đổi lúc: {v.redeemedAt}</span>
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                        isUnused
                          ? 'bg-[#D4E9E2] text-[#006241] border-[#006241]/20 font-bold'
                          : 'bg-slate-200 text-slate-600 border-slate-300'
                      }`}
                    >
                      {v.status}
                    </span>
                  </div>

                  {/* Center: Real SVG Barcode */}
                  <div className="my-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs text-center">
                    <div className="flex items-center justify-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      <ScanLine className="w-3 h-3 text-[#006241]" />
                      <span>Mã vạch xuất trình tại quầy thu ngân</span>
                    </div>
                    <BarcodeView value={v.code} height={46} showText={true} />
                  </div>

                  {/* Bottom: Action / Usage State */}
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-[10px] text-slate-500 font-medium">
                      {isUnused ? 'Chưa quét đổi tại quầy' : 'Đã sử dụng phiếu'}
                    </span>

                    {isUnused ? (
                      <button
                        onClick={() => useVoucher(v.id)}
                        className="px-4 py-2 bg-[#006241] hover:bg-[#00754A] text-white rounded-xl text-xs font-black shadow-sm shadow-[#006241]/20 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Dùng tại quầy</span>
                      </button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-bold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Đã sử dụng
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
