import React from 'react';
import { Wine, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-burgundy text-cream py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Wine size={24} className="text-gold mr-2" />
            <span className="text-xl font-bold">SipSense</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm mb-2">Drink responsibly. Know your limits.</p>
            <p className="text-xs text-cream/70">
              Made with <Heart size={12} className="inline text-gold mx-1" /> for responsible drinking
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-cream/20 text-sm text-center">
          <p className="mb-2">
            SipSense is designed to provide general guidance only. Individual responses to alcohol may vary.
          </p>
          <p className="text-xs text-cream/70">
            © {new Date().getFullYear()} SipSense. All calculations are estimates and should not be used to determine if you're fit to drive.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;