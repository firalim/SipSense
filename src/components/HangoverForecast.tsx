import React from 'react';
import { Cloud, AlertTriangle } from 'lucide-react';
import { HangoverRisk } from '../types';

interface HangoverForecastProps {
  risk: HangoverRisk | undefined;
}

const HangoverForecast: React.FC<HangoverForecastProps> = ({ risk }) => {
  if (!risk) {
    return (
      <div className="rounded-xl p-4 bg-gray-100">
        <h3 className="font-semibold text-burgundy flex items-center">
          <Cloud size={20} className="mr-2" />
          Hangover Forecast
        </h3>
        <p className="text-sm text-gray-600">No hangover risk data available.</p>
      </div>
    );
  }

  const getBgColor = () => {
    switch (risk.level) {
      case 'low':
        return 'bg-green-100';
      case 'moderate':
        return 'bg-orange-100';
      case 'high':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getTextColor = () => {
    switch (risk.level) {
      case 'low':
        return 'text-green-700';
      case 'moderate':
        return 'text-orange-700';
      case 'high':
        return 'text-red-700';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className={`rounded-xl p-4 ${getBgColor()} transition-all duration-300`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-burgundy flex items-center">
          <Cloud size={20} className="mr-2" />
          Hangover Forecast
        </h3>
        <span className="text-2xl">{risk.emoji}</span>
      </div>
      
      <div className={`flex items-center ${getTextColor()}`}>
        <AlertTriangle size={16} className="mr-2" />
        <p className="text-sm font-medium">{risk.message}</p>
      </div>
      
      <div className="mt-4 flex space-x-1">
        {['low', 'moderate', 'high'].map((level) => (
          <div
            key={level}
            className={`h-2 flex-1 rounded-full ${
              risk.level === level ? 'opacity-100' : 'opacity-30'
            } ${
              level === 'low' ? 'bg-green-500' :
              level === 'moderate' ? 'bg-orange-500' :
              'bg-red-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HangoverForecast;