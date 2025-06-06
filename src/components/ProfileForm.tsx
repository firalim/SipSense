import React, { useState } from 'react';
import { User, Ruler, Weight, Heart } from 'lucide-react';
import { UserProfile } from '../types';
import toast from 'react-hot-toast';

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
    tolerance: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setProfile({
      ...profile,
      [name]: type === 'number' ? Number(value) : value,
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

    onSubmit(profile);
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
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-mint focus:border-mint transition"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <p className="text-xs text-gray-500">Helps with BAC calculation accuracy</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center text-burgundy font-medium">
            <Heart size={18} className="mr-2" />
            Alcohol Tolerance (optional)
          </label>
          <div className="flex flex-wrap gap-2">
            {['low', 'medium', 'high'].map((level) => (
              <label
                key={level}
                className={`flex-1 border rounded-lg p-3 text-center cursor-pointer transition-all ${
                  profile.tolerance === level
                    ? 'border-gold bg-gold/10 text-burgundy font-medium'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input
                  type="radio"
                  name="tolerance"
                  value={level}
                  checked={profile.tolerance === level}
                  onChange={handleChange}
                  className="sr-only"
                />
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </label>
            ))}
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