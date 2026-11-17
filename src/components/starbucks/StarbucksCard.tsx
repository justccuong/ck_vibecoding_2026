import React, { useState, useEffect } from 'react';
import { Member } from '../../data/btcSampleData';
import QRCode from 'qrcode';
import { Star, Coffee, QrCode, Sparkles, ChevronRight, CheckCircle2, Award, ShieldCheck, Flame } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';

interface StarbucksCardProps {
  member: Member;
  onOpenQrEnlarge?: () => void;
  onOpenRules?: () => void;
}

export const StarbucksCard: React.FC<StarbucksCardProps> = ({
  member,
  onOpenQrEnlarge,
  onOpenRules,
}) => {
  const [qrUrl, setQrUrl] = useState<string>('');

  useEffect(() => {
    if (member.id) {
      QRCode.toDataURL(member.id, {
        width: 220,
        margin: 1,
        color: {
          dark: '#1E3932',
          light: '#ffffff',
        },
      })
        .then((url) => setQrUrl(url))
        .catch((err) => console.error(err));
    }
  }, [member.id]);

  // Lời chào thời gian thực kiểu app Starbucks
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chào buổi sáng';
    if (hour < 18) return 'Chào buổi chiều';
    return 'Chào buổi tối';
  };

  // Gradient màu chuẩn theo Design Tokens từ Redesign Starbucks
  const getCardStyle = () => {
    switch (member.tier) {
      case 'Vàng':
        return {
          gradient: 'linear-gradient(135deg, #D4AF37 0%, #AA820A 45%, #F3E5AB 100%)',
          textColor: '#1E3932', // Chữ màu tối cực sang chuẩn Gold
          subColor: '#2D4E45',
          chipColor: '#8E6E16',
          badgeBg: 'rgba(30, 57, 50, 0.15)',
          badgeText: '#1E3932',
          progressBg: 'rgba(30, 57, 50, 0.2)',
          progressFill: '#1E3932',
          tierName: 'VIBE GOLD VIP',
          iconColor: '#1E3932',
          starBadge: 'bg-[#1E3932] text-[#F3E5AB]',
          borderColor: 'border-[#AA820A]/40',
        };
      case 'Bạc':
        return {
          gradient: 'linear-gradient(135deg, #94A3B8 0%, #64748B 50%, #334155 100%)',
          textColor: '#FFFFFF',
          subColor: '#E2E8F0',
          chipColor: '#CBD5E1',
          badgeBg: 'rgba(255, 255, 255, 0.2)',
          badgeText: '#FFFFFF',
          progressBg: 'rgba(255, 255, 255, 0.25)',
          progressFill: '#FFFFFF',
          tierName: 'VIBE SILVER',
          iconColor: '#FFFFFF',
          starBadge: 'bg-white/20 text-white',
          borderColor: 'border-white/30',
        };
      default: // Đồng
        return {
          gradient: 'linear-gradient(135deg, #8C5A3C 0%, #6D4126 50%, #452411 100%)',
          textColor: '#FFFFFF',
          subColor: '#FED7AA',
          chipColor: '#D97706',
          badgeBg: 'rgba(0, 0, 0, 0.28)',
          badgeText: '#FFEDD5',
          progressBg: 'rgba(0, 0, 0, 0.35)',
          progressFill: '#FED7AA',
          tierName: 'VIBE BRONZE',
          iconColor: '#FFEDD5',
          starBadge: 'bg-black/30 text-amber-200',
          borderColor: 'border-amber-900/40',
        };
    }
  };

  const style = getCardStyle();

  // Mốc điểm tính toán:
  // Đồng: < 1000
  // Bạc: 1000 - 4999
  // Vàng: >= 5000
  let nextGoal = 1000;
  let nextTierName = 'Hạng Bạc';
  let progress = 0;

  if (member.tier === 'Đồng') {
    nextGoal = 1000;
    nextTierName = 'Hạng Bạc';
    progress = Math.min(100, (member.points / 1000) * 100);
  } else if (member.tier === 'Bạc') {
    nextGoal = 5000;
    nextTierName = 'Hạng Vàng VIP';
    progress = Math.min(100, ((member.points - 1000) / 4000) * 100);
  } else {
    progress = 100;
    nextTierName = 'Hạng Vàng Cao Nhất';
  }

  return (
    <div className="space-y-3 font-sans">
      {/* Top Greeting Section with Custom Brand Vector Emblem */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <BrandLogo size={38} />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#7EC518] rounded-full border-2 border-white flex items-center justify-center">
              <Star className="w-2.5 h-2.5 text-white fill-white" />
            </span>
          </div>
          <div>
            <span className="text-[11px] font-medium text-slate-500 block">
              {getGreeting()} ☕
            </span>
            <h2 className="text-base font-extrabold text-[#1E3932] tracking-tight">
              {member.name}
            </h2>
          </div>
        </div>

        {/* Star Badge */}
        <div className="flex items-center gap-1.5 bg-[#D4E9E2] text-[#006241] px-3 py-1.5 rounded-full text-xs font-black border border-[#006241]/15 shadow-2xs">
          <Star className="w-3.5 h-3.5 fill-[#006241]" />
          <span>{member.points.toLocaleString('vi-VN')} Stars</span>
        </div>
      </div>

      {/* Dynamic Membership Card with Luxury Aesthetics & Shimmer */}
      <div
        style={{ background: style.gradient }}
        className={`w-full rounded-[28px] p-5 text-white shadow-2xl relative overflow-hidden transition-all duration-300 select-none border ${style.borderColor} animate-shimmer`}
      >
        {/* Layer 1: Custom Vector Watermark */}
        <div className="absolute -right-6 -bottom-8 w-44 h-44 opacity-20 pointer-events-none select-none text-white">
          <BrandLogo watermark={true} size={176} className="w-full h-full" />
        </div>

        {/* Layer 2: Coffee Leafs Botanical Accent (from redesign-starbucks Leafs) */}
        <div className="absolute -left-6 -bottom-8 w-32 h-32 opacity-20 pointer-events-none select-none">
          <img
            src="/assets/images/illustrations/leafs.png"
            alt="Leafs"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Card Header */}
        <div className="flex items-start justify-between relative z-10">
          <div className="space-y-1">
            {/* Tier Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[9px] font-black tracking-widest uppercase border backdrop-blur-md shadow-xs"
              style={{
                background: style.badgeBg,
                color: style.badgeText,
                borderColor: 'rgba(255,255,255,0.25)',
              }}
            >
              <Award className="w-3 h-3" />
              <span>{style.tierName}</span>
            </div>

            {/* Member Name */}
            <h3
              className="text-xl font-extrabold tracking-tight mt-1"
              style={{ color: style.textColor }}
            >
              {member.name}
            </h3>

            {/* Member ID & Phone with EMV chip aesthetic */}
            <div className="flex items-center gap-2 mt-0.5">
              <div
                className="w-6 h-4 rounded-sm border border-black/20 flex items-center justify-center opacity-80"
                style={{ background: style.chipColor }}
                title="EMV Contactless Chip"
              >
                <div className="w-3 h-2 border-r border-b border-black/30" />
              </div>
              <p
                className="text-[11px] font-mono font-medium tracking-wide"
                style={{ color: style.subColor }}
              >
                <strong className="font-bold tracking-wider">{member.id}</strong> · {member.phone}
              </p>
            </div>
          </div>

          {/* QR Code on Card (Click to enlarge / scan at POS) */}
          {qrUrl && (
            <div
              onClick={onOpenQrEnlarge}
              title="Nhấn để phóng to mã QR quét tại quầy"
              className="bg-white p-1.5 rounded-2xl shadow-lg cursor-pointer hover:scale-105 active:scale-95 transition-all shrink-0 border border-white/40 group text-center"
            >
              <img
                src={qrUrl}
                alt={`QR ${member.id}`}
                className="w-16 h-16 rounded-xl object-contain"
              />
              <div className="text-[8px] font-mono font-extrabold text-[#1E3932] tracking-wider mt-0.5 group-hover:text-[#006241]">
                {member.id}
              </div>
            </div>
          )}
        </div>

        {/* Card Body: Stars Balance */}
        <div className="mt-4 pt-3 border-t border-black/10 relative z-10 flex items-end justify-between">
          <div>
            <span
              className="text-[10px] font-bold uppercase tracking-wider block"
              style={{ color: style.subColor }}
            >
              Số dư Stars tích lũy
            </span>
            <div
              className="text-3xl font-black leading-none mt-1 flex items-baseline gap-1.5"
              style={{ color: style.textColor }}
            >
              <span>{member.points.toLocaleString('vi-VN')}</span>
              <span className="text-xs font-bold uppercase tracking-wide opacity-80">Stars</span>
            </div>
          </div>

          {onOpenRules && (
            <button
              onClick={onOpenRules}
              style={{ color: style.textColor }}
              className="text-[10px] font-extrabold px-2.5 py-1.5 rounded-xl bg-black/15 hover:bg-black/25 flex items-center gap-1 transition-all backdrop-blur-xs"
            >
              <span>Thể lệ mốc hạng</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Starbucks Milestone Progress Bar with ticks */}
        <div className="mt-3.5 relative z-10">
          <div
            className="flex justify-between text-[10px] font-bold mb-1 opacity-90"
            style={{ color: style.textColor }}
          >
            <span>Tiến độ lên {nextTierName}</span>
            <span>
              {member.tier === 'Vàng'
                ? 'Đã đạt Hạng Vàng VIP cao nhất'
                : `Còn ${(nextGoal - member.points).toLocaleString()} điểm`}
            </span>
          </div>

          {/* Bar */}
          <div
            className="w-full h-2.5 rounded-full overflow-hidden p-0.5"
            style={{ background: style.progressBg }}
          >
            <div
              className="h-full rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${progress}%`, background: style.progressFill }}
            />
          </div>

          {/* Starbucks Milestone Markers */}
          <div
            className="flex justify-between text-[8px] font-black mt-1.5 opacity-80 uppercase tracking-wider"
            style={{ color: style.subColor }}
          >
            <span className="flex items-center gap-0.5">
              <span>0 (Đồng)</span>
            </span>
            <span className="flex items-center gap-0.5">
              <span>1.000 (Bạc)</span>
            </span>
            <span className="flex items-center gap-0.5">
              <Star className="w-2.5 h-2.5 fill-current" />
              <span>5.000 (Vàng VIP)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
