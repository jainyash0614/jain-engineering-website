import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Factory,
  User,
  Users,
  Package,
  Award,
  CheckCircle2,
} from 'lucide-react';

export function About() {
  const productTraits = [
    'Higher efficiency',
    'Durable performance',
    'Compact designs',
    'Effective functionality',
    'Rugged construction',
    'Long service life',
    'Low maintenance',
    'Corrosion resistance',
  ];

  const productRange = [
    'Metal plate',
    'Port silencer',
    'Metal box',
    'Shock loop assembly',
    'Compressor assembly',
    'Counter weight assembly',
    'Counter weight',
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-3">Jain Engineering Works</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Incepted in 2003. Manufacturing and supplying precision sheet metal components, metal boxes, metal plates, and industrial assemblies from Faridabad.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Company story */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Our Story</h2>
          <div className="prose prose-invert max-w-none space-y-4 text-foreground">
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2003, Jain Engineering Works is a Faridabad-based manufacturer of precision sheet-metal components for industrial and electrical applications. We specialize in OEM-grade electrical metal boxes, floor distribution systems, junction box assemblies, and folded metal back boxes, along with a wide range of custom sheet-metal fabrication.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our operations are led by Mr. Sudhir Jain, whose hands-on manufacturing experience and process-driven approach ensure consistent quality, reliable lead times, and repeatable production.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With a skilled workforce and a well-organized delivery network across India, we support customers with safe packaging and timely dispatch-whether for prototypes, small batches, or volume supply.
            </p>
          </div>
        </section>

        {/* Factsheet */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Factory className="h-7 w-7 text-primary" />
            Factsheet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-foreground">Basic Information</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Nature of Business</dt>
                    <dd className="font-medium text-foreground">Manufacturer</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Additional Business</dt>
                    <dd className="font-medium text-foreground">Factory / Manufacturing</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Company CEO</dt>
                    <dd className="font-medium text-foreground">Sudhir Jain</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Total Employees</dt>
                    <dd className="font-medium text-foreground">11 to 25 People</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">GST Registration Date</dt>
                    <dd className="font-medium text-foreground">01-07-2017</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Legal Status</dt>
                    <dd className="font-medium text-foreground">Partnership</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-muted-foreground">Annual Turnover</dt>
                    <dd className="font-medium text-foreground">5 - 25 Cr</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-foreground">Statutory Profile</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex flex-col gap-1">
                    <dt className="text-muted-foreground">GST No.</dt>
                    <dd className="font-medium text-foreground font-mono">06AAEFJ4076H1ZD</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Product profile */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Package className="h-7 w-7 text-primary" />
            Product Profile
          </h2>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            We offer top-notch sheet metal components such as metal plates, metal boxes, and more, in accordance with industry standards. These are developed from quality stainless steel, mild steel, bronze, aluminum and iron castings. With the support of proficient engineers and a state-of-the-art manufacturing unit, we can also develop products as per the specification of clients.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-foreground">Our assortment</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {productRange.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3 text-foreground">Product traits</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {productTraits.map((trait) => (
                    <li key={trait} className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-primary flex-shrink-0" />
                      {trait}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-4">
                  These are efficiently catered to meet the requirements of various industrial suppliers.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Diligent team */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" />
            Diligent Team
          </h2>
          <Card className="border-border">
            <CardContent className="p-6 md:p-8">
              <p className="text-muted-foreground leading-relaxed mb-4">
                We have appointed a diligent team to ensure smooth working of our business. The professionals are the backbone of our company. These include designers, engineers, technicians, quality controllers, research experts and warehousing staff. They are qualified and have adeptness in their respective sphere of work.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We provide our personnel skill improvement training for their intellectual growth. The training is also offered to make them aware of the latest developments in the industry. Our engineers work in assistance with the technicians for production of top-notch metal plates, metal boxes, port silencer and counter weight assembly. Our quality controllers carry out checking of the product at various production stages to ensure its manufacturing as per the industry standard. Further, the research experts put endeavour to update the products. All of them work in coordination with each other with the common goal of achieving maximum client satisfaction.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Leadership */}
        <section>
          <Card className="border-border bg-surface-2">
            <CardContent className="p-6 flex flex-col sm:flex-row items-start gap-6">
              <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground mb-1">Mr. Sudhir Jain</h3>
                <p className="text-sm text-muted-foreground mb-2">CEO</p>
                <p className="text-sm text-muted-foreground">
                  Under his able guidance and the support of a dynamic, experienced workforce, Jain Engineering Works has carved a niche in the industry. His vast industrial experience of over 15 years in the domain drives our commitment to quality and on-time delivery.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="border border-border rounded-xl p-8 bg-surface-2">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">Work with us</h2>
              <p className="text-sm text-muted-foreground max-w-xl">
                Whether you need metal boxes, metal plates, sheet metal components or custom assemblies, our team is ready to discuss your requirements and deliver within the stipulated time frame.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/contact">
                <Button>Request Quote</Button>
              </Link>
              <Link to="/products">
                <Button variant="outline">View Products</Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
