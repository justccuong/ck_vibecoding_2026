import React, { useState } from 'react';
import { useStarbucksStore } from '../../store/useStarbucksStore';
import { X, ChevronLeft, ChevronRight, Star, ShoppingBag, Check, Sparkles } from 'lucide-react';
import { BrandLogo } from '../brand/BrandLogo';
import confetti from 'canvas-confetti';

interface DrinkItem {
  id: string;
  name: string;
  flavor: string;
  description: string;
  price: number;
  starsRequired: number;
  rate: number;
  image: string;
}

const DRINKS: DrinkItem[] = [
  {
    id: 'SB-DRK-01',
    name: 'Frappuccino',
    flavor: 'Marshmallow',
    description:
      'Marshmallow-infused whipped cream, milk chocolate sauce, a creamy blend of vanilla, coffee, milk and ice are finished off with more marshmallowy whipped cream and a graham cracker crumble.',
    price: 95000,
    starsRequired: 400,
    rate: 5,
    image: '/assets/images/products/frappuccino.png',
  },
  {
    id: 'SB-DRK-02',
    name: 'Café Latte',
    flavor: 'Chocolate',
    description:
      'Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect milk-forward warm-up.',
    price: 75000,
    starsRequired: 300,
    rate: 4,
    image: '/assets/images/products/cafelatte.png',
  },
  {
    id: 'SB-DRK-03',
    name: 'Macchiato',
    flavor: 'Caramel',
    description:
      'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with a caramel drizzle for an oh-so-sweet finish.',
    price: 85000,
    starsRequired: 350,
    rate: 4,
    image: '/assets/images/products/macchiato.png',
  },
  {
    id: 'SB-DRK-04',
    name: 'Espresso',
    flavor: 'Pure Roast',
    description:
      'Our smooth signature Espresso Roast with rich flavor and caramelly sweetness is at the very heart of everything we do.',
    price: 55000,
    starsRequired: 200,
    rate: 5,
    image: '/assets/images/products/espresso.png',
  },
  {
    id: 'SB-DRK-05',
    name: 'Mocha',
    flavor: 'Vanilla',
    description:
      'Our signature espresso meets white chocolate sauce and steamed milk, and then is finished off with sweetened whipped cream to create this supreme white chocolate delight.',
    price: 89000,
    starsRequired: 450,
    rate: 5,
    image: '/assets/images/products/espresso_duplo.png',
  },
];

interface StarbucksDrinkShowcaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StarbucksDrinkShowcaseModal: React.FC<StarbucksDrinkShowcaseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { currentMemberId, members, redeemReward } = useStarbucksStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'Tall' | 'Grande' | 'Venti'>('Grande');
  const [quantity, setQuantity] = useState(1);

  const currentMember = members.find((m) => m.id === currentMemberId);
  const currentDrink = DRINKS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? DRINKS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === DRINKS.length - 1 ? 0 : prev + 1));
  };

  const handleRedeemDrink = () => {
    if (!currentMember) return;
    const res = redeemReward(currentMember.id, currentDrink.id);
    if (res.success) {
      confetti({ particleCount: 50, spread: 60 });
      onClose();
    }
  };

  if (!isOpen) return null;

  const canAfford = currentMember && currentMember.points >= currentDrink.starsRequired * quantity;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-[#006241] rounded-[36px] max-w-md w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh] border border-[#00754A]/50 select-none">
        {/* Custom Vector Watermark background */}
        <div className="absolute -right-16 -top-16 w-72 h-72 opacity-15 pointer-events-none text-white">
          <BrandLogo watermark={true} size={280} className="w-full h-full" />
        </div>

        {/* Coffee leaves decoration */}
        <div className="absolute -left-10 top-20 w-48 h-48 opacity-15 pointer-events-none">
          <img
            src="/assets/images/illustrations/leafs.png"
            alt="Leafs"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Top Header Bar */}
        <div className="px-6 pt-5 pb-2 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <BrandLogo size={32} />
            <span className="text-white font-extrabold text-base tracking-widest font-montserrat">
              VIBE COFFEE
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Drink Showcase Area */}
        <div className="relative px-6 pt-2 pb-4 flex flex-col items-center z-10">
          {/* Rating Stars from redesign-starbucks */}
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: currentDrink.rate }).map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-[#7EC518] fill-[#7EC518]" />
            ))}
          </div>

          {/* Drink Name */}
          <h2 className="text-2xl sm:text-3xl font-black text-white text-center tracking-tight leading-tight">
            {currentDrink.name}
          </h2>
          <span className="text-xs font-bold text-emerald-200 tracking-wider uppercase mt-0.5">
            {currentDrink.flavor} Edition
          </span>

          {/* Center Drink Image with carousel navigation */}
          <div className="relative w-full h-52 flex items-center justify-center my-2">
            <button
              onClick={handlePrev}
              className="absolute left-0 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all active:scale-95 shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="w-44 h-44 flex items-center justify-center transition-all duration-300">
              <img
                src={currentDrink.image}
                alt={currentDrink.name}
                className="max-h-full max-w-full object-contain drop-shadow-2xl animate-in zoom-in-95 duration-200"
              />
            </div>

            <button
              onClick={handleNext}
              className="absolute right-0 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-all active:scale-95 shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center gap-1.5 mt-1">
            {DRINKS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-[#7EC518]' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Curved Sheet (Warm Sand / White like redesign-starbucks) */}
        <div className="bg-white rounded-t-[32px] p-5 flex-1 flex flex-col justify-between space-y-3.5 relative z-10 shadow-inner">
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Đặc trưng hương vị
                </span>
                <strong className="text-lg font-black text-[#1E3932] leading-tight">
                  {currentDrink.flavor}
                </strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Giá quy đổi Stars
                </span>
                <div className="flex items-center gap-1 text-[#006241]">
                  <Star className="w-4 h-4 fill-[#006241]" />
                  <strong className="text-lg font-black">
                    {currentDrink.starsRequired.toLocaleString()} Stars
                  </strong>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-3">
              {currentDrink.description}
            </p>

            {/* Selectors: Size & Quantity */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-100">
              {/* Size Selector */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Kích cỡ ly (Size)
                </span>
                <div className="flex items-center gap-1.5">
                  {(['Tall', 'Grande', 'Venti'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        selectedSize === s
                          ? 'bg-[#006241] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1 text-right">
                  Số lượng
                </span>
                <div className="flex items-center gap-2 bg-[#F2F0EB] p-1 rounded-xl">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-6 h-6 rounded-lg bg-white font-black text-slate-700 flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                  >
                    -
                  </button>
                  <span className="w-4 text-center font-black text-xs text-[#1E3932]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-6 h-6 rounded-lg bg-white font-black text-[#006241] flex items-center justify-center hover:bg-slate-100 shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar: Total & Redeem Action Button (Cart style from redesign-starbucks) */}
          <div className="bg-[#F2F0EB] p-3 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 font-bold block">
                Tổng điểm cần đổi ({quantity} ly {selectedSize})
              </span>
              <strong className="text-base font-black text-[#1E3932] flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#006241] text-[#006241]" />
                <span>{(currentDrink.starsRequired * quantity).toLocaleString()} Stars</span>
              </strong>
            </div>

            <button
              onClick={handleRedeemDrink}
              disabled={!canAfford}
              className={`min-h-[42px] px-5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                canAfford
                  ? 'bg-black text-white hover:bg-slate-800 shadow-md shadow-black/20 active:scale-95 cursor-pointer'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-[#7EC518]" />
              <span>{canAfford ? 'Đổi ly ngay' : 'Không đủ Stars'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
