import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  return (
    <div
      className={`group relative transition-all duration-500 ${
        isHovered ? 'transform scale-105' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-purple-100">
        <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Stock Badge */}
            {!product.inStock && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                Out of Stock
              </div>
            )}
            
            {/* Sale Badge */}
            {product.inStock && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                <Zap size={12} className="mr-1" />
                HOT
              </div>
            )}
          </div>

          {/* Hover Action Panel */}
          {product.inStock && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white via-white to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex justify-center space-x-3">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product, 1);
                  }}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                >
                  <ShoppingCart size={18} />
                </button>
                <button
                  onClick={(e) => e.preventDefault()}
                  className="bg-gradient-to-r from-red-400 to-pink-500 text-white p-3 rounded-full hover:from-red-500 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div className="p-6">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-lg font-bold text-slate-800 hover:text-purple-600 transition-colors duration-300 mb-2 line-clamp-2">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center justify-between mb-3">
            <p className="text-2xl font-black text-slate-900 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </p>
            
            {/* Rating */}
            <div className="flex items-center gap-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <span className="text-sm text-slate-500 ml-1">({product.reviews})</span>
            </div>
          </div>
          
          {/* Quick Add Button for Mobile */}
          {product.inStock && (
            <button
              onClick={() => addToCart(product, 1)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 rounded-xl font-bold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg md:hidden"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}