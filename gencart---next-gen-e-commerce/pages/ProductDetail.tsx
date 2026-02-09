
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../constants';
import { Product } from '../types';
import API from '../services/api';
import { useCart } from '../context/CartContext';
import { Star, ShieldCheck, Tag, Heart, Share2, Sparkles, ChevronRight, Loader2, RefreshCw, ShoppingCart, Zap, AlertCircle } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoadingProduct(true);
      try {
        const res = await API.get("/products/");
        const data = res.data.products || res.data;
        const found = data.find((p: any) => (p._id === id || p.id === id));
        
        if (found) {
          setProduct({
            ...found,
            id: found._id || found.id,
            name: found.name || found.title,
            images: Array.isArray(found.images) ? found.images : (found.image ? [found.image] : []),
            rating: found.rating || 4.5,
            reviews: found.reviews || 150,
            category: found.category || 'General'
          });
        } else {
          // Try mock fallback
          const mock = MOCK_PRODUCTS.find(p => p.id === id);
          if (mock) {
            setProduct(mock);
            setIsDemoMode(true);
          }
        }
      } catch (err) {
        // Silent fallback for better UX
        const mock = MOCK_PRODUCTS.find(p => p.id === id);
        if (mock) {
          setProduct(mock);
          setIsDemoMode(true);
        }
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleBuyNow = () => {
    if (product) {
      addToCart(product);
      navigate('/cart');
    }
  };

  if (isLoadingProduct) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Loader2 className="w-12 h-12 animate-spin text-[#2874f0] mb-4" />
        <p className="text-gray-500 font-bold">Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <AlertCircle className="w-16 h-16 text-red-100 mb-6" />
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="text-gray-500 mb-8">The product you are looking for doesn't exist or was removed.</p>
        <Link to="/" className="bg-[#2874f0] text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 flex items-center gap-1 mx-auto">
          Return Home <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/300';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      {isDemoMode && (
        <div className="mb-6 bg-amber-50 border border-amber-100 p-3 rounded-xl flex items-center gap-3 text-amber-700 text-xs font-bold uppercase tracking-wider">
           <Zap className="w-4 h-4" /> Preview Mode: Showing Local Data
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Media */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xl group">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="w-full h-auto aspect-square object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => addToCart(product)}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 text-lg flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 bg-[#fb641b] hover:bg-[#e65a18] text-white font-black py-4 rounded-xl shadow-lg transition-all active:scale-95 text-lg flex items-center justify-center gap-2"
            >
              <Zap className="w-5 h-5 fill-current" />
              Buy Now
            </button>
          </div>
        </div>

        {/* Right Column - Info */}
        <div className="space-y-6">
          <nav className="flex text-sm text-gray-500 font-medium">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-4 h-4 mx-1" />
            <span>{product.category}</span>
          </nav>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white text-sm px-2 py-0.5 rounded-md flex items-center gap-1 font-bold">
                {product.rating} <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-sm font-bold text-gray-500">{product.reviews?.toLocaleString()} Ratings & Reviews</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black">₹{product.price.toLocaleString()}</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">₹{product.oldPrice.toLocaleString()}</span>
              )}
              {product.oldPrice && (
                <span className="text-green-600 font-black text-lg">
                  {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">+ ₹99 Secured Packaging Fee</p>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="font-black text-gray-800 flex items-center gap-2 uppercase text-xs tracking-widest">Available Offers</h3>
            <ul className="space-y-3">
              {[
                'Bank Offer 10% instant discount on HDFC Bank Cards',
                'Special Price Get extra 10% off (price inclusive of cashback)',
                'No Cost EMI on selected Credit Cards'
              ].map((offer, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-800 font-medium">
                  <div className="mt-1"><Sparkles className="w-3 h-3 text-green-500 fill-current" /></div>
                  <span>{offer}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Description */}
          <div className="space-y-3 pt-6 border-t border-gray-100">
            <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Product Description</h3>
            <p className="text-gray-700 leading-relaxed text-sm font-medium">
              {product.description}
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 flex items-center gap-4">
             <div className="bg-white p-2 rounded-xl">
               <ShieldCheck className="w-8 h-8 text-blue-600" />
             </div>
             <div>
               <p className="font-black text-blue-900 uppercase text-[10px] tracking-widest">Safe and Secure</p>
               <p className="text-blue-700 text-xs font-medium">100% Payment Protection. Easy Return Policy.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
