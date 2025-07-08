import { Menu, User, Globe, X } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("ESP");

  return (
    <header className="sticky top-0 z-50 bg-brand-primary backdrop-blur-sm border-b border-brand-primary/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl md:text-2xl font-bold text-white">
              B4Experience
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">
              Viajes
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">
              Destinos
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">
              Blog
            </a>
            <a href="#" className="text-white/90 hover:text-white transition-colors font-medium">
              Contacto
            </a>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <User className="w-5 h-5 text-white" />
            </button>

            {/* Lateral Menu - Mindtrip Style */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Menu className="w-5 h-5 text-white" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white">
                <SheetHeader className="border-b pb-4 mb-6">
                  <SheetTitle className="text-left text-brand-primary text-xl font-bold">
                    B4Experience
                  </SheetTitle>
                </SheetHeader>
                
                {/* Language Selector */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Idioma / Language
                  </h3>
                  <div className="flex flex-col gap-2">
                    {[
                      { code: "ESP", label: "Español" },
                      { code: "ENG", label: "English" },
                      { code: "CAT", label: "Català" }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                          selectedLanguage === lang.code
                            ? "bg-brand-primary text-white"
                            : "text-foreground hover:bg-adventure-light"
                        }`}
                      >
                        <span className="font-medium">{lang.label}</span>
                        <span className="text-sm opacity-70">{lang.code}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
                    Navegación
                  </h3>
                  <nav className="flex flex-col gap-1">
                    <a href="#" className="p-3 rounded-lg text-foreground hover:bg-adventure-light transition-colors font-medium">
                      Viajes
                    </a>
                    <a href="#" className="p-3 rounded-lg text-foreground hover:bg-adventure-light transition-colors font-medium">
                      Destinos
                    </a>
                    <a href="#" className="p-3 rounded-lg text-foreground hover:bg-adventure-light transition-colors font-medium">
                      Blog
                    </a>
                    <a href="#" className="p-3 rounded-lg text-foreground hover:bg-adventure-light transition-colors font-medium">
                      Contacto
                    </a>
                  </nav>
                </div>

                {/* User Profile Section */}
                <div className="border-t pt-4 mt-auto">
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-adventure-light transition-colors">
                    <User className="w-5 h-5 text-brand-primary" />
                    <span className="font-medium">Mi cuenta</span>
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};