import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2 } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium text-slate-800 mb-4">Product not found</h1>
        <button 
          onClick={() => navigate('/')}
          className="inline-flex items-center text-amber-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to products
        </button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => navigate('/')}
        className="inline-flex items-center text-amber-500 hover:text-amber-600 transition-colors mb-8"
      >
        <ArrowLeft size={16} className="mr-2" />
        Back to products
      </button>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Image */}
        <div className="lg:w-1/2">
          <div className="aspect-square overflow-hidden rounded-lg bg-slate-50">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Product Info */}
        <div className="lg:w-1/2">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-slate-900 mb-4">${product.price.toFixed(2)}</p>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center text-amber-400 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                    className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <span className="text-slate-600 text-sm">{product.reviews} reviews</span>
            </div>
            
            <p className="text-slate-600 mb-8 leading-relaxed">
              {product.description}
            </p>
            
            <div className="mb-8">
              <div className="flex items-center">
                <span className="text-slate-700 mr-4">Quantity</span>
                <div className="flex items-center border border-slate-200 rounded">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(prev - 1, 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center text-slate-600 hover:bg-slate-50"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center transition-colors ${
                  product.inStock 
                    ? 'bg-slate-800 text-white hover:bg-amber-500' 
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                <ShoppingCart size={18} className="mr-2" />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <Heart size={18} />
              </button>
              
              <button className="w-12 h-12 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-200">
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-slate-600 font-medium block mb-1">Category</span>
                  <span className="capitalize">{product.category}</span>
                </div>
                <div>
                  <span className="text-slate-600 font-medium block mb-1">Availability</span>
                  <span className={product.inStock ? 'text-green-600' : 'text-red-500'}>
                    {product.inStock ? 'In stock' : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}