import React, { useState } from 'react';
import { Beer, Wine, Droplet, DollarSign, MapPin, Plus } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { Drink } from '../types';
import toast from 'react-hot-toast';

// Mock data for auto-suggestions
const ALCOHOL_TYPES = ['Beer', 'Wine', 'Vodka', 'Whiskey', 'Gin', 'Rum', 'Tequila', 'Brandy', 'Cocktail'];

const BRANDS = {
  Beer: ['Heineken', 'Budweiser', 'Corona', 'Guinness', 'Stella Artois'],
  Wine: ['Yellow Tail', 'Barefoot', 'Robert Mondavi', 'Chateau Margaux', 'Dom Perignon'],
  Vodka: ['Absolut', 'Grey Goose', 'Smirnoff', 'Belvedere', 'Stolichnaya'],
  Whiskey: ['Jack Daniel\'s', 'Johnnie Walker', 'Jameson', 'Crown Royal', 'Maker\'s Mark'],
  Gin: ['Bombay Sapphire', 'Tanqueray', 'Hendrick\'s', 'Beefeater', 'Gordon\'s'],
  Rum: ['Bacardi', 'Captain Morgan', 'Malibu', 'Havana Club', 'Kraken'],
  Tequila: ['Jose Cuervo', 'Patrón', 'Don Julio', 'Casamigos', 'Herradura'],
  Brandy: ['Hennessy', 'Rémy Martin', 'Courvoisier', 'Martell', 'E&J'],
  Cocktail: ['Margarita', 'Mojito', 'Old Fashioned', 'Cosmopolitan', 'Piña Colada']
};

const ABV_DATA = {
  Beer: { min: 4, max: 8 },
  Wine: { min: 11, max: 14 },
  Vodka: { min: 37.5, max: 40 },
  Whiskey: { min: 40, max: 46 },
  Gin: { min: 37.5, max: 47.3 },
  Rum: { min: 37.5, max: 40 },
  Tequila: { min: 38, max: 40 },
  Brandy: { min: 35, max: 60 },
  Cocktail: { min: 10, max: 20 }
};

interface DrinkInputProps {
  onAddDrink: (drink: Drink) => void;
}

const DrinkInput: React.FC<DrinkInputProps> = ({ onAddDrink }) => {
  const [drink, setDrink] = useState<Omit<Drink, 'id' | 'timestamp'>>({
    type: '',
    brand: '',
    abv: 5,
    volume: 330,
    volumeUnit: 'ml',
    price: undefined,
    currency: 'USD',
    country: undefined
  });
  
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (name === 'type') {
      // Reset brand when changing type
      setDrink({
        ...drink,
        type: value,
        brand: '',
        abv: ABV_DATA[value as keyof typeof ABV_DATA]?.min || 5
      });
    } else {
      setDrink({
        ...drink,
        [name]: type === 'number' ? Number(value) : value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!drink.type || !drink.brand || drink.abv <= 0 || drink.volume <= 0) {
      toast.error("Please fill out all required fields");
      return;
    }

    const newDrink: Drink = {
      ...drink,
      id: uuidv4(),
      timestamp: Date.now()
    };

    onAddDrink(newDrink);
    toast.success(`Added ${drink.brand} ${drink.type}`);
  };

  const selectBrand = (brand: string) => {
    setDrink({
      ...drink,
      brand,
    });
    setShowBrandSuggestions(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8 transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-burgundy mb-2">What are you drinking?</h2>
        <p className="text-gray-600">Tell us about your drink to get personalized insights</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <Beer size={18} className="mr-2" />
              Alcohol Type
            </label>
            <select
              name="type"
              value={drink.type}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
              required
            >
              <option value="" disabled>Select alcohol type</option>
              {ALCOHOL_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div className="space-y-2 relative">
            <label className="flex items-center text-burgundy font-medium">
              <Wine size={18} className="mr-2" />
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={drink.brand}
              onChange={handleChange}
              onFocus={() => drink.type && setShowBrandSuggestions(true)}
              onBlur={() => setTimeout(() => setShowBrandSuggestions(false), 200)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
              placeholder="Enter brand name"
              required
            />
            
            {showBrandSuggestions && drink.type && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {BRANDS[drink.type as keyof typeof BRANDS]?.map(brand => (
                  <div
                    key={brand}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onMouseDown={() => selectBrand(brand)}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <Droplet size={18} className="mr-2" />
              Alcohol by Volume (ABV %)
            </label>
            <input
              type="number"
              name="abv"
              min="0.1"
              max="99"
              step="0.1"
              value={drink.abv}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
              required
            />
            <p className="text-xs text-gray-500">
              {drink.type && `Typical range for ${drink.type}: ${ABV_DATA[drink.type as keyof typeof ABV_DATA]?.min}%-${ABV_DATA[drink.type as keyof typeof ABV_DATA]?.max}%`}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <Droplet size={18} className="mr-2" />
              Volume
            </label>
            <div className="flex">
              <input
                type="number"
                name="volume"
                min="1"
                value={drink.volume}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
                required
              />
              <select
                name="volumeUnit"
                value={drink.volumeUnit}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-r-lg px-3 focus:ring-2 focus:ring-mint focus:border-mint transition"
              >
                <option value="ml">ml</option>
                <option value="oz">oz</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <DollarSign size={18} className="mr-2" />
              Price (optional)
            </label>
            <div className="flex">
              <select
                name="currency"
                value={drink.currency}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-l-lg px-3 focus:ring-2 focus:ring-mint focus:border-mint transition"
              >
                <option value="USD">$</option>
                <option value="EUR">€</option>
                <option value="GBP">£</option>
              </select>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={drink.price || ''}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
                placeholder="Enter price"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <MapPin size={18} className="mr-2" />
              Country of Origin (optional)
            </label>
            <input
              type="text"
              name="country"
              value={drink.country || ''}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
              placeholder="Enter country"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-burgundy text-cream p-4 rounded-lg font-medium hover:bg-burgundy-dark transition-colors duration-200 flex items-center justify-center"
        >
          <Plus size={20} className="mr-2" />
          <span>Add Drink & See Results</span>
        </button>
      </form>
    </div>
  );
};

export default DrinkInput;