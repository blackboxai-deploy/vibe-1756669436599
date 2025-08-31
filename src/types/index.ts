export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  images: string[];
  video: string;
  description: string;
  features: string[];
  rating: number;
  reviews: number;
  stock: number;
  shipped: string;
  freeShipping: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface CheckoutData {
  customer: {
    name: string;
    email: string;
    phone: string;
    cpf: string;
  };
  shipping: {
    address: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  payment: {
    method: 'pix' | 'credit' | 'boleto';
    installments?: number;
    cardData?: {
      number: string;
      name: string;
      expiry: string;
      cvv: string;
    };
  };
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}