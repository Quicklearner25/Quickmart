import React from 'react';
import { 
  Apple, 
  Milk, 
  Cookie, 
  CupSoda, 
  Flame, 
  Coffee, 
  Wheat, 
  Sparkles, 
  Candy, 
  Sparkle, 
  Heart, 
  Smile,
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategoryBarProps {
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Apple': return <Apple className="w-5 h-5" />;
      case 'Milk': return <Milk className="w-5 h-5" />;
      case 'Cookie': return <Cookie className="w-5 h-5" />;
      case 'CupSoda': return <CupSoda className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Wheat': return <Wheat className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Candy': return <Candy className="w-5 h-5" />;
      case 'Sparkle': return <Sparkle className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      default: return <Apple className="w-5 h-5" />;
    }
  };

  return (
    <nav aria-label="Grocery categories navigation" className="bg-white border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
          
          {/* All Products button */}
          <button
            id="cat-all-btn"
            onClick={() => onSelectCategory(null)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
              activeCategory === null
                ? 'bg-slate-900 text-white shadow-xs border border-slate-900'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950 border border-slate-200/70'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Items</span>
          </button>

          {/* Individual Category Pills */}
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs border border-slate-900'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950 border border-slate-200/70'
                }`}
              >
                <span className={isActive ? 'text-amber-400' : 'text-slate-500'}>
                  {getIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
