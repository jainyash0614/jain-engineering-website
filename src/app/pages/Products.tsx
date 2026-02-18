import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Label } from '../components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';
import { Filter, X, Box } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  material: string;
  ipRating: string;
  mounting: string;
  dimensions: string;
  indoor: boolean;
  thickness: string;
  doorType: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Standard Junction Box JB-400', material: 'MS', ipRating: 'IP65', mounting: 'Wall', dimensions: '400x300x200', indoor: false, thickness: '1.5mm', doorType: 'Single' },
  { id: '2', name: 'Control Panel CP-600', material: 'MS', ipRating: 'IP54', mounting: 'Wall', dimensions: '600x400x250', indoor: true, thickness: '2.0mm', doorType: 'Double' },
  { id: '3', name: 'Outdoor Enclosure OE-800', material: 'SS304', ipRating: 'IP66', mounting: 'Floor', dimensions: '800x600x300', indoor: false, thickness: '2.0mm', doorType: 'Single' },
  { id: '4', name: 'Compact Wall Box WB-300', material: 'MS', ipRating: 'IP65', mounting: 'Wall', dimensions: '300x250x150', indoor: false, thickness: '1.5mm', doorType: 'Single' },
  { id: '5', name: 'Heavy Duty Cabinet HD-1200', material: 'MS', ipRating: 'IP54', mounting: 'Floor', dimensions: '1200x800x400', indoor: true, thickness: '2.5mm', doorType: 'Double' },
  { id: '6', name: 'Stainless Junction SJ-500', material: 'SS316', ipRating: 'IP66', mounting: 'Wall', dimensions: '500x400x200', indoor: false, thickness: '2.0mm', doorType: 'Single' },
  { id: '7', name: 'Aluminum Enclosure AL-600', material: 'Aluminum', ipRating: 'IP65', mounting: 'Wall', dimensions: '600x500x250', indoor: false, thickness: '3.0mm', doorType: 'Single' },
  { id: '8', name: 'Industrial Panel IP-1000', material: 'MS', ipRating: 'IP54', mounting: 'Floor', dimensions: '1000x600x300', indoor: true, thickness: '2.0mm', doorType: 'Double' },
  { id: '9', name: 'Pole Mount Enclosure PM-400', material: 'MS', ipRating: 'IP65', mounting: 'Pole', dimensions: '400x300x200', indoor: false, thickness: '1.5mm', doorType: 'Single' },
];

export function Products() {
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedIPRatings, setSelectedIPRatings] = useState<string[]>([]);
  const [selectedMounting, setSelectedMounting] = useState<string[]>([]);
  const [indoorOutdoor, setIndoorOutdoor] = useState<string[]>([]);
  const [selectedComparison, setSelectedComparison] = useState<string[]>([]);

  const toggleFilter = (filterArray: string[], setFilter: (arr: string[]) => void, value: string) => {
    if (filterArray.includes(value)) {
      setFilter(filterArray.filter(item => item !== value));
    } else {
      setFilter([...filterArray, value]);
    }
  };

  const filteredProducts = mockProducts.filter(product => {
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) return false;
    if (selectedIPRatings.length > 0 && !selectedIPRatings.includes(product.ipRating)) return false;
    if (selectedMounting.length > 0 && !selectedMounting.includes(product.mounting)) return false;
    if (indoorOutdoor.includes('Indoor') && !product.indoor) return false;
    if (indoorOutdoor.includes('Outdoor') && product.indoor) return false;
    return true;
  });

  const clearFilters = () => {
    setSelectedMaterials([]);
    setSelectedIPRatings([]);
    setSelectedMounting([]);
    setIndoorOutdoor([]);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Material Filter */}
      <div>
        <h3 className="font-semibold mb-3">Material</h3>
        <div className="space-y-2">
          {['MS', 'SS304', 'SS316', 'Aluminum'].map(material => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}`}
                checked={selectedMaterials.includes(material)}
                onCheckedChange={() => toggleFilter(selectedMaterials, setSelectedMaterials, material)}
              />
              <Label htmlFor={`material-${material}`} className="text-sm font-normal cursor-pointer">
                {material}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* IP Rating Filter */}
      <div>
        <h3 className="font-semibold mb-3">IP Rating</h3>
        <div className="space-y-2">
          {['IP54', 'IP65', 'IP66'].map(rating => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`ip-${rating}`}
                checked={selectedIPRatings.includes(rating)}
                onCheckedChange={() => toggleFilter(selectedIPRatings, setSelectedIPRatings, rating)}
              />
              <Label htmlFor={`ip-${rating}`} className="text-sm font-normal cursor-pointer">
                {rating}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Indoor/Outdoor Filter */}
      <div>
        <h3 className="font-semibold mb-3">Application</h3>
        <div className="space-y-2">
          {['Indoor', 'Outdoor'].map(type => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`indoor-${type}`}
                checked={indoorOutdoor.includes(type)}
                onCheckedChange={() => toggleFilter(indoorOutdoor, setIndoorOutdoor, type)}
              />
              <Label htmlFor={`indoor-${type}`} className="text-sm font-normal cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Mounting Filter */}
      <div>
        <h3 className="font-semibold mb-3">Mounting Type</h3>
        <div className="space-y-2">
          {['Wall', 'Floor', 'Pole'].map(mounting => (
            <div key={mounting} className="flex items-center space-x-2">
              <Checkbox
                id={`mounting-${mounting}`}
                checked={selectedMounting.includes(mounting)}
                onCheckedChange={() => toggleFilter(selectedMounting, setSelectedMounting, mounting)}
              />
              <Label htmlFor={`mounting-${mounting}`} className="text-sm font-normal cursor-pointer">
                {mounting}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="mb-2">Product Catalog</h1>
          <p className="text-lg text-muted-foreground">
            Explore our complete range of electrical enclosures
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-surface rounded-lg border border-border p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Badge variant="secondary">{filteredProducts.length}</Badge>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Results Count */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} of {mockProducts.length} products
                </span>
              </div>

              {/* Mobile Filter Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Active Filters */}
            {(selectedMaterials.length > 0 || selectedIPRatings.length > 0 || selectedMounting.length > 0 || indoorOutdoor.length > 0) && (
              <div className="mb-6 flex flex-wrap gap-2">
                {selectedMaterials.map(m => (
                  <Badge key={m} variant="secondary" className="pl-3 pr-1 py-1">
                    {m}
                    <button
                      onClick={() => toggleFilter(selectedMaterials, setSelectedMaterials, m)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedIPRatings.map(r => (
                  <Badge key={r} variant="secondary" className="pl-3 pr-1 py-1">
                    {r}
                    <button
                      onClick={() => toggleFilter(selectedIPRatings, setSelectedIPRatings, r)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedMounting.map(m => (
                  <Badge key={m} variant="secondary" className="pl-3 pr-1 py-1">
                    {m}
                    <button
                      onClick={() => toggleFilter(selectedMounting, setSelectedMounting, m)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {indoorOutdoor.map(i => (
                  <Badge key={i} variant="secondary" className="pl-3 pr-1 py-1">
                    {i}
                    <button
                      onClick={() => toggleFilter(indoorOutdoor, setIndoorOutdoor, i)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow border-border">
                  <CardContent className="p-6">
                    {/* Comparison Checkbox */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`compare-${product.id}`}
                          checked={selectedComparison.includes(product.id)}
                          onCheckedChange={() => {
                            if (selectedComparison.includes(product.id)) {
                              setSelectedComparison(selectedComparison.filter(id => id !== product.id));
                            } else if (selectedComparison.length < 3) {
                              setSelectedComparison([...selectedComparison, product.id]);
                            }
                          }}
                          disabled={!selectedComparison.includes(product.id) && selectedComparison.length >= 3}
                        />
                        <Label htmlFor={`compare-${product.id}`} className="text-xs text-muted-foreground cursor-pointer">
                          Compare
                        </Label>
                      </div>
                      <Badge variant="outline">{product.ipRating}</Badge>
                    </div>

                    {/* Product Image */}
                    <div className="w-full h-48 bg-surface-2 rounded-lg border border-border mb-4 flex items-center justify-center">
                      <Box className="h-16 w-16 text-muted-foreground" />
                    </div>

                    {/* Product Info */}
                    <h3 className="mb-2">{product.name}</h3>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Material:</span>
                        <span className="font-medium">{product.material}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Dimensions:</span>
                        <span className="font-medium">{product.dimensions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Mounting:</span>
                        <span className="font-medium">{product.mounting}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mb-4">
                      <Badge variant="secondary" className="text-xs">{product.material}</Badge>
                      <Badge variant="secondary" className="text-xs">{product.doorType} Door</Badge>
                      <Badge variant="secondary" className="text-xs">{product.thickness}</Badge>
                    </div>

                    <Link to={`/product/${product.id}`}>
                      <Button className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Box className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your filters</p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comparison Bar */}
      {selectedComparison.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-lg z-40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium">
                  {selectedComparison.length} selected for comparison
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedComparison([])}
                >
                  Clear
                </Button>
              </div>
              <Button
                disabled={selectedComparison.length < 2}
              >
                Compare Products ({selectedComparison.length})
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
