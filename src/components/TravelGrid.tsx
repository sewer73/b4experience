import { TravelCard } from "./TravelCard";
import { useEffect, useState, useCallback } from "react";
import lofotenHero from "@/assets/lofoten-hero.jpg";
import tromsoSki from "@/assets/tromso-ski.jpg";
import cabinSea from "@/assets/cabin-sea.jpg";
import selfGuided from "@/assets/self-guided.jpg";

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
    level: "intermediate",
    image: lofotenHero,
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
    level: "advanced",
    image: tromsoSki,
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
    level: "beginner",
    image: selfGuided,
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
    level: "advanced",
    image: cabinSea,
    likes: 298,
    isLiked: false,
    height: 250
  }
];

interface TravelGridProps {
  searchQuery: string;
  onTravelClick: (travel: Travel) => void;
}

export const TravelGrid = ({ searchQuery, onTravelClick }: TravelGridProps) => {
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

  // Filter travels based on search
  const filteredTravels = travels.filter(travel =>
    travel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    travel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Grid Container - 2 columns on mobile, more on larger screens */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-min">
        {filteredTravels.map((travel) => (
          <div 
            key={travel.id} 
            style={{ height: `${travel.height}px` }}
            className="w-full"
          >
            <TravelCard
              {...travel}
              className="h-full"
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