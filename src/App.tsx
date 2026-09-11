import React, { useState, useMemo } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { CategoryBar } from './components/CategoryBar';
import { PromoBanners } from './components/PromoBanners';
import { FlipkartProductRoll } from './components/FlipkartProductRoll';
import { DiscountMarquee } from './components/DiscountMarquee';
import { FilterBar } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { LocationModal } from './components/LocationModal';
import { OrderPlacedModal } from './components/OrderPlacedModal';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { AuthModal } from './components/AuthModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { ALL_PRODUCTS, CATEGORIES } from './data/products';
import { Product } from './types';
import { 
  Zap, 
  Search, 
  Layers, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  ArrowDown
} from 'lucide-react';

export default function App() {
  // Navigation & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);

  // Filter & Sort State
  const [vegOnly, setVegOnly] = useState(false);
  const [bestsellerOnly, setBestsellerOnly] = useState(false);
  const [under99Only, setUnder99Only] = useState(false);
  const [highDiscountOnly, setHighDiscountOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');

  // Quick view modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Pagination / Display limit for buttery smooth performance across 1000+ products
  const [displayCount, setDisplayCount] = useState(36);

  // Filter & Search Engine across 1000+ items
  const filteredProducts = useMemo(() => {
    let list = ALL_PRODUCTS;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory) {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Subcategory filter
    if (activeSubCategory) {
      list = list.filter((p) => p.subCategory === activeSubCategory);
    }

    // Veg Only filter
    if (vegOnly) {
      list = list.filter((p) => p.isVeg);
    }

    // Bestseller Only filter
    if (bestsellerOnly) {
      list = list.filter((p) => p.isBestseller);
    }

    // Under ₹99 filter
    if (under99Only) {
      list = list.filter((p) => p.price <= 99);
    }

    // High discount (>=25% OFF) filter
    if (highDiscountOnly) {
      list = list.filter((p) => p.discountPercent >= 25);
    }

    // Sorting
    const sorted = [...list];
    switch (sortBy) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating || b.ratingCount - a.ratingCount);
        break;
      case 'discount':
        sorted.sort((a, b) => b.discountPercent - a.discountPercent);
        break;
      case 'recommended':
      default:
        // Keep natural curated rank
        break;
    }

    return sorted;
  }, [
    searchQuery,
    activeCategory,
    activeSubCategory,
    vegOnly,
    bestsellerOnly,
    under99Only,
    highDiscountOnly,
    sortBy,
  ]);

  // Products visible on current screen slice
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  // Featured sections for home view
  const featuredBestsellers = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);
  }, []);

  const featuredSuperSavers = useMemo(() => {
    return ALL_PRODUCTS.filter((p) => p.discountPercent >= 25).slice(0, 8);
  }, []);

  const handleCategorySelect = (catId: string | null) => {
    setActiveCategory(catId);
    setActiveSubCategory(null);
    setDisplayCount(36);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setDisplayCount(36);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setDisplayCount(36);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 36, filteredProducts.length));
  };

  const activeCategoryObj = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
        
        {/* Main Sticky Header */}
        <Header
          searchQuery={searchQuery}
          onSearchChange={(q) => {
            setSearchQuery(q);
            setDisplayCount(36);
          }}
          onResetSearch={handleResetSearch}
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Categories Rail */}
        <CategoryBar
          activeCategory={activeCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Sliding Marquee of Discounted Items in Upper Portion */}
        {!searchQuery && (
          <DiscountMarquee
            onQuickView={(product) => setQuickViewProduct(product)}
            onViewAllDiscounts={() => {
              setHighDiscountOnly(true);
              setActiveCategory(null);
            }}
          />
        )}

        {/* Promo Hero Banners on Home when no specific search/filter */}
        {!searchQuery && !activeCategory && (
          <PromoBanners onBannerClick={(cat) => handleCategorySelect(cat)} />
        )}

        {/* Flipkart-style Product Rolling Showcase with interactive controls */}
        {!searchQuery && !activeCategory && (
          <FlipkartProductRoll
            onQuickView={(product) => setQuickViewProduct(product)}
            onViewAllDiscounts={() => {
              setHighDiscountOnly(true);
              setActiveCategory(null);
            }}
          />
        )}

        {/* Filter and Sort Toolbar */}
        <FilterBar
          activeCategory={activeCategory}
          activeSubCategory={activeSubCategory}
          onSelectSubCategory={(sub) => {
            setActiveSubCategory(sub);
            setDisplayCount(36);
          }}
          vegOnly={vegOnly}
          onToggleVegOnly={() => setVegOnly(!vegOnly)}
          bestsellerOnly={bestsellerOnly}
          onToggleBestsellerOnly={() => setBestsellerOnly(!bestsellerOnly)}
          under99Only={under99Only}
          onToggleUnder99Only={() => setUnder99Only(!under99Only)}
          highDiscountOnly={highDiscountOnly}
          onToggleHighDiscountOnly={() => setHighDiscountOnly(!highDiscountOnly)}
          sortBy={sortBy}
          onSortChange={handleSortChange}
        />

        {/* Category Header Banner if category is chosen */}
        {activeCategoryObj && !searchQuery && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <span>Aisle</span>
                  <span>•</span>
                  <span>10 Mins Delivery</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black">{activeCategoryObj.name}</h1>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
                  Explore fresh arrivals, top-rated grocery brands, and bulk saver packs delivered right to your door.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Search Results Summary Banner if searching */}
        {searchQuery && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full">
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <Search className="w-5 h-5 text-slate-600" />
                <span className="text-sm font-bold text-slate-800">
                  Showing results for &ldquo;<strong className="text-slate-950">{searchQuery}</strong>&rdquo;
                </span>
              </div>
              <button
                onClick={handleResetSearch}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 underline cursor-pointer"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {/* Home Special Rails: Bestsellers & Super Savers (Shown on default Home view when recommended sort is active) */}
        {!searchQuery && !activeCategory && !vegOnly && !bestsellerOnly && !under99Only && !highDiscountOnly && sortBy === 'recommended' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full space-y-8">
            {/* 1. Trending Bestsellers Rail */}
            <section aria-labelledby="bestsellers-heading">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Flame className="w-4 h-4 fill-current" />
                  </div>
                  <div>
                    <h2 id="bestsellers-heading" className="text-base sm:text-lg font-black text-slate-900">
                      Trending Bestsellers in 10 Mins
                    </h2>
                    <p className="text-xs text-slate-500">Most ordered items in your neighborhood</p>
                  </div>
                </div>
                <button
                  onClick={() => setBestsellerOnly(true)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>See All</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
                {featuredBestsellers.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            </section>

            {/* 2. Super Savers Rail (>25% OFF) */}
            <section aria-labelledby="super-savers-heading">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 id="super-savers-heading" className="text-base sm:text-lg font-black text-slate-900">
                      Super Savers & Deals (≥25% OFF)
                    </h2>
                    <p className="text-xs text-slate-500">Maximum discounts on daily groceries</p>
                  </div>
                </div>
                <button
                  onClick={() => setHighDiscountOnly(true)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer"
                >
                  <span>See All Deals</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 sm:gap-4">
                {featuredSuperSavers.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickView={setQuickViewProduct}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Main Products Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base sm:text-xl font-black text-slate-900 flex flex-wrap items-center gap-2">
                <Layers className="w-5 h-5 text-slate-700" />
                <span>
                  {activeCategoryObj ? activeCategoryObj.name : 'All Groceries & Essentials'}
                </span>
                {sortBy !== 'recommended' && (
                  <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-md inline-flex items-center gap-1.5">
                    <span>
                      {sortBy === 'price-asc' && 'Price: Low to High'}
                      {sortBy === 'price-desc' && 'Price: High to Low'}
                      {sortBy === 'rating' && 'Top Rated'}
                      {sortBy === 'discount' && 'Biggest Discount'}
                    </span>
                    <button
                      onClick={() => handleSortChange('recommended')}
                      className="text-slate-500 hover:text-slate-900 font-black cursor-pointer text-xs ml-0.5"
                      title="Clear sort"
                    >
                      ✕
                    </button>
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Freshly packed and delivered straight from our temperature-controlled darkstore
              </p>
            </div>
          </div>

          {/* Product Cards Grid */}
          {visibleProducts.length > 0 ? (
            <div 
              id="products-grid"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
            >
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={setQuickViewProduct}
                />
              ))}
            </div>
          ) : (
            /* Empty state when no products match */
            <div className="bg-white rounded-2xl p-12 text-center max-w-md mx-auto border border-slate-200 shadow-xs my-8">
              <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-slate-900 mb-1">No products found</h3>
              <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                We couldn&apos;t find any items matching your search or filters. Try searching for milk, bread, chips, curd, or clearing active filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setVegOnly(false);
                  setBestsellerOnly(false);
                  setUnder99Only(false);
                  setHighDiscountOnly(false);
                  setActiveCategory(null);
                  setActiveSubCategory(null);
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Load More Products Button if not all displayed */}
          {visibleProducts.length < filteredProducts.length && (
            <div className="flex flex-col items-center justify-center mt-10">
              <button
                id="load-more-btn"
                onClick={handleLoadMore}
                className="bg-white hover:bg-slate-900 text-slate-900 hover:text-white font-bold text-xs px-6 py-2.5 rounded-xl border border-slate-300 hover:border-slate-900 shadow-2xs transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
              >
                <span>Load More Products</span>
                <ArrowDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>

        {/* Working Shopping Cart Drawer */}
        <CartDrawer />

        {/* Delivery Location Selector Modal */}
        <LocationModal />

        {/* Live Order Placed Tracking Modal */}
        <OrderPlacedModal />

        {/* Product Quick View Detail Modal */}
        <ProductQuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />

        {/* User Authentication Modal (Google / Guest Login) */}
        <AuthModal />

        {/* User Persistent Order History Modal */}
        <OrderHistoryModal />

        {/* Mobile Sticky Navigation & Floating Cart Bar */}
        <MobileBottomNav
          onGoHome={() => handleCategorySelect(null)}
          onOpenCategories={() => {
            window.scrollTo({ top: 120, behavior: 'smooth' });
          }}
          onFocusSearch={() => {
            const input = document.getElementById('search-input');
            if (input) {
              input.focus();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        />

        {/* Rich Footer with Metro info & Policies */}
        <Footer onSelectCategory={handleCategorySelect} />

      </div>
    </CartProvider>
  </AuthProvider>
  );
}
