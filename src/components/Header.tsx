import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart, getCartTotal, getCartCount, removeFromCart } = useCart();
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-slate-800 flex items-center">
            <span className="text-amber-500 mr-1">Shop</span>
            <span>Elite</span>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">Home</Link></li>
              <li><Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">Shop</Link></li>
              <li><Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">Categories</Link></li>
              <li><Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors">About</Link></li>
            </ul>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-slate-600 hover:text-slate-900 transition-colors">
              <Search size={20} />
            </button>
            <button 
              className="text-slate-600 hover:text-slate-900 transition-colors relative"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart size={20} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>
          </div>
        </div>
        
        <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              <li><Link to="/" className="block text-slate-600 hover:text-slate-900 transition-colors">Home</Link></li>
              <li><Link to="/" className="block text-slate-600 hover:text-slate-900 transition-colors">Shop</Link></li>
              <li><Link to="/" className="block text-slate-600 hover:text-slate-900 transition-colors">Categories</Link></li>
              <li><Link to="/" className="block text-slate-600 hover:text-slate-900 transition-colors">About</Link></li>
            </ul>
            <div className="mt-4 flex items-center space-x-4">
              <button className="text-slate-600 hover:text-slate-900 transition-colors">
                <Search size={20} />
              </button>
              <button 
                className="text-slate-600 hover:text-slate-900 transition-colors relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart size={20} />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </button>
            </div>
          </nav>
        </div>
      )}
      
      {/* Cart dropdown */}
      {isCartOpen && (
        <div className="absolute right-4 top-16 bg-white shadow-xl rounded-lg w-80 z-50 overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Your Cart ({getCartCount()} items)</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {cart.length === 0 ? (
              <div className="p-4 text-center text-slate-500">
                Your cart is empty
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="p-4 border-b flex">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <div className="flex justify-between mt-1">
                        <p className="text-sm text-slate-500">{item.quantity} × ${item.price.toFixed(2)}</p>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="p-4 border-t">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total:</span>
              <span className="font-medium">${getCartTotal().toFixed(2)}</span>
            </div>
            <button 
              disabled={cart.length === 0}
              className={`w-full py-2 rounded-lg transition-colors ${
                cart.length === 0 
                  ? 'bg-slate-200 text-slate-500 cursor-not-allowed' 
                  : 'bg-amber-500 text-white hover:bg-amber-600'
              }`}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </header>
  );
}