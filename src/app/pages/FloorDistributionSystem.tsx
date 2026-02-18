import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { getCategoryById, getProductsByCategory } from '../data/products';

export function FloorDistributionSystem() {
  const category = getCategoryById('floor-distribution-system');
  const products = getProductsByCategory('floor-distribution-system');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-3">Floor Distribution System</h1>
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
            <Link to="/contact?productType=floor-distribution-system">
              <Button>Request Quote for Floor System</Button>
            </Link>
            <Link to="/contact?intent=partner&productType=floor-distribution-system">
              <Button variant="outline">Discuss OEM Program</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Configurations */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <h2 className="text-xl font-semibold mb-4">Sample configurations</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            The configurations below are placeholders to illustrate how typical floor distribution
            units are structured. Real SKUs and wiring diagrams can be mapped to this layout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-border hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <Badge variant="outline" className="mb-3">
                    Floor Distribution
                  </Badge>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="w-full h-36 bg-surface-2 rounded-lg border border-border mb-3 overflow-hidden">
                    {product.heroImage ? (
                      <ImageWithFallback
                        src={product.heroImage}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {product.shortDescription}
                  </p>
                  <ul className="text-xs text-muted-foreground space-y-1 mb-4">
                    <li>
                      <span className="font-medium">Cutout sizes:</span>{' '}
                      {product.sizeOptions.map((s) => s.label).join(', ')}
                    </li>
                    <li>
                      <span className="font-medium">Suggested applications:</span>{' '}
                      {product.applications.slice(0, 2).join(', ')}
                    </li>
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-3">
                    <Link to={`/products/${product.slug}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                    <Link
                      to={`/contact?product=${encodeURIComponent(
                        product.name,
                      )}&productType=floor-distribution-system`}
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

        {/* Applications strip */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Where it is typically used</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Corporate offices',
                body: 'Workstations and collaboration spaces requiring convenient floor access points for power and data.',
              },
              {
                title: 'Control rooms & data centers',
                body: 'Operator consoles and racks with dense cabling that must remain serviceable under raised floors.',
              },
              {
                title: 'Training & conference facilities',
                body: 'Flexible seating layouts where outlet positions change based on event configuration.',
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

        {/* RFQ CTA */}
        <section className="border border-border rounded-xl p-8 bg-surface-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                Ready to discuss your floor distribution requirement?
              </h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                Share your floor layout and outlet mix. Jain Engineering Works will propose a
                configuration matrix and standard kit of parts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact?productType=floor-distribution-system">
                <Button>Send RFQ</Button>
              </Link>
              <Link to="/resources">
                <Button variant="outline">View technical resources</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

