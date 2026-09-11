import React, { useState } from 'react';
import { Plus, Minus, Star, Zap, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const [imgError, setImgError] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 800);
  };

  const handleSubtract = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeFromCart(product.id);
  };

  // Safe fallback image for grocery item if network image fails
  const fallbackImage = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=80';

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative bg-white rounded-xl border border-slate-200/90 hover:border-slate-400 p-3 sm:p-3.5 flex flex-col justify-between transition-all duration-200 hover:shadow-md"
    >
      {/* Top badges bar */}
      <div className="flex items-start justify-between gap-1 mb-2">
        {/* Discount Badge */}
        {product.discountPercent > 0 ? (
          <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded-md tracking-tight">
            {product.discountPercent}% OFF
          </span>
        ) : (
          <span />
        )}

        {/* Veg / Non-Veg Indicator & Quick View */}
        <div className="flex items-center gap-1.5">
          {onQuickView && (
            <button
              onClick={() => onQuickView(product)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer"
              title="Quick preview"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Veg / Non-veg mark */}
          <div
            title={product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
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

      {/* Product Image with Hover Zoom */}
      <div 
        onClick={() => onQuickView && onQuickView(product)}
        className="relative w-full aspect-square mb-2.5 rounded-lg bg-slate-50 overflow-hidden cursor-pointer flex items-center justify-center border border-slate-100"
      >
        <img
          src={imgError ? fallbackImage : product.image}
          alt={product.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* ETA overlay */}
        <div className="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-1.5 py-0.5 rounded-md flex items-center gap-0.5 shadow-2xs border border-slate-200/80">
          <Zap className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
          <span>{product.deliveryTime}</span>
        </div>

        {/* Organic / Bestseller banner */}
        {product.isOrganic && (
          <span className="absolute top-1.5 right-1.5 bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-xs">
            Organic
          </span>
        )}
        {!product.isOrganic && product.isBestseller && (
          <span className="absolute top-1.5 right-1.5 bg-slate-900 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm shadow-xs">
            Bestseller
          </span>
        )}
      </div>

      {/* Product Content Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand */}
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block truncate">
            {product.brand}
          </span>

          {/* Title */}
          <h3 
            onClick={() => onQuickView && onQuickView(product)}
            className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 hover:text-slate-700 transition-colors cursor-pointer leading-snug mt-0.5 min-h-[2.5rem]"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Pack size & Rating */}
          <div className="flex items-center justify-between mt-1 text-slate-500 text-xs">
            <span className="text-[11px] font-medium text-slate-500">{product.packSize}</span>
            <div className="flex items-center gap-0.5 bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded-md font-bold text-[10px] border border-slate-200/60">
              <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
            </div>
          </div>
        </div>

        {/* Bottom Price & Add to Cart section */}
        <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          {/* Price Block */}
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-sm sm:text-base font-black text-slate-900">
                ₹{product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-[11px] text-slate-400 line-through font-medium">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.originalPrice > product.price && (
              <span className="text-[9px] font-bold text-emerald-700">
                Save ₹{product.originalPrice - product.price}
              </span>
            )}
          </div>

          {/* Quantity Control Button */}
          <div className="shrink-0">
            {quantity === 0 ? (
              <button
                id={`add-btn-${product.id}`}
                onClick={handleAdd}
                className="bg-white hover:bg-slate-900 text-slate-900 hover:text-white border border-slate-300 hover:border-slate-900 font-extrabold text-xs px-3 sm:px-3.5 py-1.5 rounded-lg transition-all active:scale-95 shadow-2xs cursor-pointer flex items-center gap-1 uppercase tracking-wider"
              >
                <span>ADD</span>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
              </button>
            ) : (
              <div 
                id={`qty-stepper-${product.id}`}
                className="flex items-center bg-slate-900 text-white rounded-lg shadow-xs overflow-hidden border border-slate-900"
              >
                <button
                  onClick={handleSubtract}
                  className="px-2 py-1.5 hover:bg-slate-800 active:bg-slate-700 transition-colors cursor-pointer"
                  title="Remove one"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                </button>
                <span className="px-2 font-black text-xs min-w-[20px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleAdd}
                  className="px-2 py-1.5 hover:bg-slate-800 active:bg-slate-700 transition-colors cursor-pointer"
                  title="Add one more"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
