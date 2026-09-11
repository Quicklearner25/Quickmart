import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, DeliveryLocation, Coupon, OrderDetails } from '../types';
import { SAVED_LOCATIONS, AVAILABLE_COUPONS } from '../data/products';
import { doc, setDoc, onSnapshot, collection, query, where } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '../firebase';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getItemQuantity: (productId: string) => number;
  clearCart: () => void;
  totalItemsCount: number;
  distinctItemsCount: number;
  itemTotal: number;
  originalTotal: number;
  couponDiscount: number;
  totalSavings: number;
  deliveryFee: number;
  handlingFee: number;
  deliveryTip: number;
  setDeliveryTip: (tip: number) => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  grandTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  selectedLocation: DeliveryLocation;
  setSelectedLocation: (loc: DeliveryLocation) => void;
  deliveryInstruction: string;
  setDeliveryInstruction: (instruction: string) => void;
  activeOrder: OrderDetails | null;
  setActiveOrder: (order: OrderDetails | null) => void;
  orderHistory: OrderDetails[];
  placeOrder: (paymentMethod?: string) => Promise<void>;
  reorderItems: (order: OrderDetails) => void;
  dismissActiveOrder: () => void;
  freeDeliveryThreshold: number;
  amountNeededForFreeDelivery: number;
  isCloudSyncing: boolean;
  isProcessingOrder: boolean;
  checkoutError: string | null;
  clearCheckoutError: () => void;
}

// Utility to ensure Razorpay checkout SDK is loaded
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      existing.addEventListener('error', () => resolve(false));
      setTimeout(() => {
        if ((window as any).Razorpay) resolve(true);
      }, 500);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // Load initial cart from localStorage safely
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('instamart_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected location
  const [selectedLocation, setSelectedLocation] = useState<DeliveryLocation>(() => {
    try {
      const saved = localStorage.getItem('instamart_location');
      return saved ? JSON.parse(saved) : SAVED_LOCATIONS[0];
    } catch {
      return SAVED_LOCATIONS[0];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [deliveryTip, setDeliveryTip] = useState<number>(0);
  const [deliveryInstruction, setDeliveryInstruction] = useState<string>('Leave at door');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(null);
  const [orderHistory, setOrderHistory] = useState<OrderDetails[]>([]);
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const clearCheckoutError = () => setCheckoutError(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('instamart_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('instamart_location', JSON.stringify(selectedLocation));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [selectedLocation]);

  // Firestore multi-device cart sync: listen to remote cart changes when user signs in
  useEffect(() => {
    if (!user) return;
    setIsCloudSyncing(true);
    const cartDocRef = doc(db, 'carts', user.uid);

    const unsubscribe = onSnapshot(
      cartDocRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const remoteData = snapshot.data();
          if (Array.isArray(remoteData.items) && remoteData.items.length > 0) {
            setCart(remoteData.items);
          }
        }
        setIsCloudSyncing(false);
      },
      (err) => {
        console.warn('Firestore cart real-time listener:', err);
        setIsCloudSyncing(false);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  // Write local cart updates to Firestore whenever cart changes for logged-in user
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(async () => {
      try {
        setIsCloudSyncing(true);
        await setDoc(
          doc(db, 'carts', user.uid),
          {
            userId: user.uid,
            items: cart,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch (err) {
        console.warn('Failed to sync cart to Firestore:', err);
      } finally {
        setIsCloudSyncing(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [cart, user?.uid]);

  // Firestore real-time order history subscription
  useEffect(() => {
    if (!user) {
      setOrderHistory([]);
      return;
    }
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const orders: OrderDetails[] = [];
        snapshot.forEach((docSnap) => {
          orders.push(docSnap.data() as OrderDetails);
        });
        orders.sort(
          (a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()
        );
        setOrderHistory(orders);
      },
      (err) => {
        console.warn('Error listening to order history in Firestore:', err);
      }
    );

    return () => unsubscribe();
  }, [user?.uid]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === productId);
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        return prev.filter((item) => item.product.id !== productId);
      }
      return prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const getItemQuantity = (productId: string): number => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setDeliveryTip(0);
  };

  // Computations
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const distinctItemsCount = cart.length;

  const itemTotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const originalTotal = cart.reduce(
    (acc, item) => acc + item.product.originalPrice * item.quantity,
    0
  );

  const totalProductSavings = originalTotal - itemTotal;

  // Delivery fee logic
  const freeDeliveryThreshold = 199;
  const isFreeDelivery = itemTotal >= freeDeliveryThreshold || appliedCoupon?.code === 'FREEDEL';
  const deliveryFee = totalItemsCount === 0 ? 0 : isFreeDelivery ? 0 : 25;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - itemTotal);

  // Handling / platform fee
  const handlingFee = totalItemsCount === 0 ? 0 : 4;

  // Coupon discount calculation
  let couponDiscount = 0;
  if (appliedCoupon && itemTotal >= appliedCoupon.minOrder) {
    if (appliedCoupon.discountType === 'flat') {
      couponDiscount = appliedCoupon.discountValue;
    } else if (appliedCoupon.discountType === 'percentage') {
      const calculated = Math.round((itemTotal * appliedCoupon.discountValue) / 100);
      couponDiscount = appliedCoupon.maxDiscount
        ? Math.min(calculated, appliedCoupon.maxDiscount)
        : calculated;
    }
  }

  const grandTotal = Math.max(
    0,
    itemTotal + deliveryFee + handlingFee + deliveryTip - couponDiscount
  );

  const totalSavings = totalProductSavings + couponDiscount + (isFreeDelivery && totalItemsCount > 0 ? 25 : 0);

  const applyCoupon = (code: string) => {
    const coupon = AVAILABLE_COUPONS.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase()
    );
    if (!coupon) {
      return { success: false, message: 'Invalid coupon code' };
    }
    if (itemTotal < coupon.minOrder) {
      return {
        success: false,
        message: `Add items worth ₹${coupon.minOrder - itemTotal} more to apply ${coupon.code}`,
      };
    }
    setAppliedCoupon(coupon);
    return { success: true, message: `Coupon ${coupon.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const reorderItems = (order: OrderDetails) => {
    order.items.forEach((item) => {
      addToCart(item.product);
    });
    setIsCartOpen(true);
  };

  const placeOrder = async (paymentMethod: string = 'UPI / Online Payment') => {
    if (cart.length === 0) return;
    setCheckoutError(null);
    setIsProcessingOrder(true);

    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const orderId = `INSTA-${orderNumber}`;

    // Get or initialize authenticated userId or persistent guest identifier
    let orderUserId = user?.uid || auth.currentUser?.uid;
    if (!orderUserId) {
      try {
        let guestId = localStorage.getItem('quickmart_guest_id');
        if (!guestId) {
          guestId = `guest_${Math.random().toString(36).substring(2, 12)}`;
          localStorage.setItem('quickmart_guest_id', guestId);
        }
        orderUserId = guestId;
      } catch {
        orderUserId = 'guest_shopper';
      }
    }

    // 1. CASH ON DELIVERY FLOW (No payment gateway checkout needed)
    if (paymentMethod === 'Cash on Delivery') {
      const codOrder: OrderDetails = {
        orderId,
        items: [...cart],
        itemTotal,
        deliveryFee,
        handlingFee,
        discount: couponDiscount,
        tip: deliveryTip,
        total: grandTotal,
        savings: totalSavings,
        location: selectedLocation,
        deliveryInstruction,
        placedAt: new Date().toISOString(),
        status: 'placed',
        paymentStatus: 'pending',
        paymentMethod: 'Cash on Delivery',
        etaMinutes: parseInt(selectedLocation.eta) || 9,
        userId: orderUserId,
      };

      try {
        await setDoc(doc(db, 'orders', orderId), codOrder);
      } catch (fsErr) {
        console.warn('Firestore COD order persistence note:', fsErr);
      }

      if (user) {
        try {
          await setDoc(doc(db, 'carts', user.uid), {
            userId: user.uid,
            items: [],
            updatedAt: new Date().toISOString(),
          });
        } catch (e) {
          console.warn('Clear remote cart failed:', e);
        }
      }

      setActiveOrder(codOrder);
      setIsCartOpen(false);
      clearCart();
      setIsProcessingOrder(false);
      return;
    }

    // 2. ONLINE PAYMENT FLOW (Simulated Demo Payment Flow)
    try {
      // Brief simulated payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      const simulatedOrder: OrderDetails = {
        orderId,
        items: [...cart],
        itemTotal,
        deliveryFee,
        handlingFee,
        discount: couponDiscount,
        tip: deliveryTip,
        total: grandTotal,
        savings: totalSavings,
        location: selectedLocation,
        deliveryInstruction,
        placedAt: new Date().toISOString(),
        status: 'placed',
        paymentStatus: 'paid',
        paymentMethod: `${paymentMethod} (Demo)`,
        razorpayPaymentId: `sim_pay_${Math.random().toString(36).substring(2, 10)}`,
        paymentVerifiedAt: new Date().toISOString(),
        etaMinutes: parseInt(selectedLocation.eta) || 9,
        userId: orderUserId,
      };

      try {
        await setDoc(doc(db, 'orders', orderId), simulatedOrder);
      } catch (fsErr) {
        console.warn('Firestore order persistence note:', fsErr);
      }

      // Clear remote cart in Firestore if authenticated
      if (user) {
        try {
          await setDoc(doc(db, 'carts', user.uid), {
            userId: user.uid,
            items: [],
            updatedAt: new Date().toISOString(),
          });
        } catch (e) {
          console.warn('Clear remote cart failed:', e);
        }
      }

      // Clear local cart and display OrderPlacedModal
      clearCart();
      setActiveOrder(simulatedOrder);
      setIsCartOpen(false);
      setCheckoutError(null);
      setIsProcessingOrder(false);
      return;
    } catch (orderErr: any) {
      console.error('[Simulated Checkout Error]', orderErr);
      setCheckoutError(orderErr?.message || 'An unexpected error occurred during checkout.');
      setIsProcessingOrder(false);
    }
  };

  const dismissActiveOrder = () => {
    setActiveOrder(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getItemQuantity,
        clearCart,
        totalItemsCount,
        distinctItemsCount,
        itemTotal,
        originalTotal,
        couponDiscount,
        totalSavings,
        deliveryFee,
        handlingFee,
        deliveryTip,
        setDeliveryTip,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        grandTotal,
        isCartOpen,
        setIsCartOpen,
        isLocationModalOpen,
        setIsLocationModalOpen,
        selectedLocation,
        setSelectedLocation,
        deliveryInstruction,
        setDeliveryInstruction,
        activeOrder,
        setActiveOrder,
        orderHistory,
        placeOrder,
        reorderItems,
        dismissActiveOrder,
        freeDeliveryThreshold,
        amountNeededForFreeDelivery,
        isCloudSyncing,
        isProcessingOrder,
        checkoutError,
        clearCheckoutError,
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
