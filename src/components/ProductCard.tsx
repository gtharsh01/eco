import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Eye } from 'lucide-react';
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
      className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden bg-slate-50">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        </div>
        
        {!product.inStock && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            Out of Stock
          </div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
          <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Link
              to={`/product/${product.id}`}
              className="bg-white text-slate-800 px-4 py-2 rounded-lg shadow-lg flex items-center"
            >
              <Eye size={18} className="mr-2" />
              Quick View
            </Link>
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-center text-amber-400 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} 
              className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'} 
            />
          ))}
          <span className="text-xs text-slate-500 ml-1">({product.reviews})</span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-slate-800 mb-1 hover:text-amber-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-slate-900 font-semibold mb-3">
          ${product.price.toFixed(2)}
        </p>
        
        <button 
          onClick={() => addToCart(product, 1)}
          disabled={!product.inStock}
          className={`w-full py-2 px-4 rounded flex items-center justify-center transition-all duration-300 ${
            product.inStock 
              ? 'bg-slate-800 text-white hover:bg-amber-500 transform hover:-translate-y-0.5' 
              : 'bg-slate-200 text-slate-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={16} className="mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}