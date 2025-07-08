import { Search, Bot, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

interface StickySearchBarProps {
  onSearch: (query: string) => void;
  isVisible: boolean;
}

export const StickySearchBar = ({ onSearch, isVisible }: StickySearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div 
      className={`fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Search className="text-muted-foreground w-4 h-4" />
              <Bot className="text-brand-primary w-3 h-3" />
            </div>
            <input
              type="text"
              name="search"
              aria-label="Buscar viaje con IA"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por destino, actividad o escribe tu pregunta"
              className="w-full pl-14 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 shadow-sm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};