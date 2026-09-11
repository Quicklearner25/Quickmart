import React from 'react';
import { X, Star, Zap, ShieldCheck, Plus, Minus, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
}) => {
  const { addToCart, removeFromCart, getItemQuantity } = useCart();

  if (!product) return null;

  const quantity = getItemQuantity(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="quick-view-modal"
        className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden border border-slate-200 flex flex-col md:flex-row"
      >
        {/* Left: Product Image */}
        <div className="relative w-full md:w-1/2 bg-stone-50 p-6 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-h-72 object-cover rounded-2xl shadow-sm"
          />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
            {product.discountPercent > 0 && (
              <span className="bg-orange-600 text-white text-xs font-black px-2 py-0.5 rounded-lg shadow-xs uppercase">
                {product.discountPercent}% OFF
              </span>
            )}
            {product.isOrganic && (
              <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                Certified Organic
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-xs text-xs font-black text-slate-800 px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-sm border border-slate-100">
            <Zap className="w-3.5 h-3.5 text-orange-600 fill-current" />
            <span>Delivering in {product.deliveryTime}</span>
          </div>
        </div>

        {/* Right: Details & Action */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div>
            {/* Top close button */}
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-black text-orange-600 uppercase tracking-wider">
                {product.brand}
              </span>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Title */}
            <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
              {product.name}
            </h2>

            {/* Pack size & Ratings */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="font-semibold text-slate-600 bg-stone-100 px-2 py-1 rounded-md">
                {product.packSize}
              </span>

              <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                <Star className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.ratingCount})</span>
              </div>

              <div
                title={product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                className={`w-4 h-4 border flex items-center justify-center p-0.5 rounded-xs shrink-0 ${
                  product.isVeg ? 'border-emerald-600' : 'border-amber-800'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.isVeg ? 'bg-emerald-600' : 'bg-amber-800'
                  }`}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-slate-100">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-slate-400 line-through">
                    MRP ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice > product.price && (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                    Save ₹{product.originalPrice - product.price}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Inclusive of all taxes</p>
            </div>

            {/* Description */}
            <div className="mt-4 space-y-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Product Details
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Trust highlights */}
            <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Quality Assured</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-orange-600" />
                <span>Cold Chain Packed</span>
              </div>
            </div>
          </div>

          {/* Add to Cart CTA */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            {quantity === 0 ? (
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-extrabold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-sm"
              >
                <span>Add To Cart</span>
                <Plus className="w-4 h-4 stroke-[3]" />
              </button>
            ) : (
              <div className="flex items-center justify-between bg-orange-50 border border-orange-200 p-2 rounded-xl">
                <span className="text-xs font-bold text-orange-900 pl-2">In Your Cart:</span>
                <div className="flex items-center bg-orange-600 text-white rounded-lg shadow-xs overflow-hidden">
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    <Minus className="w-4 h-4 stroke-[3]" />
                  </button>
                  <span className="px-4 font-black text-sm">{quantity}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="p-2 hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
