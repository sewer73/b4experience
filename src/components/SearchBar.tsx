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
      {/* Hero Text - Clean & Focused */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-brand-primary mb-4 tracking-tight">
          B4Experience
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Aventuras outdoor premium
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