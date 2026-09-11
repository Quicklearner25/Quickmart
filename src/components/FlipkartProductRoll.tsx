import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Zap, 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  Clock, 
  Plus, 
  Minus, 
  Check, 
  Eye, 
  Flame,
  ShieldCheck
} from 'lucide-react';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface FlipkartProductRollProps {
  onQuickView: (product: Product) => void;
  onViewAllDiscounts?: () => void;
}

export const FlipkartProductRoll: React.FC<FlipkartProductRollProps> = ({
  onQuickView,
  onViewAllDiscounts,
}) => {
  const { cart, addToCart, removeFromCart, getItemQuantity } = useCart();
  const [isPaused, setIsPaused] = useState(false);
  const [rollSpeed, setRollSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Live countdown timer for realistic e-commerce flash freshness
  const [timeLeft, setTimeLeft] = useState({ minutes: 8, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          return { minutes: 9, seconds: 59 }; // Reset cycle
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter curated hot-selling and high-discount products for the roll
  const rollingProducts = useMemo(() => {
    return ALL_PRODUCTS.filter(
      (p) => p.inStock && (p.discountPercent >= 20 || p.isBestseller)
    )
      .sort((a, b) => b.discountPercent - a.discountPercent)
      .slice(0, 14);
  }, []);

  if (rollingProducts.length === 0) return null;

  // Manual scroll handler
  const handleManualScroll = (direction: 'left' | 'right') => {
    setIsPaused(true);
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const getRollClass = () => {
    if (isPaused) return 'flex items-stretch gap-3.5';
    switch (rollSpeed) {
      case 'fast':
        return 'animate-flipkart-roll-fast pause-on-hover flex items-stretch gap-3.5';
      case 'slow':
        return 'animate-flipkart-roll-slow pause-on-hover flex items-stretch gap-3.5';
      case 'normal':
      default:
        return 'animate-flipkart-roll pause-on-hover flex items-stretch gap-3.5';
    }
  };

  // We repeat items twice to create an infinite continuous rolling conveyor
  const loopProducts = [...rollingProducts, ...rollingProducts];

  return (
    <section
      id="flipkart-product-roll"
      aria-label="Live Rolling Product Deals"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2 w-full select-none"
    >
      <div className="bg-white border border-slate-200/90 rounded-2xl p-3.5 sm:p-5 shadow-xs overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          
          {/* Left Title & Live Indicator */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow-xs">
              <Zap className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Rolling Deals Spotlight
                </h2>
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 px-2 py-0.5 rounded-full text-[10px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 -ml-2.5" />
                  <span>LIVE ROLL</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                <span>Handpicked top picks rolling across darkstores</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  Refreshes in {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </p>
            </div>
          </div>

          {/* Right Controls: Auto-roll toggle, speed, manual scroll & View all */}
          <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
            
            {/* Speed & Pause Controls */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200/80">
              <button
                type="button"
                onClick={() => setIsPaused(!isPaused)}
                className={`p-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  isPaused
                    ? 'bg-amber-100 text-amber-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title={isPaused ? 'Resume Auto-Roll' : 'Pause Roll'}
                aria-label={isPaused ? 'Resume Auto-Roll' : 'Pause Roll'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
                <span className="hidden lg:inline text-[11px]">{isPaused ? 'Paused' : 'Rolling'}</span>
              </button>

              {!isPaused && (
                <button
                  type="button"
                  onClick={() => setRollSpeed(rollSpeed === 'normal' ? 'fast' : rollSpeed === 'fast' ? 'slow' : 'normal')}
                  className="px-2 py-1 text-[10px] font-extrabold text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  title="Cycle rolling speed"
                >
                  {rollSpeed === 'fast' ? '1.5x' : rollSpeed === 'slow' ? '0.7x' : '1.0x'}
                </button>
              )}
            </div>

            {/* Manual Navigation Arrows */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleManualScroll('left')}
                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Roll Left"
                aria-label="Roll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleManualScroll('right')}
                className="w-8 h-8 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Roll Right"
                aria-label="Roll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* View All link */}
            {onViewAllDiscounts && (
              <button
                onClick={onViewAllDiscounts}
                className="text-xs font-bold text-slate-800 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                View All →
              </button>
            )}
          </div>
        </div>

        {/* Rolling Track Container */}
        <div 
          ref={scrollContainerRef}
          className="relative mt-3.5 overflow-x-hidden overflow-y-hidden pb-1 no-scrollbar"
        >
          <div className={getRollClass()}>
            {loopProducts.map((product, idx) => {
              const qty = getItemQuantity(product.id);
              const savings = product.originalPrice - product.price;

              return (
                <div
                  key={`${product.id}-roll-${idx}`}
                  className="w-44 sm:w-52 shrink-0 bg-white border border-slate-200/90 hover:border-slate-400 rounded-xl p-3 flex flex-col justify-between hover:shadow-md transition-all duration-200 group relative"
                >
                  {/* Top Bar: Discount Pill & Veg Mark */}
                  <div className="flex items-start justify-between gap-1 mb-1.5">
                    <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                      {product.discountPercent}% OFF
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onQuickView(product)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 transition-opacity cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-3 h-3" />
                      </button>

                      {/* Veg / Non-Veg */}
                      <div
                        className={`w-3.5 h-3.5 border flex items-center justify-center p-0.5 rounded-xs shrink-0 ${
                          product.isVeg ? 'border-emerald-600' : 'border-amber-800'
                        }`}
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            product.isVeg ? 'bg-emerald-600' : 'bg-amber-800'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div
                    onClick={() => onQuickView(product)}
                    className="relative w-full aspect-square mb-2 rounded-lg bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center border border-slate-100"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Speed delivery badge */}
                    <div className="absolute bottom-1 left-1 bg-white/95 backdrop-blur-xs text-[9px] font-bold text-slate-800 px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-slate-200/80 shadow-2xs">
                      <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                      <span>{product.deliveryTime}</span>
                    </div>

                    {/* Verified Assured badge */}
                    <div className="absolute top-1 left-1 bg-slate-900/90 text-white text-[8px] font-bold px-1 py-0.2 rounded flex items-center gap-0.5">
                      <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                      <span>Assured</span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
                        {product.brand}
                      </span>
                      <h3
                        onClick={() => onQuickView(product)}
                        className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug hover:text-slate-700 cursor-pointer min-h-[2rem]"
                        title={product.name}
                      >
                        {product.name}
                      </h3>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {product.packSize}
                      </div>
                    </div>

                    {/* Pricing & Add Button */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-black text-slate-900">
                            ₹{product.price}
                          </span>
                          {product.originalPrice > product.price && (
                            <span className="text-[10px] text-slate-400 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                        </div>
                        {savings > 0 && (
                          <div className="text-[9px] font-bold text-emerald-700">
                            Save ₹{savings}
                          </div>
                        )}
                      </div>

                      {/* Add Button */}
                      <div>
                        {qty === 0 ? (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product);
                            }}
                            className="bg-white hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-300 hover:border-slate-900 font-extrabold text-xs px-2.5 py-1 rounded-lg transition-colors cursor-pointer flex items-center gap-0.5 shadow-2xs"
                          >
                            <span>ADD</span>
                            <Plus className="w-3 h-3 stroke-[3]" />
                          </button>
                        ) : (
                          <div className="flex items-center bg-slate-900 text-white rounded-lg overflow-hidden text-xs">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFromCart(product.id);
                              }}
                              className="px-1.5 py-1 hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3 stroke-[3]" />
                            </button>
                            <span className="px-1.5 font-black text-[11px]">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="px-1.5 py-1 hover:bg-slate-800 transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3 stroke-[3]" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subtle Bottom Trust Note */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 gap-2">
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Hover on any product to pause the roll • Guaranteed 10-minute doorstep dispatch</span>
          </div>
          <span className="text-slate-400">100% Genuine Grocery Quality</span>
        </div>
      </div>
    </section>
  );
};
