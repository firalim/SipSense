import React, { useState } from 'react';
import { User, Ruler, Weight, Heart } from 'lucide-react';
import { UserProfile } from '../types';
import toast from 'react-hot-toast';
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const [profile, setProfile] = useState<UserProfile>({
    age: 25,
    height: 170,
    heightUnit: 'cm',
    weight: 70,
    weightUnit: 'kg',
    gender: 'male',
    tolerance: 2, // Changed to number for slider
    waterIntake: 0,
    challengeModeEnabled: false,
    streakDays: 0,
    achievements: [],
    friends: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setProfile({
      ...profile,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSliderChange = (value: number[]) => {
    setProfile({
      ...profile,
      tolerance: value[0],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profile.age < 18) {
      toast.error("You must be at least 18 years old to use this app");
      return;
    }
    
    if (profile.weight <= 0 || profile.height <= 0) {
      toast.error("Please enter valid height and weight");
      return;
    }

    // Map tolerance number to string for consistency with other components
    const toleranceMap: { [key: number]: 'low' | 'medium' | 'high' } = {
      1: 'low',
      2: 'low',
      3: 'medium',
      4: 'high',
      5: 'high',
    };
    const finalProfile: UserProfile = {
      ...profile,
      tolerance: toleranceMap[profile.tolerance as number] || 'medium',
    };

    onSubmit(finalProfile);
    toast.success("Profile saved! Now let's track your drinks");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto mb-8 transition-all duration-300 hover:shadow-xl">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-burgundy mb-2">Welcome to SipSense</h2>
        <p className="text-gray-600">Let's get to know you to provide personalized drink recommendations</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <User size={18} className="mr-2" /> 
              Age
            </label>
            <input
              type="number"
              name="age"
              min="18"
              max="120"
              value={profile.age}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
              required
            />
            <p className="text-xs text-gray-500">Must be at least 18 years old</p>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <Ruler size={18} className="mr-2" />
              Height
            </label>
            <div className="flex">
              <input
                type="number"
                name="height"
                min="1"
                value={profile.height}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
                required
              />
              <select
                name="heightUnit"
                value={profile.heightUnit}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-r-lg px-3 focus:ring-2 focus:ring-mint focus:border-mint transition"
              >
                <option value="cm">cm</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <Weight size={18} className="mr-2" />
              Weight
            </label>
            <div className="flex">
              <input
                type="number"
                name="weight"
                min="1"
                value={profile.weight}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
                required
              />
              <select
                name="weightUnit"
                value={profile.weightUnit}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 rounded-r-lg px-3 focus:ring-2 focus:ring-mint focus:border-mint transition"
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="flex items-center text-burgundy font-medium">
              <Heart size={18} className="mr-2" />
              Gender (optional)
            </label>
            <Select
              onValueChange={(value) => setProfile({ ...profile, gender: value })}
              defaultValue={profile.gender}
            >
              <SelectTrigger className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Helps with BAC calculation accuracy</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <label className="flex items-center text-burgundy font-medium">
            <Heart size={18} className="mr-2" />
            Alcohol Tolerance (optional)
          </label>
          <div className="px-2">
            <Slider
              value={[profile.tolerance as number]}
              onValueChange={handleSliderChange}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Low</span>
              <span>Average</span>
              <span>High</span>
            </div>
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-burgundy text-cream p-4 rounded-lg font-medium hover:bg-burgundy-dark transition-colors duration-200 flex items-center justify-center"
        >
          <span>Continue to Drinks</span>
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;