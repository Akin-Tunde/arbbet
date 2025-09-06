import React, { useState } from 'react';
import { Button } from './ui/button';
import { TrendingUp, DollarSign, Users, BarChart3 } from 'lucide-react';

const PlatformStats = () => {
  const [activeTab, setActiveTab] = useState('all-time');

  const stats = {
    totalBetVolume: '$725,546.91',
    totalCreatorRevenue: '$7,205.82',
    totalBets: '30,141',
    totalMarkets: '1,734'
  };

  const tabs = [
    { id: 'last-14-days', label: 'Last 14 Days' },
    { id: 'last-month', label: 'Last Month' },
    { id: 'all-time', label: 'All Time' }
  ];

  return (
    <div className="bg-card rounded-lg p-6 border border-border/40 mt-8">
      <h2 className="text-2xl font-bold text-foreground mb-6">Platform Stats</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-lg mb-3 mx-auto">
            <DollarSign className="h-6 w-6 text-blue-400" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.totalBetVolume}</div>
          <div className="text-sm text-muted-foreground">Total Bet Volume</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-500/20 rounded-lg mb-3 mx-auto">
            <TrendingUp className="h-6 w-6 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.totalCreatorRevenue}</div>
          <div className="text-sm text-muted-foreground">Total Creator Revenue</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-500/20 rounded-lg mb-3 mx-auto">
            <BarChart3 className="h-6 w-6 text-purple-400" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.totalBets}</div>
          <div className="text-sm text-muted-foreground">Total Bets</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-orange-500/20 rounded-lg mb-3 mx-auto">
            <Users className="h-6 w-6 text-orange-400" />
          </div>
          <div className="text-2xl font-bold text-foreground">{stats.totalMarkets}</div>
          <div className="text-sm text-muted-foreground">Total Markets</div>
        </div>
      </div>

      {/* Total Volume Section */}
      <div className="border-t border-border/40 pt-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Total Volume</h3>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-4">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(tab.id)}
              className={`
                ${activeTab === tab.id ? 'filter-button-active' : 'hover:bg-accent'}
                transition-all duration-200
              `}
            >
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Volume Chart Placeholder */}
        <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <div className="text-sm text-muted-foreground">Volume Chart</div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-muted-foreground mt-4">
          These statistics are derived from real-time on-chain data, highlighting the protocol's growth and community-driven ecosystem. 
          You can view the smart contract on{' '}
          <a href="#" className="text-blue-400 hover:text-blue-300 underline">
            BaseScan
          </a>.
        </p>
      </div>
    </div>
  );
};

export default PlatformStats;

