import React, { useState, useMemo } from 'react';
import { Button } from './components/ui/button';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterTabs from './components/FilterTabs';
import MarketCard from './components/MarketCard';
import MarketDetailPage from './components/MarketDetailPage';
import LeaguesPage from './components/LeaguesPage';
import RecentActivity from './components/RecentActivity';
import PlatformStats from './components/PlatformStats';
import LeaderboardPage from './components/LeaderboardPage';
import TraderProfilePage from './components/TraderProfilePage';
import CopyModal from './components/CopyModal';
import CopiedTradersDashboard from './components/CopiedTradersDashboard';
import RewardsPage from './components/RewardsPage';
import CreateMarket from './components/CreateMarket';
import { mockMarkets, mockTraders, mockCopiedTraders } from './data/mockData';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('markets');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'trending', category: '' });
  const [volumeFilter, setVolumeFilter] = useState(0);
  const [visibleMarkets, setVisibleMarkets] = useState(6);
  const [selectedMarket, setSelectedMarket] = useState(null);
  const [selectedTrader, setSelectedTrader] = useState(null);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const filteredMarkets = useMemo(() => {
    return mockMarkets.filter(market => {
      const matchesSearch = market.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status === '' || market.status === filters.status;
      const matchesCategory = filters.category === '' || market.category === filters.category;
      const matchesVolume = market.volume >= volumeFilter;
      
      return matchesSearch && matchesStatus && matchesCategory && matchesVolume;
    });
  }, [searchTerm, filters, volumeFilter]);

  const handleLoadMore = () => {
    setVisibleMarkets(prev => prev + 6);
  };

  const handleMarketSelect = (market) => {
    setSelectedMarket(market);
  };

  const handleBackToMarkets = () => {
    setSelectedMarket(null);
  };

  const handleSelectTrader = (trader) => {
    setSelectedTrader(trader);
    setCurrentPage('traderProfile');
  };

  const handleBackToLeaderboard = () => {
    setSelectedTrader(null);
    setCurrentPage('leaderboard');
  };

  const handleCopyTrader = (trader) => {
    setSelectedTrader(trader);
    setIsCopyModalOpen(true);
  };

  const handleConfirmCopy = (traderId, allocateAmount, stopLoss) => {
    console.log(`Copying trader ${traderId} with ${allocateAmount} USDC and ${stopLoss}% stop-loss.`);
    // In a real application, you would send this data to a backend or smart contract
    // For now, we'll just close the modal and navigate to the copied traders dashboard
    setIsCopyModalOpen(false);
    setCurrentPage('copiedTraders');
  };

  // If a market is selected, show the detail page
  if (selectedMarket) {
    return <MarketDetailPage market={selectedMarket} onBack={handleBackToMarkets} />;
  }

  // Show Leagues page
  if (currentPage === 'leagues') {
    return (
      <div className="min-h-screen predictbase-gradient">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <LeaguesPage />
      </div>
    );
  }

  // Show Leaderboard page
  if (currentPage === 'leaderboard') {
    return (
      <div className="min-h-screen predictbase-gradient">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <LeaderboardPage onSelectTrader={handleSelectTrader} />
      </div>
    );
  }

  // Show Trader Profile page
  if (currentPage === 'traderProfile' && selectedTrader) {
    return (
      <div className="min-h-screen predictbase-gradient">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <TraderProfilePage trader={selectedTrader} onBack={handleBackToLeaderboard} onCopyTrader={handleCopyTrader} />
        {isCopyModalOpen && (
          <CopyModal
            isOpen={isCopyModalOpen}
            onClose={() => setIsCopyModalOpen(false)}
            onConfirmCopy={handleConfirmCopy}
            trader={selectedTrader}
          />
        )}
      </div>
    );
  }

  // Show Copied Traders Dashboard
  if (currentPage === 'copiedTraders') {
    return (
      <div className="min-h-screen predictbase-gradient">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <CopiedTradersDashboard />
      </div>
    );
  }

  // Show Rewards page
  if (currentPage === 'rewards') {
    return (
      <div className="min-h-screen predictbase-gradient">
        <Header currentPage={currentPage} onNavigate={setCurrentPage} />
        <RewardsPage />
      </div>
    );
  }

  // Show Create Market page
  if (currentPage === 'createMarket') {
    return <CreateMarket />;
  }

  return (
    <div className="min-h-screen predictbase-gradient">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <SearchBar onSearch={setSearchTerm} />
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
              size="sm"
            >
              How PredictBase Works
            </Button>
          </div>
          
          <FilterTabs 
            onFilterChange={setFilters}
            onVolumeChange={setVolumeFilter}
          />
        </div>

        {/* Markets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredMarkets.slice(0, visibleMarkets).map(market => (
            <div key={market.id} onClick={() => handleMarketSelect(market)} className="cursor-pointer">
              <MarketCard market={market} />
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleMarkets < filteredMarkets.length && (
          <div className="text-center mb-8">
            <Button 
              onClick={handleLoadMore}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8"
            >
              View More
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredMarkets.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground text-lg">
              No markets found matching your criteria
            </div>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setFilters({ status: 'trending', category: '' });
                setVolumeFilter(0);
              }}
              variant="outline"
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Recent Activity */}
        <RecentActivity />

        {/* Platform Stats (Commented Out) */}
{/* <PlatformStats /> */} 
      </main>
    </div>
  );
}

export default App;


