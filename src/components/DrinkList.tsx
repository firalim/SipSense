import React from 'react';
import { Beer, Wine, Calendar, Clock, Droplet } from 'lucide-react';
import { Drink } from '../types';

interface DrinkListProps {
  drinks: Drink[];
  waterIntake: number; // Total water intake in ml
}

const DrinkList: React.FC<DrinkListProps> = ({ drinks, waterIntake }) => {
  // Format timestamp to readable time
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get appropriate icon based on item type
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'beer':
        return <Beer size={20} className="text-amber-600" />;
      case 'wine':
        return <Wine size={20} className="text-burgundy" />;
      case 'water':
        return <Droplet size={20} className="text-mint-600" />;
      default:
        return <Wine size={20} className="text-burgundy" />;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-burgundy mb-2">Drink & Hydration History</h2>
        <p className="text-gray-600 text-sm">All drinks and water in your current session</p>
      </div>
      
      {drinks.length > 0 || waterIntake > 0 ? (
        <div className="space-y-4">
          {drinks.map((drink) => (
            <div
              key={drink.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="mr-4">
                {getIcon(drink.type)}
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-burgundy">{drink.brand} {drink.type}</h3>
                <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
                  <span>{drink.abv}% ABV</span>
                  <span>{drink.volume} {drink.volumeUnit}</span>
                  {drink.price && (
                    <span>{drink.currency === 'USD' ? '$' : drink.currency === 'EUR' ? '€' : '£'}{drink.price.toFixed(2)}</span>
                  )}
                  {drink.country && <span>{drink.country}</span>}
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{formatTime(drink.timestamp)}</span>
              </div>
            </div>
          ))}
          
          {waterIntake > 0 && (
            <div
              key="water-intake"
              className="border border-gray-200 rounded-lg p-4 flex items-center bg-mint/10"
            >
              <div className="mr-4">
                <Droplet size={20} className="text-mint-600" />
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium text-burgundy">Water Intake</h3>
                <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
                  <span>{waterIntake} ml</span>
                </div>
              </div>
              
              <div className="text-right text-sm text-gray-500 flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">No drinks or water added yet</p>
      )}
    </div>
  );
};

export default DrinkList;