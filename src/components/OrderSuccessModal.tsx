import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, MessageCircle, Truck, Package, X, PhoneCall, ShieldCheck } from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_PHONE } from '../data/packData';
import { getWhatsAppOrderUrl } from '../utils/whatsapp';

export const OrderSuccessModal: React.FC = () => {
  const { isSuccessOpen, setIsSuccessOpen, lastOrder } = useCart();

  if (!isSuccessOpen || !lastOrder) return null;

  const whatsappUrl = getWhatsAppOrderUrl({
    orderId: lastOrder.orderId,
    fullName: lastOrder.fullName,
    phone: lastOrder.phone,
    city: lastOrder.city,
    address: lastOrder.address,
    offerTitle: lastOrder.offerTitle,
    price: lastOrder.totalPrice,
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto text-right">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-stone-900/70 backdrop-blur-xs transition-opacity"
          onClick={() => setIsSuccessOpen(false)}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-3xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-stone-200 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-br from-emerald-700 via-emerald-800 to-teal-900 text-white p-6 sm:p-8 text-center relative">
            <button
              onClick={() => setIsSuccessOpen(false)}
              className="absolute top-4 left-4 p-2 rounded-xl text-emerald-200 hover:text-white hover:bg-emerald-800 transition"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-10 h-10 text-amber-300" />
            </div>

            <h3 className="text-xl sm:text-2xl font-black mb-1">
              تم تسجيل طلبيتك بنجاح! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-sm mx-auto">
              شكراً لثقتكم في معشبة ريحاب. رقم الطلبية الخاص بك هو:
            </p>

            <div className="inline-block mt-3 bg-white/15 backdrop-blur-sm border border-white/30 text-amber-300 font-black text-sm px-4 py-1.5 rounded-full font-['Plus_Jakarta_Sans',sans-serif]">
              {lastOrder.orderId}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-7 flex flex-col gap-4 text-xs sm:text-sm">
            <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 flex flex-col gap-2.5">
              <div className="flex justify-between items-center text-stone-600">
                <span>اسم الزبون:</span>
                <span className="font-extrabold text-stone-900">{lastOrder.fullName}</span>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>رقم الهاتف:</span>
                <span className="font-bold text-stone-900 font-['Plus_Jakarta_Sans',sans-serif]">
                  {lastOrder.phone}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>المدينة والعنوان:</span>
                <span className="font-bold text-stone-900 text-left">
                  {lastOrder.city} - {lastOrder.address}
                </span>
              </div>
              <div className="flex justify-between items-center text-stone-600">
                <span>العرض المختار:</span>
                <span className="font-bold text-emerald-800">{lastOrder.offerTitle}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-stone-200 text-stone-900 font-black text-sm">
                <span>المبلغ للدفع عند الاستلام:</span>
                <span className="text-emerald-700 text-base">{lastOrder.totalPrice} درهم (توصيل فابور)</span>
              </div>
            </div>

            {/* Next Steps Moroccan Flow */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-2.5 text-amber-950 text-xs">
              <PhoneCall className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-black text-amber-900">شنو الخطوة التالية؟</strong>
                <span>
                  سيتصل بك مسؤول التأكيد هاتفياً في أقرب وقت لتأكيد طلبيتك، وسيصلك الطرد في مدة 24 إلى 48 ساعة لباب دارك.
                </span>
              </div>
            </div>

            {/* Primary Action: Direct Confirmation via WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black py-3.5 px-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm text-center"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>تأكيد الطلبية فوراً عبر الواتساب ({WHATSAPP_DISPLAY})</span>
            </a>

            <button
              onClick={() => setIsSuccessOpen(false)}
              className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 rounded-xl transition text-xs"
            >
              العودة للمتجر
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
