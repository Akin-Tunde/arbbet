import React from 'react';
import { Clock, TrendingUp, Award } from 'lucide-react';

const RecentActivity = () => {
  const recentBets = [
    { user: '0x01e8...bf6c', amount: '$1.00', market: 'Chargers', time: '34 minutes ago' },
    { user: '0x01e8...bf6c', amount: '$10.00', market: 'Yankees', time: '35 minutes ago' },
    { user: '0x9149...3cd2', amount: '$1.00', market: 'Armenia', time: '36 minutes ago' },
    { user: '0x01e8...bf6c', amount: '$1.00', market: 'No', time: '37 minutes ago' },
    { user: '0x9149...3cd2', amount: '$2.00', market: 'No', time: '38 minutes ago' },
  ];

  const recentClaims = [
    { user: '0x0124...afc4', amount: '$145.26', market: 'FIFA World Cup: Slovakia vs. Germany', time: '6 minutes ago' },
    { user: '0x01e8...bf6c', amount: '$18.65', market: 'NFL: DAL Cowboys vs. PHI Eagles', time: '39 minutes ago' },
    { user: '0xe5d2...06bf', amount: '$137.03', market: 'NFL: Cowboys vs Eagles', time: '2 hours ago' },
    { user: '0xe5d2...06bf', amount: '$120.11', market: 'NFL: DAL Cowboys vs. PHI Eagles', time: '2 hours ago' },
  ];

  const recentMarkets = [
    { time: '26 minutes ago', title: 'New crypto market created' },
    { time: '26 minutes ago', title: 'Sports prediction launched' },
    { time: '26 minutes ago', title: 'Political outcome market' },
    { time: '3 hours ago', title: 'Entertainment betting opened' },
    { time: '3 hours ago', title: 'Technology prediction started' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      {/* Recent Bets */}
      <div className="bg-card rounded-lg p-4 border border-border/40">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-foreground">Recent Bets</h3>
        </div>
        <div className="space-y-3">
          {recentBets.map((bet, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-blue-400">{bet.user}</span>
                  <span className="text-sm text-muted-foreground">placed</span>
                  <span className="text-sm font-medium text-green-400">{bet.amount}</span>
                  <span className="text-sm text-muted-foreground">on</span>
                  <span className="text-sm font-medium text-foreground">{bet.market}</span>
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{bet.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Claims */}
      <div className="bg-card rounded-lg p-4 border border-border/40">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="h-5 w-5 text-green-400" />
          <h3 className="text-lg font-semibold text-foreground">Recent Claims</h3>
        </div>
        <div className="space-y-3">
          {recentClaims.map((claim, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-blue-400">{claim.user}</span>
                  <span className="text-sm text-muted-foreground">claimed</span>
                  <span className="text-sm font-medium text-green-400">{claim.amount}</span>
                </div>
                <div className="text-xs text-muted-foreground mt-1 truncate">
                  {claim.market}
                </div>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{claim.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Markets */}
      <div className="bg-card rounded-lg p-4 border border-border/40">
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-foreground">Recent Markets</h3>
        </div>
        <div className="space-y-3">
          {recentMarkets.map((market, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-border/20 last:border-b-0">
              <div className="flex-1">
                <div className="text-sm text-foreground">{market.title}</div>
                <div className="flex items-center space-x-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{market.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;

