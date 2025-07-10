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
    <div className="w-full relative">
      {/* Hero Section with Distinctive Design */}
      <div className="text-center mb-12 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-10 left-1/4 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-20 right-1/4 w-24 h-24 bg-adventure-light/30 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-32 left-1/2 w-16 h-16 bg-brand-primary/20 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Main Brand Title */}
        <div className="relative mb-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-brand-primary via-brand-primary/80 to-adventure-light bg-clip-text text-transparent mb-2 tracking-tight">
            B4Experience
          </h1>
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent w-16"></div>
            <div className="flex items-center gap-2 px-4 py-1 bg-adventure-light/20 rounded-full border border-brand-primary/20">
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-brand-primary uppercase tracking-wider">Premium</span>
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse delay-500"></div>
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-brand-primary to-transparent w-16"></div>
          </div>
        </div>

        {/* Enhanced Subtitle */}
        <div className="space-y-2 mb-8">
          <p className="text-xl md:text-2xl font-semibold text-foreground">
            Aventuras Outdoor Extraordinarias
          </p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre experiencias únicas diseñadas para los amantes de la naturaleza y la aventura
          </p>
        </div>

        {/* Visual Elements */}
        <div className="flex items-center justify-center gap-8 mb-8 opacity-60">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-adventure-light flex items-center justify-center">
              <span className="text-white text-xs font-bold">⛰️</span>
            </div>
            <span className="text-sm text-muted-foreground">Montaña</span>
          </div>
          <div className="w-1 h-1 bg-brand-primary rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-adventure-light flex items-center justify-center">
              <span className="text-white text-xs font-bold">🌊</span>
            </div>
            <span className="text-sm text-muted-foreground">Mar</span>
          </div>
          <div className="w-1 h-1 bg-brand-primary rounded-full"></div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-primary to-adventure-light flex items-center justify-center">
              <span className="text-white text-xs font-bold">🏔️</span>
            </div>
            <span className="text-sm text-muted-foreground">Esquí</span>
          </div>
        </div>
      </div>

      {/* Enhanced Search Form */}
      <div className="max-w-2xl mx-auto mb-6">
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative group">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Bot className="text-brand-primary w-5 h-5 animate-pulse" />
            </div>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-bounce text-brand-primary" />
              <Sparkles className="w-3 h-3 animate-bounce text-adventure-light delay-200" />
            </div>
            <input
              type="text"
              name="search"
              aria-label="Buscar viaje con IA"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={typingText || "¿Dónde quieres ir?"}
              className="w-full pl-14 pr-16 py-5 rounded-2xl border-2 border-brand-primary/30 bg-background/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-2xl text-lg"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-primary/5 via-transparent to-adventure-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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