import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface SoberCountdownProps {
  soberTime: number;  // Minutes until sober
  currentTime: number; // Current timestamp
}

const SoberCountdown: React.FC<SoberCountdownProps> = ({ soberTime, currentTime }) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  
  useEffect(() => {
    if (soberTime <= 0) {
      setTimeRemaining('You are sober!');
      return;
    }
    
    // Convert minutes to milliseconds and add to current time
    const soberTimestamp = currentTime + (soberTime * 60 * 1000);
    
    const formatTimeRemaining = () => {
      const now = Date.now();
      const diff = soberTimestamp - now;
      
      if (diff <= 0) {
        setTimeRemaining('You are sober!');
        return;
      }
      
      // Calculate hours, minutes, seconds
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      const formattedTime = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');
      
      setTimeRemaining(formattedTime);
    };
    
    formatTimeRemaining();
    const interval = setInterval(formatTimeRemaining, 1000);
    
    return () => clearInterval(interval);
  }, [soberTime, currentTime]);
  
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 rounded-full w-28 h-28 flex items-center justify-center mb-4">
        <Clock size={48} className="text-burgundy" />
      </div>
      <p className="text-xl font-bold mb-1">{timeRemaining}</p>
      <p className="text-sm text-gray-600">
        {soberTime <= 0 
          ? 'Based on our calculations'
          : 'Until you\'re fully sober'}
      </p>
    </div>
  );
};

export default SoberCountdown;