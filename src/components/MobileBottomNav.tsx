import React from 'react';
import { ShoppingBag, ArrowRight, Home, Grid, Search, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface MobileBottomNavProps {
  onGoHome: () => void;
  onOpenCategories: () => void;
  onFocusSearch: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onGoHome,
  onOpenCategories,
  onFocusSearch,
}) => {
  const { totalItemsCount, grandTotal, setIsCartOpen, selectedLocation } = useCart();
  const { user, setIsAuthModalOpen, setIsOrderHistoryOpen } = useAuth();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
      {/* Floating cart bar if items are in cart */}
      {totalItemsCount > 0 && (
        <div className="px-4 pb-2 animate-in slide-in-from-bottom-2 duration-200">
          <button
            id="mobile-view-cart-btn"
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-slate-900 active:bg-slate-800 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between font-black text-xs cursor-pointer border border-slate-800"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-amber-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] text-slate-400 font-medium">
                  {totalItemsCount} {totalItemsCount === 1 ? 'ITEM' : 'ITEMS'} • {selectedLocation.eta}
                </div>
                <div className="text-sm font-black">₹{grandTotal}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 uppercase tracking-wider font-extrabold text-xs bg-white text-slate-900 px-3 py-1.5 rounded-xl shadow-xs">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </div>
          </button>
        </div>
      )}

      {/* Standard bottom bar */}
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around">
        <button
          onClick={onGoHome}
          className="flex flex-col items-center gap-1 py-1 text-slate-700 hover:text-slate-950 min-w-[48px] min-h-[44px] justify-center cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        <button
          onClick={onOpenCategories}
          className="flex flex-col items-center gap-1 py-1 text-slate-700 hover:text-slate-950 min-w-[48px] min-h-[44px] justify-center cursor-pointer"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-bold">Aisles</span>
        </button>

        <button
          onClick={onFocusSearch}
          className="flex flex-col items-center gap-1 py-1 text-slate-700 hover:text-slate-950 min-w-[48px] min-h-[44px] justify-center cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold">Search</span>
        </button>

        <button
          onClick={() => {
            if (user) {
              setIsOrderHistoryOpen(true);
            } else {
              setIsAuthModalOpen(true);
            }
          }}
          className="flex flex-col items-center gap-1 py-1 text-slate-700 hover:text-orange-600 min-w-[48px] min-h-[44px] justify-center cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10px] font-bold">{user ? 'Orders' : 'Sign In'}</span>
        </button>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 py-1 text-slate-700 hover:text-orange-600 min-w-[48px] min-h-[44px] justify-center cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-orange-600 text-white text-[9px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Cart</span>
        </button>
      </div>
    </div>
  );
};
