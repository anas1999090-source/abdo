import React, { useState, useEffect } from 'react';
import { ShoppingBag, Phone, Sparkles, MessageCircle, Menu, X, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { WHATSAPP_DISPLAY } from '../data/packData';
import { getWhatsAppInquiryUrl } from '../utils/whatsapp';

export const Navbar: React.FC = () => {
  const { totalCount, setIsCartOpen, openCheckoutWithOffer } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Moroccan Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-amber-200 text-xs sm:text-sm py-2 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-center font-medium">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center justify-center bg-amber-400 text-emerald-950 text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-full animate-pulse">
              عرض اليوم
            </span>
            <span className="flex items-center gap-1.5 text-stone-100">
              <Truck className="w-4 h-4 text-emerald-300 shrink-0" />
              توصيل مجاني وسريع 24-48 ساعة لجميع مدن المغرب + الدفع عند الاستلام
            </span>
          </div>

          <a
            href={getWhatsAppInquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-emerald-100 hover:text-white transition-colors bg-emerald-700/60 hover:bg-emerald-700 px-3 py-0.5 rounded-full text-xs font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
            <span>واتساب: {WHATSAPP_DISPLAY}</span>
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-stone-200/80'
            : 'bg-white py-4 border-b border-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center gap-2.5 text-right group text-inherit focus:outline-none"
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-emerald-700 to-teal-900 flex items-center justify-center text-white shadow-md shadow-emerald-700/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-emerald-950 font-['Cairo',sans-serif]">
                    معشبة ريحاب
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    RIIHAB BIO
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-medium">
                  الزيوت والأعشاب الطبيعية الأصلية
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-6 font-semibold text-stone-700 text-sm">
            <button
              onClick={() => scrollToSection('hero')}
              className="hover:text-emerald-700 transition-colors py-1 cursor-pointer"
            >
              الرئيسية
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="hover:text-emerald-700 transition-colors py-1 cursor-pointer"
            >
              مكونات الباك ومزاياها
            </button>
            <button
              onClick={() => scrollToSection('routine')}
              className="hover:text-emerald-700 transition-colors py-1 cursor-pointer"
            >
              طريقة الاستعمال
            </button>
            <button
              onClick={() => scrollToSection('offers')}
              className="hover:text-emerald-700 transition-colors py-1 cursor-pointer"
            >
              العروض والتخفيضات
            </button>
            <button
              onClick={() => scrollToSection('reviews')}
              className="hover:text-emerald-700 transition-colors py-1 cursor-pointer"
            >
              تجارب الزبناء
            </button>
            <button
              onClick={() => scrollToSection('faqs')}
              className="hover:text-emerald-700 transition-colors py-1 cursor-pointer"
            >
              الأسئلة الشائعة
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* WhatsApp Contact Button */}
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm hover:shadow"
              title="تواصل معنا عبر الواتساب"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
              <span>واتساب {WHATSAPP_DISPLAY}</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 sm:px-4 sm:py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold transition-all flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="سلة التسوق"
            >
              <ShoppingBag className="w-5 h-5 text-emerald-800" />
              <span className="hidden md:inline text-xs font-bold text-stone-700">السلة</span>
              {totalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-600 text-white rounded-full text-[11px] font-black flex items-center justify-center shadow-sm animate-bounce">
                  {totalCount}
                </span>
              )}
            </button>

            {/* Direct Order Button */}
            <button
              onClick={() => openCheckoutWithOffer()}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md hover:shadow-lg shadow-emerald-900/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>اطلب الآن</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2 font-bold text-stone-800 text-sm">
              <button
                onClick={() => scrollToSection('hero')}
                className="text-right py-2.5 px-3 rounded-lg hover:bg-stone-50 hover:text-emerald-700 transition"
              >
                الرئيسية
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-right py-2.5 px-3 rounded-lg hover:bg-stone-50 hover:text-emerald-700 transition"
              >
                مكونات الباك ومزاياها (كل منتوج ولاش كيصلح)
              </button>
              <button
                onClick={() => scrollToSection('routine')}
                className="text-right py-2.5 px-3 rounded-lg hover:bg-stone-50 hover:text-emerald-700 transition"
              >
                برنامج وطريقة الاستعمال
              </button>
              <button
                onClick={() => scrollToSection('offers')}
                className="text-right py-2.5 px-3 rounded-lg hover:bg-stone-50 hover:text-emerald-700 transition"
              >
                عروض وتخفيضات الباك
              </button>
              <button
                onClick={() => scrollToSection('reviews')}
                className="text-right py-2.5 px-3 rounded-lg hover:bg-stone-50 hover:text-emerald-700 transition"
              >
                تجارب وآراء الزبناء
              </button>
              <button
                onClick={() => scrollToSection('faqs')}
                className="text-right py-2.5 px-3 rounded-lg hover:bg-stone-50 hover:text-emerald-700 transition"
              >
                الأسئلة الشائعة
              </button>

              <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
                <a
                  href={getWhatsAppInquiryUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-center text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تواصل عبر الواتساب ({WHATSAPP_DISPLAY})</span>
                </a>
                <button
                  onClick={() => openCheckoutWithOffer()}
                  className="w-full bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-2.5 rounded-xl text-center text-sm"
                >
                  طلب مباشر بالدفع عند الاستلام
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
