import React from 'react';
import { Beer, Wine, Calendar, Clock } from 'lucide-react';
import { Drink } from '../types';

interface DrinkListProps {
  drinks: Drink[];
}

const DrinkList: React.FC<DrinkListProps> = ({ drinks }) => {
  // Format timestamp to readable time
  const formatTime = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get appropriate icon for drink type
  const getDrinkIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'beer':
        return <Beer size={20} className="text-amber-600" />;
      case 'wine':
        return <Wine size={20} className="text-burgundy" />;
      default:
        return <Wine size={20} className="text-burgundy" />;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-burgundy mb-2">Drink History</h2>
        <p className="text-gray-600 text-sm">All drinks in your current session</p>
      </div>
      
      {drinks.length > 0 ? (
        <div className="space-y-4">
          {drinks.map(drink => (
            <div 
              key={drink.id}
              className="border border-gray-200 rounded-lg p-4 flex items-center hover:bg-gray-50 transition-colors"
            >
              <div className="mr-4">
                {getDrinkIcon(drink.type)}
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
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">No drinks added yet</p>
      )}
    </div>
  );
};

export default DrinkList;