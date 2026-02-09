
export enum Category {
  ELECTRONICS = 'Electronics',
  FASHION = 'Fashion',
  HOME = 'Home',
  APPLIANCES = 'Appliances',
  BEAUTY = 'Beauty',
  MOBILES = 'Mobiles',
  GROCERY = 'Grocery'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  stock: number;
  images: string[];
  rating?: number;
  reviews?: number;
  oldPrice?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShippingAddress {
  name: string;
  mobile: string;
  pincode: string;
  locality: string;
  address: string;
  city: string;
  state: string;
  landmark?: string;
  altMobile?: string;
  addressType: 'Home' | 'Work';
}

export interface Order {
  id: string;
  items: CartItem[];
  address: ShippingAddress;
  total: number;
  date: string;
  status: 'ordered' | 'shipped' | 'out-for-delivery' | 'delivered';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
}
