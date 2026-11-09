import React from 'react';
import { useCart } from '../context/CartContext';
import { OrderForm } from './OrderForm';
import { X } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen } = useCart();

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto text-right">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
          onClick={() => setIsCheckoutOpen(false)}
        />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-3xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-stone-200 animate-in zoom-in-95 duration-200 relative">
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="absolute top-4 left-4 z-10 p-2 rounded-xl text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            aria-label="إغلاق النافذة"
          >
            <X className="w-5 h-5" />
          </button>

          <OrderForm isModal={true} onSuccess={() => setIsCheckoutOpen(false)} />
        </div>
      </div>
    </div>
  );
};
