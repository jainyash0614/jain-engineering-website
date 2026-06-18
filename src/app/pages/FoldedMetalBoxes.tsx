import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ProductCardImage } from '../components/ProductCardImage';
import { getCategoryById, getProductsByCategory } from '../data/products';

export function FoldedMetalBoxes() {
  const category = getCategoryById('folded-metal-boxes');
  const products = getProductsByCategory('folded-metal-boxes');

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-3">Folded Metal Boxes</h1>
          {category && (
            <>
              <p className="text-lg text-muted-foreground max-w-2xl mb-4">{category.heroIntro}</p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                {category.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact?productType=folded-metal-boxes">
              <Button>Request Quote for Folded Metal Boxes</Button>
            </Link>
            <Link to="/contact?intent=partner&productType=folded-metal-boxes">
              <Button variant="outline">Discuss OEM Program</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4">Folded metal box configurations</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            Single-sheet folded galvanized back boxes for modular wiring accessories — with
            knockout-ready faces, earth terminals, and faceplate mounting lugs for repeatable OEM
            supply.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <Badge variant="outline" className="mb-3">
                    Folded Metal Box
                  </Badge>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  {product.heroImage ? (
                    <ProductCardImage src={product.heroImage} alt={product.name} className="mb-3" />
                  ) : null}
                  <p className="text-sm text-muted-foreground mb-4">{product.shortDescription}</p>
                  <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                    <li>
                      <span className="font-medium">Sizes:</span>{' '}
                      {product.sizeOptions.map((s) => s.label).join(', ')}
                    </li>
                    <li>
                      <span className="font-medium">Sheet thickness:</span>{' '}
                      {product.thicknessOptions.map((t) => t.toFixed(1)).join(' / ')} mm
                    </li>
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <Link to={`/products/${product.slug}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                    <Link
                      to={`/contact?product=${encodeURIComponent(
                        product.name,
                      )}&productType=folded-metal-boxes`}
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
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4">Where it is typically used</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Modular switch & socket mounting',
                body: 'Flush back boxes for MCB plates, modular wiring devices, and accessory faceplates.',
              },
              {
                title: 'Commercial fit-out projects',
                body: 'Repeatable folded boxes for partitions, offices, and retail electrical fit-outs.',
              },
              {
                title: 'OEM panel builder supply',
                body: 'Standardized knockouts and earth terminals for volume procurement programs.',
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
