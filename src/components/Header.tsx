import { Menu, User, Globe } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-brand-primary">
              B4Experience
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
              Viajes
            </a>
            <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
              Destinos
            </a>
            <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
              Blog
            </a>
            <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
              Contacto
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <button className="p-2 rounded-lg hover:bg-adventure-light transition-colors">
              <Globe className="w-5 h-5 text-brand-primary" />
            </button>

            {/* User Menu */}
            <button className="p-2 rounded-lg hover:bg-adventure-light transition-colors">
              <User className="w-5 h-5 text-brand-primary" />
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-adventure-light transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5 text-brand-primary" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-4">
              <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
                Viajes
              </a>
              <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
                Destinos
              </a>
              <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
                Blog
              </a>
              <a href="#" className="text-foreground hover:text-brand-primary transition-colors">
                Contacto
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};