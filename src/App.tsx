import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="min-h-screen bg-slate-50 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
              </Routes>
            </main>
            <footer className="bg-slate-800 text-white py-12">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Shop Elite</h3>
                    <p className="text-slate-300 text-sm">
                      Providing quality products since 2025. Your satisfaction is our priority.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Shop</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">All Products</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">Featured</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">New Arrivals</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">Sale</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Company</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">About Us</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">Careers</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">Contact</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">Terms & Conditions</a></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider mb-4">Customer Service</h4>
                    <ul className="space-y-2">
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">FAQ</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">Shipping & Returns</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">Privacy Policy</a></li>
                      <li><a href="#" className="text-slate-300 hover:text-white text-sm">Support</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-700 text-center text-slate-400 text-sm">
                  &copy; {new Date().getFullYear()} Shop Elite. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;