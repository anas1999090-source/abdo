import React, { useState } from 'react';
import { FAQS_DATA, WHATSAPP_DISPLAY } from '../data/packData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-xs font-black px-3.5 py-1.5 rounded-full mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>إجابات واضحة ومباشرة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            الأسئلة الأكثر <span className="text-emerald-700">تكراراً وطرحاً</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            كل ما تحتاج لمعرفته حول طريقة الاستفادة من باك فيتاكر وخدمة التوصيل والدفع عند الاستلام.
          </p>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-3 text-right">
          {FAQS_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-right cursor-pointer focus:outline-none"
                >
                  <span className="font-extrabold text-sm sm:text-base text-stone-900">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-emerald-100 text-emerald-800' : 'text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed font-medium border-t border-stone-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Help Box */}
        <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-right">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-stone-900">مازال عندك شي سؤال أو استفسار؟</h4>
              <p className="text-xs text-stone-600">
                مستشارونا متاحون عبر الواتساب على مدار اليوم للإجابة على كل تساؤلاتك ومساعدتك.
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-xl font-bold text-xs shrink-0 shadow-xs transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>تواصل معنا على {WHATSAPP_DISPLAY}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
