import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Trophy, 
  Coins, 
  Users, 
  TrendingUp, 
  Gift, 
  Star,
  Target,
  Award,
  Zap,
  Crown,
  ChevronRight,
  Calendar,
  Clock
} from 'lucide-react';

const RewardsPage = () => {
  const [userStats] = useState({
    totalEarned: 2847.50,
    weeklyEarnings: 156.25,
    rank: 47,
    vePROPHETBalance: 1250.00,
    referrals: 8,
    tradingVolume: 15420.00
  });

  const rewardCategories = [
    {
      id: 'foundation',
      title: 'Foundation Rewards',
      description: 'Baseline rewards for core participation',
      icon: <Coins className="h-6 w-6" />,
      color: 'bg-blue-500',
      rewards: [
        {
          name: 'Trading Rewards',
          description: 'Earn $PROPHET tokens on every trade',
          earned: 847.25,
          rate: '0.1% of volume',
          boost: '2.5x with vePROPHET',
          icon: <TrendingUp className="h-5 w-5" />
        },
        {
          name: 'Referral Rewards',
          description: 'Earn from successful referrals',
          earned: 320.00,
          rate: '10% lifetime commission',
          boost: 'Bonus for active referrals',
          icon: <Users className="h-5 w-5" />
        }
      ]
    },
    {
      id: 'performance',
      title: 'Performance Rewards',
      description: 'High-leverage rewards for skilled traders',
      icon: <Trophy className="h-6 w-6" />,
      color: 'bg-yellow-500',
      rewards: [
        {
          name: 'P&L Rewards',
          description: 'Weekly rewards for top performers',
          earned: 1250.00,
          rate: 'Top 20% weekly',
          boost: 'Rank #47 this week',
          icon: <Target className="h-5 w-5" />
        },
        {
          name: 'Liquidity Mining',
          description: 'Rewards for providing liquidity',
          earned: 180.50,
          rate: '12% APY',
          boost: 'Active liquidity bonus',
          icon: <Zap className="h-5 w-5" />
        },
        {
          name: 'Top Copied Trader',
          description: 'Bonus for being copied by others',
          earned: 89.75,
          rate: 'Weekly bonus',
          boost: '8 active copiers',
          icon: <Crown className="h-5 w-5" />
        }
      ]
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem Rewards',
      description: 'Rewards for community building',
      icon: <Star className="h-6 w-6" />,
      color: 'bg-green-500',
      rewards: [
        {
          name: 'Curation Mining',
          description: 'Create successful prediction markets',
          earned: 120.00,
          rate: 'Volume-based bonus',
          boost: '3 markets created',
          icon: <Gift className="h-5 w-5" />
        },
        {
          name: 'Governance Rewards',
          description: 'Participate in DAO governance',
          earned: 40.00,
          rate: 'Per vote participation',
          boost: '85% participation rate',
          icon: <Award className="h-5 w-5" />
        }
      ]
    }
  ];

  const weeklyLeaderboard = [
    { rank: 1, trader: 'CryptoWhale', pnl: 5420.50, reward: 500.00 },
    { rank: 2, trader: 'AlphaSeeker', pnl: 4890.25, reward: 350.00 },
    { rank: 3, trader: 'MarketMaster', pnl: 4125.75, reward: 250.00 },
    { rank: 47, trader: 'You', pnl: 1250.00, reward: 25.00, highlight: true }
  ];

  const upcomingRewards = [
    {
      title: 'Weekly P&L Distribution',
      amount: '2,500 $PROPHET',
      timeLeft: '2 days',
      description: 'Top performers this week'
    },
    {
      title: 'Monthly Liquidity Bonus',
      amount: '5,000 $PROPHET',
      timeLeft: '12 days',
      description: 'Active liquidity providers'
    },
    {
      title: 'Governance Vote Rewards',
      amount: '1,000 $PROPHET',
      timeLeft: '5 days',
      description: 'Proposal #42 voting ends'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          PROOF Rewards Program
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Participation Rewards On Our Forecasting platform. Earn $PROPHET tokens for contribution, commitment, and skill.
        </p>
      </div>

      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">
              {userStats.totalEarned.toLocaleString()} $PROPHET
            </div>
            <p className="text-xs text-muted-foreground">
              +{userStats.weeklyEarnings} this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Rank</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-400">
              #{userStats.rank}
            </div>
            <p className="text-xs text-muted-foreground">
              Top 20% this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">vePROPHET</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">
              {userStats.vePROPHETBalance.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              2.5x reward boost
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Referrals</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">
              {userStats.referrals}
            </div>
            <p className="text-xs text-muted-foreground">
              Active referrals
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Reward Categories */}
          <div className="space-y-6">
            {rewardCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${category.color} text-white`}>
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle>{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.rewards.map((reward, index) => (
                      <Card key={index} className="border-2 hover:border-blue-400 transition-colors">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {reward.icon}
                              <CardTitle className="text-sm">{reward.name}</CardTitle>
                            </div>
                            <Badge variant="secondary">
                              {reward.earned.toLocaleString()} $PROPHET
                            </Badge>
                          </div>
                          <CardDescription className="text-xs">
                            {reward.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Rate:</span>
                              <span>{reward.rate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Boost:</span>
                              <span className="text-green-400">{reward.boost}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-400" />
                <span>Weekly P&L Leaderboard</span>
              </CardTitle>
              <CardDescription>
                Top performers earn weekly $PROPHET rewards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weeklyLeaderboard.map((entry) => (
                  <div 
                    key={entry.rank}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      entry.highlight ? 'border-blue-400 bg-blue-400/10' : 'border-border'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        entry.rank === 1 ? 'bg-yellow-400 text-black' :
                        entry.rank === 2 ? 'bg-gray-400 text-black' :
                        entry.rank === 3 ? 'bg-orange-400 text-black' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {entry.rank}
                      </div>
                      <div>
                        <div className="font-medium">{entry.trader}</div>
                        <div className="text-sm text-muted-foreground">
                          P&L: ${entry.pnl.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <Badge variant={entry.highlight ? 'default' : 'secondary'}>
                      {entry.reward.toLocaleString()} $PROPHET
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingRewards.map((reward, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">{reward.title}</CardTitle>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{reward.timeLeft}</span>
                    </Badge>
                  </div>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400 mb-2">
                    {reward.amount}
                  </div>
                  <Button size="sm" className="w-full">
                    View Details
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reward History</CardTitle>
              <CardDescription>
                Your complete reward earning history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Reward history will be displayed here</p>
                <p className="text-sm">Track all your $PROPHET earnings over time</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-400/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold">Maximize Your Rewards</h3>
            <p className="text-muted-foreground">
              Stake your $PROPHET tokens to get vePROPHET and unlock up to 2.5x reward multipliers
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Stake $PROPHET
              </Button>
              <Button variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardsPage;

