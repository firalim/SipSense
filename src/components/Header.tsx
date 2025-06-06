import React from 'react';
import { UserProfile } from '../types';
import { Wine, Droplet, MapPin, Award, BookOpen, User } from 'lucide-react';

interface HeaderProps {
  currentTab: 'profile' | 'drink' | 'dashboard' | 'discovery' | 'gamification' | 'journal' | 'profileTab';
  setCurrentTab: (tab: 'profile' | 'drink' | 'dashboard' | 'discovery' | 'gamification' | 'journal' | 'profileTab') => void;
  userProfile: UserProfile | null;
}

const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, userProfile }) => {
  return (
    <header className="bg-white shadow-md py-4 px-6 sticky top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wine size={24} className="text-burgundy" />
          <h1 className="text-2xl font-bold text-burgundy">SipSmart</h1>
        </div>
        
        <nav className="flex space-x-4">
          <button
            onClick={() => setCurrentTab('profile')}
            className={`text-sm font-medium ${currentTab === 'profile' ? 'text-burgundy border-b-2 border-burgundy' : 'text-gray-600 hover:text-burgundy'} transition-colors`}
          >
            Profile
          </button>
          <button
            onClick={() => setCurrentTab('drink')}
            className={`text-sm font-medium ${currentTab === 'drink' ? 'text-burgundy border-b-2 border-burgundy' : 'text-gray-600 hover:text-burgundy'} transition-colors`}
          >
            Drinks
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`text-sm font-medium ${currentTab === 'dashboard' ? 'text-burgundy border-b-2 border-burgundy' : 'text-gray-600 hover:text-burgundy'} transition-colors`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentTab('discovery')}
            className={`text-sm font-medium ${currentTab === 'discovery' ? 'text-burgundy border-b-2 border-burgundy' : 'text-gray-600 hover:text-burgundy'} transition-colors`}
          >
            Discovery
          </button>
          <button
            onClick={() => setCurrentTab('gamification')}
            className={`text-sm font-medium ${currentTab === 'gamification' ? 'text-burgundy border-b-2 border-burgundy' : 'text-gray-600 hover:text-burgundy'} transition-colors`}
          >
            Gamification
          </button>
          <button
            onClick={() => setCurrentTab('journal')}
            className={`text-sm font-medium ${currentTab === 'journal' ? 'text-burgundy border-b-2 border-burgundy' : 'text-gray-600 hover:text-burgundy'} transition-colors`}
          >
            Journal
          </button>
          <button
            onClick={() => setCurrentTab('profileTab')}
            className={`text-sm font-medium ${currentTab === 'profileTab' ? 'text-burgundy border-b-2 border-burgundy' : 'text-gray-600 hover:text-burgundy'} transition-colors`}
          >
            My Profile
          </button>
        </nav>

        <div className="text-sm text-gray-600">
          {userProfile ? `Hello, ${userProfile.age} years old` : 'Welcome!'}
        </div>
      </div>
    </header>
  );
};

export default Header;