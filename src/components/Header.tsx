import React from 'react';
import { WineGlass, User, Beer, GaugeCircle, Globe } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  currentTab: 'profile' | 'drink' | 'dashboard' | 'explorer';
  setCurrentTab: (tab: 'profile' | 'drink' | 'dashboard' | 'explorer') => void;
  userProfile: UserProfile | null;
}

const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab, userProfile }) => {
  return (
    <header className="bg-burgundy text-cream py-4 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <WineGlass size={32} className="text-gold mr-2" />
          <h1 className="text-2xl font-bold">SipSense</h1>
        </div>
        
        <nav className="w-full md:w-auto">
          <ul className="flex justify-between md:justify-end space-x-2 md:space-x-4">
            <li>
              <button
                onClick={() => setCurrentTab('profile')}
                className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                  currentTab === 'profile' ? 'bg-burgundy-dark text-gold' : 'hover:bg-burgundy-dark/50'
                }`}
              >
                <User size={20} />
                <span className="text-xs mt-1">Profile</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentTab('drink')}
                disabled={!userProfile}
                className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                  !userProfile ? 'opacity-50 cursor-not-allowed' : 
                  currentTab === 'drink' ? 'bg-burgundy-dark text-gold' : 'hover:bg-burgundy-dark/50'
                }`}
              >
                <Beer size={20} />
                <span className="text-xs mt-1">Drinks</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentTab('dashboard')}
                disabled={!userProfile}
                className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                  !userProfile ? 'opacity-50 cursor-not-allowed' : 
                  currentTab === 'dashboard' ? 'bg-burgundy-dark text-gold' : 'hover:bg-burgundy-dark/50'
                }`}
              >
                <GaugeCircle size={20} />
                <span className="text-xs mt-1">Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentTab('explorer')}
                className={`flex flex-col items-center px-3 py-2 rounded-lg transition-colors duration-200 ${
                  currentTab === 'explorer' ? 'bg-burgundy-dark text-gold' : 'hover:bg-burgundy-dark/50'
                }`}
              >
                <Globe size={20} />
                <span className="text-xs mt-1">Explore</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;