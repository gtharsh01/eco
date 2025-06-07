import { useState, useEffect } from 'react';
import { products, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { ArrowRight, ArrowLeft, Star, Truck, Shield, Headphones, RotateCcw, Sparkles, TrendingUp, Gift } from 'lucide-react';

const heroSlides = [
  {
    image: "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "SUMMER VIBES",
    subtitle: "UP TO 70% OFF ON TRENDING STYLES",
    gradient: "from-pink-500 via-purple-500 to-indigo-600",
    buttonColor: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
  },
  {
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "TECH REVOLUTION",
    subtitle: "DISCOVER THE LATEST GADGETS",
    gradient: "from-blue-500 via-cyan-500 to-teal-600",
    buttonColor: "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
  },
  {
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "LUXURY COLLECTION",
    subtitle: "PREMIUM QUALITY, UNMATCHED STYLE",
    gradient: "from-amber-500 via-orange-500 to-red-600",
    buttonColor: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
  }
];

const featuredCategories = [
  {
    title: "DESIGNER BAGS",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600",
    gradient: "from-pink-400 to-rose-600",
    icon: <Sparkles className="w-6 h-6" />
  },
  {
    title: "SMART WATCHES",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
    gradient: "from-blue-400 to-indigo-600",
    icon: <TrendingUp className="w-6 h-6" />
  },
  {
    title: "PREMIUM SHOES",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1600",
    gradient: "from-purple-400 to-pink-600",
    icon: <Star className="w-6 h-6" />
  }
];

const features = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Free Shipping",
    description: "Free delivery on orders over $50",
    color: "from-green-400 to-emerald-600"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure Payment",
    description: "100% secure payment processing",
    color: "from-blue-400 to-cyan-600"
  },
  {
    icon: <RotateCcw className="w-8 h-8" />,
    title: "Easy Returns",
    description: "30-day hassle-free returns",
    color: "from-purple-400 to-violet-600"
  },
  {
    icon: <Headphones className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Round-the-clock customer service",
    color: "from-orange-400 to-red-600"
  }
];

const testimonials = [
  {
    name: "Sarah Johnson",
    rating: 5,
    comment: "Amazing quality and fast delivery! Love shopping here.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Mike Chen",
    rating: 5,
    comment: "Best customer service I've ever experienced. Highly recommended!",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150"
  },
  {
    name: "Emily Davis",
    rating: 5,
    comment: "The products exceeded my expectations. Will definitely shop again!",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150"
  }
];

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let result = selectedCategory === 'all' ? products : getProductsByCategory(selectedCategory);
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    setFilteredProducts(result);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Slider */}
      <div className="relative h-[700px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ${
              currentSlide === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-80`} />
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="space-y-8 max-w-4xl px-4">
                  <div className="space-y-4">
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-wider drop-shadow-2xl">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-medium">{slide.subtitle}</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className={`${slide.buttonColor} text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl`}>
                      SHOP NOW
                    </button>
                    <button className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 border-2 border-white/30">
                      EXPLORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slider Controls */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-all duration-300 text-white"
        >
          <ArrowRight size={24} />
        </button>
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gradient-to-r from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-800 mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Featured Categories
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover our handpicked collections designed for the modern lifestyle
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => (
              <div
                key={index}
                className="relative h-[350px] overflow-hidden rounded-3xl group cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-2xl"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-70 group-hover:opacity-60 transition-all duration-300`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                    <div className="mb-4 text-white">
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-black text-white tracking-wider mb-4">{category.title}</h3>
                    <button className="bg-white text-slate-800 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-all duration-300 transform hover:scale-105">
                      EXPLORE
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Special Offer Banner */}
      <div className="py-16 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Gift className="w-16 h-16 text-white animate-bounce" />
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">
              MEGA SALE EVENT
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Limited time offer! Get up to 80% off on selected items
            </p>
            <button className="bg-white text-purple-600 px-12 py-4 rounded-full font-black text-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              SHOP THE SALE
            </button>
          </div>
        </div>
      </div>

      {/* Product Collection */}
      <div className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-slate-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Our Premium Collection
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Browse our carefully curated collection of premium products designed for everyday excellence and extraordinary moments.
            </p>
          </div>

          <div className="mb-12">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-purple-100">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
              </div>
            </div>

            <div className="lg:w-3/4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-xl text-slate-600 mb-4">No products found</p>
                  <p className="text-slate-500">Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="transform hover:scale-105 transition-all duration-300">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="py-20 bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black text-white mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who love shopping with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 italic">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-black text-white mb-4">
              Stay in the Loop
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Subscribe to get special offers, free giveaways, and exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-slate-800 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}