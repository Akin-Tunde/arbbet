import React, { useState, useMemo } from 'react';
import { mockTraders } from '../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';

const LeaderboardPageFixed = ({ onSelectTrader }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterTimeframe, setFilterTimeframe] = useState('all-time');
  const [filterRisk, setFilterRisk] = useState('');

  const filteredTraders = useMemo(() => {
    return mockTraders.filter(trader => {
      const matchesSearch = trader.username.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === '' || trader.category === filterCategory;
      const matchesTimeframe = true; // Timeframe filtering not implemented in mock data
      const matchesRisk = filterRisk === '' || trader.riskScore === filterRisk;
      return matchesSearch && matchesCategory && matchesTimeframe && matchesRisk;
    });
  }, [searchTerm, filterCategory, filterTimeframe, filterRisk]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-6">Leaderboard</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search traders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        
        <select 
          value={filterCategory} 
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-[180px] px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
        >
          <option value="">All Categories</option>
          <option value="crypto">Crypto</option>
          <option value="sports">Sports</option>
          <option value="finance">Finance</option>
          <option value="technology">Technology</option>
          <option value="politics">Politics</option>
        </select>
        
        <select 
          value={filterTimeframe} 
          onChange={(e) => setFilterTimeframe(e.target.value)}
          className="w-[180px] px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
        >
          <option value="all-time">All Time</option>
          <option value="this-year">This Year</option>
          <option value="this-month">This Month</option>
          <option value="this-week">This Week</option>
        </select>
        
        <select 
          value={filterRisk} 
          onChange={(e) => setFilterRisk(e.target.value)}
          className="w-[180px] px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-md"
        >
          <option value="">All Risks</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTraders.map(trader => (
          <Card key={trader.id} className="bg-gray-800 text-white border-gray-700">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>#{trader.rank} - {trader.username}</span>
                <span className="text-green-400">P&L: ${trader.pnl.toLocaleString()}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400 mb-2">Risk Score: <span className={`font-semibold ${
                trader.riskScore === 'Low' ? 'text-green-500' :
                trader.riskScore === 'Medium' ? 'text-yellow-500' :
                'text-red-500'
              }`}>{trader.riskScore}</span></p>
              <p className="text-sm text-gray-400 mb-4">Copied by {trader.copiers} users</p>
              <div className="flex justify-between items-center">
                <Button onClick={() => onSelectTrader(trader)} className="bg-blue-600 hover:bg-blue-700 text-white">View Profile</Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">Copy</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTraders.length === 0 && (
        <div className="text-center py-12 text-white">
          No traders found matching your criteria.
        </div>
      )}
    </div>
  );
};

export default LeaderboardPageFixed;

