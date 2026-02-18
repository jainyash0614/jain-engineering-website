import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { getProductsByCategory, PRODUCT_CATEGORIES } from '../data/products';

export function ProductsIndex() {
  const metalBoxCategory = PRODUCT_CATEGORIES.find((c) => c.id === 'electrical-metal-boxes');
  const fdsCategory = PRODUCT_CATEGORIES.find((c) => c.id === 'floor-distribution-system');

  const metalBoxCount = getProductsByCategory('electrical-metal-boxes').length;
  const fdsCount = getProductsByCategory('floor-distribution-system').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-3">Products</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            OEM-grade electrical metal boxes and floor distribution systems from Jain Engineering
            Works (Faridabad), designed for repeatable production and procurement confidence.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {metalBoxCategory && (
            <Card className="border-border">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <Badge variant="outline">Product Line 01</Badge>
                  <h2 className="text-2xl font-semibold">{metalBoxCategory.name}</h2>
                  <p className="text-muted-foreground">{metalBoxCategory.description}</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {metalBoxCategory.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    Initial SKUs configured: <span className="font-medium">{metalBoxCount}</span>{' '}
                    (can be extended with your actual matrix).
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/products/electrical-metal-boxes">
                    <Button>Explore Electrical Metal Boxes</Button>
                  </Link>
                  <Link to="/contact?productType=electrical-metal-boxes">
                    <Button variant="outline">Request RFQ for Metal Boxes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {fdsCategory && (
            <Card className="border-border">
              <CardContent className="p-8 flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <Badge variant="outline">Product Line 02</Badge>
                  <h2 className="text-2xl font-semibold">{fdsCategory.name}</h2>
                  <p className="text-muted-foreground">{fdsCategory.description}</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {fdsCategory.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    Sample configurations: <span className="font-medium">{fdsCount}</span> (extend
                    with your actual floor box SKUs).
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/products/floor-distribution-system">
                    <Button>Explore Floor Distribution</Button>
                  </Link>
                  <Link to="/contact?productType=floor-distribution-system">
                    <Button variant="outline">Request RFQ for Floor System</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

