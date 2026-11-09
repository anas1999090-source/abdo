export interface ProductItem {
  id: string;
  name: string;
  arabicName: string;
  subtitle: string;
  volume: string;
  badge: string;
  iconName: string;
  shortDesc: string;
  forWhom: string; // لمن يصلح
  benefits: string[]; // الفوائد والمزايا
  ingredients: string[]; // المكونات الطبيعية
  howToUse: string; // طريقة الاستعمال
  frequency: string; // عدد المرات
  image: string;
  price?: number;
}

export interface PackOffer {
  id: string;
  title: string;
  arabicTitle: string;
  subtitle: string;
  quantity: number;
  price: number;
  originalPrice: number;
  savings: number;
  popular?: boolean;
  bestValue?: boolean;
  badge?: string;
  gift?: string;
}

export interface CartItem {
  id: string;
  title: string;
  arabicTitle: string;
  quantity: number;
  price: number;
  image: string;
  volume?: string;
  isPack?: boolean;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  productTarget: string;
  likes: number;
}

export interface OrderData {
  orderId: string;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  offerId: string;
  offerTitle: string;
  quantity: number;
  totalPrice: number;
  items: CartItem[];
  createdAt: string;
  status: 'pending' | 'confirmed' | 'shipped';
}
