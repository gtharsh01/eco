import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
        <div className="relative bg-white rounded-2xl p-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for amazing products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full py-4 pl-14 pr-20 rounded-xl bg-white border-2 border-transparent focus:border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-slate-700 placeholder-slate-400"
            />
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400" size={20} />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Sparkles size={16} />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}