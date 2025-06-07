import React from 'react';
import { categories } from '../data/products';
import { Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Sparkles className="w-5 h-5 text-purple-500 mr-2" />
        <h2 className="text-xl font-bold text-slate-800">Categories</h2>
      </div>
      <div className="space-y-3">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === category.id
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                : 'bg-slate-50 text-slate-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 hover:text-purple-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}