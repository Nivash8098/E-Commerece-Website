
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Admin from './pages/Admin';
import OrderTracking from './pages/OrderTracking';

const App: React.FC = () => {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/order-tracking/:orderId" element={<OrderTracking />} />
              </Routes>
            </div>
            
            <footer className="bg-[#172337] text-white py-12 mt-auto">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div>
                  <h4 className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-widest">About</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:underline">Contact Us</a></li>
                    <li><a href="#" className="hover:underline">About Us</a></li>
                    <li><a href="#" className="hover:underline">Careers</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-widest">Help</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:underline">Payments</a></li>
                    <li><a href="#" className="hover:underline">Shipping</a></li>
                    <li><a href="#" className="hover:underline">Returns</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-widest">Social</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:underline">Twitter</a></li>
                    <li><a href="#" className="hover:underline">Instagram</a></li>
                    <li><a href="#" className="hover:underline">Facebook</a></li>
                  </ul>
                </div>
                <div className="col-span-2 md:col-span-1 border-t md:border-t-0 pt-8 md:pt-0">
                  <h4 className="text-gray-400 font-bold mb-4 uppercase text-xs tracking-widest">AI Shopping</h4>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Experience the future of shopping with GenCart. Real-time insights, smarter recommendations, and 24/7 AI assistance.
                  </p>
                </div>
              </div>
              <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
                © 2024 GenCart Store. All rights reserved.
              </div>
            </footer>
            
            <AIAssistant />
          </div>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;
