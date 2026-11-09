import React from 'react';
import { Sparkles, Phone, MessageCircle, MapPin, ShieldCheck, Truck, Clock } from 'lucide-react';
import { WHATSAPP_DISPLAY, WHATSAPP_PHONE } from '../data/packData';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-20 sm:pb-12 text-right border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-stone-800">
          {/* Brand info */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <span className="text-xl font-black text-white font-['Cairo',sans-serif]">
                معشبة ريحاب
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              معشبة ريحاب: وجهتكم الموثوقة في المغرب للزيوت والأعشاب الطبيعية الأصلية والعناية بالشعر ومكافحة التساقط. نعتمد على أنقى الزيوت العشبية المعصورة على البارد وكيراتين نباتي فعال لتغذية الجذور وإنبات الفراغات.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>مرخص ومطابق لمعايير السلامة والجودة</span>
            </div>
          </div>

          {/* Contact & Support */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-black text-white">معلومات الاتصال والطلب</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الواتساب: {WHATSAPP_DISPLAY}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>الهاتف: +{WHATSAPP_PHONE}</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>أوقات العمل: طيلة أيام الأسبوع (9:00 صباحاً - 9:00 مساءً)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>التوصيل: متوفر لجميع المدن والجهات في المغرب</span>
              </li>
            </ul>

            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white py-2 px-3.5 rounded-xl font-bold text-xs mt-1 transition-all"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>دردشة مباشرة مع خدمة الزبناء</span>
            </a>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-black text-white">روابط سريعة</h4>
            <ul className="flex flex-col gap-2 text-xs text-stone-400">
              <li>
                <a href="#hero" className="hover:text-emerald-400 transition-colors">
                  الرئيسية ونظرة عامة
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-emerald-400 transition-colors">
                  مكونات الباك (شامبو + 2 زيوت)
                </a>
              </li>
              <li>
                <a href="#routine" className="hover:text-emerald-400 transition-colors">
                  طريقة وبرنامج الاستعمال
                </a>
              </li>
              <li>
                <a href="#offers" className="hover:text-emerald-400 transition-colors">
                  العروض والتخفيضات (خصم 40%)
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-emerald-400 transition-colors">
                  تجارب وآراء الزبناء
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-emerald-400 transition-colors">
                  الأسئلة الشائعة والضمان
                </a>
              </li>
            </ul>
          </div>

          {/* Guarantee Badges */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-black text-white">ضمانات الشراء الآمن بالمغرب</h4>
            <div className="bg-stone-800/80 p-3.5 rounded-2xl border border-stone-700/60 flex flex-col gap-2.5 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Truck className="w-4 h-4 shrink-0" />
                <span>توصيل بالمجان 100%</span>
              </div>
              <p className="text-[11px] text-stone-400">
                لا تدفع أي سنتيم حتى تستلم طردك وتتفقد العلبة بنفسك مع الموزع.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold pt-1 border-t border-stone-700">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>منتوج أصلي 100%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} معشبة ريحاب (MAACHABAT RIIHAB). جميع الحقوق محفوظة.</p>
          <p className="text-[11px]">باك الهبال لنهاية مشاكل تساقط الشعر - الحل الشامل والمكثف</p>
        </div>
      </div>
    </footer>
  );
};
