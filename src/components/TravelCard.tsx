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
  image: string;
  gifImage?: string;
  likes: number;
  isLiked: boolean;
  className?: string;
  onClick: () => void;
}


export const TravelCard = ({
  title,
  location,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  gifImage,
  likes,
  isLiked,
  className = "",
  onClick
}: TravelCardProps) => {
  const [showLocation, setShowLocation] = useState(false);
  const [liked, setLiked] = useState(isLiked);
  const [likeCount, setLikeCount] = useState(likes);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div 
      className={`group relative bg-card rounded-xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 cursor-pointer ${className}`}
      onClick={onClick}
      onMouseEnter={() => {
        setShowLocation(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setShowLocation(false);
        setIsHovered(false);
      }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <img 
          src={isHovered && gifImage ? gifImage : image} 
          alt={title}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        


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
        {/* Heart Button with Save Count */}
        <button
          onClick={handleLike}
          className="absolute bottom-2 right-2 bg-background/95 backdrop-blur-sm rounded-full px-3 py-2 transition-all duration-200 hover:bg-background hover:scale-110 shadow-lg z-10 flex items-center gap-1"
        >
          <Heart 
            className={`w-4 h-4 transition-colors duration-200 ${
              liked ? "fill-red-500 text-red-500" : "text-muted-foreground hover:text-red-500"
            }`} 
          />
          <span className="text-xs font-medium text-muted-foreground">({likeCount})</span>
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