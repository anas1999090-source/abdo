import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle2,
  Clock,
  Star,
  MessageCircle,
  ShoppingBag,
  Zap,
  RotateCcw,
  Check,
  Eye,
  Flame
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  MAIN_PACK_IMAGE,
  INGREDIENTS_IMAGE,
  ROUTINE_IMAGE,
  PACK_OFFERS,
  WHATSAPP_DISPLAY
} from '../data/packData';
import { getWhatsAppOrderUrl, getWhatsAppInquiryUrl } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  const { openCheckoutWithOffer, addToCart, selectedOffer, setSelectedOffer } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Gallery images
  const gallery = [
    {
      src: MAIN_PACK_IMAGE,
      label: 'الباك الأصلي الكامل',
      tag: 'الصورة الحقيقية للباك',
    },
    {
      src: INGREDIENTS_IMAGE,
      label: 'مستخلصات نباتية طبيعية',
      tag: 'إكليل الجبل وزيوت معصورة باردة',
    },
    {
      src: ROUTINE_IMAGE,
      label: 'طريقة تغذية البصيلات',
      tag: 'سيروم عالي التركيز والامتصاص',
    },
  ];

  // Urgency timer
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 3, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="relative pt-6 pb-14 overflow-hidden bg-gradient-to-b from-emerald-50/40 via-stone-50 to-white">
      {/* Background soft blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Moroccan Trust Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-100/80 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>الحل الطبيعي رقم 1 في المغرب لعلاج تساقط الشعر الحاد وإنبات الفراغات</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 bg-amber-100/80 text-amber-900 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-300">
            <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>أكثر من 2,450 زبون مغربي أكدو فعاليتو</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Right Column (in RTL, visual left): Product Gallery */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {/* Main Showcase Image */}
            <div className="relative group rounded-3xl overflow-hidden bg-white border border-stone-200/90 shadow-xl shadow-stone-200/50">
              <div className="aspect-[4/4.2] sm:aspect-[4/3.8] w-full overflow-hidden bg-stone-100 flex items-center justify-center relative">
                <img
                  src={gallery[activeImageIndex].src}
                  alt="باك فيتاكر لعلاج تساقط الشعر"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Floating Badges on Image */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <span className="bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>طبيعي 100% BIO</span>
                  </span>
                  <span className="bg-amber-500 text-stone-950 text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                    تخفيض 40% اليوم
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/60 shadow-md flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    {gallery[activeImageIndex].tag}
                  </span>
                  <span className="text-[11px] font-semibold text-stone-500">
                    {activeImageIndex + 1} من {gallery.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-3">
              {gallery.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`flex flex-col items-center gap-1.5 p-1.5 rounded-2xl border-2 transition-all cursor-pointer bg-white text-right ${
                    activeImageIndex === idx
                      ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-stone-200 hover:border-stone-300 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden bg-stone-100">
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-stone-800 line-clamp-1 px-1">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Guarantee Callout Under Gallery */}
            <div className="grid grid-cols-3 gap-2 p-3 bg-emerald-50/70 border border-emerald-200/70 rounded-2xl text-center">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-950">توصيل بالمجان</span>
                <span className="text-[10px] text-stone-600">لجميع مدن المغرب</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-x border-emerald-200">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-950">الدفع بعد الاستلام</span>
                <span className="text-[10px] text-stone-600">قلّب عاد خلّص</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-5 h-5 text-emerald-700" />
                <span className="text-xs font-bold text-emerald-950">ضمان النتيجة</span>
                <span className="text-[10px] text-stone-600">فعالية من أول أسبوعين</span>
              </div>
            </div>
          </div>

          {/* Left Column (in RTL, text): Content, Prices, Offers & Conversion */}
          <div className="lg:col-span-6 flex flex-col gap-5">
            {/* Main Title from the box in the image */}
            <div className="flex flex-col gap-2 text-right">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-700">4.9 / 5</span>
                <span className="text-xs text-stone-500 font-medium">(2,450+ تقييم إيجابي)</span>
              </div>

              <div className="inline-flex items-center gap-2 self-start bg-emerald-50 text-emerald-800 text-xs font-black px-3 py-1 rounded-lg border border-emerald-200 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>معشبة ريحاب تقدم لكم حصرياً:</span>
              </div>
              <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-stone-900 leading-tight">
                <span className="text-emerald-700">باك الهبال</span> لنهاية مشاكل تساقط الشعر
                <span className="block text-xl sm:text-2xl font-bold text-stone-600 mt-1">
                  الحل الشامل من فيتاكر لدى معشبة ريحاب
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed mt-1">
                تركيبة علاجية أصلية لدى معشبة ريحاب تجمع بين <strong className="text-emerald-900">شامبو نباتي منشط</strong>، <strong className="text-emerald-900">زيت السقاط للإنبات العميق</strong>، و<strong className="text-emerald-900">زيت الكيراتين للترميم والنعومة</strong>. يوقف التساقط الحاد، يغذي البصيلات الضعيفة، وينبت شعر جديد في الفراغات ومقدمة الرأس.
              </p>
            </div>

            {/* What's inside the pack (Highlights) */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-4 flex flex-col gap-2.5">
              <span className="text-xs font-extrabold text-stone-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                محتويات الباك الأصلي (كما في الصورة):
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-700 font-semibold">
                <li className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-stone-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>شامبو فيتاكر نباتي (400ml)</span>
                </li>
                <li className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-stone-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>زيت السقاط للإنبات (100ml)</span>
                </li>
                <li className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-stone-200">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>زيت الكيراتين والترميم (100ml)</span>
                </li>
              </ul>
            </div>

            {/* Urgency Box with Countdown */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2 text-amber-900">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 animate-spin" style={{ animationDuration: '8s' }} />
                <div className="text-right">
                  <div className="text-xs font-extrabold">ينتهي التخفيض الخاص في:</div>
                  <div className="text-[11px] text-amber-800 font-medium">سارع قبل نفاد الكمية المخصصة لليوم</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 font-['Plus_Jakarta_Sans',sans-serif] font-black text-amber-950 text-sm dir-ltr">
                <span className="bg-white border border-amber-200 px-2 py-1 rounded-lg shadow-xs">
                  {String(timeLeft.hours).padStart(2, '0')}h
                </span>
                <span>:</span>
                <span className="bg-white border border-amber-200 px-2 py-1 rounded-lg shadow-xs">
                  {String(timeLeft.minutes).padStart(2, '0')}m
                </span>
                <span>:</span>
                <span className="bg-white border border-amber-200 px-2 py-1 rounded-lg shadow-xs text-red-600">
                  {String(timeLeft.seconds).padStart(2, '0')}s
                </span>
              </div>
            </div>

            {/* Offer Selector Cards */}
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-black text-stone-800 flex items-center justify-between">
                <span>اختر العرض المناسب لك:</span>
                <span className="text-emerald-700 font-bold text-[11px]">توصيل فابور لكل العروض</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PACK_OFFERS.map((offer) => {
                  const isSelected = selectedOffer.id === offer.id;
                  return (
                    <button
                      key={offer.id}
                      onClick={() => setSelectedOffer(offer)}
                      className={`relative p-3 rounded-2xl border-2 text-right transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-500/20'
                          : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                    >
                      {offer.popular && (
                        <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                          الأكثر طلباً 🔥
                        </span>
                      )}
                      {offer.bestValue && (
                        <span className="absolute -top-2.5 right-3 bg-teal-700 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                          أقصى توفير 💎
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-stone-900">{offer.title}</span>
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                        </div>
                        <div className="text-[11px] text-stone-500 mt-1 line-clamp-1">{offer.subtitle}</div>
                      </div>

                      <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                        <div className="flex items-baseline gap-1">
                          <span className="text-lg font-black text-emerald-800 font-['Plus_Jakarta_Sans',sans-serif]">
                            {offer.price}
                          </span>
                          <span className="text-[11px] font-bold text-emerald-950">درهم</span>
                        </div>
                        <span className="text-xs text-stone-400 line-through">
                          {offer.originalPrice} DH
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons: Direct Order & WhatsApp Order */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {/* Primary Direct Order Button */}
              <button
                onClick={() => openCheckoutWithOffer(selectedOffer)}
                className="flex-1 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-base"
              >
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>اضغط هنا واطلب الآن ({selectedOffer.price} درهم)</span>
              </button>

              {/* WhatsApp Quick Order Button */}
              <a
                href={getWhatsAppOrderUrl({
                  offerTitle: selectedOffer.arabicTitle,
                  price: selectedOffer.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold py-3.5 px-5 rounded-2xl shadow-md hover:shadow-lg transition-all text-sm shrink-0"
                title="طلب فوري عبر الواتساب"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>اطلب عبر الواتساب</span>
              </a>
            </div>

            {/* Add to cart secondary button */}
            <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
              <button
                onClick={() => {
                  addToCart({
                    id: selectedOffer.id,
                    title: selectedOffer.title,
                    arabicTitle: selectedOffer.arabicTitle,
                    price: selectedOffer.price,
                    image: MAIN_PACK_IMAGE,
                    volume: selectedOffer.subtitle,
                    isPack: true,
                  });
                }}
                className="inline-flex items-center gap-1.5 text-stone-700 hover:text-emerald-700 font-bold transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-600" />
                <span>إضافة إلى سلة التسوق ومتابعة التصفح</span>
              </button>

              <span className="text-[11px] text-amber-800 font-bold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                باقي 14 باك فقط في المخزون
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
