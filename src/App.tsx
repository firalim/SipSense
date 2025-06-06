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
      setUserProfile({
        ...userProfile,
        waterIntake: userProfile.waterIntake + amount
      });
    }
  };

  const handleReset = () => {
    setCurrentDrinks([]);
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
          <Dashboard 
            userProfile={userProfile} 
            drinks={currentDrinks} 
            onReset={handleReset}
            waterIntake={userProfile.waterIntake}
            onWaterAdd={handleWaterAdd}
          />
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