import { UserProfile, Drink, BACResult } from '../types';
import { getRecommendation } from './bacCalculator'; // Import getRecommendation

// Constants for BAC calculation
const GENDER_CONSTANTS = {
  male: { factor: 0.68, metabolismRate: 0.015 },
  female: { factor: 0.55, metabolismRate: 0.017 },
  other: { factor: 0.615, metabolismRate: 0.016 } // Average of male and female
};

// Interface for HangoverRisk
interface HangoverRisk {
  level: 'low' | 'moderate' | 'high';
  message: string;
  emoji: string;
}

// Convert weight to kilograms if needed
const weightInKg = (weight: number, unit: 'kg' | 'lbs'): number => {
  return unit === 'kg' ? weight : weight * 0.453592;
};

// Calculate standard drinks (based on pure alcohol content)
const calculateStandardDrinks = (drink: Drink): number => {
  // Convert volume to ml if needed
  const volumeInMl = drink.volumeUnit === 'ml' ? drink.volume : drink.volume * 29.5735;
  
  // Calculate pure alcohol in grams
  // Pure alcohol (g) = Volume (ml) × ABV (%) × 0.789 (density of ethanol)
  const pureAlcohol = volumeInMl * (drink.abv / 100) * 0.789;
  
  // Standard drink is typically defined as 14 grams of pure alcohol
  return pureAlcohol / 14;
};

// Get hangover risk based on BAC level
export const getHangoverRisk = (bac: number): HangoverRisk => {
  if (bac < 0.05) {
    return {
      level: 'low',
      message: 'Minimal hangover risk. Stay hydrated!',
      emoji: '😊'
    };
  } else if (bac < 0.1) {
    return {
      level: 'moderate',
      message: 'Moderate hangover risk. Drink water and rest.',
      emoji: '😴'
    };
  } else {
    return {
      level: 'high',
      message: 'High hangover risk. Prioritize hydration and food.',
      emoji: '🤢'
    };
  }
};

// Calculate BAC based on Widmark formula with adjustments
export const calculateBAC = (profile: UserProfile, drinks: Drink[], currentTime: number): BACResult => {
  // Get gender constants or default to 'other'
  const genderData = GENDER_CONSTANTS[profile.gender || 'other'];
  
  // Tolerance adjustment factor
  const toleranceFactor = profile.tolerance === 'high' ? 0.9 : 
                         profile.tolerance === 'low' ? 1.1 : 1.0;
  
  // Calculate total standard drinks and adjust BAC
  let totalBac = 0;
  
  for (const drink of drinks) {
    // Calculate initial BAC contribution from this drink
    const standardDrinks = calculateStandardDrinks(drink);
    const weight = weightInKg(profile.weight, profile.weightUnit) * 1000; // Convert kg to grams
    
    // BAC = [Standard drinks * 14 (g/drink)] / [Weight (g) * Gender constant] * 100
    // Corrected: Use pure alcohol grams directly instead of standard drinks * 14
    const volumeInMl = drink.volumeUnit === 'ml' ? drink.volume : drink.volume * 29.5735;
    const pureAlcoholGrams = volumeInMl * (drink.abv / 100) * 0.789;
    const drinkBac = (pureAlcoholGrams / (weight * genderData.factor)) * 100 * toleranceFactor;
    
    // Calculate how much of this drink's BAC has been metabolized
    const hoursSinceDrink = (currentTime - drink.timestamp) / (60 * 60 * 1000);
    const metabolized = hoursSinceDrink * genderData.metabolismRate;
    
    // Add the remaining BAC from this drink
    const remainingBac = Math.max(0, drinkBac - metabolized);
    totalBac += remainingBac;
  }
  
  // Ensure BAC is not negative
  totalBac = Math.max(0, totalBac);
  
  // Calculate time until sober (in minutes)
  const soberTime = totalBac > 0 ? Math.ceil((totalBac / genderData.metabolismRate) * 60) : 0;
  
  // Get recommendation and hangover risk
  return {
    bac: totalBac,
    recommendation: getRecommendation(totalBac), // Use imported getRecommendation
    soberTime,
    hangoverRisk: getHangoverRisk(totalBac)
  };
};