import React from 'react';
import { X, Clock, PackageCheck, RotateCcw, ChevronRight, CheckCircle2, ShoppingBag, MapPin, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { OrderDetails } from '../types';

export const OrderHistoryModal: React.FC = () => {
  const { isOrderHistoryOpen, setIsOrderHistoryOpen } = useAuth();
  const { orderHistory, reorderItems, setActiveOrder } = useCart();

  if (!isOrderHistoryOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-extrabold">Your Order History</h3>
                <span className="bg-amber-400 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> Firestore
                </span>
              </div>
              <p className="text-xs text-orange-100">
                {orderHistory.length} orders securely saved in the cloud database
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 overflow-y-auto flex-1 divide-y divide-slate-100">
          {orderHistory.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 bg-orange-50 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">No previous orders yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Your completed grocery orders will be permanently backed up to Firebase Firestore and displayed here.
              </p>
            </div>
          ) : (
            orderHistory.map((order: OrderDetails) => {
              const formattedDate = new Date(order.placedAt).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div key={order.orderId} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-slate-900">
                          {order.orderId}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> Delivered
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{formattedDate}</span>
                        <span>•</span>
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{order.location.tag} ({order.location.city})</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-base font-extrabold text-slate-900">
                        ₹{order.total}
                      </span>
                      {order.savings > 0 && (
                        <p className="text-[11px] font-semibold text-emerald-600">
                          Saved ₹{order.savings}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Item thumbnail previews */}
                  <div className="flex items-center gap-2 my-2.5 overflow-x-auto no-scrollbar py-1">
                    {order.items.slice(0, 5).map((item, idx) => (
                      <div
                        key={idx}
                        className="relative shrink-0 w-12 h-12 bg-slate-50 rounded-lg border border-slate-200 overflow-hidden"
                        title={`${item.product.name} (Qty: ${item.quantity})`}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 right-0 bg-slate-900/80 text-white text-[9px] font-bold px-1 rounded-tl-sm">
                          ×{item.quantity}
                        </span>
                      </div>
                    ))}
                    {order.items.length > 5 && (
                      <div className="shrink-0 w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                        +{order.items.length - 5}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        setActiveOrder(order);
                        setIsOrderHistoryOpen(false);
                      }}
                      className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Track Order & Invoice</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        reorderItems(order);
                        setIsOrderHistoryOpen(false);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Re-order Items</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
