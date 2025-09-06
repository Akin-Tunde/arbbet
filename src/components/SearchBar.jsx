import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search markets..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 bg-background/50 border-border/40 focus:border-blue-400 transition-colors"
      />
    </div>
  );
};

export default SearchBar;

