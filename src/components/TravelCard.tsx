import { Heart, Star, MapPin } from "lucide-react";
import { useState } from "react";

interface TravelCardProps {
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
  className?: string;
  onClick: () => void;
}

const LevelIcon = ({ level }: { level: "beginner" | "intermediate" | "advanced" }) => {
  const levelConfig = {
    beginner: { activeIndex: 0, color: 'bg-green-400' },
    intermediate: { activeIndex: 1, color: 'bg-yellow-400' },
    advanced: { activeIndex: 2, color: 'bg-red-400' }
  };

  const config = levelConfig[level];

  return (
    <div className="flex items-end gap-0.5">
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className={`w-1 rounded-sm transition-colors ${
            index <= config.activeIndex ? config.color : config.color.replace('400', '400/30')
          }`}
          style={{ height: `${(index + 1) * 3 + 4}px` }}
        />
      ))}
    </div>
  );
};

export const TravelCard = ({
  title,
  location,
  price,
  originalPrice,
  rating,
  reviewCount,
  level,
  image,
  likes,
  isLiked,
  className = "",
  onClick
}: TravelCardProps) => {
  const [showLocation, setShowLocation] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div 
      className={`group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
      onMouseEnter={() => setShowLocation(true)}
      onMouseLeave={() => setShowLocation(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge - Solo rating sin reviews */}
        <div className="absolute bottom-2 right-2 bg-background/95 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold text-foreground">{rating}</span>
        </div>

        {/* Level indicator on image - Sin fondo, solo el símbolo */}
        <div className="absolute bottom-2 left-2">
          <LevelIcon level={level} />
        </div>

        {/* Location Badge (on hover) */}
        {showLocation && (
          <div className="absolute top-3 left-3 bg-brand-primary/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-2 text-white shadow-lg animate-fade-in">
            <MapPin className="w-3 h-3" />
            <span className="text-xs font-medium">{location}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 relative">
        {/* Heart Button - Moved to bottom right corner of card */}
        <button
          onClick={handleLike}
          className="absolute bottom-2 right-2 bg-background/95 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:bg-background hover:scale-110 shadow-lg z-10"
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-200 ${
              liked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
            }`} 
          />
        </button>

        {/* Title - Más grande para 5-6 palabras legibles */}
        <h3 className="font-semibold text-base leading-tight text-foreground mb-3 group-hover:text-brand-primary transition-colors duration-200 overflow-hidden pr-12" style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical'
        }}>
          {title}
        </h3>

        {/* Price Row */}
        <div className="flex items-center justify-between pr-12">
          {/* Left side - Current price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-brand-primary">
              €{price}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                €{originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};