import React, { useState, useEffect } from 'react';
import { useStarbucksStore } from '../../store/useStarbucksStore';
import { formatVND } from '../../utils/formatters';
import {
  CreditCard,
  QrCode,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Search,
  User,
  ShieldAlert,
  Star,
  Coffee,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CashierPOSProps {
  onOpenScanner?: () => void;
}

export const CashierPOS: React.FC<CashierPOSProps> = ({ onOpenScanner }) => {
  const {
    members,
    transactions,
    addPointsAtCashier,
    setCurrentMemberId,
  } = useStarbucksStore();

  const [selectedMemberId, setSelectedMemberId] = useState<string>('KT-004');
  
  // Tự động sinh mã giao dịch duy nhất CHUẨN ĐỊNH DẠNG TX-KT-XXX
  const getNextTxId = () => {
    const maxNum = transactions.reduce((max, t) => {
      const match = t.transactionId.match(/TX-KT-(\d+)/i);
      if (match) {
        const num = parseInt(match[1], 10);
        return Math.max(max, isNaN(num) ? 0 : num);
      }
      return max;
    }, 7);
    return `TX-KT-${(maxNum + 1).toString().padStart(3, '0')}`;
  };

  const [transactionId, setTransactionId] = useState<string>(() => getNextTxId());
  const [amountVnd, setAmountVnd] = useState<number>(1000000); // 1.000.000đ
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Check real-time if transactionId already exists
  const isDuplicate = transactions.some(
    (t) => t.transactionId.toUpperCase() === transactionId.trim().toUpperCase()
  );

  const selectedMember = members.find((m) => m.id === selectedMemberId);

  // Calculate points (10.000đ = 1 điểm)
  const previewPoints = Math.floor(amountVnd / 10000);

  const generateNewTxId = () => {
    const id = getNextTxId();
    setTransactionId(id);
    setDuplicateWarning(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDuplicateWarning(null);

    const res = addPointsAtCashier(selectedMemberId, amountVnd, transactionId);
    if (res.success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      setCurrentMemberId(selectedMemberId);
      // Tự động sinh mã giao dịch TX-KT-XXX kế tiếp cho đơn hàng mới
      const maxNum = transactions.reduce((max, t) => {
        const match = t.transactionId.match(/TX-KT-(\d+)/i);
        return match ? Math.max(max, parseInt(match[1], 10)) : max;
      }, 7);
      const nextId = `TX-KT-${(Math.max(maxNum, parseInt(transactionId.replace(/\D/g, '') || '7', 10)) + 1).toString().padStart(3, '0')}`;
      setTransactionId(nextId);
    } else {
      setDuplicateWarning(res.message);
    }
  };

  const handleQuickPreset = (mId: string, txId: string, amount: number) => {
    setSelectedMemberId(mId);
    setTransactionId(txId);
    setAmountVnd(amount);
    setDuplicateWarning(null);
  };

  return (
    <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs space-y-4 font-sans">
      {/* POS Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#006241] text-white flex items-center justify-center shadow-xs">
            <Coffee className="w-4 h-4 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-sm font-extrabold text-[#1E3932]">Chế Độ Quầy Thu Ngân (POS)</h2>
            </div>
            <p className="text-[10px] text-slate-500">
              Quy tắc chuẩn: <strong>10.000đ = 1 Star (Điểm)</strong> · Chống cộng trùng 100%
            </p>
          </div>
        </div>

        {onOpenScanner && (
          <button
            type="button"
            onClick={onOpenScanner}
            className="flex items-center gap-1 bg-[#D4E9E2] hover:bg-[#bfe0d5] text-[#006241] text-xs font-bold px-2.5 py-1.5 rounded-xl border border-[#006241]/20 transition-all active:scale-95"
          >
            <QrCode className="w-3.5 h-3.5 text-[#006241]" />
            <span>Quét QR (+4đ)</span>
          </button>
        )}
      </div>

      {/* Quick Test Bar for Judges */}
      <div className="p-2.5 bg-[#F7F5F0] rounded-2xl border border-slate-200/80 space-y-1.5">
        <span className="text-[10px] font-bold text-[#1E3932] uppercase tracking-wider block flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#006241]" />
          <span>Phím tắt kiểm tra chuẩn BTC (1-Click):</span>
        </span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickPreset('KT-008', getNextTxId(), 1000000)}
            className="px-2.5 py-1 bg-white hover:bg-[#D4E9E2] border border-slate-200 rounded-lg text-[10px] font-bold text-[#006241] transition-colors"
          >
            TC-01: Phúc Hoàng +1tr (+100 Stars)
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('KT-002', 'TX-KT-002', 1500000)}
            className="px-2.5 py-1 bg-white hover:bg-rose-50 border border-rose-200 rounded-lg text-[10px] font-bold text-rose-700 transition-colors"
          >
            TC-02: Thử nhập trùng TX-KT-002 (Báo lỗi)
          </button>
          <button
            type="button"
            onClick={() => handleQuickPreset('KT-004', getNextTxId(), 2000000)}
            className="px-2.5 py-1 bg-white hover:bg-amber-50 border border-amber-200 rounded-lg text-[10px] font-bold text-amber-800 transition-colors"
          >
            Mã chuẩn BTC: Dũng Phạm (KT-004)
          </button>
        </div>
      </div>

      {/* Bento Grid POS Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Member Select */}
        <div>
          <label className="block text-xs font-bold text-[#1E3932] mb-1">
            Chọn thành viên tích điểm <span className="text-rose-500">*</span>
          </label>
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="w-full px-3 py-2 text-xs md:text-sm bg-[#F7F5F0] border border-slate-200 rounded-xl font-bold text-[#1E3932] focus:outline-none focus:ring-2 focus:ring-[#006241]/20 focus:border-[#006241]"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.id} - {m.name} ({m.tier} · {m.points.toLocaleString()} Stars)
              </option>
            ))}
          </select>
        </div>

        {/* Member Profile Card Preview */}
        {selectedMember && (
          <div className="p-2.5 bg-[#F1F8F5] rounded-2xl border border-[#D4E9E2] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#006241] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                {selectedMember.name.charAt(0)}
              </div>
              <div>
                <strong className="text-[#1E3932] block leading-tight">{selectedMember.name}</strong>
                <span className="text-[10px] text-slate-500">Thẻ: {selectedMember.tier} · SĐT: {selectedMember.phone}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 block font-medium">Số dư hiện tại</span>
              <strong className="text-[#006241] font-black text-sm">{selectedMember.points.toLocaleString()} Stars</strong>
            </div>
          </div>
        )}

        {/* Transaction ID with Auto-Gen & Duplicate Detection */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-bold text-[#1E3932]">
                Mã giao dịch <span className="text-rose-500">*</span>
              </label>
              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                Tự động sinh
              </span>
            </div>
            <button
              type="button"
              onClick={generateNewTxId}
              className="text-[10px] text-[#006241] hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sinh mã khác</span>
            </button>
          </div>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="vd: TX-KT-008"
            className={`w-full px-3 py-2 text-xs md:text-sm font-mono font-bold rounded-xl border transition-all focus:outline-none focus:ring-2 ${
              isDuplicate
                ? 'bg-rose-50 border-rose-300 text-rose-900 focus:ring-rose-500/20'
                : 'bg-[#F7F5F0] border-slate-200 text-[#1E3932] focus:ring-[#006241]/20 focus:border-[#006241]'
            }`}
            required
          />
          <p className="text-[10px] text-slate-400 mt-1">
            Hệ thống tự động sinh mã mới cho mỗi giao dịch. Bạn có thể nhập tay để thử tính năng chống trùng.
          </p>
        </div>

        {/* Duplicate Warning Alert */}
        {isDuplicate && (
          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-start gap-2.5 animate-in fade-in">
            <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-bold">CẢNH BÁO CHỐNG CỘNG TRÙNG!</strong>
              <p className="text-[11px] text-rose-800 leading-snug">
                Mã giao dịch <strong className="font-mono">{transactionId}</strong> đã tồn tại trong lịch sử hệ thống. 
                Giao dịch bị từ chối để tránh nhân đôi điểm số của khách hàng!
              </p>
              <button
                type="button"
                onClick={generateNewTxId}
                className="mt-1 text-[10px] font-bold text-rose-700 bg-white border border-rose-300 px-2 py-0.5 rounded-lg hover:bg-rose-100 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Bấm vào đây để lấy mã giao dịch mới</span>
              </button>
            </div>
          </div>
        )}

        {duplicateWarning && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium">
            {duplicateWarning}
          </div>
        )}

        {/* Amount Input */}
        <div>
          <label className="block text-xs font-bold text-[#1E3932] mb-1">
            Số tiền giao dịch (VNĐ) <span className="text-rose-500">*</span>
          </label>
          <input
            type="number"
            min="10000"
            step="10000"
            value={amountVnd}
            onChange={(e) => setAmountVnd(Math.max(0, Number(e.target.value)))}
            className="w-full px-3 py-2 text-sm font-black bg-[#F7F5F0] border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#006241]/20 focus:border-[#006241] text-[#1E3932]"
            required
          />

          {/* Quick Amount Chips */}
          <div className="flex flex-wrap gap-1 mt-1.5">
            {[50000, 100000, 500000, 1000000, 2000000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setAmountVnd(amt)}
                className="px-2.5 py-1 rounded-lg bg-[#D4E9E2]/60 hover:bg-[#D4E9E2] text-[#006241] text-[10px] font-bold transition-colors"
              >
                +{amt >= 1000000 ? `${amt / 1000000}tr` : `${amt / 1000}k`}
              </button>
            ))}
          </div>
        </div>

        {/* Live Points Preview Card */}
        <div className="p-3 bg-[#F1F8F5] rounded-2xl border border-[#D4E9E2] flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-[#006241] font-semibold block">Tỉ lệ quy đổi (10.000đ = 1 Star):</span>
            <strong className="text-base font-black text-[#006241]">+{previewPoints} Stars</strong>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-semibold block">Số dư sau khi tích:</span>
            <strong className="text-base font-black text-[#1E3932]">
              {((selectedMember?.points || 0) + previewPoints).toLocaleString()} Stars
            </strong>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isDuplicate || previewPoints <= 0}
          className="w-full min-h-[46px] bg-[#006241] hover:bg-[#00754A] disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] text-white font-black text-xs md:text-sm py-2.5 px-4 rounded-xl shadow-md shadow-[#006241]/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <CreditCard className="w-4 h-4" />
          <span>Xác nhận tích điểm tại quầy POS</span>
        </button>
      </form>
    </div>
  );
};
