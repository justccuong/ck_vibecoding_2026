import React, { useState } from 'react';
import { useStarbucksStore } from '../../store/useStarbucksStore';
import { X, UserPlus, Phone, User, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MemberRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemberRegistrationModal: React.FC<MemberRegistrationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { registerMember, setActiveTab } = useStarbucksStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const res = registerMember(name, phone);
    if (res.success) {
      confetti({ particleCount: 50, spread: 60 });
      setName('');
      setPhone('');
      onClose();
      setActiveTab('card');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-sm w-full p-4 border border-slate-200 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute right-3.5 top-3.5 p-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mb-3.5">
          <div className="flex items-center gap-1.5">
            <UserPlus className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">Đăng Ký Thành Viên Mới</h3>
          </div>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Hệ thống tự động cấp thẻ điện tử và sinh mã thành viên duy nhất
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Họ và tên thành viên <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="vd: Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium text-slate-800"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Số điện thoại <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="vd: 0900001099"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium text-slate-800"
                required
              />
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="w-full min-h-[44px] bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-1.5"
          >
            <UserPlus className="w-4 h-4" />
            <span>Kích hoạt thẻ thành viên ngay</span>
          </button>
        </form>
      </div>
    </div>
  );
};
