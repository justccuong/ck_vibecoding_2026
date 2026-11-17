import React, { useState, useEffect } from 'react';
import { useStarbucksStore } from './store/useStarbucksStore';
import { Toast } from './components/ui/Toast';
import { StarbucksCard } from './components/starbucks/StarbucksCard';
import { CashierPOS } from './components/starbucks/CashierPOS';
import { RewardRedeem } from './components/starbucks/RewardRedeem';
import { PointHistoryView } from './components/starbucks/PointHistoryView';
import { MemberRegistrationModal } from './components/starbucks/MemberRegistrationModal';
import { TierRulesModal } from './components/starbucks/TierRulesModal';
import { TierUpgradeModal } from './components/starbucks/TierUpgradeModal';
import { QrScannerModal } from './components/peripherals/QrScannerModal';
import { StarbucksDrinkShowcaseModal } from './components/starbucks/StarbucksDrinkShowcaseModal';
import { BrandLogo } from './components/brand/BrandLogo';
import {
  Coffee,
  RotateCcw,
  Sparkles,
  CreditCard,
  User,
  Gift,
  History,
  UserPlus,
  QrCode,
  Award,
  Layers,
  CheckCircle2,
  ChevronRight,
  ChevronUp,
  Star,
  CupSoda,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function App() {
  const {
    currentMemberId,
    setCurrentMemberId,
    activeTab,
    setActiveTab,
    toast,
    clearToast,
    showToast,
    members,
    transactions,
    pointHistory,
    vouchers,
    resetToBtcData,
  } = useStarbucksStore();

  // Chế độ 2 đầu Toggle chuẩn: 'customer' (Khách hàng) | 'cashier' (Quầy POS)
  const [activeHead, setActiveHead] = useState<'customer' | 'cashier'>('customer');

  // Modals state
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isDrinksModalOpen, setIsDrinksModalOpen] = useState(false);

  // Scroll-to-top button visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentMember = members.find((m) => m.id === currentMemberId) || members[0];

  const handleConfetti = () => {
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
  };

  const handleQrScanSuccess = (decodedCode: string) => {
    const clean = decodedCode.trim().toUpperCase();
    const found = members.find((m) => m.id.toUpperCase() === clean);
    if (found) {
      setCurrentMemberId(found.id);
      showToast(`Đã nhận diện thành viên ${found.name} (${found.id})!`, 'success');
      confetti({ particleCount: 40, spread: 50 });
    } else {
      showToast(`Mã quét được: "${decodedCode}"`, 'info');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col font-sans text-slate-800 antialiased selection:bg-[#006241] selection:text-white relative overflow-x-hidden">
      <Toast toast={toast} onClose={clearToast} />

      {/* Atmospheric Background Custom Brand Watermark */}
      <div className="fixed -right-28 -top-28 w-96 h-96 opacity-[0.035] pointer-events-none select-none z-0 text-slate-800">
        <BrandLogo watermark={true} size={384} className="w-full h-full" />
      </div>

      {/* Vibe Rewards Compact & Elegant Top Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-[#D4E9E2] sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          {/* Row 1: Logo & Brand Name */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BrandLogo size={38} className="shrink-0 drop-shadow-xs" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-black text-[#1E3932] text-sm sm:text-base tracking-wider uppercase font-montserrat whitespace-nowrap">
                    VIBE REWARDS
                  </h1>
                  <span className="text-[9px] font-black bg-[#D4E9E2] text-[#006241] px-1.5 py-0.5 rounded-full border border-[#006241]/20 whitespace-nowrap">
                    Bảng A
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                  Hệ thống thẻ thành viên 2 đầu (Mô hình Starbucks Rewards)
                </p>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={resetToBtcData}
                title="Khôi phục 100% dữ liệu gốc trong file Excel của BTC"
                className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors shadow-2xs whitespace-nowrap active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">Nạp dữ liệu mẫu</span>
                <span className="sm:hidden">Nạp mẫu</span>
              </button>

              <button
                onClick={() => setIsDrinksModalOpen(true)}
                title="Khám phá bộ sưu tập đồ uống"
                className="flex items-center gap-1 text-[11px] font-black px-2.5 py-1.5 rounded-xl border border-[#006241]/20 bg-[#F1F8F5] text-[#006241] hover:bg-[#D4E9E2] transition-colors shadow-2xs whitespace-nowrap active:scale-95"
              >
                <Coffee className="w-3.5 h-3.5 text-[#006241]" />
                <span>Menu đồ uống</span>
              </button>

              <button
                onClick={handleConfetti}
                className="p-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-600 active:scale-95 transition-transform"
                title="Cổ vũ"
              >
                <Sparkles className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Row 2: 2-HEAD TOGGLE SWITCH (CUSTOMER <-> CASHIER POS ONLY) */}
          <div className="flex items-center justify-center">
            <div className="flex items-center bg-[#F2F0EB] p-1 rounded-2xl border border-slate-300/80 shadow-2xs w-full sm:w-auto">
              <button
                onClick={() => setActiveHead('customer')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeHead === 'customer'
                    ? 'bg-[#006241] text-white shadow-sm shadow-[#006241]/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Đầu 1: Khách Hàng</span>
              </button>

              <button
                onClick={() => setActiveHead('cashier')}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-1.5 rounded-xl text-xs font-black transition-all ${
                  activeHead === 'cashier'
                    ? 'bg-[#006241] text-white shadow-sm shadow-[#006241]/25 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Đầu 2: Quầy POS</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto w-full p-2.5 sm:p-5 flex-1 relative z-10">
        {/* Global Member Selector Bar: Compact, 1-Line on mobile with NO broken text */}
        <div className="bg-white p-2.5 rounded-2xl border border-slate-200/80 shadow-2xs mb-3.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-1 min-w-0">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap shrink-0">
              Thành viên:
            </span>
            <select
              value={currentMemberId}
              onChange={(e) => setCurrentMemberId(e.target.value)}
              className="w-full font-black text-xs text-[#1E3932] bg-[#F7F5F0] border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#006241] truncate"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.id} - {m.name} ({m.tier} · {m.points.toLocaleString()} Stars)
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setIsRegisterOpen(true)}
              title="Đăng ký thành viên mới"
              className="flex items-center gap-1 text-xs font-bold text-[#006241] bg-[#D4E9E2] hover:bg-[#bfe0d5] px-2.5 py-1.5 rounded-xl border border-[#006241]/20 transition-all active:scale-95 whitespace-nowrap"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Đăng ký mới</span>
            </button>

            <button
              onClick={() => setIsRulesOpen(true)}
              title="Mốc hạng (Đồng/Bạc/Vàng)"
              className="flex items-center gap-1 text-xs font-bold text-[#1E3932] bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Mốc hạng</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW MODE 1: ĐẦU 1 - APP THÀNH VIÊN (CUSTOMER APP) */}
        {/* ========================================================================= */}
        {activeHead === 'customer' && (
          <div className="max-w-md mx-auto space-y-3.5">
            <div className="bg-white rounded-[32px] p-4 sm:p-5 border border-slate-200/80 shadow-md space-y-4">
              {/* Thẻ thành viên số */}
              <StarbucksCard
                member={currentMember}
                onOpenQrEnlarge={() => setIsScannerOpen(true)}
                onOpenRules={() => setIsRulesOpen(true)}
              />

              {/* Seasonal Drinks Banner */}
              <div
                onClick={() => setIsDrinksModalOpen(true)}
                className="bg-gradient-to-r from-[#006241] to-[#1E3932] rounded-2xl p-3 text-white flex items-center justify-between cursor-pointer hover:shadow-lg transition-all group relative overflow-hidden"
              >
                <div className="relative z-10 flex items-center gap-2.5">
                  <img
                    src="/assets/images/products/frappuccino.png"
                    alt="Frappuccino"
                    className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform"
                  />
                  <div>
                    <span className="text-[10px] font-black text-[#7EC518] uppercase tracking-wider block">
                      Đặc quyền tích sao Stars
                    </span>
                    <strong className="text-xs font-black text-white block">
                      Khám phá Menu Đồ Uống Vibe &rarr;
                    </strong>
                  </div>
                </div>
                <div className="relative z-10 bg-white/20 px-2.5 py-1 rounded-xl text-[10px] font-bold">
                  Xem ngay
                </div>
              </div>

              {/* Sub-tab navigation in Member view (DEFAULT: 'rewards') */}
              <div className="flex p-1 bg-[#F7F5F0] rounded-xl text-xs font-bold border border-slate-200">
                <button
                  onClick={() => setActiveTab('rewards')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeTab === 'rewards' ? 'bg-[#006241] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Đổi ưu đãi ({vouchers.filter((v) => v.memberId === currentMemberId).length})
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeTab === 'history' ? 'bg-[#006241] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Lịch sử điểm
                </button>
                <button
                  onClick={() => setActiveTab('card')}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    activeTab === 'card' ? 'bg-[#006241] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Tiện ích
                </button>
              </div>

              {/* Sub-tab Views */}
              {activeTab === 'rewards' && <RewardRedeem />}
              {activeTab === 'history' && <PointHistoryView />}
              {activeTab === 'card' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-[#F1F8F5] p-2.5 rounded-2xl border border-[#D4E9E2]">
                      <span className="text-[10px] text-slate-500 block font-medium">Tổng thành viên</span>
                      <strong className="text-sm font-black text-[#1E3932] mt-0.5 block">{members.length}</strong>
                    </div>
                    <div className="bg-[#F1F8F5] p-2.5 rounded-2xl border border-[#D4E9E2]">
                      <span className="text-[10px] text-slate-500 block font-medium">Tổng Stars đã phát</span>
                      <strong className="text-sm font-black text-[#006241] mt-0.5 block">
                        {members.reduce((sum, m) => sum + m.points, 0).toLocaleString()}
                      </strong>
                    </div>
                    <div className="bg-[#F1F8F5] p-2.5 rounded-2xl border border-[#D4E9E2]">
                      <span className="text-[10px] text-slate-500 block font-medium">Voucher trong ví</span>
                      <strong className="text-sm font-black text-amber-600 mt-0.5 block">
                        {vouchers.filter((v) => v.memberId === currentMemberId).length}
                      </strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW MODE 2: ĐẦU 2 - QUẦY THU NGÂN (CASHIER POS) */}
        {/* ========================================================================= */}
        {activeHead === 'cashier' && (
          <div className="max-w-2xl mx-auto space-y-4">
            {/* POS Cashier Box */}
            <CashierPOS onOpenScanner={() => setIsScannerOpen(true)} />

            {/* Live Point History for cashier reference */}
            <PointHistoryView />
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* COMPACT & BEAUTIFUL FOOTER */}
      {/* ========================================================================= */}
      <footer className="mt-8 border-t border-[#D4E9E2] bg-white/95 backdrop-blur-md py-4 px-4 text-xs text-slate-500 font-sans relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <BrandLogo size={22} className="shrink-0" />
            <span className="font-extrabold text-[#1E3932]">Vibe Rewards Digital</span>
            <span className="text-slate-300">·</span>
            <span className="text-[11px] text-slate-500 font-medium">Bảng A Công Nghệ · Vibe Coding 2026</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#006241] font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Local-First Offline Ready
            </span>
            <span className="text-slate-300">·</span>
            <span className="text-slate-600 font-medium">Mã chuẩn BTC: KT-004</span>
            <span className="text-slate-300">·</span>
            <button
              onClick={scrollToTop}
              className="text-[#006241] font-black hover:underline flex items-center gap-1 py-1 px-2.5 rounded-xl hover:bg-[#D4E9E2]/40 transition-colors cursor-pointer"
            >
              <span>Lên đầu trang</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* FLOATING SCROLL-TO-TOP BUTTON */}
      {/* ========================================================================= */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          title="Cuộn lên đầu trang"
          aria-label="Cuộn lên đầu trang"
          className="fixed bottom-6 right-5 z-40 p-3 rounded-full bg-[#006241] text-white shadow-xl hover:bg-[#00754A] active:scale-95 transition-all duration-300 border border-white/20 animate-in fade-in zoom-in-90 flex items-center justify-center min-w-[44px] min-h-[44px] cursor-pointer"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* MODAL 1: ĐĂNG KÝ THÀNH VIÊN MỚI */}
      <MemberRegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
      />

      {/* MODAL 2: THỂ LỆ & MỐC HẠNG */}
      <TierRulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />

      {/* MODAL 3: THÔNG BÁO LÊN HẠNG */}
      <TierUpgradeModal />

      {/* MODAL 4: QUÉT QR BẰNG CAMERA (+4Đ THƯỞNG NGOẠI VI) */}
      <QrScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleQrScanSuccess}
        sampleCodes={['KT-004', 'KT-001', 'KT-002', 'KT-005', 'KT-008']}
      />

      {/* MODAL 5: MENU ĐỒ UỐNG SHOWCASE */}
      <StarbucksDrinkShowcaseModal
        isOpen={isDrinksModalOpen}
        onClose={() => setIsDrinksModalOpen(false)}
      />
    </div>
  );
}

export default App;
