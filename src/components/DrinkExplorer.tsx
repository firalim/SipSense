import React, { useState } from 'react';
import { GlobeIcon, Search, Filter, DollarSign } from 'lucide-react';

const drinkCategories = [
  {
    id: 'beer',
    name: 'Beer',
    description: 'Discover craft beers from around the world',
    image: 'https://images.pexels.com/photos/1552630/pexels-photo-1552630.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'wine',
    name: 'Wine',
    description: 'Explore vintages from renowned wine regions',
    image: 'https://images.pexels.com/photos/2912882/pexels-photo-2912882.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'spirits',
    name: 'Spirits',
    description: 'Premium whiskeys, vodkas, and more',
    image: 'https://images.pexels.com/photos/602750/pexels-photo-602750.jpeg?auto=compress&cs=tinysrgb&w=600'
  },
  {
    id: 'cocktails',
    name: 'Cocktails',
    description: 'Classic and creative mixed drinks',
    image: 'https://images.pexels.com/photos/4051251/pexels-photo-4051251.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
];

const regions = [
  { id: 'europe', name: 'Europe' },
  { id: 'northamerica', name: 'North America' },
  { id: 'southamerica', name: 'South America' },
  { id: 'asia', name: 'Asia' },
  { id: 'australia', name: 'Australia & Oceania' },
  { id: 'africa', name: 'Africa' }
];

const DrinkExplorer: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-burgundy mb-2">Discover Drinks</h2>
          <p className="text-gray-600">Explore alcoholic beverages from around the world</p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, country, or type..."
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
            />
          </div>
          
          <div className="md:w-40">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
            >
              <option value="">All Regions</option>
              {regions.map(region => (
                <option key={region.id} value={region.id}>{region.name}</option>
              ))}
            </select>
          </div>
          
          <div className="md:w-40">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
            >
              <option value="">Price Range</option>
              <option value="budget">Budget (💰)</option>
              <option value="mid">Mid-range (💰💰)</option>
              <option value="premium">Premium (💰💰💰)</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {drinkCategories.map(category => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-xl overflow-hidden shadow-md cursor-pointer transition-all transform hover:-translate-y-1 hover:shadow-lg ${
                selectedCategory === category.id ? 'ring-2 ring-burgundy' : ''
              }`}
            >
              <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url(${category.image})` }}></div>
              <div className="p-4 bg-white">
                <h3 className="font-semibold text-burgundy">{category.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto transition-all duration-300 hover:shadow-xl">
        <div className="flex items-center mb-4">
          <GlobeIcon size={20} className="text-burgundy mr-2" />
          <h2 className="text-xl font-bold text-burgundy">Featured Regions</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {regions.map(region => (
            <div
              key={region.id}
              className="bg-gray-100 rounded-lg p-3 text-center cursor-pointer hover:bg-mint/20 transition-colors"
            >
              {region.name}
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center text-gray-500 py-8">
          <p className="mb-2">Select a category and region to explore drinks</p>
          <p className="text-sm">Coming soon: Detailed drink information and recommendations</p>
        </div>
      </div>
    </div>
  );
};

export default DrinkExplorer;