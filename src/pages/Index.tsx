import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { StickySearchBar } from "@/components/StickySearchBar";
import { TravelGrid } from "@/components/TravelGrid";
import { TravelDetail } from "@/components/TravelDetail";
import { FilterButton } from "@/components/FilterButton";

interface Travel {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  gifImage?: string;
  likes: number;
  isLiked: boolean;
}

interface FilterOption {
  id: string;
  label: string;
  category: 'activity' | 'location' | 'duration' | 'group_size' | 'sort';
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
  const [showStickySearch, setShowStickySearch] = useState(false);
  const [filters, setFilters] = useState<FilterOption[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: FilterOption[]) => {
    setFilters(newFilters);
  };

  const handleTravelClick = (travel: Travel) => {
    setSelectedTravel(travel);
  };

  const handleCloseDetail = () => {
    setSelectedTravel(null);
  };

  // Detectar scroll para mostrar búsqueda fija
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const searchSectionHeight = 400; // Aproximadamente la altura de la sección de búsqueda
      
      setShowStickySearch(scrollPosition > searchSectionHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <StickySearchBar onSearch={handleSearch} isVisible={showStickySearch} />
      
      {selectedTravel ? (
        <TravelDetail travel={selectedTravel} onClose={handleCloseDetail} />
      ) : (
        <main className="container mx-auto px-4 py-8">
          {/* Search Section */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Filter Section */}
          <div className="mb-6 flex justify-center">
            <FilterButton onFiltersChange={handleFiltersChange} />
          </div>

          {/* Travel Grid */}
          <TravelGrid 
            searchQuery={searchQuery}
            filters={filters}
            onTravelClick={handleTravelClick}
          />
        </main>
      )}
    </div>
  );
};

export default Index;
