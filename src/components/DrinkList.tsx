import React from 'react';
import { Beer, Wine, Calendar, Clock, Droplet } from 'lucide-react';
import { Drink } from '../types';

interface DrinkListProps {
  drinks: Drink[];
  waterIntake: number; // Total water intake in ml
  waterIntakeEvents: { amount: number; timestamp: number }[];
}

const DrinkList: React.FC<DrinkListProps> = ({ drinks, waterIntake, waterIntakeEvents }) => {
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

  // Combine drinks and water intake events into a single timeline
  const timelineItems = [
    ...drinks.map(drink => ({ type: drink.type, brand: drink.brand, abv: drink.abv, volume: drink.volume, volumeUnit: drink.volumeUnit, price: drink.price, currency: drink.currency, country: drink.country, timestamp: drink.timestamp, isDrink: true })),
    ...waterIntakeEvents.map(event => ({ type: 'water', amount: event.amount, timestamp: event.timestamp, isDrink: false }))
  ].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-burgundy mb-2">Drink & Hydration History</h2>
        <p className="text-gray-600 text-sm">All drinks and water in your current session</p>
      </div>
      
      {timelineItems.length > 0 ? (
        <div className="space-y-4">
          {timelineItems.map((item, index) => (
            item.isDrink ? (
              <div
                key={`drink-${index}`}
                className="border border-gray-200 rounded-lg p-4 flex items-center hover:bg-gray-50 transition-colors"
              >
                <div className="mr-4">
                  {getIcon(item.type)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-burgundy">{item.brand} {item.type}</h3>
                  <div className="flex flex-wrap gap-x-4 text-sm text-gray-600消息 mt-1">
                    <span>{item.abv}% ABV</span>
                    <span>{item.volume} {item.volumeUnit}</span>
                    {item.price && (
                      <span>{item.currency === 'USD' ? '$' : item.currency === 'EUR' ? '€' : '£'}{item.price.toFixed(2)}</span>
                    )}
                    {item.country && <span>{item.country}</span>}
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-500 flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{formatTime(item.timestamp)}</span>
                </div>
              </div>
            ) : (
              <div
                key={`water-${index}`}
                className="border border-gray-200 rounded-lg p-4 flex items-center bg-mint/10"
              >
                <div className="mr-4">
                  <Droplet size={20} className="text-mint-600" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-burgundy">Water Intake</h3>
                  <div className="flex flex-wrap gap-x-4 text-sm text-gray-600 mt-1">
                    <span>{item.amount} ml</span>
                  </div>
                </div>
                
                <div className="text-right text-sm text-gray-500 flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{formatTime(item.timestamp)}</span>
                </div>
              </div>
            )
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-4">No drinks or water added yet</p>
      )}
    </div>
  );
};

export default DrinkList;