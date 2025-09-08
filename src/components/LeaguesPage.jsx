import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Users, Trophy, Clock, Plus } from 'lucide-react'; // Removed 'Filter' as it's no longer used
import LeagueDetail from './LeagueDetail';
import CreateLeague from './CreateLeague';

const LeaguesPage = () => {
  const [selectedLeague, setSelectedLeague] = useState(null);
  const [showCreateLeague, setShowCreateLeague] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // This is the new array for our buttons
  const leagueCategories = [
    { id: 'all', label: 'All Categories' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'sports', label: 'Sports' },
    { id: 'politics', label: 'Politics' },
    { id: 'finance', label: 'Finance' },
    { id: 'science', label: 'Science' },
  ];

  // Mock leagues data
  const mockLeagues = [
    {
      id: 1,
      name: "Crypto Majors Q4 Showdown",
      description: "Trade the biggest crypto markets this quarter",
      category: "Crypto",
      entryFee: "100 $PROPHET",
      prizePool: "15,000 $PROPHET",
      participants: 78,
      maxParticipants: 100,
      timeRemaining: "3 days",
      status: "open",
      creator: "CryptoKing",
      duration: "30 days",
      markets: ["BTC/USD", "ETH/USD", "SOL/USD", "ADA/USD"]
    },
    {
      id: 2,
      name: "2024 F1 Constructors Cup",
      description: "Predict Formula 1 race outcomes and championship results",
      category: "Sports",
      entryFee: "0.1 ETH",
      prizePool: "5.2 ETH",
      participants: 45,
      maxParticipants: 50,
      timeRemaining: "1 day",
      status: "open",
      creator: "F1Fanatic",
      duration: "Season Long",
      markets: ["Monaco GP", "British GP", "Italian GP", "Abu Dhabi GP"]
    },
    // ... other leagues from your mockData ...
  ];

  const filteredLeagues = mockLeagues.filter(league => {
    const matchesSearch = league.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         league.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || league.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'active': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'open': return 'Open for Entry';
      case 'active': return 'In Progress';
      default: return 'Unknown';
    }
  };

  if (selectedLeague) {
    return <LeagueDetail league={selectedLeague} onBack={() => setSelectedLeague(null)} />;
  }

  if (showCreateLeague) {
    return <CreateLeague onBack={() => setShowCreateLeague(false)} />;
  }

  return (
    <div className="min-h-screen predictbase-gradient">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Prediction Leagues</h1>
              <p className="text-gray-300">Join competitive leagues and tournaments to test your prediction skills</p>
            </div>
            <Button 
              onClick={() => setShowCreateLeague(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create League
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="space-y-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leagues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              />
            </div>
            
            {/* THIS IS THE NEW HORIZONTAL BUTTON GROUP REPLACING THE DROPDOWN */}
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-2 horizontal-scrollbar">
                {leagueCategories.map((category) => (
                  <Button
                    key={category.id}
                    variant={categoryFilter === category.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCategoryFilter(category.id)}
                    className={`
                      flex-shrink-0 text-xs md:text-sm
                      ${categoryFilter === category.id ? 'bg-blue-600 text-white' : 'text-gray-300 border-gray-600 hover:bg-gray-700'}
                    `}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
              <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none lg:hidden" />
            </div>
            
          </div>
        </div>

        {/* Tabs for different league types */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/10">
            <TabsTrigger value="all" className="text-white data-[state=active]:bg-blue-600">All Leagues</TabsTrigger>
            <TabsTrigger value="open" className="text-white data-[state=active]:bg-green-600">Open</TabsTrigger>
            <TabsTrigger value="active" className="text-white data-[state=active]:bg-blue-600">Active</TabsTrigger>
            <TabsTrigger value="my-leagues" className="text-white data-[state=active]:bg-purple-600">My Leagues</TabsTrigger>
          </TabsList>

          {/* ... The rest of the file remains the same ... */}
          <TabsContent value="all" className="mt-6">
            <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLeagues.map(league => (
                <Card 
                  key={league.id} 
                  className="bg-white/10 border-white/20 hover:bg-white/15 transition-all cursor-pointer"
                  onClick={() => setSelectedLeague(league)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-2">{league.name}</CardTitle>
                        <CardDescription className="text-gray-300">{league.description}</CardDescription>
                      </div>
                      <Badge className={`${getStatusColor(league.status)} text-white ml-2`}>
                        {getStatusText(league.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Entry Fee:</span>
                        <span className="text-white font-semibold">{league.entryFee}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Prize Pool:</span>
                        <span className="text-green-400 font-semibold">{league.prizePool}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Participants:
                        </span>
                        <span className="text-white">{league.participants} / {league.maxParticipants}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {league.status === 'open' ? 'Starts in:' : 'Duration:'}
                        </span>
                        <span className="text-blue-400">{league.timeRemaining}</span>
                      </div>
                      <div className="pt-2">
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          {league.category}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          {/* ... other TabsContent sections ... */}
        </Tabs>

        {/* No Results */}
        {filteredLeagues.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-300 text-lg mb-4">
              No leagues found matching your criteria
            </div>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
              }}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaguesPage;
