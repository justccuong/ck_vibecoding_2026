import React from 'react';
import { useStarbucksStore } from '../../store/useStarbucksStore';
import { BTC_TEST_CASES, TestCase } from '../../data/btcSampleData';
import { X, Play, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Target } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BtcTestRunnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMember: (mId: string) => void;
  onOpenScanner: () => void;
}

export const BtcTestRunnerModal: React.FC<BtcTestRunnerModalProps> = ({
  isOpen,
  onClose,
  onSelectMember,
  onOpenScanner,
}) => {
  const { addPointsAtCashier, redeemReward, setCurrentMemberId, setAppMode, setActiveTab } =
    useStarbucksStore();

  const handleRunTestCase = (tc: TestCase) => {
    switch (tc.id) {
      case 'TC-KT-01':
        // Cộng 100 điểm cho KT-008 qua TX-NEW-001 (1.000.000đ)
        addPointsAtCashier('KT-008', 1000000, 'TX-NEW-001');
        setCurrentMemberId('KT-008');
        setAppMode('cashier');
        break;

      case 'TC-KT-02':
        // Thử nhập lại TX-KT-002 cho KT-002 -> Sẽ bị hệ thống chặn lỗi trùng lặp!
        addPointsAtCashier('KT-002', 1500000, 'TX-KT-002');
        setCurrentMemberId('KT-002');
        setAppMode('cashier');
        break;

      case 'TC-KT-03':
        // KT-005 (5800đ) đổi KT-VCH-01 (500đ) -> thành công, còn 5300đ
        setCurrentMemberId('KT-005');
        setAppMode('member');
        setActiveTab('rewards');
        redeemReward('KT-005', 'KT-VCH-01');
        break;

      case 'TC-KT-04':
        // KT-008 (0đ) đổi KT-VCH-01 (500đ) -> Bị từ chối vì thiếu điểm!
        setCurrentMemberId('KT-008');
        setAppMode('member');
        setActiveTab('rewards');
        redeemReward('KT-008', 'KT-VCH-01');
        break;

      case 'TC-KT-05':
        // Quét QR chuẩn KT-004 của BTC
        setCurrentMemberId('KT-004');
        setAppMode('member');
        setActiveTab('card');
        onClose();
        onOpenScanner();
        return;
    }

    confetti({ particleCount: 30, spread: 45 });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full p-4 border border-slate-200 shadow-2xl relative max-h-[90vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-3">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Bộ Ca Kiểm Tra Chuẩn Của BTC (5 Test Cases)
            </h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            1-Click chạy ngay từng kịch bản mà Ban Giám Khảo dùng để chấm điểm
          </p>
        </div>

        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {BTC_TEST_CASES.map((tc) => (
            <div
              key={tc.id}
              className="p-3 bg-slate-50 hover:bg-emerald-50/50 rounded-2xl border border-slate-200 space-y-1.5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-emerald-700 bg-white px-1.5 py-0.5 rounded border border-emerald-200">
                    {tc.id}
                  </span>
                  <strong className="text-xs font-bold text-slate-900">{tc.scenario}</strong>
                </div>

                <button
                  onClick={() => handleRunTestCase(tc)}
                  className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold shadow-xs active:scale-95 flex items-center gap-1 transition-all"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Chạy thử ca này</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-600 space-y-0.5">
                <div>
                  Thành viên: <span className="font-semibold text-slate-800">{tc.memberId}</span> | Mã GD/Ưu đãi: <span className="font-semibold text-slate-800">{tc.targetRef}</span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Đầu vào: {tc.input}
                </div>
                <div className="text-[10px] text-emerald-800 font-medium bg-white p-1.5 rounded-lg border border-slate-100 flex items-center gap-1">
                  <Target className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Kết quả mong đợi: <strong>{tc.expected}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
