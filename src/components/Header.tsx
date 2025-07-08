import { Menu, User, Search, Sparkles, MessageCircle } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ESP");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAITooltip, setShowAITooltip] = useState(false);

  const languages = ["ENG", "ESP", "CAT"];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Search query:", searchQuery);
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between h-16 md:hidden">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-lg font-bold text-brand-primary tracking-tight">
                B4Experience
              </h1>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <div className="flex items-center bg-adventure-light rounded-full px-2 py-1">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2 py-1 text-xs font-medium rounded-full transition-colors ${
                      selectedLanguage === lang 
                        ? "bg-brand-primary text-white" 
                        : "text-muted-foreground hover:text-brand-primary"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* User Menu */}
              <button className="p-2 rounded-full hover:bg-adventure-light transition-colors">
                <User className="w-4 h-4 text-brand-primary" />
              </button>

              {/* Mobile Menu Button */}
              <button 
                className="p-2 rounded-full hover:bg-adventure-light transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Menu className="w-4 h-4 text-brand-primary" />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-brand-primary tracking-tight">
                B4Experience
              </h1>
            </div>

            {/* Central Search */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Busca por destino, actividad o escribe tu pregunta"
                    name="search"
                    aria-label="Buscar viaje con IA"
                    className="w-full pl-12 pr-16 py-4 rounded-2xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 shadow-sm hover:shadow-md"
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-primary" />
                  </div>
                </div>
                <div className="flex items-center justify-center mt-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    💬 Ask our AI travel assistant
                  </span>
                </div>
              </form>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="flex items-center bg-adventure-light rounded-full px-3 py-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-1 text-sm font-medium rounded-full transition-colors ${
                      selectedLanguage === lang 
                        ? "bg-brand-primary text-white" 
                        : "text-muted-foreground hover:text-brand-primary"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              {/* User Menu */}
              <button className="p-3 rounded-full hover:bg-adventure-light transition-colors">
                <User className="w-5 h-5 text-brand-primary" />
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4 pt-2">
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busca destino o actividad..."
                  name="search"
                  aria-label="Buscar viaje con IA"
                  className="w-full pl-10 pr-12 py-3 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all duration-200 shadow-sm"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Sparkles className="w-4 h-4 text-brand-primary" />
                </div>
              </div>
              <div className="flex items-center justify-center mt-1">
                <span className="text-xs text-muted-foreground">💬 Ask our AI</span>
              </div>
            </form>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border py-4 animate-fade-in">
              <nav className="flex flex-col gap-4">
                <a href="#" className="text-foreground hover:text-brand-primary transition-colors font-medium">
                  Viajes
                </a>
                <a href="#" className="text-foreground hover:text-brand-primary transition-colors font-medium">
                  Destinos
                </a>
                <a href="#" className="text-foreground hover:text-brand-primary transition-colors font-medium">
                  Blog
                </a>
                <a href="#" className="text-foreground hover:text-brand-primary transition-colors font-medium">
                  Contacto
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* AI Assistant Floating Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className="relative"
          onMouseEnter={() => setShowAITooltip(true)}
          onMouseLeave={() => setShowAITooltip(false)}
        >
          {/* Tooltip */}
          {showAITooltip && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-brand-primary text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
              Disponible 24/7 con IA
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-brand-primary"></div>
            </div>
          )}
          
          {/* AI Button */}
          <button className="bg-brand-primary hover:bg-brand-primary/90 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse hover:animate-none group">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-6 h-6" />
              <span className="hidden sm:block text-sm font-medium">¿Te ayudo a planificar tu viaje?</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};