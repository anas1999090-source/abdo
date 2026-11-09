import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, PackOffer, OrderData } from '../types';
import { PACK_OFFERS, MAIN_PACK_IMAGE } from '../data/packData';
import confetti from 'canvas-confetti';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedOffer: PackOffer;
  setSelectedOffer: (offer: PackOffer) => void;
  totalAmount: number;
  totalCount: number;
  discountAmount: number;
  appliedPromo: string | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  openCheckoutWithOffer: (offer?: PackOffer) => void;
  lastOrder: OrderData | null;
  isSuccessOpen: boolean;
  setIsSuccessOpen: (open: boolean) => void;
  triggerCelebration: () => void;
  createOrder: (formData: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  }) => OrderData;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedOffer, setSelectedOffer] = useState<PackOffer>(PACK_OFFERS[1]); // Default to popular 2 packs
  const [items, setItems] = useState<CartItem[]>(() => {
    return [
      {
        id: 'pack-main',
        title: PACK_OFFERS[1].title,
        arabicTitle: PACK_OFFERS[1].arabicTitle,
        quantity: 1,
        price: PACK_OFFERS[1].price,
        image: MAIN_PACK_IMAGE,
        volume: 'شامبو + زيتين',
        isPack: true,
      },
    ];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderData | null>(null);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Sync primary pack when selected offer changes
  const updateMainOfferInCart = (offer: PackOffer) => {
    setSelectedOffer(offer);
    setItems((prev) => {
      const filtered = prev.filter((it) => it.id !== 'pack-main');
      return [
        {
          id: 'pack-main',
          title: offer.title,
          arabicTitle: offer.arabicTitle,
          quantity: 1,
          price: offer.price,
          image: MAIN_PACK_IMAGE,
          volume: offer.subtitle,
          isPack: true,
        },
        ...filtered,
      ];
    });
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id
            ? { ...i, quantity: i.quantity + (newItem.quantity || 1) }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: newItem.quantity || 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const newQ = i.quantity + delta;
            return newQ > 0 ? { ...i, quantity: newQ } : null;
          }
          return i;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromo = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VITAKER10' || clean === 'PROMO10') {
      setAppliedPromo(clean);
      return { success: true, message: 'تم تطبيق خصم 10% بنجاح!' };
    }
    if (clean === 'MAROC' || clean === 'SAHA') {
      setAppliedPromo(clean);
      return { success: true, message: 'تم خصم 30 درهم من المبلغ الإجمالي!' };
    }
    return { success: false, message: 'كود التخفيض غير صالح أو منتهي الصلاحية' };
  };

  const removePromo = () => {
    setAppliedPromo(null);
  };

  const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo === 'VITAKER10' || appliedPromo === 'PROMO10') {
    discountAmount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'MAROC' || appliedPromo === 'SAHA') {
    discountAmount = Math.min(30, subtotal);
  }

  const totalAmount = Math.max(0, subtotal - discountAmount);
  const totalCount = items.reduce((acc, it) => acc + it.quantity, 0);

  const openCheckoutWithOffer = (offer?: PackOffer) => {
    if (offer) {
      updateMainOfferInCart(offer);
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#059669', '#10b981', '#fbbf24', '#f59e0b'],
      });
    } catch {
      // fallback safe
    }
  };

  const createOrder = (formData: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    notes?: string;
  }): OrderData => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: OrderData = {
      orderId: `VK-${new Date().getFullYear()}-${randomNum}`,
      fullName: formData.fullName,
      phone: formData.phone,
      city: formData.city,
      address: formData.address,
      notes: formData.notes,
      offerId: selectedOffer.id,
      offerTitle: selectedOffer.arabicTitle,
      quantity: totalCount,
      totalPrice: totalAmount,
      items: [...items],
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    setLastOrder(newOrder);

    // Save order in localStorage for user convenience
    try {
      const existingHistory = JSON.parse(localStorage.getItem('vitaker_orders') || '[]');
      localStorage.setItem('vitaker_orders', JSON.stringify([newOrder, ...existingHistory]));
    } catch {
      // ignore
    }

    triggerCelebration();
    setIsCheckoutOpen(false);
    setIsSuccessOpen(true);

    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedOffer,
        setSelectedOffer: updateMainOfferInCart,
        totalAmount,
        totalCount,
        discountAmount,
        appliedPromo,
        applyPromo,
        removePromo,
        isCheckoutOpen,
        setIsCheckoutOpen,
        openCheckoutWithOffer,
        lastOrder,
        isSuccessOpen,
        setIsSuccessOpen,
        triggerCelebration,
        createOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
