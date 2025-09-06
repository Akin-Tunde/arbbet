import React, { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { ArrowLeft, Trophy, Users, Clock, DollarSign, TrendingUp, TrendingDown, MessageCircle, Target } from 'lucide-react';

const LeagueDetail = ({ league, onBack }) => {
  const [activeTab, setActiveTab] = useState('leaderboard');

  // Mock leaderboard data
  const leaderboard = [
    { rank: 1, username: 'CryptoKing', pnl: '+$2,450', change: '+3', avatar: null },
    { rank: 2, username: 'TradeMaster', pnl: '+$1,890', change: '0', avatar: null },
    { rank: 3, username: 'MarketWiz', pnl: '+$1,650', change: '-1', avatar: null },
    { rank: 4, username: 'PredictPro', pnl: '+$1,420', change: '+2', avatar: null },
    { rank: 5, username: 'BullBear', pnl: '+$1,200', change: '-2', avatar: null },
    { rank: 6, username: 'ChartAnalyst', pnl: '+$980', change: '+1', avatar: null },
    { rank: 7, username: 'RiskTaker', pnl: '+$750', change: '-1', avatar: null },
    { rank: 8, username: 'SmartMoney', pnl: '+$620', change: '0', avatar: null },
    { rank: 9, username: 'TrendFollower', pnl: '+$450', change: '+4', avatar: null },
    { rank: 10, username: 'ValueHunter', pnl: '+$320', change: '-3', avatar: null },
    { rank: 11, username: 'You', pnl: '+$180', change: '+1', avatar: null, isCurrentUser: true },
  ];

  // Mock portfolio data
  const portfolio = [
    { market: 'BTC > $100k by EOY', position: 'YES', amount: '$500', currentValue: '$650', pnl: '+$150' },
    { market: 'ETH > $5k by Q1 2025', position: 'NO', amount: '$300', currentValue: '$280', pnl: '-$20' },
    { market: 'SOL > $200 by EOY', position: 'YES', amount: '$200', currentValue: '$250', pnl: '+$50' },
  ];

  // Mock chat messages
  const chatMessages = [
    { username: 'CryptoKing', message: 'BTC looking strong! 🚀', time: '2m ago' },
    { username: 'TradeMaster', message: 'Anyone else bullish on SOL?', time: '5m ago' },
    { username: 'MarketWiz', message: 'ETH might surprise us all', time: '8m ago' },
    { username: 'PredictPro', message: 'Great league setup! Love the market selection', time: '15m ago' },
  ];

  const getRankChangeIcon = (change) => {
    const changeNum = parseInt(change);
    if (changeNum > 0) return <TrendingUp className="h-3 w-3 text-green-500" />;
    if (changeNum < 0) return <TrendingDown className="h-3 w-3 text-red-500" />;
    return <div className="h-3 w-3" />;
  };

  const getRankChangeColor = (change) => {
    const changeNum = parseInt(change);
    if (changeNum > 0) return 'text-green-500';
    if (changeNum < 0) return 'text-red-500';
    return 'text-gray-400';
  };

  return (
    <div className="min-h-screen predictbase-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Leagues
          </Button>
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h1 className="text-3xl font-bold text-white">{league.name}</h1>
                <Badge className={league.status === 'open' ? 'bg-green-500' : 'bg-blue-500'}>
                  {league.status === 'open' ? 'Open for Entry' : 'In Progress'}
                </Badge>
              </div>
              <p className="text-gray-300 text-lg mb-4">{league.description}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>Created by {league.creator}</span>
                <span>•</span>
                <span>{league.category}</span>
                <span>•</span>
                <span>Duration: {league.duration}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {league.status === 'open' && (
                <Button className="bg-green-600 hover:bg-green-700 text-white font-medium px-6">
                  Join League ({league.entryFee})
                </Button>
              )}
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Share League
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Prize Pool</p>
                  <p className="text-2xl font-bold text-green-400">{league.prizePool}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Participants</p>
                  <p className="text-2xl font-bold text-white">{league.participants}</p>
                  {league.maxParticipants && (
                    <p className="text-xs text-gray-400">of {league.maxParticipants}</p>
                  )}
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Your Rank</p>
                  <p className="text-2xl font-bold text-yellow-400">#11</p>
                  <p className="text-xs text-green-400">+1 from yesterday</p>
                </div>
                <Trophy className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 border-white/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">Your P&L</p>
                  <p className="text-2xl font-bold text-green-400">+$180</p>
                  <p className="text-xs text-green-400">+12.5% ROI</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="leaderboard" className="text-white data-[state=active]:bg-blue-600">
              Leaderboard
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="text-white data-[state=active]:bg-blue-600">
              My Portfolio
            </TabsTrigger>
            <TabsTrigger value="markets" className="text-white data-[state=active]:bg-blue-600">
              Markets
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-white data-[state=active]:bg-blue-600">
              League Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leaderboard" className="mt-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                  Live Leaderboard
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Rankings update in real-time based on portfolio performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div 
                      key={player.rank} 
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        player.isCurrentUser ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-lg font-bold ${
                            player.rank === 1 ? 'text-yellow-400' : 
                            player.rank === 2 ? 'text-gray-300' : 
                            player.rank === 3 ? 'text-orange-400' : 'text-white'
                          }`}>
                            #{player.rank}
                          </span>
                          {player.change !== '0' && (
                            <div className="flex items-center space-x-1">
                              {getRankChangeIcon(player.change)}
                              <span className={`text-xs ${getRankChangeColor(player.change)}`}>
                                {player.change}
                              </span>
                            </div>
                          )}
                        </div>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback className="bg-blue-600 text-white text-xs">
                            {player.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`font-medium ${player.isCurrentUser ? 'text-blue-400' : 'text-white'}`}>
                          {player.username}
                          {player.isCurrentUser && <span className="text-xs text-blue-400 ml-2">(You)</span>}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          player.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {player.pnl}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="mt-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-400" />
                  Your League Portfolio
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Your current positions in this league's markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolio.map((position, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-medium mb-1">{position.market}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-300">
                            <span>Position: <span className={position.position === 'YES' ? 'text-green-400' : 'text-red-400'}>{position.position}</span></span>
                            <span>Amount: {position.amount}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{position.currentValue}</div>
                          <div className={`text-sm ${position.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                            {position.pnl}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-blue-600/20 border border-blue-500/30 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">Total Portfolio Value:</span>
                    <span className="text-xl font-bold text-white">$1,180</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-300">Total P&L:</span>
                    <span className="text-lg font-bold text-green-400">+$180 (+18%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="markets" className="mt-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white">League Markets</CardTitle>
                <CardDescription className="text-gray-300">
                  All markets included in this league competition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {league.markets.map((market, index) => (
                    <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                      <h4 className="text-white font-medium mb-2">{market}</h4>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-300">Volume: $12.5k</span>
                        <Button size="sm" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white">
                          Trade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <Card className="bg-white/10 border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-blue-400" />
                  League Chat
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Discuss strategies and share insights with other participants
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
                  {chatMessages.map((message, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                          {message.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-white font-medium text-sm">{message.username}</span>
                          <span className="text-gray-400 text-xs">{message.time}</span>
                        </div>
                        <p className="text-gray-300 text-sm">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">Send</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LeagueDetail;

