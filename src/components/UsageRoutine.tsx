import React from 'react';
import { HOW_TO_USE_STEPS, ROUTINE_IMAGE } from '../data/packData';
import { Calendar, CheckCircle2, Clock, Sparkles, HeartHandshake, ShieldAlert } from 'lucide-react';

export const UsageRoutine: React.FC = () => {
  return (
    <section id="routine" className="py-16 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-black px-3.5 py-1.5 rounded-full mb-3">
            <Clock className="w-3.5 h-3.5 text-amber-700" />
            <span>برنامج العناية اليومية والأسبوعية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            كيفاش تستعمل الباك باش تعطيك <span className="text-emerald-700">أحسن وأسرع نتيجة؟</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            اتباع الخطوات الثلاث البسيطة يضمن لك امتصاصاً كاملاً للمواد الفعالة ونتائج واضحة في أقل من 21 يوماً.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {HOW_TO_USE_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-xs flex flex-col justify-between gap-5 relative overflow-hidden group hover:shadow-md transition-shadow text-right"
            >
              {/* Big Step Number in Background */}
              <div className="absolute top-2 left-4 text-7xl font-black text-stone-100 pointer-events-none select-none font-['Plus_Jakarta_Sans',sans-serif]">
                0{step.step}
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-10 h-10 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-black text-base shadow-sm">
                    {step.step}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    {step.timing}
                  </span>
                </div>

                <h3 className="text-lg font-black text-stone-900 mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>خطوة سهلة ومريحة في البيت</span>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Schedule & Pro Expert Advice Card */}
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4 text-right">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <h3 className="text-xl sm:text-2xl font-black">
                  نصائح خبراء فيتاكر للحصول على كثافة مضاعفة:
                </h3>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-emerald-100">
                <li className="flex items-start gap-2 bg-emerald-800/40 p-3 rounded-2xl border border-emerald-700/50">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    <strong>المساج الدائري:</strong> تدليك الفروة بأطراف الأصابع (وليس الأظافر) ينشط الدورة الدموية 3 أضعاف.
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-emerald-800/40 p-3 rounded-2xl border border-emerald-700/50">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    <strong>الماء الفاتر:</strong> تجنب غسل الشعر بالماء الحار جداً لأنه يضعف الجذور ويزيد من إفراز الدهون.
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-emerald-800/40 p-3 rounded-2xl border border-emerald-700/50">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    <strong>الاستمرارية:</strong> الالتزام بالروتين لمدة شهرين يضمن لك نتائج دائمة وثابتة حتى بعد التوقف.
                  </span>
                </li>
                <li className="flex items-start gap-2 bg-emerald-800/40 p-3 rounded-2xl border border-emerald-700/50">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>
                    <strong>شرب الماء:</strong> الحفاظ على ترطيب الجسم يعزز وصول الفيتامينات إلى بصيلات الشعر.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center gap-3">
              <HeartHandshake className="w-10 h-10 text-amber-300" />
              <div className="font-extrabold text-base">متابعة مجانية بعد الشراء</div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                فريقنا متاح دائماً على الواتساب لتقديم أي استشارة وتتبع تطور النتيجة خطوة بخطوة معك!
              </p>
              <span className="text-xs font-black text-amber-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-amber-300/40">
                خدمة زبناء VIP مجانية
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
