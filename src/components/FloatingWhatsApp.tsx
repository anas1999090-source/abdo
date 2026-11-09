import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Zap, ShoppingBag } from 'lucide-react';
import { WHATSAPP_DISPLAY } from '../data/packData';
import { getWhatsAppInquiryUrl, getWhatsAppOrderUrl } from '../utils/whatsapp';
import { useCart } from '../context/CartContext';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);
  const { openCheckoutWithOffer, selectedOffer, setIsCartOpen, totalCount } = useCart();

  return (
    <>
      {/* Floating WhatsApp Bubble (Desktop & Mobile) */}
      <div className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 z-40 flex flex-col items-start gap-2">
        {/* Tooltip speech bubble */}
        {showTooltip && (
          <div className="bg-white text-stone-800 p-3.5 rounded-2xl shadow-xl border border-stone-200 text-right max-w-xs text-xs relative animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full flex items-center justify-center text-[10px]"
              aria-label="إغلاق التنبيه"
            >
              <X className="w-3 h-3" />
            </button>

            <div className="flex items-center gap-1.5 font-extrabold text-emerald-800 mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>مرحبا بيك في معشبة ريحاب! 🌿</span>
            </div>
            <p className="text-[11px] text-stone-600 leading-snug">
              بغيتي تسول على الباك أو تطلب مباشرة؟ تواصل معنا دابا فـ الواتساب على{' '}
              <strong className="text-stone-900 font-['Plus_Jakarta_Sans',sans-serif]">
                {WHATSAPP_DISPLAY}
              </strong>
            </p>
          </div>
        )}

        {/* WhatsApp Icon Button */}
        <a
          href={getWhatsAppInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group bg-[#25D366] hover:bg-[#1EBE5D] text-white p-3.5 sm:p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          aria-label="تواصل عبر الواتساب"
          title={`تواصل عبر الواتساب: ${WHATSAPP_DISPLAY}`}
        >
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-ping" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white" />
          <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-white" />
        </a>
      </div>

      {/* Sticky Bottom Bar for Mobile Conversion */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-stone-200 px-3 py-2 shadow-2xl flex items-center gap-2">
        {/* Cart Quick Trigger */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2.5 rounded-xl bg-stone-100 text-stone-700 shrink-0"
          aria-label="سلة التسوق"
        >
          <ShoppingBag className="w-5 h-5 text-emerald-800" />
          {totalCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] font-black flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>

        {/* WhatsApp Quick Button */}
        <a
          href={getWhatsAppOrderUrl({
            offerTitle: selectedOffer.arabicTitle,
            price: selectedOffer.price,
          })}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 shrink-0 shadow-xs"
        >
          <MessageCircle className="w-4 h-4 fill-white" />
          <span>واتساب</span>
        </a>

        {/* Primary Direct Order Button */}
        <button
          onClick={() => openCheckoutWithOffer(selectedOffer)}
          className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-800 text-white font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
        >
          <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
          <span>اطلب الآن ({selectedOffer.price} DH)</span>
        </button>
      </div>
    </>
  );
};
