import React, { useState, useEffect } from 'react';
import { RefreshCw, Clock, Droplet } from 'lucide-react';
import { UserProfile, Drink, BACResult } from '../types';
import { calculateBAC, getRecommendation } from '../utils/alcoholCalculator';
import BACGauge from './BACGauge';
import DrinkList from './DrinkList';
import SoberCountdown from './SoberCountdown';

interface DashboardProps {
  userProfile: UserProfile;
  drinks: Drink[];
  onReset: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userProfile, drinks, onReset }) => {
  const [bacResult, setBacResult] = useState<BACResult | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Recalculate BAC periodically
  useEffect(() => {
    if (drinks.length === 0) {
      setBacResult(null);
      return;
    }

    const calculateCurrentBAC = () => {
      const now = Date.now();
      setCurrentTime(now);
      
      const result = calculateBAC(userProfile, drinks, now);
      setBacResult(result);
    };

    calculateCurrentBAC();
    
    // Update BAC every minute
    const interval = setInterval(calculateCurrentBAC, 60000);
    
    return () => clearInterval(interval);
  }, [userProfile, drinks]);

  if (drinks.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
        <div className="py-8">
          <Beer size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-burgundy mb-2">No drinks added yet</h2>
          <p className="text-gray-600 mb-6">Head over to the Drinks tab to add what you're drinking</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-burgundy mb-2">Your Drinking Dashboard</h2>
          <p className="text-gray-600">Based on your profile and current drinks</p>
        </div>

        {bacResult && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-burgundy mb-4">Blood Alcohol Content</h3>
              <BACGauge bac={bacResult.bac} recommendation={bacResult.recommendation} />
              <div className="mt-4 text-center">
                <p className="text-xl font-bold">
                  {bacResult.bac.toFixed(3)}%
                </p>
                <p className={`mt-2 font-medium ${
                  bacResult.recommendation === 'good' ? 'text-green-600' : 
                  bacResult.recommendation === 'moderate' ? 'text-amber-600' : 
                  'text-red-600'
                }`}>
                  {bacResult.message}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-burgundy mb-4 text-center md:text-left">Time Until Sober</h3>
              <div className="flex-1 flex items-center justify-center">
                <SoberCountdown soberTime={bacResult.soberTime} currentTime={currentTime} />
              </div>
            </div>
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-mint/10 rounded-lg p-4 flex-1 min-w-[200px]">
            <h3 className="text-burgundy font-medium mb-2 flex items-center">
              <Droplet size={16} className="mr-1" /> Tip
            </h3>
            <p className="text-sm">
              Remember to drink water between alcoholic drinks to stay hydrated and reduce alcohol's effects.
            </p>
          </div>
          <div className="bg-gold/10 rounded-lg p-4 flex-1 min-w-[200px]">
            <h3 className="text-burgundy font-medium mb-2 flex items-center">
              <Clock size={16} className="mr-1" /> Remember
            </h3>
            <p className="text-sm">
              Your body processes about one standard drink per hour. Pace yourself for a better experience.
            </p>
          </div>
        </div>
        
        <button
          onClick={onReset}
          className="flex items-center justify-center mx-auto mt-6 px-4 py-2 bg-burgundy/10 text-burgundy rounded-lg hover:bg-burgundy/20 transition-colors"
        >
          <RefreshCw size={16} className="mr-2" />
          Reset Tracking Session
        </button>
      </div>
      
      <DrinkList drinks={drinks} />
    </div>
  );
};

export default Dashboard;