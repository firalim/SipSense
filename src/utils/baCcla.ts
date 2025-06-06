import { UserProfile } from "../types";

// Placeholder for getRecommendation (to be moved by you)
export function getRecommendation(bac: number): string {
  if (bac <= 0.02) return "good";
  if (bac <= 0.08) return "moderate";
  return "caution";
}

// Calculate time to sober in minutes based on BAC and user profile
export function getTimeToSober(bac: number, profile: UserProfile): number {
  // Simplified calculation: BAC elimination rate is ~0.015% per hour
  // Adjust based on gender, weight, and tolerance (rough estimate)
  const eliminationRate = 0.015; // % per hour
  const baseHours = bac / eliminationRate;
  
  // Adjust for weight (heavier people metabolize slower, simplified)
  const weightFactor = profile.weight / 70; // Normalize to 70kg
  const adjustedHours = baseHours * (1 + (weightFactor - 1) * 0.2);

  // Convert to minutes
  return Math.ceil(adjustedHours * 60);
}