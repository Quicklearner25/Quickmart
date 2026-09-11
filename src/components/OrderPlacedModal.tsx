import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Package, 
  Bike, 
  Home, 
  X, 
  MapPin, 
  Phone, 
  Star, 
  Clock, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderPlacedModal: React.FC = () => {
  const { activeOrder, dismissActiveOrder } = useCart();
  const [step, setStep] = useState<number>(2); // 1: Placed, 2: Packing, 3: On The Way, 4: Delivered
  const [secondsLeft, setSecondsLeft] = useState<number>(540); // 9 minutes = 540 seconds
  const [callingStatus, setCallingStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!activeOrder) return;

    // Simulate countdown and step progression
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    const stepTimer = setTimeout(() => {
      setStep(3); // Transition to "On the way"
    }, 6000);

    return () => {
      clearInterval(timer);
      clearTimeout(stepTimer);
    };
  }, [activeOrder]);

  if (!activeOrder) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-300">
      <div 
        id="order-success-modal"
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-orange-100 flex flex-col max-h-[90vh]"
      >
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white p-6 text-center relative">
          <button
            onClick={dismissActiveOrder}
            className="absolute right-4 top-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>

          <span className="inline-block bg-white/20 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mb-1">
            Order Confirmed #{activeOrder.orderId}
          </span>
          <h2 className="text-xl sm:text-2xl font-black">
            Arriving in {minutes}:{seconds < 10 ? `0${seconds}` : seconds} mins! ⚡
          </h2>
          <p className="text-xs text-orange-100 mt-1">
            Delivering to {activeOrder.location.tag} ({activeOrder.location.address.slice(0, 32)}...)
          </p>
        </div>

        {/* Live Tracking Timeline */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Progress Bar & Steps */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-slate-200/80">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
              Live Order Status
            </span>

            <div className="space-y-4">
              {/* Step 1: Placed */}
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Order Placed & Payment Received</div>
                  <div className="text-[11px] text-slate-500">Instant darkstore dispatch initiated</div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Done</span>
              </div>

              {/* Step 2: Packing */}
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  step >= 2 ? 'bg-orange-600 text-white' : 'bg-slate-200 text-slate-500'
                }`}>
                  <Package className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Packed with Quality Check</div>
                  <div className="text-[11px] text-slate-500">Inspected for fresh and undamaged items</div>
                </div>
                {step === 2 && (
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.2 rounded animate-pulse">Packing</span>
                )}
                {step > 2 && (
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">Done</span>
                )}
              </div>

              {/* Step 3: Out for Delivery */}
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                  step >= 3 ? 'bg-orange-600 text-white animate-bounce' : 'bg-slate-200 text-slate-500'
                }`}>
                  <Bike className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Rider on the way</div>
                  <div className="text-[11px] text-slate-500">Ramesh Kumar is speeding to your location</div>
                </div>
                {step >= 3 ? (
                  <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-1.5 py-0.2 rounded">In Transit</span>
                ) : (
                  <span className="text-[10px] font-medium text-slate-400">Next</span>
                )}
              </div>

              {/* Step 4: Delivered */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold text-slate-900">Doorstep Delivery</div>
                  <div className="text-[11px] text-slate-500">{activeOrder.deliveryInstruction}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Hero Info */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center font-black text-orange-700 text-sm">
                RK
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <span>Ramesh Kumar</span>
                  <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-1 rounded flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-current" /> 4.9
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">Vaccinated & verified Quickmart Hero</p>
              </div>
            </div>

            <button 
              onClick={() => {
                setCallingStatus('Connecting via number-masked secure line (+91 98765 43210)...');
                setTimeout(() => setCallingStatus(null), 4000);
              }}
              className="p-2 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold text-xs flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Phone className="w-3.5 h-3.5" /> Call
            </button>
          </div>

          {callingStatus && (
            <div className="p-2.5 rounded-xl bg-orange-100 border border-orange-200 text-orange-900 text-xs font-medium flex items-center justify-between animate-in fade-in">
              <span>{callingStatus}</span>
              <button onClick={() => setCallingStatus(null)} className="text-orange-700 font-bold ml-2">Dismiss</button>
            </div>
          )}

          {/* Payment Details */}
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-xs">
            <div className="flex items-center justify-between font-bold text-emerald-900">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{activeOrder.paymentMethod}</span>
              </span>
              <span className="uppercase text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-800">
                {activeOrder.paymentStatus === 'paid' ? 'Payment Verified' : 'Payment Pending'}
              </span>
            </div>
            {activeOrder.razorpayPaymentId && (
              <div className="text-[11px] text-emerald-700 mt-1 flex items-center justify-between">
                <span>Razorpay ID:</span>
                <span className="font-mono font-bold">{activeOrder.razorpayPaymentId}</span>
              </div>
            )}
          </div>

          {/* Order Items Breakdown */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Items in this order ({activeOrder.items.length})
            </span>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {activeOrder.items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                  <div className="flex items-center gap-2 truncate">
                    <span className="font-bold text-orange-600">{quantity}x</span>
                    <span className="truncate text-slate-800">{product.name}</span>
                  </div>
                  <span className="font-bold text-slate-900 shrink-0">₹{product.price * quantity}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200 flex justify-between items-center text-xs">
              <span className="font-bold text-slate-600">Total Paid (Incl. taxes & fee)</span>
              <span className="text-sm font-black text-slate-900">₹{activeOrder.total}</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="p-4 border-t border-slate-100 bg-stone-50">
          <button
            id="continue-shopping-btn"
            onClick={dismissActiveOrder}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Continue Browsing Groceries
          </button>
        </div>
      </div>
    </div>
  );
};
