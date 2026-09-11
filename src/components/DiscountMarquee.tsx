import React, { useRef } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Plus, Check, Zap, Eye } from 'lucide-react';
import { Product } from '../types';
import { ALL_PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

interface DiscountMarqueeProps {
  onQuickView: (product: Product) => void;
  onViewAllDiscounts: () => void;
}

export const DiscountMarquee: React.FC<DiscountMarqueeProps> = ({
  onQuickView,
  onViewAllDiscounts,
}) => {
  const { cart, addToCart } = useCart();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Select top discounted items (e.g. 25% - 40% OFF)
  const discountedProducts = React.useMemo(() => {
    return ALL_PRODUCTS.filter((p) => p.discountPercent >= 25 && p.inStock)
      .sort((a, b) => b.discountPercent - a.discountPercent)
      .slice(0, 18);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (discountedProducts.length === 0) return null;

  return (
    <section 
      id="discount-marquee-section"
      aria-label="High Discount Flash Deals"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-1 w-full"
    >
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-orange-200/80 rounded-2xl p-3 sm:p-4 relative overflow-hidden backdrop-blur-xs">
        {/* Section Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-orange-600 text-white shadow-xs">
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                  Lightning Steal Deals
                </h3>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-600 to-rose-600 text-white uppercase tracking-wider animate-pulse">
                  Up to 40% OFF
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Handpicked grocery discounts with guaranteed 10-minute doorstep delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewAllDiscounts}
              className="text-xs font-bold text-orange-700 hover:text-orange-900 bg-white hover:bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-2xs whitespace-nowrap"
            >
              See All Deals →
            </button>
            <div className="hidden md:flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleScroll('left')}
                aria-label="Scroll deals left"
                className="w-7 h-7 rounded-lg bg-white hover:bg-orange-50 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll('right')}
                aria-label="Scroll deals right"
                className="w-7 h-7 rounded-lg bg-white hover:bg-orange-50 border border-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding / Horizontal Scroll Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-3 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {discountedProducts.map((product) => {
            const inCart = cart.find((item) => item.product.id === product.id);

            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-xl border border-orange-100 hover:border-orange-300 p-2.5 flex flex-col justify-between shrink-0 w-[150px] sm:w-[175px] shadow-2xs hover:shadow-md transition-all duration-200"
              >
                {/* Discount Badge */}
                <div className="absolute top-2 left-2 z-10">
                  <span className="text-[10px] font-black bg-rose-600 text-white px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" />
                    {product.discountPercent}% OFF
                  </span>
                </div>

                {/* Quick view button on hover */}
                <button
                  type="button"
                  onClick={() => onQuickView(product)}
                  aria-label={`Quick view ${product.name}`}
                  className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-white/90 hover:bg-white text-slate-600 hover:text-orange-600 shadow-xs flex items-center justify-center transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                  title="Quick View"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>

                {/* Product Image */}
                <div 
                  onClick={() => onQuickView(product)}
                  className="w-full h-24 sm:h-28 rounded-lg overflow-hidden bg-slate-50 flex items-center justify-center p-2 mb-2 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Information */}
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate mb-0.5">
                    {product.brand}
                  </div>
                  <h4 
                    onClick={() => onQuickView(product)}
                    className="text-xs font-bold text-slate-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors cursor-pointer h-8"
                  >
                    {product.name}
                  </h4>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                    {product.packSize}
                  </div>

                  {/* Pricing & Add button */}
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-xs sm:text-sm font-black text-slate-900">
                        ₹{product.price}
                      </div>
                      <div className="text-[10px] text-slate-400 line-through">
                        ₹{product.originalPrice}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => addToCart(product)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-lg transition-all cursor-pointer flex items-center gap-1 shadow-2xs ${
                        inCart
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-orange-600 hover:bg-orange-700 text-white'
                      }`}
                      title="Add to basket"
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>{inCart.quantity}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3 h-3 stroke-[3]" />
                          <span>ADD</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
