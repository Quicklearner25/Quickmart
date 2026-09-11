export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  subCategory: string;
  packSize: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  rating: number;
  ratingCount: number;
  deliveryTime: string;
  inStock: boolean;
  image: string;
  isVeg: boolean;
  isBestseller?: boolean;
  isOrganic?: boolean;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
  subCategories: string[];
  bannerImage?: string;
  accentColor: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface DeliveryLocation {
  id: string;
  tag: 'Home' | 'Work' | 'Other';
  label: string;
  address: string;
  city: string;
  pincode: string;
  eta: string;
  isDefault?: boolean;
}

export interface Coupon {
  code: string;
  description: string;
  discountType: 'flat' | 'percentage';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  itemTotal: number;
  deliveryFee: number;
  handlingFee: number;
  discount: number;
  tip: number;
  total: number;
  savings: number;
  location: DeliveryLocation;
  deliveryInstruction: string;
  placedAt: Date | string;
  status: 'pending_payment' | 'placed' | 'packing' | 'out_for_delivery' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  paymentMethod: string;
  paymentId?: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  paymentVerifiedAt?: string;
  etaMinutes: number;
  userId?: string;
}
