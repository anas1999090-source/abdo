import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Truck,
  Sparkles,
  ArrowLeft,
  MessageCircle,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_PHONE } from '../data/packData';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    totalAmount,
    totalCount,
    discountAmount,
    appliedPromo,
    applyPromo,
    removePromo,
    openCheckoutWithOffer,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromo(couponInput);
    setCouponMsg({ text: res.message, error: !res.success });
    if (res.success) {
      setCouponInput('');
    }
  };

  const handleWhatsAppCheckout = () => {
    let msg = `السلام عليكم معشبة ريحاب، بغيت نطلب هاد السلة من موقعكم:\n`;
    items.forEach((it, i) => {
      msg += `${i + 1}. ${it.arabicTitle} (${it.quantity}x) = ${it.price * it.quantity} درهم\n`;
    });
    if (discountAmount > 0) {
      msg += `🎁 التخفيض: -${discountAmount} درهم\n`;
    }
    msg += `🚚 التوصيل: بالمجان (0 درهم)\n`;
    msg += `💰 المجموع الإجمالي: *${totalAmount} درهم*\n`;
    msg += `\nعفاك سجلو طلبيتي باش نوصلها بالدفع عند الاستلام.`;

    const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-right">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <div>
                <h3 className="font-extrabold text-base">سلة التسوق</h3>
                <p className="text-xs text-emerald-200">
                  {totalCount} {totalCount === 1 ? 'عنصر' : 'عناصر'} في السلة
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors focus:outline-none"
              aria-label="إغلاق السلة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Moroccan Banner */}
          <div className="bg-emerald-50 px-4 py-2.5 border-b border-emerald-100 flex items-center gap-2 text-xs font-bold text-emerald-900">
            <Truck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>توصيل مجاني 100% لجميع المدن المغربية والدفع عند الاستلام</span>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col gap-4">
            {items.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <div>
                  <h4 className="font-black text-lg text-stone-800">السلة فارغة حالياً</h4>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    لم تقم بإضافة أي منتوج بعد. اختر باك فيتاكر لعلاج تساقط الشعر واستفد من التخفيض!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    const el = document.getElementById('offers');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm transition-all"
                >
                  تصفح باكات العروض الآن
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-stone-50 rounded-2xl p-3 sm:p-4 border border-stone-200 flex items-center gap-3 relative group"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white overflow-hidden border border-stone-200 shrink-0">
                    <img
                      src={item.image}
                      alt={item.arabicTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-extrabold text-xs sm:text-sm text-stone-900 line-clamp-1">
                        {item.arabicTitle}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-red-600 p-1 transition-colors"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.volume && (
                      <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">{item.volume}</p>
                    )}

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-baseline gap-1 font-['Plus_Jakarta_Sans',sans-serif]">
                        <span className="font-black text-emerald-800 text-sm sm:text-base">
                          {item.price * item.quantity}
                        </span>
                        <span className="text-[11px] font-bold text-stone-600 font-['Cairo',sans-serif]">
                          درهم
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-stone-600 hover:text-stone-900 focus:outline-none"
                          aria-label="إنقاص الكمية"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black text-stone-900 px-1 font-['Plus_Jakarta_Sans',sans-serif]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-stone-600 hover:text-stone-900 focus:outline-none"
                          aria-label="زيادة الكمية"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order actions */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col gap-3">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="عندك كود تخفيض؟ (مثال: VITAKER10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 uppercase"
                />
                <button
                  type="submit"
                  className="bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors cursor-pointer"
                >
                  تطبيق
                </button>
              </form>

              {couponMsg && (
                <p
                  className={`text-[11px] font-bold ${
                    couponMsg.error ? 'text-red-600' : 'text-emerald-700'
                  }`}
                >
                  {couponMsg.text}
                </p>
              )}

              {appliedPromo && (
                <div className="flex items-center justify-between bg-emerald-100/70 border border-emerald-300 text-emerald-950 px-3 py-1.5 rounded-xl text-xs font-bold">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span>كود مطبق: {appliedPromo}</span>
                  </span>
                  <button
                    onClick={removePromo}
                    className="text-stone-500 hover:text-red-600 underline text-[10px]"
                  >
                    إلغاء
                  </button>
                </div>
              )}

              {/* Price Calculations */}
              <div className="flex flex-col gap-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>المجموع الجزئي:</span>
                  <span className="font-bold text-stone-900 font-['Plus_Jakarta_Sans',sans-serif]">
                    {items.reduce((acc, it) => acc + it.price * it.quantity, 0)} DH
                  </span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>الخصم المطبق:</span>
                    <span>-{discountAmount} درهم</span>
                  </div>
                )}

                <div className="flex justify-between text-emerald-800 font-bold">
                  <span>التوصيل لباب منزلك:</span>
                  <span>مجاني (0 DH)</span>
                </div>

                <div className="flex justify-between items-baseline text-stone-900 font-black text-base pt-2 border-t border-stone-200">
                  <span>المبلغ الصافي للدفع:</span>
                  <span className="text-emerald-800 text-xl font-['Plus_Jakarta_Sans',sans-serif]">
                    {totalAmount} درهم
                  </span>
                </div>
              </div>

              {/* Main Checkout Button */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  openCheckoutWithOffer();
                }}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white font-black py-3.5 px-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>متابعة الشراء (الدفع عند الاستلام)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              {/* WhatsApp direct checkout */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>إرسال الطلب عبر الواتساب ({WHATSAPP_DISPLAY})</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-500 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>ضمان معاينة وتفقد الطرد قبل الأداء مع شركة الشحن</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
