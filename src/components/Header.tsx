import React from 'react';
import { 
  MapPin, 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  Zap, 
  X,
  User,
  Clock,
  PackageCheck,
  Cloud,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Logo } from './Logo';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onResetSearch: () => void;
  activeCategory: string | null;
  onSelectCategory: (id: string | null) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onResetSearch,
  onSelectCategory
}) => {
  const { 
    totalItemsCount, 
    grandTotal, 
    setIsCartOpen, 
    selectedLocation, 
    setIsLocationModalOpen,
    isCloudSyncing,
    orderHistory
  } = useCart();

  const {
    user,
    userProfile,
    setIsAuthModalOpen,
    setIsOrderHistoryOpen,
    signOutUser
  } = useAuth();

  const [showUserDropdown, setShowUserDropdown] = React.useState(false);

  const popularSearches = ['Milk', 'Amul', 'Bread', 'Eggs', 'Onion', 'Potato', 'Maggi', 'Chips', 'Atta'];

  return (
    <header id="app-header" className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-2xs">
      {/* Top micro announcement bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2 border-b border-slate-800">
        <Zap className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
        <span>Instant Grocery • Delivering in <strong className="text-white">{selectedLocation.eta}</strong> to {selectedLocation.tag} ({selectedLocation.city})</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20 gap-3 md:gap-6">
          
          {/* Brand Logo & Tagline */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="brand-logo-btn"
              onClick={() => {
                onSelectCategory(null);
                onResetSearch();
              }}
              className="group text-left cursor-pointer focus:outline-none"
              title="Quickmart - Back to Home"
            >
              <Logo size="md" />
            </button>
          </div>

          {/* Delivery Location Selector */}
          <button
            id="location-picker-btn"
            onClick={() => setIsLocationModalOpen(true)}
            className="hidden sm:flex items-center gap-2.5 py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all text-left group shrink-0 max-w-[220px] md:max-w-[280px] cursor-pointer"
            title="Change Delivery Location"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-200/80 text-slate-700 flex items-center justify-center shrink-0 transition-colors">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                  Deliver to {selectedLocation.tag}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 transition-colors" />
              </div>
              <p className="text-[11px] text-slate-500 truncate leading-tight">
                {selectedLocation.address}
              </p>
            </div>
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl relative">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search 'milk', 'chips', 'amul', 'atta' across 1000+ items..."
                className="w-full bg-slate-100 hover:bg-slate-50 focus:bg-white text-slate-800 text-sm font-medium pl-10 pr-10 py-2.5 rounded-xl border border-slate-200/80 focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all outline-none"
              />
              {searchQuery && (
                <button
                  id="clear-search-btn"
                  onClick={onResetSearch}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-200 cursor-pointer"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Popular quick searches when empty on desktop */}
            {!searchQuery && (
              <div className="hidden lg:flex items-center gap-1.5 mt-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[10px] text-slate-400 font-medium shrink-0">Popular:</span>
                {popularSearches.slice(0, 7).map((term) => (
                  <button
                    key={term}
                    onClick={() => onSearchChange(term)}
                    className="text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200/70 bg-white cursor-pointer transition-colors shrink-0"
                  >
                    {term}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Action Icons & Cart */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Orders History Quick Access */}
            <button
              id="header-orders-btn"
              onClick={() => setIsOrderHistoryOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer border border-transparent hover:border-slate-200"
              title="View your past orders"
            >
              <PackageCheck className="w-4 h-4 text-slate-700" />
              <span>Orders</span>
              {orderHistory.length > 0 && (
                <span className="bg-slate-200 text-slate-800 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full">
                  {orderHistory.length}
                </span>
              )}
            </button>

            {/* User Profile / Auth State */}
            {user ? (
              <div className="relative">
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 text-xs font-bold cursor-pointer transition-colors border border-slate-200 hover:border-slate-300"
                >
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={userProfile?.name || 'User'} 
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-extrabold text-[11px]">
                      {(userProfile?.name || 'U').charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="max-w-[80px] truncate hidden md:inline">
                    {userProfile?.name?.split(' ')[0] || 'Account'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {showUserDropdown && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                    onClick={() => setShowUserDropdown(false)}
                  >
                    <div className="px-3 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {userProfile?.name || 'Shopper'}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {user.email || 'Guest session'}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsOrderHistoryOpen(true)}
                      className="w-full text-left px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer"
                    >
                      <PackageCheck className="w-3.5 h-3.5 text-slate-500" />
                      <span>Order History</span>
                    </button>

                    <button
                      onClick={signOutUser}
                      className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-t border-slate-100"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                id="header-login-btn"
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 text-xs font-bold transition-colors cursor-pointer border border-slate-200 hover:border-slate-300"
              >
                <User className="w-4 h-4 text-slate-600" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* View Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 active:scale-95 text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 bg-emerald-500 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col text-left leading-none">
                <span className="text-[10px] text-slate-400 font-medium">My Cart</span>
                <span className="text-xs sm:text-sm font-extrabold text-white">
                  {totalItemsCount > 0 ? `₹${grandTotal}` : '₹0'}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Location bar if on small screen */}
        <div className="flex sm:hidden items-center justify-between pb-2.5 pt-1 border-t border-slate-100">
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-1.5 text-xs text-slate-700 font-medium truncate"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
            <span className="font-bold text-slate-900">{selectedLocation.tag}:</span>
            <span className="truncate max-w-[200px] text-slate-500">{selectedLocation.address}</span>
            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
          </button>
          <span className="text-[11px] font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 shrink-0 flex items-center gap-0.5">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> {selectedLocation.eta}
          </span>
        </div>
      </div>
    </header>
  );
};
