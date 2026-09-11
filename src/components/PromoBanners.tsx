import React from 'react';
import { Zap, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

interface PromoBannersProps {
  onBannerClick?: (category: string) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onBannerClick }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        
        {/* Banner 1: Darkstore Speed / Munchies */}
        <div 
          onClick={() => onBannerClick && onBannerClick('munchies-snacks')}
          className="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 text-white shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
              <Zap className="w-3.5 h-3.5 fill-amber-400" />
              <span className="uppercase tracking-wider text-[10px]">10-Min Darkstore</span>
            </div>
            <h3 className="text-base sm:text-lg font-black leading-snug text-white">
              Midnight Snacks & Chilled Sodas
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Chips, chocolates, cold brews & munchies delivered in 10 minutes.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
            <span>Explore Aisle</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Banner 2: Farm Fresh */}
        <div 
          onClick={() => onBannerClick && onBannerClick('fruits-vegetables')}
          className="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 text-white shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span className="uppercase tracking-wider text-[10px]">Farm Direct Sourcing</span>
            </div>
            <h3 className="text-base sm:text-lg font-black leading-snug text-white">
              Farm Fresh Vegetables & Fruits
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Hydroponic greens, seasonal fruits & kitchen staples sorted daily.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
            <span>Shop Fresh</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Banner 3: Dairy & Breakfast */}
        <div 
          onClick={() => onBannerClick && onBannerClick('dairy-breakfast')}
          className="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 p-5 text-white shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="uppercase tracking-wider text-[10px]">Morning Essentials</span>
            </div>
            <h3 className="text-base sm:text-lg font-black leading-snug text-white">
              Daily Milk, Bread, Eggs & Butter
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              Amul, Nandini, artisanal bakery loaves & farm eggs at standard MRP.
            </p>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-200 group-hover:text-white transition-colors">
            <span>Order Essentials</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>
    </div>
  );
};
