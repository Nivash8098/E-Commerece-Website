
import React, { useState, useEffect } from 'react';
import API, { handleApiError, checkServerHealth } from '../services/api';
import { PackagePlus, Trash2, PlusCircle, CheckCircle, Loader2, AlertCircle, LayoutGrid, Server, Globe } from 'lucide-react';

interface ProductInput {
  name: string;
  description: string;
  price: string;
  category: string;
  brand: string;
  stock: string;
  images: string; // Comma separated for entry
}

const Admin: React.FC = () => {
  const [products, setProducts] = useState<ProductInput[]>([
    { name: "", description: "", price: "", category: "", brand: "", stock: "", images: "" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isServerUp, setIsServerUp] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const healthy = await checkServerHealth();
      setIsServerUp(healthy);
    };
    check();
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newProducts = [...products];
    const { name, value } = e.target;
    newProducts[index] = { ...newProducts[index], [name]: value };
    setProducts(newProducts);
  };

  const addRow = () => {
    setProducts([...products, { name: "", description: "", price: "", category: "", brand: "", stock: "", images: "" }]);
  };

  const removeRow = (index: number) => {
    if (products.length === 1) return;
    setProducts(products.filter((_, i) => i !== index));
  };

  const submitProducts = async () => {
    setIsLoading(true);
    setStatus(null);
    try {
      const payload = products.map(p => ({
        name: p.name,
        description: p.description,
        price: Number(p.price),
        category: p.category,
        brand: p.brand,
        stock: Number(p.stock),
        images: p.images.split(',').map(img => img.trim()).filter(img => img !== "")
      }));

      // NOTE: Using the exact endpoint defined in your backend snippet
      const res = await API.post("/products/add-multiple", { products: payload });
      
      setStatus({ 
        type: 'success', 
        message: `Successfully added ${res.data.count} products to the database!` 
      });
      setProducts([{ name: "", description: "", price: "", category: "", brand: "", stock: "", images: "" }]);
      setIsServerUp(true);
    } catch (err: any) {
      const msg = handleApiError(err);
      setStatus({ type: 'error', message: msg });
      setIsServerUp(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#172337] p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
              <LayoutGrid className="w-8 h-8 text-blue-400" />
              Seller Dashboard
            </h1>
            <p className="text-gray-400 mt-2">Manage your product catalog</p>
          </div>
          
          <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${
            isServerUp === true ? 'bg-green-600/10 border-green-500/30 text-green-400' : 
            isServerUp === false ? 'bg-red-600/10 border-red-500/30 text-red-400' : 'bg-gray-600/10 border-gray-500/30 text-gray-400'
          }`}>
            <Server className={`w-4 h-4 ${isServerUp === null ? 'animate-pulse' : ''}`} />
            <span className="text-xs font-black uppercase tracking-widest">
              Backend: {isServerUp === true ? 'Connected' : isServerUp === false ? 'Offline' : 'Checking...'}
            </span>
          </div>
        </div>

        {isServerUp === false && (
          <div className="mx-8 mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-200 flex flex-col md:flex-row gap-6">
            <div className="bg-amber-100 p-4 rounded-xl flex items-center justify-center">
              <Globe className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h3 className="font-black text-amber-900 mb-1">Backend Troubleshooting</h3>
              <p className="text-sm text-amber-800 leading-relaxed">
                Your frontend is trying to talk to <code className="bg-amber-100 px-1 rounded">http://127.0.0.1:5000</code>.
                1. Make sure your Node.js server is running (<code className="bg-amber-100 px-1 rounded">npm start</code>).
                2. Check if CORS is enabled in your Express app.
                3. If you are using HTTPS for this frontend, browsers will block the HTTP backend connection.
              </p>
            </div>
          </div>
        )}

        <div className="p-8">
          {status && (
            <div className={`p-5 rounded-2xl mb-8 flex items-center gap-4 border-2 ${
              status.type === 'success' ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'
            }`}>
              {status.type === 'success' ? <CheckCircle className="w-6 h-6 shrink-0" /> : <AlertCircle className="w-6 h-6 shrink-0" />}
              <p className="font-bold">{status.message}</p>
            </div>
          )}

          <div className="space-y-6">
            {products.map((product, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-2xl border border-gray-200 relative group animate-in fade-in slide-in-from-top-2">
                <div className="absolute -left-3 top-6 w-8 h-8 bg-[#2874f0] text-white rounded-full flex items-center justify-center font-black text-xs shadow-lg">
                  {index + 1}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Product Name</label>
                    <input
                      name="name"
                      value={product.name}
                      placeholder="e.g. iPhone 15 Pro Max"
                      className="w-full p-3 rounded-xl border-gray-200 border outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Brand</label>
                    <input
                      name="brand"
                      value={product.brand}
                      placeholder="Apple"
                      className="w-full p-3 rounded-xl border-gray-200 border outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Category</label>
                    <input
                      name="category"
                      value={product.category}
                      placeholder="Mobiles"
                      className="w-full p-3 rounded-xl border-gray-200 border outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Price (₹)</label>
                    <input
                      name="price"
                      type="number"
                      value={product.price}
                      placeholder="79999"
                      className="w-full p-3 rounded-xl border-gray-200 border outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Stock</label>
                    <input
                      name="stock"
                      type="number"
                      value={product.stock}
                      placeholder="100"
                      className="w-full p-3 rounded-xl border-gray-200 border outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Images (Comma separated URLs)</label>
                    <input
                      name="images"
                      value={product.images}
                      placeholder="url1, url2"
                      className="w-full p-3 rounded-xl border-gray-200 border outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                  <div className="col-span-full">
                    <label className="block text-xs font-black text-gray-500 uppercase mb-1">Description</label>
                    <textarea
                      name="description"
                      value={product.description}
                      rows={2}
                      placeholder="Detailed product description..."
                      className="w-full p-3 rounded-xl border-gray-200 border outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                      onChange={(e) => handleChange(index, e)}
                    />
                  </div>
                </div>

                {products.length > 1 && (
                  <button 
                    onClick={() => removeRow(index)}
                    className="absolute -right-3 -top-3 bg-white text-red-500 p-2 rounded-full shadow-md border border-red-100 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <button 
              onClick={addRow}
              className="w-full md:w-auto px-8 py-4 bg-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-5 h-5" /> Add Product Row
            </button>
            
            <button 
              onClick={submitProducts}
              disabled={isLoading}
              className="w-full md:w-auto px-12 py-4 bg-[#2874f0] text-white font-black rounded-2xl shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <PackagePlus className="w-6 h-6" />}
              Submit {products.length} Products to Backend
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
