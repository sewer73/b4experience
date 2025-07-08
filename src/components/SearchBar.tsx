import { Search, Filter } from "lucide-react";
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

  return (
    <div className="w-full">
      {/* Hero Text */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-brand-primary mb-3 tracking-tight">
          Vive aventuras extraordinarias
        </h1>
        <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
          Descubre experiencias únicas de outdoor en los destinos más espectaculares del mundo
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-3 max-w-2xl mx-auto">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="sail & ski Lofoten Julio..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 shadow-sm hover:shadow-md"
          />
        </div>
        
        <button
          type="button"
          onClick={onFilterToggle}
          className="p-4 rounded-2xl border border-border bg-background hover:bg-adventure-light transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105"
        >
          <Filter className="w-5 h-5 text-brand-primary" />
        </button>
      </form>

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