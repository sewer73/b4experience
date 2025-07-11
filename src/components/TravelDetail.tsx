import { X, Heart, Star, MapPin, Calendar, Users, Clock, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

          {/* Itinerary */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Itinerario día a día</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {[1,2,3,4,5,6,7].map((day) => (
                <AccordionItem key={day} value={`day-${day}`} className="border border-border rounded-lg">
                  <AccordionTrigger className="hover:no-underline px-4 py-3">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-8 h-8 bg-brand-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {day}
                      </div>
                      <div>
                        <div className="font-medium">Día {day}</div>
                        <div className="text-sm text-muted-foreground">
                          {day === 1 ? "Llegada y primera sesión de esquí" : 
                           day === 7 ? "Día de partida" : 
                           `Esquí de travesía en ${day % 2 === 0 ? 'Lofoten' : 'Henningsvær'}`}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3">
                    <p className="text-muted-foreground leading-relaxed">
                      {day === 1 ? "Llegada al aeropuerto de Leknes. Traslado a la cabaña junto al mar. Primera sesión de esquí de reconocimiento y preparación del material." :
                       day === 7 ? "Última sesión de esquí matutina. Recogida del material y traslado al aeropuerto. Vuelo de regreso." :
                       `Día completo de esquí de travesía explorando las mejores rutas de la zona. Ascensiones técnicas y descensos espectaculares con vistas al océano Ártico.`}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {day === 1 || day === 7 ? "4-5 horas" : "6-8 horas"}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {day % 2 === 0 ? "Lofoten" : "Henningsvær"}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* What's Included/Not Included */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">¿Qué incluye y qué no incluye?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-3 flex items-center gap-2">
                  ✓ Incluido
                </h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Alojamiento en cabaña junto al mar</li>
                  <li>• Todas las comidas</li>
                  <li>• Equipo de esquí de travesía</li>
                  <li>• Guía experto local</li>
                  <li>• Traslados locales</li>
                  <li>• Seguro de actividades</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-3 flex items-center gap-2">
                  ✗ No incluido
                </h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>• Vuelos hasta/desde Leknes</li>
                  <li>• Comidas en aeropuertos</li>
                  <li>• Seguro de viaje</li>
                  <li>• Bebidas alcohólicas</li>
                  <li>• Gastos personales</li>
                  <li>• Propinas</li>
                </ul>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Preguntas frecuentes</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {[
                { q: "¿Qué nivel de esquí se requiere?", a: "Nivel intermedio-avanzado. Debes sentirte cómodo esquiando fuera de pista y tener experiencia básica en esquí de travesía." },
                { q: "¿Está incluido el equipo?", a: "Sí, incluimos todo el equipo de esquí de travesía: esquís, botas, fijaciones, bastones, pieles de foca y equipo de seguridad." },
                { q: "¿Cuál es el mejor momento para viajar?", a: "La temporada ideal es de febrero a abril, cuando hay más luz diurna y las condiciones de nieve son óptimas." },
                { q: "¿Qué debo llevar?", a: "Ropa técnica de montaña, ropa interior térmica, guantes, gorro, gafas de sol y protector solar. Te enviaremos una lista completa tras la reserva." }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border border-border rounded-lg">
                  <AccordionTrigger className="hover:no-underline px-4 py-3 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-3">
                    <p className="text-muted-foreground">{faq.a}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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