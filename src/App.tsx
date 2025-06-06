import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Wine } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import ProfileForm from './components/ProfileForm';
import DrinkInput from './components/DrinkInput';
import Dashboard from './components/Dashboard';
import DrinkExplorer from './components/DrinkExplorer';
import { UserProfile, Drink } from './types';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const [currentTab, setCurrentTab] = useState<'profile' | 'drink' | 'dashboard' | 'explorer'>('profile');
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    age: 0,
    weight: 0,
    weightUnit: 'kg',
    gender: 'other',
    tolerance: 'normal',
    waterIntake: 0,
    challengeModeEnabled: false,
    streakDays: 0,
    achievements: [],
    friends: []
  });
  const [currentDrinks, setCurrentDrinks] = useState<Drink[]>([]);
  const [waterIntakeEvents, setWaterIntakeEvents] = useState<{ amount: number; timestamp: number }[]>([]);

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentTab('drink');
  };

  const handleAddDrink = (drink: Drink) => {
    setCurrentDrinks([...currentDrinks, drink]);
    setCurrentTab('dashboard');
  };

  const handleWaterAdd = (amount: number) => {
    if (userProfile) {
      const newWaterIntake = (userProfile.waterIntake || 0) + amount;
      setUserProfile({
        ...userProfile,
        waterIntake: newWaterIntake
      });
      setWaterIntakeEvents([...waterIntakeEvents, { amount, timestamp: Date.now() }]);
    }
  };

  const handleReset = () => {
    setCurrentDrinks([]);
    setWaterIntakeEvents([]);
    if (userProfile) {
      setUserProfile({
        ...userProfile,
        waterIntake: 0
      });
    }
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'profile':
        return <ProfileForm onSubmit={handleProfileSubmit} />;
      case 'drink':
        return userProfile ? (
          <DrinkInput onAddDrink={handleAddDrink} />
        ) : (
          <div className="text-center">
            Please complete your profile first.
          </div>
        );
      case 'dashboard':
        return userProfile ? (
          <ErrorBoundary>
            <Dashboard 
              userProfile={userProfile} 
              drinks={currentDrinks} 
              onReset={handleReset}
              waterIntake={userProfile.waterIntake || 0}
              waterIntakeEvents={waterIntakeEvents}
              onWaterAdd={handleWaterAdd}
            />
          </ErrorBoundary>
        ) : (
          <div className="text-center">
            Please complete your profile first.
          </div>
        );
      case 'explorer':
        return <DrinkExplorer />;
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