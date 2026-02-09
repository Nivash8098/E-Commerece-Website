
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
// Added missing MapPin and Phone icons to the import list from lucide-react
import { Package, Truck, Home as HomeIcon, CheckCircle2, ShoppingBag, ChevronRight, HelpCircle, Star, ShieldCheck, RefreshCw, MapPin, Phone } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const orderData = location.state?.order;
  
  // Stages: 0: Ordered, 1: Shipped, 2: Out for delivery, 3: Delivered
  const [activeStatus, setActiveStatus] = useState(0); 

  useEffect(() => {
    // For demo purposes, we auto-advance the status after a few seconds
    const timer = setTimeout(() => {
      setActiveStatus(1);
      const timer2 = setTimeout(() => {
        setActiveStatus(2);
      }, 8000);
      return () => clearTimeout(timer2);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    { label: 'Ordered', desc: 'Order received and confirmed.', icon: ShoppingBag, date: 'Today, 10:30 AM' },
    { label: 'Shipped', desc: 'In transit via GenCart Logistics.', icon: Package, date: 'Expected by 5 PM' },
    { label: 'Out for Delivery', desc: 'Driver is nearby your location.', icon: Truck, date: 'Expected shortly' },
    { label: 'Delivered', desc: 'Successfully delivered to your door.', icon: HomeIcon, date: 'Estimated: Tomorrow' }
  ];

  if (!orderData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
          <RefreshCw className="w-12 h-12 text-[#2874f0] animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-black mb-4 uppercase tracking-tight">Locating Order...</h1>
          <p className="text-gray-500 mb-8 max-w-sm">If you just placed an order, please wait while we fetch your status.</p>
          <Link to="/" className="inline-block bg-[#2874f0] text-white px-10 py-3 rounded-lg font-black shadow-lg">BACK TO SHOPPING</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden mb-10">
        {/* Header Strip */}
        <div className="p-8 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gray-50/50">
          <div className="flex items-center gap-4">
             <div className="bg-green-100 p-3 rounded-2xl">
               <ShieldCheck className="w-8 h-8 text-green-600" />
             </div>
             <div>
               <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em] mb-1">Order Confirmed</p>
               <h1 className="text-2xl font-black text-gray-900 leading-none">{orderId}</h1>
             </div>
          </div>
          <div className="flex gap-3">
            <button className="text-gray-600 font-bold text-xs bg-white border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2">
               Download Invoice
            </button>
            <button className="text-[#2874f0] font-black text-xs bg-blue-50 border border-blue-100 px-5 py-2.5 rounded-xl hover:bg-blue-100 transition-colors flex items-center gap-2">
              <HelpCircle className="w-4 h-4" /> Need Help?
            </button>
          </div>
        </div>

        <div className="p-10">
          {/* Visual Progress Line (Amazon Style) */}
          <div className="relative mb-24 mt-10">
            {/* The Background Line */}
            <div className="absolute top-6 left-0 w-full h-1.5 bg-gray-100 -z-10 rounded-full" />
            
            {/* The Progress Line */}
            <div 
              className="absolute top-6 left-0 h-1.5 bg-green-500 -z-10 rounded-full transition-all duration-1000 ease-in-out" 
              style={{ width: `${(activeStatus / (steps.length - 1)) * 100}%` }}
            />

            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isCompleted = index <= activeStatus;
                const isActive = index === activeStatus;
                return (
                  <div key={index} className="flex flex-col items-center relative z-10 w-full">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-700 shadow-lg ${
                      isCompleted ? 'bg-green-500 border-green-200 text-white' : 'bg-white border-gray-100 text-gray-300'
                    }`}>
                      <step.icon className={`w-6 h-6 ${isActive ? 'animate-bounce' : ''}`} />
                    </div>
                    
                    <div className="mt-6 text-center px-2">
                      <p className={`text-xs font-black uppercase tracking-wider mb-1 ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                      <p className="text-[10px] text-gray-500 font-bold leading-tight">{step.date}</p>
                      {isActive && (
                         <span className="mt-2 inline-block px-2 py-0.5 bg-blue-50 text-[#2874f0] text-[8px] font-black rounded-full animate-pulse border border-blue-100">
                           IN PROGRESS
                         </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-20 pt-12 border-t border-gray-100">
            {/* Left: Shipping To */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-[#2874f0]" />
                <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Shipping To</h3>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <p className="font-black text-gray-900 text-lg mb-2">{orderData.address.name}</p>
                <div className="text-sm text-gray-600 space-y-1 font-medium leading-relaxed">
                  <p>{orderData.address.address}</p>
                  <p>{orderData.address.locality}, {orderData.address.city}</p>
                  <p>{orderData.address.state} - <span className="font-bold text-gray-900">{orderData.address.pincode}</span></p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Contact Details</p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5" /> +91 {orderData.address.mobile}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle: Order Summary (Items) */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Package className="w-5 h-5 text-[#2874f0]" />
                <h3 className="font-black text-gray-900 uppercase text-xs tracking-widest">Shipment Content</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orderData.items.map((item: any) => (
                  <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="w-20 h-20 bg-gray-50 rounded-xl overflow-hidden shrink-0 flex items-center justify-center p-2">
                      <img src={item.images?.[0] || item.image} className="max-w-full max-h-full object-contain" alt={item.name} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-gray-900 line-clamp-2 leading-tight mb-2">{item.name}</h4>
                      <div className="flex items-center gap-3">
                         <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded font-bold text-gray-500">Qty: {item.quantity}</span>
                         <span className="text-sm font-black text-[#2874f0]">₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Total Strip */}
              <div className="mt-8 bg-[#172337] rounded-2xl p-6 text-white flex justify-between items-center shadow-lg">
                <div>
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Total Amount Paid</p>
                   <p className="text-2xl font-black">₹{orderData.total.toLocaleString()}</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Payment Method</p>
                   <p className="text-sm font-bold">Prepaid (Razorpay)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Rating */}
        <div className="bg-gray-50 p-10 text-center border-t border-gray-100">
          <p className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">How was your delivery experience?</p>
          <div className="flex justify-center gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <button key={i} className="hover:scale-125 transition-transform p-2 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-300 hover:text-yellow-400">
                <Star className="w-8 h-8 fill-current" />
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-6 font-medium italic">"Your feedback helps us deliver happiness smarter."</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-[#2874f0] font-black flex items-center gap-2 hover:translate-x-[-4px] transition-transform">
          <ChevronRight className="w-5 h-5 rotate-180" /> CONTINUE SHOPPING
        </Link>
        <button className="bg-white border-2 border-gray-100 text-gray-900 px-10 py-3.5 rounded-2xl font-black shadow-lg hover:border-[#2874f0] hover:text-[#2874f0] transition-all">
          VIEW ALL MY ORDERS
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
