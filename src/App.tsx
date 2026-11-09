import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductsBreakdown } from './components/ProductsBreakdown';
import { UsageRoutine } from './components/UsageRoutine';
import { OffersSection } from './components/OffersSection';
import { OrderForm } from './components/OrderForm';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-stone-50 text-stone-900 font-['Cairo',sans-serif] flex flex-col selection:bg-emerald-600 selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <ProductsBreakdown />
          <UsageRoutine />
          <OffersSection />
          <OrderForm />
          <ReviewsSection />
          <FaqSection />
        </main>
        <Footer />

        {/* Global Drawers & Modals */}
        <CartDrawer />
        <CheckoutModal />
        <OrderSuccessModal />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  );
}
