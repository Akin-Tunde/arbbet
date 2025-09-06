import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import CoPilotDashboard from './CoPilotDashboard';
import AdvancedAnalytics from './AdvancedAnalytics';
import { ArrowLeft, Bookmark, Copy, Clock, DollarSign, TrendingUp, TrendingDown, Users } from 'lucide-react';

const MarketDetailPage = ({ market, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [betAmount, setBetAmount] = useState('');

  if (!market) return null;

  const {
    title,
    category,
    volume,
    timeRemaining,
    options,
    status,
    icon,
    description = "This market will resolve based on official data and verified sources. All trades are final once placed."
  } = market;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'sports': return 'bg-blue-500/20 text-blue-400';
      case 'crypto': return 'bg-yellow-500/20 text-yellow-400';
      case 'politics': return 'bg-red-500/20 text-red-400';
      case 'entertainment': return 'bg-pink-500/20 text-pink-400';
      case 'finance': return 'bg-green-500/20 text-green-400';
      case 'technology': return 'bg-indigo-500/20 text-indigo-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'trending': return 'text-orange-400';
      case 'new': return 'text-green-400';
      case 'ending-soon': return 'text-yellow-400';
      case 'resolved': return 'text-gray-400';
      default: return 'text-blue-400';
    }
  };

  const handlePlaceBet = () => {
    if (!selectedOption || !betAmount) return;
    
    // Mock bet placement
    alert(`Bet placed: $${betAmount} on "${selectedOption.name}" at ${selectedOption.odds}x odds`);
    setBetAmount('');
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen predictbase-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Markets
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Market Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Header */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    {icon && (
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {icon}
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-gray-800 mb-2">
                        {title}
                      </CardTitle>
                      <div className="flex items-center space-x-3">
                        <Badge className={getCategoryColor(category)}>
                          {category}
                        </Badge>
                        <span className={`text-sm font-medium ${getStatusColor(status)}`}>
                          {status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{description}</p>
                
                {/* Market Stats */}
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <DollarSign className="h-4 w-4 text-green-600 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Volume</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      ${volume.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Clock className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Time Left</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {timeRemaining}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-purple-600 mr-1" />
                      <span className="text-sm font-medium text-gray-600">Traders</span>
                    </div>
                    <div className="text-lg font-bold text-gray-800">
                      {Math.floor(volume / 100)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Analytics Dashboard */}
            <AdvancedAnalytics market={market} />

            {/* Co-Pilot Dashboard */}
            <CoPilotDashboard market={market} />
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Place Your Bet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Options */}
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedOption?.name === option.name 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedOption(option)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">{option.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{option.odds}x</span>
                          {option.name.toLowerCase().includes('yes') || option.name.toLowerCase().includes('over') ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          )}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            option.name.toLowerCase().includes('yes') || option.name.toLowerCase().includes('over')
                              ? 'bg-green-500' 
                              : 'bg-red-500'
                          }`}
                          style={{ width: `${option.percentage}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 text-right">
                        {option.percentage}%
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bet Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bet Amount ($)
                  </label>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>

                {/* Potential Payout */}
                {selectedOption && betAmount && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Potential Payout:</span>
                      <span className="font-bold text-blue-600">
                        ${(parseFloat(betAmount) * selectedOption.odds).toFixed(2)}
                      </span>
                    </div>
                  </div>
                )}

                {/* Place Bet Button */}
                <Button 
                  onClick={handlePlaceBet}
                  disabled={!selectedOption || !betAmount}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3"
                >
                  Place Bet
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  By placing a bet, you agree to our terms and conditions
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-gray-800">Market Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">24h Volume:</span>
                    <span className="font-medium">${(volume * 0.3).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Trades:</span>
                    <span className="font-medium">{Math.floor(volume / 50)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Trade Size:</span>
                    <span className="font-medium">${Math.floor(volume / (volume / 50))}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDetailPage;

