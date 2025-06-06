import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Leather Backpack',
    price: 129.99,
    description: 'Handcrafted from genuine leather, this backpack features multiple compartments, padded laptop sleeve, and adjustable straps for ultimate comfort. Perfect for daily commute or weekend getaways.',
    imageUrl: 'https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'accessories',
    rating: 4.8,
    reviews: 124,
    inStock: true,
  },
  {
    id: '2',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 249.99,
    description: 'Experience premium sound with these wireless headphones featuring active noise cancellation, 30-hour battery life, and ergonomic design for all-day comfort.',
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'electronics',
    rating: 4.7,
    reviews: 283,
    inStock: true,
  },
  {
    id: '3',
    name: 'Minimalist Stainless Steel Watch',
    price: 189.99,
    description: 'Elegant timepiece with a 40mm stainless steel case, sapphire crystal, and Japanese movement. Water-resistant up to 50m and comes with a genuine leather strap.',
    imageUrl: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'accessories',
    rating: 4.6,
    reviews: 98,
    inStock: true,
  },
  {
    id: '4',
    name: 'Organic Cotton T-Shirt',
    price: 34.99,
    description: 'Made from 100% organic cotton, this comfortable t-shirt features a relaxed fit and is available in various colors. Ethically produced and environmentally friendly.',
    imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'clothing',
    rating: 4.5,
    reviews: 156,
    inStock: true,
  },
  {
    id: '5',
    name: 'Smart Fitness Tracker',
    price: 99.99,
    description: 'Track your health and fitness goals with this advanced tracker. Features include heart rate monitoring, sleep analysis, workout tracking, and smartphone notifications.',
    imageUrl: 'https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'electronics',
    rating: 4.4,
    reviews: 211,
    inStock: false,
  },
  {
    id: '6',
    name: 'Ceramic Pour-Over Coffee Maker',
    price: 64.99,
    description: 'Brew the perfect cup of coffee with this elegant ceramic pour-over. Includes a reusable stainless steel filter and precise water flow design for optimal extraction.',
    imageUrl: 'https://images.pexels.com/photos/3020919/pexels-photo-3020919.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'home',
    rating: 4.9,
    reviews: 78,
    inStock: true,
  },
  {
    id: '7',
    name: 'Sustainable Bamboo Sunglasses',
    price: 79.99,
    description: 'Stylish sunglasses crafted from sustainable bamboo with polarized lenses. Lightweight, durable, and eco-friendly with UV400 protection.',
    imageUrl: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'accessories',
    rating: 4.3,
    reviews: 65,
    inStock: true,
  },
  {
    id: '8',
    name: 'Handcrafted Ceramic Planter',
    price: 42.99,
    description: 'Beautiful handcrafted ceramic planter perfect for indoor plants. Each piece is unique with a minimalist design that complements any home décor.',
    imageUrl: 'https://images.pexels.com/photos/1005058/pexels-photo-1005058.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'home',
    rating: 4.7,
    reviews: 92,
    inStock: true,
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'home', name: 'Home & Living' },
];