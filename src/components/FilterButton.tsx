import { Filter, X, MapPin, Activity, Calendar, Users, ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface FilterOption {
  id: string;
  label: string;
  category: 'activity' | 'location' | 'duration' | 'group_size' | 'sort';
}

interface FilterButtonProps {
  onFiltersChange: (filters: FilterOption[]) => void;
}

const filterOptions: FilterOption[] = [
  // Activities
  { id: 'skiing', label: 'Esquí', category: 'activity' },
  { id: 'hiking', label: 'Senderismo', category: 'activity' },
  { id: 'sailing', label: 'Navegación', category: 'activity' },
  { id: 'cycling', label: 'Ciclismo', category: 'activity' },
  
  // Locations
  { id: 'lofoten', label: 'Lofoten', category: 'location' },
  { id: 'tromso', label: 'Tromsø', category: 'location' },
  { id: 'norway', label: 'Noruega', category: 'location' },
  { id: 'sweden', label: 'Suecia', category: 'location' },
  
  // Duration
  { id: '3-5-days', label: '3-5 días', category: 'duration' },
  { id: '6-8-days', label: '6-8 días', category: 'duration' },
  { id: '9-14-days', label: '9-14 días', category: 'duration' },
  
  // Group Size
  { id: 'small-group', label: 'Grupo pequeño (2-6)', category: 'group_size' },
  { id: 'medium-group', label: 'Grupo mediano (7-12)', category: 'group_size' },
  
  // Sort options
  { id: 'price-low', label: 'Precio: menor a mayor', category: 'sort' },
  { id: 'price-high', label: 'Precio: mayor a menor', category: 'sort' },
  { id: 'rating', label: 'Mejor valorados', category: 'sort' },
  { id: 'duration', label: 'Duración', category: 'sort' },
];

const categoryIcons = {
  activity: Activity,
  location: MapPin,
  duration: Calendar,
  group_size: Users,
  sort: ArrowUpDown,
};

const categoryLabels = {
  activity: 'Actividad',
  location: 'Destino',
  duration: 'Duración',
  group_size: 'Tamaño del grupo',
  sort: 'Ordenar por',
};

export const FilterButton = ({ onFiltersChange }: FilterButtonProps) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterToggle = (filter: FilterOption) => {
    const newFilters = selectedFilters.find(f => f.id === filter.id)
      ? selectedFilters.filter(f => f.id !== filter.id)
      : [...selectedFilters.filter(f => f.category !== filter.category || filter.category !== 'sort'), filter];
    
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    onFiltersChange([]);
  };

  const clearFiltersByCategory = (category: string) => {
    const newFilters = selectedFilters.filter(f => f.category !== category);
    setSelectedFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const groupedOptions = filterOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, FilterOption[]>);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="relative bg-background hover:bg-adventure-light border-brand-primary/30 text-brand-primary"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtros
          {selectedFilters.length > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-2 bg-brand-primary text-white h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
            >
              {selectedFilters.length}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold text-brand-primary">
            Filtros y ordenación
          </DialogTitle>
          {selectedFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-muted-foreground hover:text-brand-primary"
            >
              Limpiar todo
            </Button>
          )}
        </DialogHeader>

        {/* Active Filters */}
        {selectedFilters.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium mb-3 text-foreground">Filtros activos:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedFilters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant="secondary"
                  className="bg-brand-primary text-white hover:bg-brand-primary/80 cursor-pointer"
                  onClick={() => handleFilterToggle(filter)}
                >
                  {filter.label}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Filter Categories */}
        <div className="space-y-6">
          {Object.entries(groupedOptions).map(([category, options]) => {
            const IconComponent = categoryIcons[category as keyof typeof categoryIcons];
            const hasActiveFilters = selectedFilters.some(f => f.category === category);
            
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-brand-primary" />
                    <h4 className="font-medium text-foreground">
                      {categoryLabels[category as keyof typeof categoryLabels]}
                    </h4>
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => clearFiltersByCategory(category)}
                      className="text-xs text-muted-foreground hover:text-brand-primary"
                    >
                      Limpiar
                    </Button>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {options.map((option) => {
                    const isSelected = selectedFilters.some(f => f.id === option.id);
                    return (
                      <Button
                        key={option.id}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleFilterToggle(option)}
                        className={`text-sm justify-start ${
                          isSelected 
                            ? "bg-brand-primary text-white hover:bg-brand-primary/90" 
                            : "hover:bg-adventure-light border-brand-primary/30 text-brand-primary"
                        }`}
                      >
                        {option.label}
                      </Button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Apply Filters Button */}
        <div className="flex justify-end gap-2 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="hover:bg-adventure-light"
          >
            Cerrar
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-brand-primary text-white hover:bg-brand-primary/90"
          >
            Aplicar filtros
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};