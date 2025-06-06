// User profile types
export interface UserProfile {
  age: number;
  height: number;
  heightUnit: 'cm' | 'ft';
  weight: number;
  weightUnit: 'kg' | 'lbs';
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  tolerance: 'low' | 'medium' | 'high' | number;
  waterIntake?: number; // in ml, optional to match existing usage
  challengeModeEnabled?: boolean;
  streakDays?: number;
  achievements?: Achievement[];
  friends?: Friend[];
}

// Drink types
export interface Drink {
  id?: string; // Optional to match existing usage
  type: string;
  brand: string;
  abv: number; // Alcohol by volume (%)
  volume: number; // in milliliters
  volumeUnit: 'ml' | 'oz';
  price?: number;
  currency?: 'USD' | 'EUR' | 'GBP';
  country?: string;
  timestamp: number; // When the drink was added
  flavorProfile?: FlavorProfile;
}

// BAC (Blood Alcohol Content) result
export interface BACResult {
  bac: number;
  recommendation: 'good' | 'moderate' | 'caution';
  message: string;
  soberTime: number; // Minutes until sober
  hangoverRisk: HangoverRisk;
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

// New types for enhanced features
export interface HangoverRisk {
  level: 'none' | 'mild' | 'moderate' | 'severe';
  message: string;
  emoji: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlockedAt?: number;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  recentDrinks: Drink[];
  mindfulScore: number;
}

export interface FlavorProfile {
  sweet: number;
  bitter: number;
  fruity: number;
  light: number;
}

export interface WaterLog {
  id: string;
  volume: number;
  timestamp: number;
}

export interface PartyPlan {
  id: string;
  date: number;
  location: string;
  plannedDrinks: PlannedDrink[];
  estimatedBAC: number[];
  timeframes: number[];
}

export interface PlannedDrink {
  type: string;
  count: number;
  timeframe: [number, number]; // Start and end time in minutes from party start
}

export interface AiResponse {
  message: string;
  suggestion?: string;
  action?: 'drink_water' | 'take_break' | 'eat_food' | 'call_ride';
  emoji: string;
}