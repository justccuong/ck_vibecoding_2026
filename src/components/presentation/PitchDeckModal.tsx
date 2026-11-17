import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MonitorPlay, Sparkles, CheckCircle2, Shield, TrendingUp, Layers } from 'lucide-react';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName?: string;
  trackName?: string;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose,
  appName = 'Mini App Vibe Coding 2026',
  trackName = 'Bảng Kỹ thuật / Bảng Kinh tế',
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: 'VẤN ĐỀ & BỐI CẢNH THỰC TẾ',
      subtitle: 'Pain Point của Người dùng & Tổ chức',
      content: (
        <div className="space-y-3 text-xs md:text-sm">
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900">
            <strong className="block font-bold mb-1">Thực trạng nhức nhối:</strong>
            Quy trình thủ công, nhắn tin qua lại dẫn đến trùng lặp lịch, thiếu minh bạch dữ liệu, và người quản lý mất kiểm soát.
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-800 block mb-0.5">Thời gian lãng phí:</span>
              Mất 30-45 phút mỗi ngày để kiểm tra tình trạng thiết bị / ghi chép sổ sách bán hàng.
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="font-bold text-slate-800 block mb-0.5">Sai sót chồng lấn:</span>
              Dễ xung đột lịch mượn hoặc tính sai điểm hòa vốn khi có biến động khách.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'GIẢI PHÁP: KIẾN TRÚC LOCAL-FIRST',
      subtitle: 'Độ Trễ 0ms · Bền Bỉ Tuyệt Đối · Chuẩn Mobile First',
      content: (
        <div className="space-y-3 text-xs md:text-sm">
          <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-sky-900">
            <strong className="block font-bold mb-1">Ứng dụng Web Mini App Tiếng Việt:</strong>
            Được thiết kế chuẩn hóa cho khung nhìn <strong>360px – 390px</strong> trên điện thoại thông minh, không tràn ngang, thao tác 1 chạm.
          </div>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-sky-600 font-bold block text-sm">0ms</span>
              <span className="text-[10px] text-slate-500">Độ trễ phản hồi</span>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-emerald-600 font-bold block text-sm">100%</span>
              <span className="text-[10px] text-slate-500">Dữ liệu bảo toàn khi F5</span>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-indigo-600 font-bold block text-sm">+4 Điểm</span>
              <span className="text-[10px] text-slate-500">Ngoại vi QR Scanner</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'TÍNH NĂNG CỐT LÕI & ĐIỂM SÁNG',
      subtitle: 'Xử lý Nghiệp vụ Chặt chẽ & Dữ liệu Mẫu 1-Click',
      content: (
        <div className="space-y-2 text-xs">
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2 text-emerald-950">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong>Chặn vi phạm ràng buộc & Trùng lặp:</strong> Tự động kiểm tra khoảng ngày chồng lấn hoặc giá trị âm ngay khi người dùng thao tác.
            </div>
          </div>
          <div className="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl flex items-start gap-2 text-indigo-950">
            <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <strong>Nạp dữ liệu mẫu ban đầu chuẩn BTC:</strong> Đưa hệ thống về trạng thái ban đầu của hội đồng chỉ bằng 1 nút bấm duy nhất.
            </div>
          </div>
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2 text-amber-950">
            <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Tích hợp Thiết bị Ngoại vi:</strong> Sử dụng Camera điện thoại để quét mã QR thực tế và sinh mã nhận diện nhanh chóng.
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'HIỆU QUẢ THỰC TẾ & BẢO TOÀN DỮ LIỆU',
      subtitle: 'Độ Ổn Định Cao · Sẵn Sàng Mở Rộng',
      content: (
        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
            <div className="flex justify-between font-bold text-slate-800">
              <span>Độ sẵn sàng sử dụng:</span>
              <span className="text-emerald-600">Ngay lập tức (Zero-Install)</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800">
              <span>Khả năng hoạt động offline:</span>
              <span className="text-sky-600">Hoạt động 100% không cần mạng</span>
            </div>
            <div className="flex justify-between font-bold text-slate-800">
              <span>Tương thích trình duyệt:</span>
              <span className="text-slate-600">Chrome, Safari, Edge, Firefox</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic text-center">
            "Sản phẩm được tối ưu cho cả phiên bản máy tính lẫn thiết bị di động của từng thành viên trong tổ chức."
          </p>
        </div>
      ),
    },
    {
      title: 'KẾT LUẬN & SẴN SÀNG PHẢN BIỆN',
      subtitle: 'Cảm ơn Ban Giám Khảo đã lắng nghe!',
      content: (
        <div className="space-y-3 text-center py-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">{appName}</h4>
            <p className="text-xs text-slate-500 mt-1">Được xây dựng độc lập trong 60 phút bằng phương pháp Vibe Coding hiện đại</p>
          </div>
          <div className="p-2.5 bg-slate-100 rounded-xl text-xs font-semibold text-slate-700">
            Xin mời Ban Giám Khảo đặt câu hỏi phản biện và cùng trải nghiệm Live Demo!
          </div>
        </div>
      ),
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-5 border border-slate-200 shadow-2xl relative flex flex-col min-h-[460px]">
        {/* Header bar */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
              <MonitorPlay className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600">
                Slide Thuyết Trình ({currentSlide + 1}/{slides.length})
              </span>
              <h3 className="text-xs font-bold text-slate-900 leading-tight">
                {slides[currentSlide].title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Body */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[11px] font-semibold text-slate-400 mb-3 uppercase tracking-wide">
            {slides[currentSlide].subtitle}
          </p>
          {slides[currentSlide].content}
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-slate-100 pt-3 mt-3 flex items-center justify-between">
          <button
            onClick={() => setCurrentSlide((s) => Math.max(0, s - 1))}
            disabled={currentSlide === 0}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Trước</span>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-1.5">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === idx ? 'w-5 bg-sky-600' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((s) => Math.min(slides.length - 1, s + 1))}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs disabled:opacity-40"
          >
            <span>Tiếp</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
