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
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-4xl font-bold text-brand-primary mb-2">
          Vive aventuras extraordinarias
        </h1>
        <p className="text-sm md:text-base text-muted-foreground mb-4">
          Descubre experiencias únicas de outdoor en los destinos más espectaculares del mundo
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative flex items-center gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="sail & ski Lofoten Julio..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-colors"
          />
        </div>
        
        <button
          type="button"
          onClick={onFilterToggle}
          className="p-3 rounded-xl border border-border bg-background hover:bg-adventure-light transition-colors"
        >
          <Filter className="w-5 h-5 text-brand-primary" />
        </button>
      </form>

      {/* Popular Tags */}
      <div className="mt-4">
        <span className="text-sm font-medium text-foreground">Populares: </span>
        <div className="inline-flex flex-wrap gap-2 mt-1">
          {["Lofoten", "Esquí", "Velero", "Autoguiado", "Tromsø"].map((tag) => (
            <button
              key={tag}
              onClick={() => onSearch(tag)}
              className="px-3 py-1 text-xs rounded-full bg-adventure-light text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};