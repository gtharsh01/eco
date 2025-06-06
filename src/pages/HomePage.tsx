import { useState, useEffect } from 'react';
import { products, getProductsByCategory } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const heroSlides = [
  {
    image: "https://images.pexels.com/photos/1007018/pexels-photo-1007018.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "TRENDY SKIRTS",
    subtitle: "UP TO 50% OFF ON TOP BRANDS",
  },
  {
    image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1600",
    title: "SUMMER COLLECTION",
    subtitle: "NEW ARRIVALS FOR THE SEASON",
  }
];

const featuredCategories = [
  {
    title: "DESIGNER BAGS",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "BRANDED WATCH",
    image: "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "CASUAL SHOES",
    image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    <div className="min-h-screen bg-white">
      {/* Hero Slider */}
      <div className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="space-y-6">
                  <h1 className="text-5xl md:text-7xl font-bold text-white tracking-wider">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white">{slide.subtitle}</p>
                  <button className="bg-white text-black px-8 py-3 rounded-none hover:bg-black hover:text-white transition-colors duration-300">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        >
          <ArrowRight size={20} />
        </button>
      </div>

      {/* Featured Categories */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCategories.map((category, index) => (
            <div
              key={index}
              className="relative h-[200px] overflow-hidden group cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-white tracking-wider">{category.title}</h3>
                  <button className="mt-4 bg-white text-black px-6 py-2 text-sm hover:bg-black hover:text-white transition-colors duration-300">
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Collection */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Our Collection
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Browse our carefully curated collection of premium products designed for everyday excellence.
          </p>
        </div>

        <SearchBar onSearch={setSearchQuery} />

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4 lg:w-1/5">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          <div className="md:w-3/4 lg:w-4/5">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-600">No products found. Try adjusting your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
