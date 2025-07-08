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
      {/* Language Selector */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-1 bg-background border border-border rounded-full p-1 shadow-sm">
          {["ENG", "ESP", "CAT"].map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
                selectedLanguage === lang
                  ? "bg-brand-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-brand-primary hover:bg-adventure-light"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

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
        {/* AI Assistant Badge */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="flex items-center gap-2 bg-gradient-to-r from-brand-primary/10 to-adventure-accent/20 px-3 py-1 rounded-full border border-brand-primary/20">
            <span className="text-lg">💬</span>
            <span className="text-sm font-medium text-brand-primary">Ask our AI travel assistant</span>
            <Sparkles className="w-4 h-4 text-brand-primary animate-pulse" />
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

      {/* Floating AI Assistant Button */}
      <div className="relative">
        <button
          className="fixed bottom-6 right-6 z-50 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group animate-pulse"
          onMouseEnter={() => setShowAiTooltip(true)}
          onMouseLeave={() => setShowAiTooltip(false)}
          aria-label="Asistente IA disponible 24/7"
        >
          <Bot className="w-6 h-6" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-adventure-accent rounded-full animate-ping"></div>
        </button>

        {/* AI Tooltip */}
        {showAiTooltip && (
          <div className="fixed bottom-20 right-6 z-50 bg-white border border-border rounded-lg shadow-xl p-3 max-w-xs animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-4 h-4 text-brand-primary" />
              <span className="font-semibold text-brand-primary">¿Te ayudo a planificar tu viaje?</span>
            </div>
            <p className="text-sm text-muted-foreground">Disponible 24/7 con IA</p>
            <div className="absolute bottom-full right-4 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white"></div>
          </div>
        )}
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