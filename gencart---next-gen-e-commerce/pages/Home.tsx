
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import API, { handleApiError } from '../services/api';
import { ChevronRight, ChevronLeft, Zap, ShieldCheck, RefreshCw, Truck, Sparkles, Loader2, WifiOff, AlertCircle, FilterX, Database } from 'lucide-react';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchParams] = useSearchParams();
  
  const categoryFilter = searchParams.get('category');

  const slides = [
    { bg: 'bg-blue-600', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80', title: 'Power Your Potential', sub: 'Laptops with the latest M3 and Intel Core chips' },
    { bg: 'bg-purple-600', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80', title: 'Summer Collection', sub: 'Up to 60% off on Premium Smartwatches' },
  ];

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    setIsDemoMode(false);
    try {
      const res = await API.get("/products/");
      
      const data = res.data.products || res.data; // Handle common Django response formats
      const mappedData = data.map((p: any) => ({
        ...p,
        id: p._id || p.id,
        name: p.name || p.title,
        images: Array.isArray(p.images) ? p.images : (p.image ? [p.image] : []),
        rating: p.rating || 4.2 + (Math.random() * 0.8),
        reviews: p.reviews || Math.floor(Math.random() * 2000),
        stock: p.stock ?? 50
      }));
      
      if (mappedData.length === 0) {
        setProducts(MOCK_PRODUCTS);
        setIsDemoMode(true);
      } else {
        setProducts(mappedData);
      }
    } catch (err: any) {
      const diagnosticMsg = handleApiError(err);
      setError(diagnosticMsg);
      setProducts(MOCK_PRODUCTS);
      setIsDemoMode(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredProducts = categoryFilter 
    ? products.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase())
    : products;

  return (
    <main className="pb-20">
      {isDemoMode && (
        <div className="bg-amber-50 border-b border-amber-100 p-3">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-amber-700">
              <Database className="w-5 h-5 shrink-0" />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-70">Development Mode</p>
                <p className="text-sm font-medium">Running on Mock Data. {error ? "Backend not detected." : ""}</p>
              </div>
            </div>
            <button 
              onClick={fetchProducts} 
              className="bg-white px-4 py-1.5 rounded-lg border border-amber-200 text-amber-700 text-xs font-black hover:bg-amber-100 transition-colors flex items-center gap-2 shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" /> RECONNECT TO BACKEND
            </button>
          </div>
        </div>
      )}

      {/* Hero Slider */}
      {!categoryFilter && (
        <section className="relative h-48 md:h-[400px] overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div key={i} className={`min-w-full relative h-full flex items-center ${slide.bg}`}>
                <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 text-white w-full">
                  <h1 className="text-3xl md:text-6xl font-black mb-2">{slide.title}</h1>
                  <p className="text-lg md:text-2xl font-light mb-6 opacity-90">{slide.sub}</p>
                  <button className="bg-white text-gray-900 px-8 py-3 rounded-md font-bold hover:bg-gray-100 transition-colors shadow-lg">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setActiveSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-sm transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setActiveSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1))}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-sm transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </section>
      )}

      {/* Features Bar */}
      <section className="bg-white py-6 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-6 h-6 text-[#2874f0]" />
            <span className="text-sm font-semibold">Free & Fast Delivery</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#2874f0]" />
            <span className="text-sm font-semibold">Secure Payment</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <RefreshCw className="w-6 h-6 text-[#2874f0]" />
            <span className="text-sm font-semibold">7 Days Replacement</span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Zap className="w-6 h-6 text-[#2874f0]" />
            <span className="text-sm font-semibold">Flash Deals Daily</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            {categoryFilter ? `Shop ${categoryFilter}` : 'Top Recommendations'}
            {!categoryFilter && (
              <div className="bg-blue-100 text-[#2874f0] text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse uppercase tracking-wider font-black">
                <Sparkles className="w-3 h-3" />
                AI Curated
              </div>
            )}
          </h2>
        </div>
        
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-[#2874f0]" />
            <p className="text-gray-500 font-medium">Loading products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
            <FilterX className="w-16 h-16" />
            <p className="text-lg font-bold">No products found in this category.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Home;
