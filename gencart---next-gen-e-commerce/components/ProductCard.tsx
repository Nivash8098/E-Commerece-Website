
import React from 'react';
import { Star, TrendingUp, Package } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://via.placeholder.com/300';
    
  const discount = product.oldPrice ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className={`bg-white group rounded-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col h-full ${isOutOfStock ? 'opacity-75' : ''}`}>
      <Link to={`/product/${product.id}`} className="relative block h-56 overflow-hidden">
        <img
          src={mainImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && !isOutOfStock && (
          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-sm shadow-sm flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {discount}% OFF
          </div>
        )}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-3 py-1 rounded font-black text-xs uppercase">Out of Stock</span>
          </div>
        )}
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-1">
          <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{product.brand}</span>
          <span className="text-[10px] text-blue-600 font-bold">{product.category}</span>
        </div>
        <Link to={`/product/${product.id}`} className="hover:text-[#2874f0] transition-colors">
          <h3 className="text-sm font-medium line-clamp-2 mb-1">{product.name}</h3>
        </Link>
        
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5 font-bold">
            {product.rating || '4.0'} <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="text-xs text-gray-500 font-medium">({(product.reviews || 0).toLocaleString()})</span>
        </div>

        <div className="mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">₹{product.price.toLocaleString()}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">₹{product.oldPrice.toLocaleString()}</span>
            )}
          </div>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-green-600 font-bold">Free Delivery</p>
            {product.stock > 0 && product.stock < 10 && (
              <span className="text-[10px] text-red-500 font-bold uppercase">Only {product.stock} left!</span>
            )}
          </div>
          
          <button 
            disabled={isOutOfStock}
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-200 disabled:text-gray-400 text-gray-900 font-bold py-2 rounded transition-colors text-sm shadow-sm flex items-center justify-center gap-2"
          >
            <Package className="w-4 h-4" />
            {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
