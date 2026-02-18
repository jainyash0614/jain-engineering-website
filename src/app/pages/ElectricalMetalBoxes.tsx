import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getCategoryById, getProductsByCategory } from '../data/products';

const THICKNESS_OPTIONS = [1.0, 1.2, 1.6] as const;

export function ElectricalMetalBoxes() {
  const category = getCategoryById('electrical-metal-boxes');
  const allProducts = getProductsByCategory('electrical-metal-boxes');

  const [selectedThickness, setSelectedThickness] = useState<number | 'all'>('all');
  const [selectedSizeLabel, setSelectedSizeLabel] = useState<string | 'all'>('all');

  const sizeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          allProducts.flatMap((p) => p.sizeOptions.map((s) => s.label)),
        ),
      ),
    [allProducts],
  );

  const filtered = allProducts.filter((product) => {
    if (selectedThickness !== 'all' && !product.thicknessOptions.includes(selectedThickness)) {
      return false;
    }
    if (
      selectedSizeLabel !== 'all' &&
      !product.sizeOptions.some((s) => s.label === selectedSizeLabel)
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-3">Electrical Metal Boxes</h1>
          {category && (
            <>
              <p className="text-lg text-muted-foreground max-w-2xl mb-4">
                {category.heroIntro}
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {category.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact?productType=electrical-metal-boxes">
              <Button>Request Quote for Metal Boxes</Button>
            </Link>
            <Link to="/contact?intent=partner&productType=electrical-metal-boxes">
              <Button variant="outline">Become a Supply Partner</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters + grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Filter by build parameters</h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Frontend-only selectors to help procurement teams quickly shortlist SKUs. Real
              thickness/size matrices can be wired to this structure.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Thickness (mm)
              </label>
              <Select
                value={selectedThickness.toString()}
                onValueChange={(value) =>
                  setSelectedThickness(value === 'all' ? 'all' : parseFloat(value))
                }
              >
                <SelectTrigger id="thickness">
                  <SelectValue placeholder="All thicknesses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All thicknesses</SelectItem>
                  {THICKNESS_OPTIONS.map((t) => (
                    <SelectItem key={t} value={t.toString()}>
                      {t.toFixed(1)} mm
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[160px]">
              <label className="block text-xs font-medium text-muted-foreground mb-1">
                Size
              </label>
              <Select
                value={selectedSizeLabel === 'all' ? 'all' : selectedSizeLabel}
                onValueChange={(value) => setSelectedSizeLabel(value as typeof selectedSizeLabel)}
              >
                <SelectTrigger id="size">
                  <SelectValue placeholder="All sizes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All sizes</SelectItem>
                  {sizeOptions.map((label) => (
                    <SelectItem key={label} value={label}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <Card key={product.id} className="border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.shortDescription}</p>
                  </div>
                  <Badge variant="outline">Metal Box</Badge>
                </div>

                <div className="w-full h-40 bg-surface-2 rounded-lg border border-border mb-4 overflow-hidden">
                  {product.heroImage ? (
                    <ImageWithFallback
                      src={product.heroImage}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-medium">Thickness:</span>{' '}
                    {product.thicknessOptions.map((t) => t.toFixed(1)).join(' / ')} mm
                  </div>
                  <div>
                    <span className="font-medium">Sizes:</span>{' '}
                    {product.sizeOptions.map((s) => s.label).join(', ')}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3 justify-between items-center">
                  <Link to={`/products/${product.slug}`}>
                    <Button size="sm">View Details</Button>
                  </Link>
                  <Link
                    to={`/contact?product=${encodeURIComponent(
                      product.name,
                    )}&productType=electrical-metal-boxes`}
                  >
                    <Button size="sm" variant="outline">
                      Request RFQ
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

