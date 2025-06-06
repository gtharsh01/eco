import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
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
      className={`group relative transition-shadow duration-300 ${isHovered ? 'shadow-2xl' : 'shadow'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-center space-x-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                addToCart(product, 1);
              }}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart size={20} />
            </button>
            <button 
              onClick={(e) => e.preventDefault()}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </Link>
      
      <div className="text-center mt-4">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-medium text-gray-800 hover:text-black transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-gray-900 font-semibold">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
