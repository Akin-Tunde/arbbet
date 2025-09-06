import React from 'react';
import { Button } from './ui/button';
import { Bookmark, Copy, Clock, DollarSign } from 'lucide-react';

const MarketCard = ({ market }) => {
  const {
    id,
    title,
    category,
    volume,
    timeRemaining,
    options,
    status,
    icon
  } = market;

  const getStatusColor = (status) => {
    switch (status) {
      case 'trending': return 'text-orange-400';
      case 'new': return 'text-green-400';
      case 'ending-soon': return 'text-yellow-400';
      case 'resolved': return 'text-gray-400';
      default: return 'text-blue-400';
    }
  };

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

  return (
    <div className="market-card rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-foreground leading-tight mb-1">
              {title}
            </h3>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(category)}`}>
                {category}
              </span>
              <span className={`text-xs ${getStatusColor(status)}`}>
                {status.replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
            <Bookmark className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-accent">
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Options and Progress */}
      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-foreground">{option.name}</span>
                <span className="text-xs text-muted-foreground">
                  {option.odds}x
                </span>
              </div>
              <Button
                size="sm"
                className={`
                  ${option.name.toLowerCase().includes('yes') || option.name.toLowerCase().includes('over') || !option.name.toLowerCase().includes('no')
                    ? 'select-button-yes' 
                    : 'select-button-no'
                  }
                  text-white font-medium px-4 py-1 text-xs
                `}
              >
                Select
              </Button>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${option.name.toLowerCase().includes('yes') || option.name.toLowerCase().includes('over') || !option.name.toLowerCase().includes('no')
                    ? 'progress-bar-yes' 
                    : 'progress-bar-no'
                  }
                `}
                style={{ width: `${option.percentage}%` }}
              />
            </div>
            <div className="text-xs text-muted-foreground text-right">
              {option.percentage}%
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/40">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <DollarSign className="h-3 w-3" />
            <span>${volume.toLocaleString()} Vol.</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>{timeRemaining}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;

