
import { Product, Category } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Sony WH-1000XM5 Noise Canceling Headphones',
    price: 29999,
    oldPrice: 34999,
    description: 'Industry-leading noise cancellation with two processors and eight microphones.',
    category: Category.ELECTRONICS,
    brand: 'Sony',
    stock: 15,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'],
    rating: 4.8,
    reviews: 2450
  },
  {
    id: 'm1',
    name: 'iPhone 15 Pro Max (256 GB) - Natural Titanium',
    price: 148900,
    oldPrice: 159900,
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and a more versatile Pro camera system.',
    category: Category.MOBILES,
    brand: 'Apple',
    stock: 12,
    images: ['https://images.unsplash.com/photo-1695048133142-1a20484d256e?auto=format&fit=crop&w=800&q=80'],
    rating: 4.9,
    reviews: 5620
  },
  {
    id: 'm2',
    name: 'Samsung Galaxy S24 Ultra 5G (Titanium Gray)',
    price: 129999,
    oldPrice: 139999,
    description: 'The ultimate Galaxy Ultra experience. Now with Galaxy AI, 200MP camera, and built-in S Pen.',
    category: Category.MOBILES,
    brand: 'Samsung',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'],
    rating: 4.8,
    reviews: 3120
  },
  {
    id: '2',
    name: 'Apple MacBook Air M2 - 256GB',
    price: 94990,
    oldPrice: 114900,
    description: 'Strikingly thin design, 13.6-inch Liquid Retina display, and incredible speed.',
    category: Category.ELECTRONICS,
    brand: 'Apple',
    stock: 8,
    images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'],
    rating: 4.9,
    reviews: 1205
  },
  {
    id: 'm3',
    name: 'Google Pixel 8 Pro - Obsidian',
    price: 106990,
    oldPrice: 110000,
    description: 'The all-pro phone engineered by Google. It’s sleek, sophisticated, and has the most advanced Pixel Camera yet.',
    category: Category.MOBILES,
    brand: 'Google',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80'],
    rating: 4.7,
    reviews: 840
  },
  {
    id: 'm4',
    name: 'OnePlus 12 (Flowy Emerald, 16GB RAM)',
    price: 64999,
    oldPrice: 69999,
    description: 'Elite performance with Snapdragon 8 Gen 3, 4th Gen Hasselblad Camera for Mobile, and 100W SUPERVOOC charging.',
    category: Category.MOBILES,
    brand: 'OnePlus',
    stock: 18,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'],
    rating: 4.6,
    reviews: 1105
  },
  {
    id: '3',
    name: 'Premium Leather Minimalist Wallet',
    price: 1299,
    oldPrice: 1999,
    description: 'Crafted from genuine top-grain leather with RFID protection.',
    category: Category.FASHION,
    brand: 'Generic',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80'],
    rating: 4.5,
    reviews: 890
  },
  {
    id: '4',
    name: 'Smart LED Coffee Table',
    price: 15400,
    oldPrice: 18999,
    description: 'Futuristic design with built-in cooler and voice-controlled lighting.',
    category: Category.HOME,
    brand: 'Futuristica',
    stock: 5,
    images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80'],
    rating: 4.2,
    reviews: 45
  },
  {
    id: 'm5',
    name: 'Nothing Phone (2) - Dark Gray',
    price: 39999,
    oldPrice: 44999,
    description: 'The iconic Glyph Interface meets premium performance. 50MP dual rear cameras and Nothing OS 2.0.',
    category: Category.MOBILES,
    brand: 'Nothing',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=800&q=80'],
    rating: 4.5,
    reviews: 1250
  }
];
