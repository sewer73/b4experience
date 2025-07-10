import { X, Heart, Star, MapPin, Calendar, Users, Clock, ArrowLeft } from "lucide-react";
import { useState } from "react";

interface Travel {
  id: string;
  title: string;
  location: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  likes: number;
  isLiked: boolean;
}

interface TravelDetailProps {
  travel: Travel;
  onClose: () => void;
}


export const TravelDetail = ({ travel, onClose }: TravelDetailProps) => {
  const [liked, setLiked] = useState(travel.isLiked);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock additional images for carousel
  const images = [travel.image, travel.image, travel.image];

  const handleLike = () => {
    setLiked(!liked);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-adventure-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-brand-primary" />
          </button>
          
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="p-2 rounded-lg hover:bg-adventure-light transition-colors"
            >
              <Heart 
                className={`w-5 h-5 ${
                  liked ? "fill-red-500 text-red-500" : "text-brand-primary"
                }`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="overflow-auto h-full pb-20">
        {/* Image Carousel */}
        <div className="relative h-64 md:h-96">
          <img 
            src={images[currentImageIndex]} 
            alt={travel.title}
            className="w-full h-full object-cover"
          />
          
          {/* Carousel Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2"
              >
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? "bg-white" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Title and Rating */}
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              {travel.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{travel.rating}</span>
                <span className="text-muted-foreground">({travel.reviewCount} reseñas)</span>
              </div>
              
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{travel.location}</span>
              </div>
            </div>

          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              {travel.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  €{travel.originalPrice}
                </span>
              )}
              <span className="text-3xl font-bold text-brand-primary">
                €{travel.price}
              </span>
              <span className="text-muted-foreground">por persona</span>
            </div>
          </div>

          {/* Trip Details */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-adventure-light rounded-lg">
              <Calendar className="w-5 h-5 text-brand-primary" />
              <div>
                <div className="text-sm font-medium">Duración</div>
                <div className="text-xs text-muted-foreground">7 días</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-adventure-light rounded-lg">
              <Users className="w-5 h-5 text-brand-primary" />
              <div>
                <div className="text-sm font-medium">Grupo</div>
                <div className="text-xs text-muted-foreground">4-8 personas</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Descripción</h3>
            <p className="text-muted-foreground leading-relaxed">
              Descubre la magia del ártico noruego en esta aventura única que combina esquí de travesía 
              y navegación en velero. Explora los paisajes más espectaculares de las Islas Lofoten 
              mientras disfrutas de una experiencia auténtica en una cabaña junto al mar.
            </p>
          </div>

          {/* What's Included */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Incluido</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                Alojamiento en cabaña junto al mar
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                Equipo de esquí de travesía
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                Guía experto local
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                Todas las comidas
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4">
        <div className="flex gap-3">
          <button className="flex-1 bg-brand-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-brand-primary/90 transition-colors">
            Reservar ahora
          </button>
          <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-adventure-light transition-colors">
            Contactar
          </button>
        </div>
      </div>
    </div>
  );
};