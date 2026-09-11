import React from 'react';
import { SlidersHorizontal, ArrowUpDown, Check } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface FilterBarProps {
  activeCategory: string | null;
  activeSubCategory: string | null;
  onSelectSubCategory: (sub: string | null) => void;
  vegOnly: boolean;
  onToggleVegOnly: () => void;
  bestsellerOnly: boolean;
  onToggleBestsellerOnly: () => void;
  under99Only: boolean;
  onToggleUnder99Only: () => void;
  highDiscountOnly: boolean;
  onToggleHighDiscountOnly: () => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  activeSubCategory,
  onSelectSubCategory,
  vegOnly,
  onToggleVegOnly,
  bestsellerOnly,
  onToggleBestsellerOnly,
  under99Only,
  onToggleUnder99Only,
  highDiscountOnly,
  onToggleHighDiscountOnly,
  sortBy,
  onSortChange,
}) => {
  const currentCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);
  const subCategories = currentCategoryObj ? currentCategoryObj.subCategories : [];

  return (
    <div className="bg-white border-b border-slate-100 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Subcategories strip if a category is chosen */}
        {subCategories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <button
              onClick={() => onSelectSubCategory(null)}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeSubCategory === null
                  ? 'bg-slate-900 text-white'
                  : 'bg-stone-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All in {currentCategoryObj?.name}
            </button>
            {subCategories.map((sub) => {
              const isSelected = activeSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => onSelectSubCategory(sub)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}

        {/* Filter tags & Sort row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 hidden sm:flex">
              <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600" /> Filters:
            </span>

            {/* Veg Only */}
            <button
              id="filter-veg-btn"
              onClick={onToggleVegOnly}
              className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                vegOnly
                  ? 'bg-emerald-50 border-emerald-600 text-emerald-800 shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="w-3 h-3 border border-emerald-600 rounded-xs flex items-center justify-center p-0.5">
                <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full" />
              </div>
              <span>Veg Only</span>
              {vegOnly && <Check className="w-3 h-3 stroke-[3]" />}
            </button>

            {/* Bestseller Only */}
            <button
              id="filter-bestseller-btn"
              onClick={onToggleBestsellerOnly}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                bestsellerOnly
                  ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              ★ Bestsellers
            </button>

            {/* Under ₹99 */}
            <button
              id="filter-under99-btn"
              onClick={onToggleUnder99Only}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                under99Only
                  ? 'bg-slate-900 border-slate-900 text-white shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              Under ₹99 Store
            </button>

            {/* Super Savers */}
            <button
              id="filter-discount-btn"
              onClick={onToggleHighDiscountOnly}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                highDiscountOnly
                  ? 'bg-emerald-900 border-emerald-900 text-white shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              Super Savers (≥25% OFF)
            </button>
          </div>

          {/* Sort dropdown */}
          <div className="flex items-center gap-2 ml-auto">
            <div className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs transition-all border ${
              sortBy !== 'recommended'
                ? 'bg-orange-50 border-orange-400 text-orange-950 font-bold shadow-2xs'
                : 'bg-stone-50 border-slate-200 text-slate-700'
            }`}>
              <ArrowUpDown className={`w-3.5 h-3.5 ${sortBy !== 'recommended' ? 'text-orange-600' : 'text-slate-500'}`} />
              <label htmlFor="sort-select" className="font-semibold text-slate-500 hidden sm:inline cursor-pointer">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="bg-transparent font-bold text-slate-900 outline-none cursor-pointer pr-1"
              >
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
              {sortBy !== 'recommended' && (
                <button
                  type="button"
                  onClick={() => onSortChange('recommended')}
                  className="ml-1 text-[11px] text-orange-600 hover:text-orange-800 font-extrabold cursor-pointer px-1 rounded-full hover:bg-orange-100"
                  title="Reset to recommended"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
