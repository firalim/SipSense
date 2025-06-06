import React, { useState } from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

interface HydrationBuddyProps {
  waterIntake: number;
  onWaterAdd: (amount: number) => void;
}

const HydrationBuddy: React.FC<HydrationBuddyProps> = ({ waterIntake, onWaterAdd }) => {
  const [amount, setAmount] = useState(250); // Default to 250ml
  
  const handleAddWater = () => {
    onWaterAdd(amount);
    toast.success(`Added ${amount}ml of water! 💧`);
  };

  const effectiveWaterIntake = isNaN(waterIntake) ? 0 : waterIntake;
  const totalLiters = effectiveWaterIntake / 1000;
  const fillPercentage = Math.min((totalLiters / 2) * 100, 100); // Assuming 2L daily goal

  return (
    <div className="bg-mint/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-burgundy flex items-center">
          <Droplet size={20} className="mr-2" />
          Hydration Buddy
        </h3>
        <span className="text-2xl">💧</span>
      </div>
      
      <div className="relative h-32 w-20 mx-auto mb-4 bg-white rounded-full overflow-hidden border-2 border-mint">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-mint transition-all duration-500 ease-out"
          style={{ height: `${fillPercentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-burgundy">
            {totalLiters.toFixed(1)}L
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setAmount(Math.max(50, amount - 50))}
          className="p-2 rounded-full bg-mint/20 text-burgundy hover:bg-mint/30 transition-colors"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(50, Math.min(1000, Number(e.target.value))))

System: The input was cut off, but I can continue with the updates to `HydrationBuddy.tsx` and ensure the water intake display and history are correctly updated. Let's complete the `HydrationBuddy.tsx` file and address the issue of water intake not being reflected in the UI.

### Completing and Updating `HydrationBuddy.tsx`
The `HydrationBuddy` component needs to ensure the `waterIntake` prop is handled robustly, and we should also log water intake events with timestamps to improve the history display in `DrinkList`. We'll store water intake events in `App.tsx` and pass them to `DrinkList`.

<xaiArtifact artifact_id="bfb1f237-9c9c-4c7c-bad1-a33dbf23303a" artifact_version_id="7d3c8e36-463c-4a3d-95d1-d809574455a7" title="HydrationBuddy.tsx" contentType="text/typescript">
```tsx
import React, { useState } from 'react';
import { Droplet, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

interface HydrationBuddyProps {
  waterIntake: number;
  onWaterAdd: (amount: number) => void;
}

const HydrationBuddy: React.FC<HydrationBuddyProps> = ({ waterIntake, onWaterAdd }) => {
  const [amount, setAmount] = useState(250); // Default to 250ml
  
  const handleAddWater = () => {
    onWaterAdd(amount);
    toast.success(`Added ${amount}ml of water! 💧`);
  };

  const effectiveWaterIntake = isNaN(waterIntake) ? 0 : waterIntake;
  const totalLiters = effectiveWaterIntake / 1000;
  const fillPercentage = Math.min((totalLiters / 2) * 100, 100); // Assuming 2L daily goal

  return (
    <div className="bg-mint/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-burgundy flex items-center">
          <Droplet size={20} className="mr-2" />
          Hydration Buddy
        </h3>
        <span className="text-2xl">💧</span>
      </div>
      
      <div className="relative h-32 w-20 mx-auto mb-4 bg-white rounded-full overflow-hidden border-2 border-mint">
        <div 
          className="absolute bottom-0 left-0 right-0 bg-mint transition-all duration-500 ease-out"
          style={{ height: `${fillPercentage}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-burgundy">
            {totalLiters.toFixed(1)}L
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-2 mb-4">
        <button
          onClick={() => setAmount(Math.max(50, amount - 50))}
          className="p-2 rounded-full bg-mint/20 text-burgundy hover:bg-mint/30 transition-colors"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Math.max(50, Math.min(1000, Number(e.target.value))))}
          className="w-20 text-center p-2 border border-mint rounded-lg"
          step="50"
        />
        <button
          onClick={() => setAmount(Math.min(1000, amount + 50))}
          className="p-2 rounded-full bg-mint/20 text-burgundy hover:bg-mint/30 transition-colors"
        >
          <Plus size={16} />
        </button>
      </div>
      
      <button
        onClick={handleHandleWater}
        className="w-full bg-mint text-white py-2 rounded-lg hover:bg-mint/90 transition-colors"
      >
        Add Water
      </button>
    </div>
  );
};

export default HydrationBuddy;