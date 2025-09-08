import React, { useState } from 'react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

const FilterTabs = ({ onFilterChange, onVolumeChange }) => {
  const [activeFilter, setActiveFilter] = useState('trending');
  const [activeCategory, setActiveCategory] = useState('');
  const [volumeRange, setVolumeRange] = useState([0]);

  const statusFilters = [
    { id: 'trending', label: 'Trending', color: 'bg-orange-500' },
    { id: 'new', label: 'New', color: 'bg-green-500' },
    { id: 'ending-soon', label: 'Ending Soon', color: 'bg-yellow-500' },
    { id: 'resolved', label: 'Resolved', color: 'bg-gray-500' },
    { id: 'saved', label: 'Saved', color: 'bg-purple-500' },
  ];

  const categoryFilters = [
    { id: 'sports', label: 'Sports', color: 'bg-blue-500' },
    { id: 'politics', label: 'Politics', color: 'bg-red-500' },
    { id: 'entertainment', label: 'Entertainment', color: 'bg-pink-500' },
    { id: 'crypto', label: 'Crypto', color: 'bg-yellow-600' },
    { id: 'finance', label: 'Finance', color: 'bg-green-600' },
    { id: 'technology', label: 'Technology', color: 'bg-indigo-500' },
  ];

  const handleStatusFilter = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange({ status: filterId, category: activeCategory });
  };

  const handleCategoryFilter = (categoryId) => {
    const newCategory = activeCategory === categoryId ? '' : categoryId;
    setActiveCategory(newCategory);
    onFilterChange({ status: activeFilter, category: newCategory });
  };

  const handleVolumeChange = (value) => {
    setVolumeRange(value);
    onVolumeChange(value[0]);
  };

  return (
    <div className="space-y-4 p-4 border-b border-border/40">
      {/* Status Filters - Horizontally Scrollable */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2 horizontal-scrollbar">
          {statusFilters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleStatusFilter(filter.id)}
              className={`
                flex-shrink-0
                text-xs md:text-sm /* <-- ADDED THIS LINE */
                ${activeFilter === filter.id ? 'filter-button-active' : 'hover:bg-accent'}
                transition-all duration-200
              `}
            >
              <div className={`w-2 h-2 rounded-full ${filter.color} mr-2`} />
              {filter.label}
            </Button>
          ))}
        </div>
        {/* Gradient fade overlay to indicate scroll */}
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none lg:hidden" />
      </div>

      {/* Category Filters - Horizontally Scrollable */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2 horizontal-scrollbar">
          {categoryFilters.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryFilter(category.id)}
              className={`
                flex-shrink-0
                text-xs md:text-sm /* <-- AND ADDED THIS LINE */
                ${activeCategory === category.id ? 'filter-button-active' : 'hover:bg-accent'}
                transition-all duration-200
              `}
            >
              <div className={`w-2 h-2 rounded-full ${category.color} mr-2`} />
              {category.label}
            </Button>
          ))}
        </div>
        {/* Gradient fade overlay to indicate scroll */}
        <div className="absolute top-0 bottom-0 right-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none lg:hidden" />
      </div>

      {/* Volume Filter */}
      <div className="flex items-center space-x-4 max-w-md pt-2">
        <span className="text-sm text-muted-foreground whitespace-nowrap">Volume</span>
        <div className="flex-1">
          <Slider
            value={volumeRange}
            onValueChange={handleVolumeChange}
            max={25000}
            step={1000}
            className="w-full"
          />
        </div>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          ${volumeRange[0].toLocaleString()} - $25,000
        </span>
      </div>
    </div>
  );
};

export default FilterTabs;
