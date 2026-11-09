import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { MOROCCAN_CITIES, PACK_OFFERS, WHATSAPP_DISPLAY } from '../data/packData';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Zap,
  PhoneCall,
  Lock,
  MessageCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { getWhatsAppOrderUrl } from '../utils/whatsapp';

interface OrderFormProps {
  isModal?: boolean;
  onSuccess?: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ isModal = false, onSuccess }) => {
  const { selectedOffer, setSelectedOffer, createOrder } = useCart();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    city: MOROCCAN_CITIES[0],
    customCity: '',
    address: '',
    notes: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'المرجو كتابة الاسم الكامل (3 أحرف على الأقل)';
    }

    // Moroccan phone validation: 10 digits starting with 06, 07, 05, etc.
    const cleanPhone = formData.phone.replace(/\s+/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'المرجو إدخال رقم الهاتف للتواصل معك';
    } else if (cleanPhone.length < 9) {
      newErrors.phone = 'رقم الهاتف غير صحيح، تأكد من إدخال 10 أرقام (مثال: 0612345678)';
    }

    if (!formData.address.trim() || formData.address.trim().length < 4) {
      newErrors.address = 'المرجو إدخال العنوان أو الحي بدقة لتسهيل التوصيل';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const finalCity = formData.city === 'مدينة أخرى (Autre ville)' && formData.customCity
      ? formData.customCity
      : formData.city;

    setTimeout(() => {
      createOrder({
        fullName: formData.fullName,
        phone: formData.phone,
        city: finalCity,
        address: formData.address,
        notes: formData.notes,
      });
      setIsSubmitting(false);
      if (onSuccess) onSuccess();
    }, 600);
  };

  return (
    <div className={`w-full ${isModal ? '' : 'py-12 bg-gradient-to-b from-stone-50 to-emerald-50/30'}`} id="order-form-section">
      <div className={`mx-auto ${isModal ? 'max-w-2xl' : 'max-w-4xl px-4 sm:px-6'}`}>
        {!isModal && (
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-black px-3.5 py-1.5 rounded-full mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>استمارة الطلب السريع والمباشر</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
              املأ معلوماتك للطلب والدفع <span className="text-emerald-700">عند الاستلام</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              سيقوم فريقنا بالاتصال بك هاتفياً لتأكيد العنوان وشحن طلبيتك مجاناً في أقل من 24 ساعة.
            </p>
          </div>
        )}

        {/* The Main Box */}
        <div className="bg-white rounded-3xl border border-stone-200 shadow-xl overflow-hidden text-right">
          {/* Header Strip */}
          <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white p-4 sm:p-5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
              <div>
                <h3 className="font-extrabold text-sm sm:text-base">تأكيد طلب باك فيتاكر الأصلي</h3>
                <p className="text-[11px] text-emerald-100">ضمان 100% أصلي • فحص الطرد قبل الأداء</p>
              </div>
            </div>
            <div className="text-left font-['Plus_Jakarta_Sans',sans-serif]">
              <span className="text-xs text-emerald-200 block">المبلغ الإجمالي:</span>
              <span className="text-xl sm:text-2xl font-black text-amber-300">
                {selectedOffer.price} DH
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex flex-col gap-5">
            {/* Package Choice inside form */}
            <div>
              <label className="text-xs sm:text-sm font-black text-stone-900 block mb-2">
                1. اختر العرض المطلوب:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {PACK_OFFERS.map((offer) => {
                  const isChecked = selectedOffer.id === offer.id;
                  return (
                    <div
                      key={offer.id}
                      onClick={() => setSelectedOffer(offer)}
                      className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/20'
                          : 'border-stone-200 bg-stone-50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-stone-900">{offer.title}</span>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isChecked ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-stone-300'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                      <div className="flex items-baseline justify-between mt-2">
                        <span className="text-base font-black text-emerald-800">
                          {offer.price} درهم
                        </span>
                        <span className="text-[11px] text-stone-400 line-through">
                          {offer.originalPrice} DH
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div>
                <label className="text-xs font-black text-stone-800 block mb-1.5">
                  الاسم الكامل (Nom et Prénom): *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="مثال: يوسف الإدريسي"
                  className={`w-full bg-stone-50 border rounded-xl py-3 px-3.5 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    errors.fullName ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-red-600 font-bold mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-black text-stone-800 block mb-1.5 flex items-center justify-between">
                  <span>رقم الهاتف (Numéro de Téléphone): *</span>
                  <span className="text-[11px] text-emerald-700 font-bold">للتواصل وتأكيد الطلب</span>
                </label>
                <input
                  type="tel"
                  dir="ltr"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="06 XX XX XX XX / 07 XX XX XX XX"
                  className={`w-full bg-stone-50 border rounded-xl py-3 px-3.5 text-sm font-bold text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-right ${
                    errors.phone ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                  }`}
                />
                {errors.phone && (
                  <p className="text-[11px] text-red-600 font-bold mt-1">{errors.phone}</p>
                )}
              </div>

              {/* City Selection */}
              <div>
                <label className="text-xs font-black text-stone-800 block mb-1.5">
                  المدينة (Ville): *
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl py-3 px-3 text-sm font-semibold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
                >
                  {MOROCCAN_CITIES.map((city, idx) => (
                    <option key={idx} value={city}>
                      {city}
                    </option>
                  ))}
                </select>

                {formData.city === 'مدينة أخرى (Autre ville)' && (
                  <input
                    type="text"
                    value={formData.customCity}
                    onChange={(e) => setFormData({ ...formData, customCity: e.target.value })}
                    placeholder="اكتب اسم مدينتك أو قريتك هنا"
                    className="w-full mt-2 bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                )}
              </div>

              {/* Address */}
              <div>
                <label className="text-xs font-black text-stone-800 block mb-1.5">
                  العنوان أو الحي (Adresse de livraison): *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="مثال: حي السلام، إقامة الياسمين عمارة 4"
                  className={`w-full bg-stone-50 border rounded-xl py-3 px-3.5 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                    errors.address ? 'border-red-500 bg-red-50/30' : 'border-stone-200'
                  }`}
                />
                {errors.address && (
                  <p className="text-[11px] text-red-600 font-bold mt-1">{errors.address}</p>
                )}
              </div>
            </div>

            {/* Delivery & Cost breakdown */}
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col gap-2 text-xs">
              <div className="flex justify-between items-center text-stone-600">
                <span>سعر العرض المختار:</span>
                <span className="font-bold text-stone-900">{selectedOffer.price} درهم مغربي</span>
              </div>
              <div className="flex justify-between items-center text-emerald-800 font-bold">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>مصاريف التوصيل:</span>
                </span>
                <span className="bg-emerald-100 text-emerald-950 px-2 py-0.5 rounded">بالمجان 0 DH (Gratuit)</span>
              </div>
              <div className="flex justify-between items-center text-stone-900 font-black text-sm pt-2 border-t border-stone-200">
                <span>المبلغ الواجب دفعه عند الاستلام:</span>
                <span className="text-emerald-700 text-base">{selectedOffer.price} درهم فقط</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-700 hover:to-teal-900 text-white font-black py-4 px-6 rounded-2xl shadow-lg shadow-emerald-900/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer text-base disabled:opacity-75"
            >
              {isSubmitting ? (
                <span>جاري معالجة طلبك...</span>
              ) : (
                <>
                  <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
                  <span>تأكيد الطلب الآن (الدفع عند الاستلام)</span>
                </>
              )}
            </button>

            {/* Alternative: Order via WhatsApp */}
            <div className="flex items-center justify-center gap-2 pt-1 text-center">
              <span className="text-xs text-stone-500">أو إذا كنت تفضل:</span>
              <a
                href={getWhatsAppOrderUrl({
                  fullName: formData.fullName,
                  phone: formData.phone,
                  city: formData.city,
                  address: formData.address,
                  offerTitle: selectedOffer.arabicTitle,
                  price: selectedOffer.price,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 hover:underline"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                <span>إرسال الطلب مباشرة عبر الواتساب ({WHATSAPP_DISPLAY})</span>
              </a>
            </div>

            {/* Moroccan COD Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-stone-100 text-[11px] text-stone-600 text-center font-medium">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>فحص الطرد قبل الدفع</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>توصيل سريع 24-48 ساعة</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>معلوماتك مشفرة ومحمية 100%</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
