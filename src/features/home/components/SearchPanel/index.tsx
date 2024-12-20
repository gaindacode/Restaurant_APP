import React from 'react';
import { SearchBar } from '../../../../components/common';
import { QuickFilters } from './QuickFilters';
import { RestaurantList } from './RestaurantList';
import { useRestaurantSearch } from '../../../../hooks/useRestaurantSearch';
import { useCurrentLocation } from '../../../../hooks/useCurrentLocation';
import { useRestaurantFilter } from '../../../../hooks/useRestaurantFilter';

interface SearchPanelProps {
  compact?: boolean;
}

export function SearchPanel({ compact = false }: SearchPanelProps) {
  const { coords } = useCurrentLocation();
  const { 
    searchQuery, 
    setSearchQuery, 
    searchResults, 
    loading: searchLoading,
    search 
  } = useRestaurantSearch();
  const { selectedChain, setSelectedChain } = useRestaurantFilter();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    if (coords) {
      search(value, { lat: coords[0], lng: coords[1] });
    }
    if (selectedChain) {
      setSelectedChain(null);
    }
  };

  const handleFilterSelect = (chainName: string) => {
    setSelectedChain(selectedChain === chainName ? null : chainName);
    if (searchQuery) {
      setSearchQuery('');
    }
  };

  if (compact) {
    return (
      <div className="space-y-3">
        <SearchBar
          value={searchQuery}
          onChange={handleSearch}
          loading={searchLoading}
          placeholder="Search restaurants..."
          className="bg-white"
        />
        <div className="overflow-x-auto -mx-4 px-4">
          <QuickFilters
            selectedFilter={selectedChain}
            onSelect={handleFilterSelect}
            className="flex-nowrap"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <SearchBar
        value={searchQuery}
        onChange={handleSearch}
        loading={searchLoading}
        placeholder="Search restaurants..."
      />
      <QuickFilters
        selectedFilter={selectedChain}
        onSelect={handleFilterSelect}
      />
      <RestaurantList
        restaurants={searchResults}
        loading={searchLoading}
      />
    </div>
  );
}