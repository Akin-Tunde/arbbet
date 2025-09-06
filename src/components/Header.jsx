import React, { useState } from 'react';
import { Search, Bell, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import predictbaseLogo from '../assets/predictbase-logo.png';

const Header = ({ currentPage = 'markets', onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false); // Close mobile menu after navigation
  };

  const navigationItems = [
    { id: 'markets', label: 'Markets' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'leagues', label: 'Leagues' },
    { id: 'leaderboard', label: 'Leaderboard' },
    { id: 'copiedTraders', label: 'Copied Traders' },
    { id: 'rewards', label: 'Rewards' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Navigation */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              🔮
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">MarketVision</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'text-teal-400 hover:text-teal-300' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Documentation
            </a>
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            size="sm"
            className="hidden md:flex text-sm"
            onClick={() => handleNavClick('createMarket')}
          >
            Create a Market
          </Button>
          
          <div className="relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              10
            </span>
          </div>
          
          <Button 
            className="connect-button text-white font-medium px-6"
            size="sm"
          >
            Connect
          </Button>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                    🔮
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">MarketVision</span>
                </div>
                
                {/* Mobile Navigation Items */}
                <div className="space-y-3">
                  {navigationItems.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentPage === item.id 
                          ? 'bg-teal-400/10 text-teal-400 border border-teal-400/20' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  <a 
                    href="#" 
                    className="block w-full text-left p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    Documentation
                  </a>
                </div>

                {/* Mobile Actions */}
                <div className="space-y-3 pt-6 border-t border-border">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleNavClick('createMarket')}
                  >
                    Create a Market
                  </Button>
                  <Button 
                    className="w-full connect-button text-white font-medium"
                  >
                    Connect Wallet
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

