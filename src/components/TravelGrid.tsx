import { TravelCard } from "./TravelCard";
import { useEffect, useState, useCallback } from "react";
import lofotenHero from "@/assets/lofoten-hero.jpg";
import tromsoSki from "@/assets/tromso-ski.jpg";
import cabinSea from "@/assets/cabin-sea.jpg";
import selfGuided from "@/assets/self-guided.jpg";
import lofotenAnimated from "@/assets/lofoten-animated.jpg";
import tromsoAnimated from "@/assets/tromso-animated.jpg";
import sailingAnimated from "@/assets/sailing-animated.jpg";
import hikingAnimated from "@/assets/hiking-animated.jpg";

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
  height: number; // For Pinterest-like layout
}

const mockTravels: Travel[] = [
  {
    id: "1",
    title: "Esquí de travesía en Lofoten – cabaña junto al mar",
    location: "Islas Lofoten, Noruega",
    price: 1850,
    originalPrice: 2100,
    rating: 4.9,
    reviewCount: 127,
    image: lofotenHero,
    gifImage: lofotenAnimated,
    likes: 234,
    isLiked: false,
    height: 300
  },
  {
    id: "2", 
    title: "Islas Lofoten esquí en velero",
    location: "Lofoten, Noruega",
    price: 2400,
    originalPrice: 2800,
    rating: 4.8,
    reviewCount: 89,
    image: tromsoSki,
    gifImage: tromsoAnimated,
    likes: 189,
    isLiked: true,
    height: 400
  },
  {
    id: "3",
    title: "Lofoten viaje autoguiado",
    location: "Lofoten, Noruega", 
    price: 950,
    rating: 4.7,
    reviewCount: 156,
    image: selfGuided,
    gifImage: hikingAnimated,
    likes: 167,
    isLiked: false,
    height: 300
  },
  {
    id: "4",
    title: "Tromsø & Lyngen ski on a sailboat",
    location: "Tromsø, Noruega",
    price: 2200,
    originalPrice: 2600,
    rating: 4.9,
    reviewCount: 203,
    image: cabinSea,
    gifImage: sailingAnimated,
    likes: 298,
    isLiked: false,
    height: 250
  }
];

interface FilterOption {
  id: string;
  label: string;
  category: 'activity' | 'location' | 'duration' | 'group_size' | 'sort';
}

interface TravelGridProps {
  searchQuery: string;
  filters: FilterOption[];
  onTravelClick: (travel: Travel) => void;
}

export const TravelGrid = ({ searchQuery, filters, onTravelClick }: TravelGridProps) => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize with mock data and infinite scroll
  useEffect(() => {
    const repeatedTravels = Array.from({ length: 20 }, (_, index) => ({
      ...mockTravels[index % mockTravels.length],
      id: `${mockTravels[index % mockTravels.length].id}-${Math.floor(index / mockTravels.length)}`,
      // Vary heights for Pinterest layout
      height: [250, 300, 350, 400][Math.floor(Math.random() * 4)]
    }));
    setTravels(repeatedTravels);
  }, []);

  // Infinite scroll
  const loadMoreTravels = useCallback(() => {
    if (loading) return;
    
    setLoading(true);
    setTimeout(() => {
      const moreTravels = Array.from({ length: 8 }, (_, index) => ({
        ...mockTravels[index % mockTravels.length],
        id: `${mockTravels[index % mockTravels.length].id}-${Date.now()}-${index}`,
        height: [250, 300, 350, 400][Math.floor(Math.random() * 4)]
      }));
      setTravels(prev => [...prev, ...moreTravels]);
      setLoading(false);
    }, 1000);
  }, [loading]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadMoreTravels();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreTravels]);

  // Filter and sort travels based on search and filters
  const filteredTravels = travels.filter(travel => {
    // Search filter
    const matchesSearch = !searchQuery || 
      travel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      travel.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply other filters
    const activityFilters = filters.filter(f => f.category === 'activity');
    const locationFilters = filters.filter(f => f.category === 'location');
    
    const matchesActivity = activityFilters.length === 0 || 
      activityFilters.some(filter => 
        travel.title.toLowerCase().includes(filter.label.toLowerCase())
      );
    
    const matchesLocation = locationFilters.length === 0 || 
      locationFilters.some(filter => 
        travel.location.toLowerCase().includes(filter.label.toLowerCase())
      );
    
    return matchesSearch && matchesActivity && matchesLocation;
  }).sort((a, b) => {
    // Apply sorting
    const sortFilter = filters.find(f => f.category === 'sort');
    if (!sortFilter) return 0;
    
    switch (sortFilter.id) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="w-full">
      {/* Masonry Grid Container */}
      <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
        {filteredTravels.map((travel) => (
          <div 
            key={travel.id} 
            className="break-inside-avoid mb-4"
          >
            <TravelCard
              {...travel}
              className="w-full"
              onClick={() => onTravelClick(travel)}
            />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
        </div>
      )}

      {/* No results */}
      {filteredTravels.length === 0 && !loading && searchQuery && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron viajes para "{searchQuery}"</p>
        </div>
      )}
    </div>
  );
};