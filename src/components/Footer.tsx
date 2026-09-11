import React from 'react';
import { Zap, ShieldCheck, Clock, Headphones, Award, Heart } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { Logo } from './Logo';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 pb-24 md:pb-12 text-slate-600 text-xs">
      {/* Feature highlights bar */}
      <div className="border-b border-slate-100 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">10-Minute Delivery</h4>
                <p className="text-[11px] text-slate-500">From our nearest pod directly to your door</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Super Quality Checked</h4>
                <p className="text-[11px] text-slate-500">Fresh farm produce & authentic branded goods</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Best Prices & Offers</h4>
                <p className="text-[11px] text-slate-500">Big savings with direct farmer and brand tie-ups</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">24x7 Priority Support</h4>
                <p className="text-[11px] text-slate-500">Instant resolution & no-questions-asked refunds</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <Logo size="md" />
            <p className="text-xs text-slate-500 leading-relaxed">
              India's premier quick commerce grocery experience. Delivering over 1,000+ daily essentials, farm-fresh vegetables, dairy, snacks, and household cleaning products in 10 minutes.
            </p>
            <div className="flex items-center gap-2 pt-1 text-slate-400">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="font-semibold text-slate-700">Open 6:00 AM – 2:00 AM Daily</span>
            </div>
          </div>

          {/* Categories 1 */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">Popular Aisles</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-orange-600 transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories 2 */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">More Aisles</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-orange-600 transition-colors text-left cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Available Cities */}
          <div>
            <h4 className="font-bold text-slate-900 text-sm mb-3">Cities We Deliver To</h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              Bengaluru • Mumbai • Delhi NCR • Hyderabad • Chennai • Pune • Kolkata • Ahmedabad • Chandigarh • Jaipur
            </p>
            <div className="bg-stone-50 p-3 rounded-xl border border-slate-200">
              <span className="font-bold text-slate-800 text-[11px] block">Payment Methods Supported:</span>
              <p className="text-[10px] text-slate-500 mt-1">
                UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards, Net Banking, and Cash on Delivery.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} Quickmart Grocery Store. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-slate-500">
            <span>Built with React & Tailwind CSS for instant lightning delivery</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>
      </div>
    </footer>
  );
};
