import { Search, Bot, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [typingText, setTypingText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    "¿Dónde quieres ir?",
    "Busca tu próxima aventura...",
    "¿Qué experiencia buscas?",
    "Encuentra tu destino ideal...",
    "¿Montaña, mar o ciudad?",
    "Descubre lugares únicos..."
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  // Efecto de escritura automática
  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let currentIndex = 0;
    setTypingText("");

    const typingInterval = setInterval(() => {
      if (currentIndex <= currentPhrase.length) {
        setTypingText(currentPhrase.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        // Esperar antes de cambiar a la siguiente frase
        setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentPhraseIndex]);

  return (
    <div className="w-full relative overflow-hidden">
      {/* Vectorized Background Design */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Mountain silhouettes */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 1200 600" fill="none">
          <path d="M0 400 L200 200 L400 300 L600 150 L800 250 L1000 180 L1200 220 L1200 600 L0 600 Z" 
                fill="hsl(var(--brand-primary))" />
          <path d="M0 450 L150 300 L350 380 L550 280 L750 350 L950 300 L1200 320 L1200 600 L0 600 Z" 
                fill="hsl(var(--adventure-blue))" />
        </svg>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 w-16 h-16 rotate-12 opacity-10">
          <svg viewBox="0 0 64 64" fill="none">
            <polygon points="32,8 56,48 8,48" fill="hsl(var(--adventure-accent))" />
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 rotate-45 opacity-10">
          <svg viewBox="0 0 48 48" fill="none">
            <rect width="48" height="48" rx="8" fill="hsl(var(--brand-primary))" />
          </svg>
        </div>
        <div className="absolute bottom-40 left-1/4 w-20 h-20 -rotate-12 opacity-10">
          <svg viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="40" fill="hsl(var(--adventure-blue))" />
          </svg>
        </div>
        <div className="absolute top-32 right-1/3 w-14 h-14 rotate-30 opacity-10">
          <svg viewBox="0 0 56 56" fill="none">
            <path d="M28 4 L52 28 L28 52 L4 28 Z" fill="hsl(var(--adventure-accent))" />
          </svg>
        </div>
        
        {/* Adventure icons pattern */}
        <div className="absolute top-24 left-1/3 opacity-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 22V20C14 18.8954 13.1046 18 12 18C10.8954 18 10 18.8954 10 20V22M18 8V6C18 4.34315 16.6569 3 15 3H9C7.34315 3 6 4.34315 6 6V8M21 12L3 12M12 15L12 9" 
                  stroke="hsl(var(--brand-primary))" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="absolute bottom-32 right-1/4 opacity-5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
                  stroke="hsl(var(--adventure-blue))" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Hero Text - Clean & Focused */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" 
                    fill="white" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent tracking-tight">
            B4Experience
          </h1>
          <div className="px-3 py-1 bg-adventure-accent/20 rounded-full">
            <span className="text-xs font-semibold text-brand-primary">PREMIUM</span>
          </div>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground mb-2">
          Aventuras outdoor de lujo
        </p>
        <p className="text-sm text-muted-foreground/80">
          Experiencias únicas en los destinos más exclusivos del mundo
        </p>
      </div>

      {/* Enhanced Search Form */}
      <div className="max-w-2xl mx-auto mb-6">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Bot className="text-brand-primary w-4 h-4 animate-pulse" />
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-bounce text-brand-primary" />
            </div>
            <input
              type="text"
              name="search"
              aria-label="Buscar viaje con IA"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={typingText || "¿Dónde quieres ir?"}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-brand-primary/30 bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 shadow-lg hover:shadow-xl"
            />
          </div>
        </form>
      </div>

      {/* Popular Tags */}
      <div className="mt-6 text-center">
        <span className="text-sm font-semibold text-foreground mr-3">Populares: </span>
        <div className="inline-flex flex-wrap justify-center gap-2 mt-2">
          {["Lofoten", "Esquí", "Velero", "Autoguiado", "Tromsø"].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
              className="px-4 py-2 text-sm rounded-full bg-adventure-light text-brand-primary hover:bg-brand-primary hover:text-white transition-all duration-200 font-medium shadow-sm hover:shadow-md hover:scale-105"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};