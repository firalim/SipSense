// User profile types
export interface UserProfile {
  age: number;
  height: number;
  heightUnit: 'cm' | 'ft';
  weight: number;
  weightUnit: 'kg' | 'lbs';
  gender?: 'male' | 'female' | 'other';
  tolerance?: 'low' | 'medium' | 'high';
}

// Drink types
export interface Drink {
  id: string;
  type: string;
  brand: string;
  abv: number; // Alcohol by volume (%)
  volume: number; // in milliliters
  volumeUnit: 'ml' | 'oz';
  price?: number;
  currency?: string;
  country?: string;
  timestamp: number; // When the drink was added
}

// BAC (Blood Alcohol Content) result
export interface BACResult {
  bac: number;
  recommendation: 'good' | 'moderate' | 'caution';
  message: string;
  soberTime: number; // Minutes until sober
}

// Drink Explorer types
export interface DrinkCategory {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface DrinkBrand {
  id: string;
  name: string;
  logo: string;
  country: string;
  types: string[];
}