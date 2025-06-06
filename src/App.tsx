import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Wine } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfileForm from './components/ProfileForm';
import DrinkInput from './components/DrinkInput';
import Dashboard from './components/Dashboard';
import DrinkDiscovery from './components/DrinkDiscovery';
import GamificationTab from './components/GamificationTab';
import JournalTab from './components/JournalTab';
import ProfileTab from './components/ProfileTab';
import { UserProfile, Drink } from './types';
import ErrorBoundary from './components/ErrorBoundary';
import { calculateBAC } from './utils/alcoholCalculator';
import { getRecommendation, getTimeToSober } from './utils/bacCalculator';

function App() {
  const [currentTab, setCurrentTab] = useState<'profile' | 'drink' | 'dashboard' | 'discovery' | 'gamification' | 'journal' | 'profileTab'>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentDrinks, setCurrentDrinks] = useState<Drink[]>([]);
  const [waterIntakeEvents, setWaterIntakeEvents] = useState<{ amount: number; timestamp: number }[]>([]);
  const [currentSSP, setCurrentSSP] = useState(0);
  const [level, setLevel] = useState(1);
  const [mindfulMode, setMindfulMode] = useState(false);

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentTab('drink');
  };

  const handleAddDrink = (drink: Drink) => {
    setCurrentDrinks([...currentDrinks, drink]);
    setCurrentTab('dashboard');
    setCurrentSSP(currentSSP + 10);
    const nextLevelSSP = (level + 1) * 100;
    if (currentSSP + 10 >= nextLevelSSP) {
      setLevel(level + 1);
    }
  };

  const handleWaterAdd = (amount: number) => {
    if (userProfile) {
      const newWaterIntake = (userProfile.waterIntake || 0) + amount;
      setUserProfile({
        ...userProfile,
        waterIntake: newWaterIntake,
      });
      setWaterIntakeEvents([...waterIntakeEvents, { amount, timestamp: Date.now() }]);
      setCurrentSSP(currentSSP + 5);
    }
  };

  const handleReset = () => {
    setCurrentDrinks([]);
    setWaterIntakeEvents([]);
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        waterIntake: 0,
      });
    }
  };

  const calculateDrinkingPattern = (bac: number, waterIntake: number): "mindful" | "party" | "balanced" => {
    if (bac <= 0.05 && waterIntake >= 500) return "mindful";
    if (bac > 0.08) return "party";
    return "balanced";
  };

  const renderContent = () => {
    if (!userProfile) {
      return <ProfileForm onSubmit={handleProfileSubmit} />;
    }

    const currentBAC = currentDrinks.length > 0 ? calculateBAC(userProfile, currentDrinks, Date.now()).bac : 0;
    const waterIntake = userProfile.waterIntake || 0;
    const streak = userProfile.streakDays || 0;

    switch (currentTab) {
      case 'profile':
        return <ProfileForm onSubmit={handleProfileSubmit} />;
      case 'drink':
        return <DrinkInput onAddDrink={handleAddDrink} />;
      case 'dashboard':
        return (
          <ErrorBoundary>
            <Dashboard 
              userProfile={userProfile} 
              drinks={currentDrinks} 
              onReset={handleReset}
              waterIntake={waterIntake}
              waterIntakeEvents={waterIntakeEvents}
              onWaterAdd={handleWaterAdd}
            />
          </ErrorBoundary>
        );
      case 'discovery':
        return (
          <DrinkDiscovery
            drinks={currentDrinks}
            currentBAC={currentBAC}
            waterIntake={waterIntake}
          />
        );
      case 'gamification':
        return (
          <GamificationTab
            currentSSP={currentSSP}
            level={level}
            drinkingPattern={calculateDrinkingPattern(currentBAC, waterIntake)}
            currentBAC={currentBAC}
            streak={streak}
          />
        );
      case 'journal':
        return (
          <JournalTab
            profile={userProfile}
            drinks={currentDrinks}
            onDrinkAdd={handleAddDrink}
            currentBAC={currentBAC}
            waterIntake={waterIntake}
            setWaterIntake={(value: number) => {
              setUserProfile({ ...userProfile, waterIntake: value });
              setWaterIntakeEvents([...waterIntakeEvents, { amount: value - waterIntake, timestamp: Date.now() }]);
              setCurrentSSP(currentSSP + 5);
            }}
          />
        );
      case 'profileTab':
        return (
          <ProfileTab
            profile={userProfile}
            drinks={currentDrinks}
            waterIntake={waterIntake}
            setWaterIntake={(value: number) => {
              setUserProfile({ ...userProfile, waterIntake: value });
              setWaterIntakeEvents([...waterIntakeEvents, { amount: value - waterIntake, timestamp: Date.now() }]);
              setCurrentSSP(currentSSP + 5);
            }}
            mindfulMode={mindfulMode}
            setMindfulMode={setMindfulMode}
            streak={streak}
            currentBAC={currentBAC}
          />
        );
      default:
        return <ProfileForm onSubmit={handleProfileSubmit} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-cream/60">
      <Toaster position="top-center" />
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} userProfile={userProfile} />
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;