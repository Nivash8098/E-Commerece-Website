
import React, { useState } from 'react';
import { ShoppingCart, Search, User as UserIcon, Menu, BrainCircuit, LayoutDashboard, LogOut, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { items } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const activeCategory = searchParams.get('category');

  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const categories = ['Electronics', 'Fashion', 'Home', 'Appliances', 'Beauty', 'Mobiles', 'Grocery'];

  const handleCategoryClick = (cat: string) => {
    // If clicking the same category, clear it. Otherwise set it.
    if (activeCategory === cat) {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
    // Ensure we are on the home page when filtering
    if (window.location.hash !== '#/') {
      navigate('/?' + searchParams.toString());
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#2874f0] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 group shrink-0">
          <div className="bg-white p-1 rounded-md group-hover:rotate-12 transition-transform">
            <BrainCircuit className="w-6 h-6 text-[#2874f0]" />
          </div>
          <span className="text-xl font-bold tracking-tight italic">GenCart</span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-2xl relative">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full py-2 px-4 pr-10 rounded-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-[#2874f0] cursor-pointer" />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-6 font-medium">
          <Link to="/admin" className="hover:text-blue-200 transition-colors flex items-center gap-1.5 text-sm">
            <LayoutDashboard className="w-4 h-4" />
            Admin
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
               <span className="text-sm font-bold opacity-80">Hi, {user?.name || 'User'}</span>
               <button onClick={logout} className="hover:text-red-300 transition-colors">
                 <LogOut className="w-5 h-5" />
               </button>
            </div>
          ) : (
            <Link to="/login" className="hover:bg-blue-700 px-4 py-1 rounded transition-colors flex items-center gap-2">
              <UserIcon className="w-4 h-4" />
              Login
            </Link>
          )}

          <Link to="/cart" className="relative flex items-center gap-2 hover:text-yellow-400 transition-colors">
            <div className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#2874f0]">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Categories Nav */}
      <div className="bg-white text-gray-800 shadow-sm overflow-x-auto scrollbar-hide border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-6 text-sm font-semibold whitespace-nowrap">
          <button 
            onClick={() => {
              searchParams.delete('category');
              setSearchParams(searchParams);
            }}
            className={`transition-colors ${!activeCategory ? 'text-[#2874f0]' : 'text-gray-600 hover:text-[#2874f0]'}`}
          >
            All Products
          </button>
          
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => handleCategoryClick(cat)}
              className={`transition-all duration-200 relative px-1 ${
                activeCategory === cat 
                ? 'text-[#2874f0]' 
                : 'text-gray-600 hover:text-[#2874f0]'
              }`}
            >
              {cat}
              {activeCategory === cat && (
                <span className="absolute -bottom-2.5 left-0 w-full h-0.5 bg-[#2874f0] rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
