import { useState } from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { TravelGrid } from "@/components/TravelGrid";
import { TravelDetail } from "@/components/TravelDetail";

interface Travel {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  level: "beginner" | "intermediate" | "advanced";
  image: string;
  likes: number;
  isLiked: boolean;
}

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTravel, setSelectedTravel] = useState<Travel | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleTravelClick = (travel: Travel) => {
    setSelectedTravel(travel);
  };

  const handleCloseDetail = () => {
    setSelectedTravel(null);
  };

  const handleFilterToggle = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {selectedTravel ? (
        <TravelDetail travel={selectedTravel} onClose={handleCloseDetail} />
      ) : (
        <main className="container mx-auto px-4 py-8">
          {/* Search Section */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} onFilterToggle={handleFilterToggle} />
          </div>

          {/* Filters Panel (if needed) */}
          {showFilters && (
            <div className="mb-6 p-4 bg-adventure-light rounded-lg">
              <p className="text-sm text-muted-foreground">Filtros próximamente...</p>
            </div>
          )}

          {/* Travel Grid */}
          <TravelGrid 
            searchQuery={searchQuery} 
            onTravelClick={handleTravelClick}
          />
        </main>
      )}
    </div>
  );
};

export default Index;
