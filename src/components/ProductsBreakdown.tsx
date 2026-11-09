import React, { useState } from 'react';
import {
  PACK_PRODUCTS,
  MAIN_PACK_IMAGE,
  INGREDIENTS_IMAGE,
  ROUTINE_IMAGE,
  WHATSAPP_DISPLAY,
} from '../data/packData';
import {
  Sparkles,
  Droplets,
  CheckCircle2,
  HelpCircle,
  Clock,
  ShieldCheck,
  Leaf,
  MessageCircle,
  Plus,
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export const ProductsBreakdown: React.FC = () => {
  const [selectedProductId, setSelectedProductId] = useState<string>(PACK_PRODUCTS[0].id);
  const { addToCart, openCheckoutWithOffer } = useCart();

  const currentProduct = PACK_PRODUCTS.find((p) => p.id === selectedProductId) || PACK_PRODUCTS[0];

  return (
    <section id="products" className="py-16 bg-white border-y border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3.5 py-1.5 rounded-full mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-700" />
            <span>تفاصيل مكونات الباك الثلاثة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            كل منتوج ولاش كيصلح؟ <span className="text-emerald-700">تكامل ثلاثي لنتائج حقيقية</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            تم تصميم كل عنصر في باك فيتاكر بعناية فائقة ليعالج سبباً محدداً من أسباب تساقط وتلف الشعر، ليعمل الثلاثي معاً بتناغم تام.
          </p>
        </div>

        {/* Product Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
          {PACK_PRODUCTS.map((prod, idx) => {
            const isSelected = prod.id === selectedProductId;
            return (
              <button
                key={prod.id}
                onClick={() => setSelectedProductId(prod.id)}
                className={`p-4 rounded-2xl border-2 text-right transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'border-emerald-600 bg-emerald-50/60 shadow-md ring-2 ring-emerald-500/10'
                    : 'border-stone-200 bg-stone-50/60 hover:bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-stone-200 text-stone-700'
                    }`}
                  >
                    0{idx + 1}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-stone-900 line-clamp-1">
                      {prod.arabicName}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-1">{prod.volume} • {prod.badge}</p>
                  </div>
                </div>

                <div
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    isSelected ? 'bg-emerald-600 ring-4 ring-emerald-200' : 'bg-transparent'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Detailed Product Card */}
        <div className="bg-stone-50 rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="aspect-[4/4] rounded-2xl overflow-hidden bg-white border border-stone-200 relative shadow-inner flex items-center justify-center">
                <img
                  src={currentProduct.image}
                  alt={currentProduct.arabicName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-emerald-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                  {currentProduct.volume}
                </div>
                <div className="absolute bottom-3 right-3 left-3 bg-white/95 backdrop-blur-sm p-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-800 shadow-sm flex items-center justify-between">
                  <span>{currentProduct.badge}</span>
                  <span className="text-emerald-700">تركيبة مركزة 100%</span>
                </div>
              </div>

              {/* Quick WhatsApp Inquiry for this product */}
              <a
                href={getWhatsAppInquiryUrl(currentProduct.arabicName)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 py-2.5 px-4 rounded-xl text-xs font-bold transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>استفسر عن {currentProduct.arabicName} بالواتساب</span>
              </a>
            </div>

            {/* Information Column */}
            <div className="lg:col-span-7 flex flex-col gap-5 text-right">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-md">
                  {currentProduct.name}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 mt-2">
                  {currentProduct.arabicName}
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-emerald-900 mt-1">
                  {currentProduct.subtitle}
                </p>
                <p className="text-sm text-stone-600 leading-relaxed mt-2.5">
                  {currentProduct.shortDesc}
                </p>
              </div>

              {/* Box 1: For Whom (لمن يصلح؟) */}
              <div className="bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs">
                <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm mb-1.5">
                  <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>لمن يصلح هذا المنتوج؟</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
                  {currentProduct.forWhom}
                </p>
              </div>

              {/* Box 2: Key Benefits (الفوائد والمزايا) */}
              <div>
                <h4 className="text-sm font-extrabold text-stone-900 mb-2.5 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>الفوائد والمزايا العلاجية:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 font-semibold">
                  {currentProduct.benefits.map((benefit, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 bg-white p-2.5 rounded-xl border border-stone-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Box 3: Active Natural Ingredients (المكونات الفعالة) */}
              <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-2 text-emerald-950 font-extrabold text-xs sm:text-sm mb-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>المكونات الطبيعية الفعالة:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentProduct.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="bg-white text-emerald-900 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs"
                    >
                      🌱 {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* How to use info */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2 text-xs">
                <div className="flex-1 bg-white p-3 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-500 block mb-1">طريقة الاستعمال:</span>
                  <span className="text-stone-800 font-medium">{currentProduct.howToUse}</span>
                </div>
                <div className="sm:w-44 bg-white p-3 rounded-xl border border-stone-200">
                  <span className="font-bold text-stone-500 block mb-1">التكرار الموصى به:</span>
                  <span className="text-emerald-800 font-bold">{currentProduct.frequency}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Full Product Cards Grid for complete overview */}
        <div className="mt-14 pt-10 border-t border-stone-200">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              ملخص سريع للمنتوجات الثلاثة داخل الباك
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              تحصل على المنتوجات الثلاثة معاً في علبة أنيقة بسعر خاص وتوصيل بالمجان
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACK_PRODUCTS.map((prod, idx) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-stone-200 p-5 flex flex-col justify-between gap-4 shadow-xs hover:shadow-md transition-shadow text-right"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                      منتوج رقم {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-stone-500">{prod.volume}</span>
                  </div>
                  <h4 className="font-black text-base text-stone-900 mb-1">{prod.arabicName}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-3">{prod.shortDesc}</p>

                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-100 text-xs text-stone-700">
                    <strong className="text-stone-900 block mb-1">لمن يصلح:</strong>
                    <span className="line-clamp-2">{prod.forWhom}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedProductId(prod.id);
                      const el = document.getElementById('products');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 cursor-pointer"
                  >
                    عرض التفاصيل كاملة ←
                  </button>
                  <button
                    onClick={() => {
                      addToCart({
                        id: prod.id,
                        title: prod.name,
                        arabicTitle: prod.arabicName,
                        price: prod.price || 119,
                        image: prod.image,
                        volume: prod.volume,
                      });
                    }}
                    className="inline-flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة قطعة فردية</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
