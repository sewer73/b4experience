import { Search, Filter, Bot, Sparkles, Globe } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilterToggle: () => void;
}

export const SearchBar = ({ onSearch, onFilterToggle }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const [showAiTooltip, setShowAiTooltip] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ESP");

  return (
    <div className="w-full relative">

      {/* Hero Text with AI */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-primary mb-3 tracking-tight">
          Vive aventuras extraordinarias con IA
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
          Descubre experiencias únicas de outdoor en los destinos más espectaculares del mundo
        </p>
      </div>

      {/* AI Search Section */}
      <div className="max-w-2xl mx-auto mb-6">
        {/* AI Chat Section - Layla Style */}
        <div className="text-center mb-4">
          <div className="bg-gradient-to-r from-brand-primary/5 to-adventure-accent/10 rounded-2xl p-6 border border-brand-primary/10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Bot className="w-5 h-5 text-brand-primary" />
              <span className="text-lg font-semibold text-brand-primary">Planifica tu próxima aventura</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Cuéntame qué tipo de experiencia buscas y te ayudo a encontrar el viaje perfecto
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-brand-primary/70">
              <Sparkles className="w-3 h-3" />
              <span>Asistente IA disponible 24/7</span>
            </div>
          </div>
        </div>

        {/* Enhanced Search Form */}
        <form onSubmit={handleSubmit} className="relative flex items-center gap-3">
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
              <Search className="text-muted-foreground w-5 h-5" />
              <Bot className="text-brand-primary w-4 h-4 animate-pulse" />
            </div>
            <input
              type="text"
              name="search"
              aria-label="Buscar viaje con IA"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busca por destino, actividad o escribe tu pregunta"
              className="w-full pl-16 pr-4 py-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 shadow-sm hover:shadow-md"
            />
          </div>
          
          <button
            type="button"
            onClick={onFilterToggle}
            className="p-4 rounded-2xl border border-border bg-background hover:bg-adventure-light transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
            aria-label="Abrir filtros"
          >
            <Filter className="w-5 h-5 text-brand-primary" />
          </button>
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