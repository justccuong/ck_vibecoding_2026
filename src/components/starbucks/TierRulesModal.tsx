import React from 'react';
import { X, Award, Shield, CheckCircle2, Sparkles } from 'lucide-react';

interface TierRulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TierRulesModal: React.FC<TierRulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl relative space-y-3.5">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>

        <div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">Thể Lệ Điểm & Mốc Hạng Thành Viên</h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Quy định công khai trong ứng dụng theo chuẩn hướng dẫn của BTC
          </p>
        </div>

        {/* Quy tắc tích điểm */}
        <div className="p-2.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950">
          <strong className="block mb-0.5">Tỉ lệ quy đổi điểm tại quầy:</strong>
          <span>Cứ <strong>10.000 VNĐ</strong> chi tiêu = Tích lũy <strong>1 điểm</strong>.</span>
        </div>

        {/* 3 Hạng Thành viên */}
        <div className="space-y-2 text-xs">
          {/* Hạng Đồng */}
          <div className="p-2.5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-orange-700 text-orange-100 flex items-center justify-center font-bold text-xs shrink-0">
              🥉
            </div>
            <div>
              <strong className="text-orange-950 block">Hạng Đồng (Bronze Member)</strong>
              <span className="text-[11px] text-orange-900">Dưới 1.000 điểm tích lũy (0 – 999 điểm)</span>
              <p className="text-[10px] text-orange-800/80 mt-0.5">Quyền lợi: Tích điểm cơ bản, nhận voucher ưu đãi.</p>
            </div>
          </div>

          {/* Hạng Bạc */}
          <div className="p-2.5 bg-gradient-to-r from-slate-100 to-slate-200 rounded-2xl border border-slate-300 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
              🥈
            </div>
            <div>
              <strong className="text-slate-900 block">Hạng Bạc (Silver Member)</strong>
              <span className="text-[11px] text-slate-700">Từ 1.000 đến 4.999 điểm tích lũy</span>
              <p className="text-[10px] text-slate-600 mt-0.5">Quyền lợi: Thẻ bạc kim loại, ưu tiên đổi quà cao cấp.</p>
            </div>
          </div>

          {/* Hạng Vàng */}
          <div className="p-2.5 bg-gradient-to-r from-yellow-100 via-amber-100 to-yellow-200 rounded-2xl border border-amber-300 flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-amber-950 flex items-center justify-center font-bold text-xs shrink-0">
              👑
            </div>
            <div>
              <strong className="text-amber-950 block">Hạng Vàng (Gold VIP Member)</strong>
              <span className="text-[11px] text-amber-900">Từ 5.000 điểm tích lũy trở lên</span>
              <p className="text-[10px] text-amber-800 mt-0.5">Quyền lợi: Thẻ Vibe Gold VIP đẳng cấp, quà tặng sinh nhật đặc biệt.</p>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-slate-500 text-center italic">
          Hệ thống tự động nâng / hạ hạng và đổi màu thẻ tương ứng theo thời gian thực.
        </div>
      </div>
    </div>
  );
};
