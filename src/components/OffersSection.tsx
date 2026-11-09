import React from 'react';
import { PACK_OFFERS, MAIN_PACK_IMAGE } from '../data/packData';
import { useCart } from '../context/CartContext';
import { Check, Sparkles, Gift, Zap, MessageCircle, Truck } from 'lucide-react';
import { getWhatsAppOrderUrl } from '../utils/whatsapp';

export const OffersSection: React.FC = () => {
  const { openCheckoutWithOffer, selectedOffer, setSelectedOffer } = useCart();

  return (
    <section id="offers" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3.5 py-1.5 rounded-full mb-3">
            <Gift className="w-3.5 h-3.5 text-emerald-700" />
            <span>باقات التوفير الحصرية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            اختر الباك المناسب لك مع <span className="text-emerald-700">توصيل مجاني وهدايا</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            الدفع نقداً بعد استلام الطرد وتفقده في أي مكان بالمغرب. لا تدفع أي درهم مسبقاً!
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {PACK_OFFERS.map((offer) => {
            const isSelected = selectedOffer.id === offer.id;
            return (
              <div
                key={offer.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 text-right ${
                  offer.popular
                    ? 'bg-gradient-to-b from-emerald-50/80 via-white to-stone-50 border-2 border-emerald-600 shadow-xl ring-4 ring-emerald-500/10 md:-translate-y-2'
                    : 'bg-stone-50/70 border border-stone-200 hover:border-stone-300 hover:shadow-lg'
                }`}
              >
                {/* Badges */}
                {offer.popular && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black text-xs px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>العرض الأكثر طلباً ومبيعاً 🔥</span>
                  </div>
                )}
                {offer.bestValue && (
                  <div className="absolute -top-3.5 right-1/2 translate-x-1/2 bg-teal-800 text-white font-black text-xs px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-amber-300" />
                    <span>أعلى نسبة توفير + هدية 🎁</span>
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                      {offer.badge || 'تخفيض حصري'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-stone-900 mt-2">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 mt-1">{offer.subtitle}</p>
                  </div>

                  {/* Price Block */}
                  <div className="py-4 my-2 border-y border-stone-200/80 flex items-baseline justify-between">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl sm:text-4xl font-black text-emerald-800 font-['Plus_Jakarta_Sans',sans-serif]">
                          {offer.price}
                        </span>
                        <span className="text-sm font-bold text-stone-900">درهم</span>
                      </div>
                      <span className="text-xs text-stone-400 line-through">
                        {offer.originalPrice} درهم
                      </span>
                    </div>

                    <div className="text-left bg-emerald-100 text-emerald-950 text-xs font-black px-2.5 py-1.5 rounded-xl">
                      وفر {offer.savings} درهم
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="flex flex-col gap-2.5 text-xs sm:text-sm text-stone-700 font-semibold my-4">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{offer.quantity}x باك كامل بمحتوياته الثلاثة</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-emerald-800 font-bold">توصيل مجاني وسريع لباب منزلك</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>الدفع نقداً بعد استلام الطرد وتفقده</span>
                    </li>
                    {offer.gift && (
                      <li className="flex items-start gap-2 bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-amber-950 text-xs font-bold">
                        <Gift className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>هدية خاصة: {offer.gift}</span>
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTAs */}
                <div className="flex flex-col gap-2.5 mt-6 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => {
                      setSelectedOffer(offer);
                      openCheckoutWithOffer(offer);
                    }}
                    className={`w-full py-3.5 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer ${
                      offer.popular
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white'
                        : 'bg-emerald-800 hover:bg-emerald-900 text-white'
                    }`}
                  >
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>طلب هذا العرض ({offer.price} DH)</span>
                  </button>

                  <a
                    href={getWhatsAppOrderUrl({
                      offerTitle: offer.arabicTitle,
                      price: offer.price,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-emerald-300 bg-white hover:bg-emerald-50 text-emerald-800 transition-colors text-center"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>طلب هذا العرض عبر الواتساب</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
