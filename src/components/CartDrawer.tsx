import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  Zap, 
  Tag, 
  Check, 
  ArrowRight, 
  HeartHandshake, 
  AlertCircle,
  Truck,
  Sparkles,
  MapPin,
  Edit2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { AVAILABLE_COUPONS } from '../data/products';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    clearCart,
    totalItemsCount,
    itemTotal,
    originalTotal,
    deliveryFee,
    handlingFee,
    deliveryTip,
    setDeliveryTip,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    grandTotal,
    totalSavings,
    selectedLocation,
    setIsLocationModalOpen,
    deliveryInstruction,
    setDeliveryInstruction,
    placeOrder,
    freeDeliveryThreshold,
    amountNeededForFreeDelivery,
    isProcessingOrder,
    isCloudSyncing,
    checkoutError,
    clearCheckoutError
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success?: boolean; text: string } | null>(null);

  if (!isCartOpen) return null;

  const tipOptions = [0, 10, 20, 30, 50];
  const instructionsList = [
    'Leave at door',
    'Do not ring bell',
    'Avoid calling',
    'Leave with security'
  ];

  const handleApplyCoupon = (code: string) => {
    const result = applyCoupon(code);
    setCouponFeedback({ success: result.success, text: result.message });
    if (result.success) {
      setCouponInput('');
    }
  };

  const handleManualApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    handleApplyCoupon(couponInput);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          id="cart-drawer-panel"
          className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full border-l border-slate-200"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900">
                  My Cart ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
                </h2>
                <p className="text-xs font-medium text-slate-500 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-orange-600 fill-current" />
                  Delivery to <strong className="text-slate-700">{selectedLocation.tag}</strong> in {selectedLocation.eta}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  id="clear-cart-btn"
                  onClick={clearCart}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                  title="Empty cart"
                >
                  Clear
                </button>
              )}
              <button
                id="close-cart-btn"
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          {cart.length === 0 ? (
            /* Empty state */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 rounded-full bg-orange-50 text-orange-400 flex items-center justify-center mb-4">
                <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">Your cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs mb-6">
                Explore thousands of grocery essentials, fresh farm veggies, snacks and dairy items delivered in 10 minutes!
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer uppercase tracking-wider"
              >
                Start Shopping Now
              </button>
            </div>
          ) : (
            /* Non-empty cart */
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              
              {/* Free Delivery Bar */}
              <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-3">
                {amountNeededForFreeDelivery > 0 ? (
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1.5">
                      <span className="flex items-center gap-1.5 text-orange-800">
                        <Truck className="w-4 h-4 text-orange-600" />
                        Add ₹{amountNeededForFreeDelivery} more for FREE delivery
                      </span>
                      <span className="text-orange-700">₹{itemTotal}/₹{freeDeliveryThreshold}</span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-orange-600 h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(100, (itemTotal / freeDeliveryThreshold) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <Check className="w-4 h-4 bg-emerald-600 text-white rounded-full p-0.5" />
                    <span>You've unlocked FREE 10-minute delivery! ⚡</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
                  Review Items ({cart.length})
                </span>

                {cart.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    id={`cart-item-${product.id}`}
                    className="flex items-center gap-3 p-3 bg-stone-50/80 rounded-xl border border-slate-100 hover:border-orange-200 transition-colors"
                  >
                    {/* Thumbnail */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-lg bg-white shrink-0 border border-slate-200"
                    />

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate" title={product.name}>
                        {product.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 block">{product.packSize}</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-xs font-extrabold text-slate-900">
                          ₹{product.price * quantity}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{product.originalPrice * quantity}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center bg-slate-900 text-white rounded-lg shadow-2xs overflow-hidden border border-slate-900 shrink-0">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1 px-2 hover:bg-slate-800 active:bg-slate-750 transition-colors cursor-pointer"
                        title="Remove one"
                      >
                        {quantity === 1 ? (
                          <Trash2 className="w-3 h-3" />
                        ) : (
                          <Minus className="w-3 h-3 stroke-[3]" />
                        )}
                      </button>
                      <span className="px-2 font-black text-xs min-w-[20px] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="p-1 px-2 hover:bg-slate-800 active:bg-slate-750 transition-colors cursor-pointer"
                        title="Add one more"
                      >
                        <Plus className="w-3 h-3 stroke-[3]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Instructions */}
              <div>
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider block mb-2">
                  Delivery Instruction
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {instructionsList.map((instruction) => {
                    const isSelected = deliveryInstruction === instruction;
                    return (
                      <button
                        key={instruction}
                        type="button"
                        onClick={() => setDeliveryInstruction(instruction)}
                        className={`text-xs p-2 rounded-xl text-left border font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white font-bold'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {instruction}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Delivery Partner Tip */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <HeartHandshake className="w-3.5 h-3.5 text-slate-700" /> Tip your delivery partner
                  </span>
                  {deliveryTip > 0 && (
                    <span className="text-xs font-bold text-slate-900">+₹{deliveryTip}</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mb-2">
                  100% of the tip goes directly to your delivery hero
                </p>
                <div className="flex gap-2">
                  {tipOptions.map((tip) => (
                    <button
                      key={tip}
                      type="button"
                      onClick={() => setDeliveryTip(tip)}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors cursor-pointer ${
                        deliveryTip === tip
                          ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {tip === 0 ? 'None' : `₹${tip}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Coupons Section */}
              <div className="bg-stone-50 rounded-xl p-3.5 border border-slate-200">
                <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 mb-2">
                  <Tag className="w-3.5 h-3.5 text-orange-600" /> Apply Coupon & Save
                </span>

                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs">
                    <div>
                      <span className="font-extrabold text-emerald-800 tracking-wider">
                        '{appliedCoupon.code}' APPLIED
                      </span>
                      <p className="text-[11px] text-emerald-700 font-medium">
                        {appliedCoupon.description}
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs font-bold text-rose-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div>
                    <form onSubmit={handleManualApply} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="Enter Promo Code"
                        className="flex-1 bg-white text-xs px-3 py-2 rounded-lg border border-slate-200 uppercase font-bold tracking-wider outline-none focus:border-orange-500"
                      />
                      <button
                        type="submit"
                        className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer transition-colors"
                      >
                        Apply
                      </button>
                    </form>

                    {couponFeedback && (
                      <p
                        className={`text-xs font-semibold mb-2 ${
                          couponFeedback.success ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {couponFeedback.text}
                      </p>
                    )}

                    <div className="space-y-1.5 mt-2">
                      {AVAILABLE_COUPONS.map((coupon) => (
                        <div
                          key={coupon.code}
                          className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 text-xs"
                        >
                          <div>
                            <span className="font-black text-orange-600 tracking-wider">
                              {coupon.code}
                            </span>
                            <p className="text-[10px] text-slate-500">{coupon.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleApplyCoupon(coupon.code)}
                            className="text-xs font-bold text-orange-600 hover:text-orange-700 px-2 py-1 rounded bg-orange-50 hover:bg-orange-100 cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bill Details */}
              <div className="bg-stone-50 rounded-xl p-4 border border-slate-200 space-y-2 text-xs">
                <span className="font-extrabold text-slate-800 uppercase tracking-wider block mb-1">
                  Bill Summary
                </span>

                <div className="flex justify-between text-slate-600">
                  <span>Item Total</span>
                  <span>₹{itemTotal}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-1">
                    Delivery Partner Fee
                    {deliveryFee === 0 && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1 rounded">FREE</span>
                    )}
                  </span>
                  <span>{deliveryFee === 0 ? <span className="line-through text-slate-400">₹25</span> : `₹${deliveryFee}`}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Govt. Taxes & Handling Fee</span>
                  <span>₹{handlingFee}</span>
                </div>

                {deliveryTip > 0 && (
                  <div className="flex justify-between text-slate-600">
                    <span>Delivery Partner Tip</span>
                    <span>₹{deliveryTip}</span>
                  </div>
                )}

                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Coupon Savings ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discountType === 'flat' ? appliedCoupon.discountValue : Math.round((itemTotal * appliedCoupon.discountValue) / 100)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-black text-slate-900">
                  <span>To Pay</span>
                  <span className="text-base text-orange-600">₹{grandTotal}</span>
                </div>

                {totalSavings > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold p-2 rounded-lg flex items-center gap-1.5 mt-2">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Yay! You save a total of ₹{totalSavings} on this order!</span>
                  </div>
                )}
              </div>

              {/* Delivery Address Review & Modify Card */}
              <div className="bg-orange-50/60 border border-orange-200/90 rounded-xl p-3 flex items-start justify-between gap-2.5">
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-orange-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-slate-900">Delivering to {selectedLocation.tag}</span>
                      <span className="text-[10px] font-black text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                        {selectedLocation.eta}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2 leading-relaxed">
                      {selectedLocation.address}, {selectedLocation.city} - {selectedLocation.pincode}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLocationModalOpen(true)}
                  className="text-xs font-bold text-orange-700 hover:text-orange-800 bg-white hover:bg-orange-100/60 border border-orange-200 px-2.5 py-1.5 rounded-lg shrink-0 transition-colors cursor-pointer flex items-center gap-1 shadow-2xs"
                  title="Modify delivery address"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Modify</span>
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="text-xs font-bold text-slate-800 mb-2">Payment Method</div>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      paymentMethod === 'upi'
                        ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    UPI / QR
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Cards / NetBanking
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`py-2 px-2 text-center rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'bg-orange-600 text-white border-orange-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    Cash on Delivery
                  </button>
                </div>
              </div>

              {/* Cancellation policy note */}
              <div className="text-[11px] text-slate-400 flex items-start gap-1.5 px-1">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Orders cannot be cancelled once packed by darkstore. Instant delivery within {selectedLocation.eta}.</span>
              </div>
            </div>
          )}

          {/* Footer with Place Order Button */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-white space-y-3">
              {checkoutError && (
                <div
                  id="checkout-error-banner"
                  className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start justify-between gap-2 animate-in fade-in"
                >
                  <div className="flex items-start gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{checkoutError}</span>
                  </div>
                  <button
                    type="button"
                    onClick={clearCheckoutError}
                    className="text-rose-500 hover:text-rose-800 p-0.5 rounded cursor-pointer"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <button
                id="place-order-btn"
                onClick={() => {
                  const methodStr = paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'card' ? 'Debit/Credit Card' : 'UPI Payment';
                  placeOrder(methodStr);
                }}
                disabled={isProcessingOrder}
                className="w-full bg-slate-900 hover:bg-slate-800 active:scale-[0.99] disabled:opacity-60 text-white font-black py-3.5 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-between cursor-pointer border border-slate-800"
              >
                <div className="text-left leading-tight">
                  <div className="text-xs text-slate-400 font-medium">TOTAL TO PAY</div>
                  <div className="text-base font-black">₹{grandTotal}</div>
                </div>
                <div className="flex items-center gap-1.5 font-black text-sm uppercase tracking-wider">
                  {isProcessingOrder ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Securing Order...
                    </span>
                  ) : (
                    <>
                      <span>Place Order</span>
                      <ArrowRight className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
