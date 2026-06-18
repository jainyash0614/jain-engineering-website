import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Shield, 
  Clock, 
  FileCheck, 
  Lock, 
  Ruler, 
  Package,
  CheckCircle2,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';
import { useState } from 'react';
import { RFQModal } from '../components/RFQModal';
import { RfqQuickActions } from '../components/RfqQuickActions';
import { ProductCardImage } from '../components/ProductCardImage';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function Home() {
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const trustedOems = [
    { name: 'Honeywell', logo: '/logos/honeywell.png' },
    { name: 'Wipro', logo: '/logos/wipro.png' },
    { name: 'Emerson', logo: '/logos/emerson.png' },
    { name: 'Tecumseh', logo: '/logos/tecumseh.png' },
    { name: 'Groz Tools', logo: '/logos/groz-tools.png' },
    { name: 'Acme Companies', logo: '/logos/acme-companies.png' },
  ];

  const principles = [
    {
      icon: Shield,
      title: 'Repeatable Quality',
      description: 'Consistent manufacturing with documented quality gates at every step'
    },
    {
      icon: Users,
      title: 'Engineering Support',
      description: 'Technical team to help with specifications and customization'
    },
    {
      icon: FileCheck,
      title: 'Full Traceability',
      description: 'Material certificates, test reports, and inspection records'
    },
    {
      icon: Clock,
      title: 'On-Time Delivery',
      description: 'Reliable production schedules with transparent lead times'
    },
    {
      icon: Package,
      title: 'Robust Packaging',
      description: 'Industrial packaging to prevent damage during transit'
    },
    {
      icon: Ruler,
      title: 'Customization Workflow',
      description: 'Seamless process from drawing approval to production'
    }
  ];

  const caseStudies = [
    {
      title: 'Solar EPC Project',
      industry: 'Renewable Energy',
      description: '500+ IP65-rated junction boxes delivered for utility-scale solar installation',
      result: 'Zero field failures, on-time delivery'
    },
    {
      title: 'Industrial Automation',
      industry: 'Manufacturing',
      description: 'Custom control panels for automated assembly line with complex cutouts',
      result: '100% first-time fit, repeat orders'
    },
    {
      title: 'Water Treatment Plant',
      industry: 'Infrastructure',
      description: 'SS316 enclosures for coastal water treatment facility',
      result: 'Corrosion-resistant, 5-year performance'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section - SendCutSend style */}
      <section className="relative bg-background text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
              OEM-grade electrical metal boxes, floor distribution systems, junction boxes, and folded metal boxes.
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Sheet metal fabrication, enclosures, and more. Multiple sizes • 1.0 / 1.2 / 1.6 mm
              • repeatable production • documented quality gates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={() => setRfqModalOpen(true)} className="font-semibold">
                Get Started
              </Button>
              <Link to="/contact?intent=partner">
                <Button size="lg" variant="outline" className="font-medium">
                  Become a Partner
                </Button>
              </Link>
            </div>
            <RfqQuickActions className="mt-6 justify-center items-center" />
          </div>
        </div>

        {/* Trust Bar */}
        <div className="border-t border-border bg-surface-2">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Award className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">OEM confidentiality</p>
              </div>
              <div className="flex flex-col items-center">
                <CheckCircle2 className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">Quality gates</p>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">Scalable capacity</p>
              </div>
              <div className="flex flex-col items-center">
                <Lock className="h-8 w-8 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground">On-time dispatch</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Everything you need - capabilities grid */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Everything you need in just a few clicks.</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From metal boxes to floor distribution — precision fabrication and documented quality.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {principles.slice(0, 6).map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="flex items-start gap-4 p-6 rounded-lg border border-border bg-card shadow-sm">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <Link to="/principles">
              <Button variant="outline" size="lg">View all services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Families */}
      <section className="py-16 md:py-24 bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Four product families
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The Jain Engineering Works portfolio spans four core product lines for OEM
              procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/products/electrical-metal-boxes">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <ProductCardImage
                      src="/products/jeb/hero.jpg"
                      alt="Electrical metal boxes"
                      className="mb-4"
                    />
                    <h3 className="mb-2">Electrical Metal Boxes</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Wall/floor/pole-mount junction and control boxes with 1.0 / 1.2 / 1.6 mm sheet thickness options.
                    </p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Standard IP54–IP66 configurations</li>
                      <li>Multiple sizes with knockout patterns</li>
                      <li>OEM supply and project-based dispatch</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Button size="sm">Explore metal boxes</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/products/floor-distribution-system">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <ProductCardImage
                      src="/products/fds/hero.jpg"
                      alt="Floor distribution system"
                      className="mb-4"
                    />
                    <h3 className="mb-2">Floor Distribution System</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Floor boxes and distribution units for raised-floor environments in offices and control rooms.
                    </p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>Rectangular and square cutout footprints</li>
                      <li>Mixed power and data outlet plates</li>
                      <li>Service-friendly modular construction</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Button size="sm">Explore floor distribution</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/products/junction-boxes">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <ProductCardImage
                      src="/products/cjb/hero.jpg"
                      alt="Junction boxes"
                      className="mb-4"
                    />
                    <h3 className="mb-2">Junction Boxes</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      CJB junction box assemblies with reinforced base stack and knockout-ready
                      raceway entries.
                    </p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>350×350 footprint with 60–75 mm depth range</li>
                      <li>Layered cover + trap frame + pressure/base plate architecture</li>
                      <li>4-side raceway knockouts and die-cast corner pillars</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Button size="sm">Explore junction boxes</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link to="/products/folded-metal-boxes">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-border">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <ProductCardImage
                      src="/products/fmb/hero.jpg"
                      alt="Folded metal boxes"
                      className="mb-4"
                    />
                    <h3 className="mb-2">Folded Metal Boxes</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Folded galvanized back boxes for modular wiring accessories with
                      knockout-ready faces and earth terminals.
                    </p>
                    <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                      <li>8MV 8-module vertical (130×130 mm)</li>
                      <li>1.6 mm pre-galvanized folded construction</li>
                      <li>BS 4662 style modular back box geometry</li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <Button size="sm">Explore folded metal boxes</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Manufacturing Snapshot */}
      <section className="py-16 md:py-24 bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Manufacturing Excellence</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From design to dispatch: transparent, traceable, reliable
            </p>
          </div>

          <div className="bg-card rounded-lg p-8 md:p-12 text-foreground border border-border shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Units/Month Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-success mb-2">7-10</div>
                <div className="text-sm text-muted-foreground">Days Prototype Lead Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-warning mb-2">3-4</div>
                <div className="text-sm text-muted-foreground">Weeks Bulk Production</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">&lt;0.5%</div>
                <div className="text-sm text-muted-foreground">Rejection Rate Target</div>
              </div>
            </div>

            <div className="text-center">
              <Link to="/manufacturing">
                <Button size="lg" variant="outline" className="bg-transparent text-foreground border-border hover:bg-surface">
                  View Manufacturing Tour
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Proven case studies */}
      <section className="py-16 md:py-24 bg-surface-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Proven OEM Case Studies</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real project outcomes across renewable energy, automation, and infrastructure.
              Additional references and anonymised project notes are available on request.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-border">
                <CardContent className="p-6">
                  <Badge className="mb-4">{study.industry}</Badge>
                  <h3 className="mb-3">{study.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{study.description}</p>
                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center text-sm">
                      <TrendingUp className="h-4 w-4 text-success mr-2" />
                      <span className="font-medium text-success">{study.result}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-14 md:py-16 bg-surface border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Trusted by Leading OEMs</h3>
            <p className="text-sm text-muted-foreground">
              Logos used only with permission
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 items-center">
            {trustedOems.map((brand, index) => (
              <div
                key={brand.name}
                data-reveal
                style={{ transitionDelay: `${index * 70}ms` }}
                className="flex items-center justify-center h-20 bg-white rounded-lg border border-border px-3"
              >
                <ImageWithFallback
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="max-h-14 w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA Section - SendCutSend style */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center text-primary-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
            Request a quote or become a partner today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-surface-2 font-semibold"
              onClick={() => setRfqModalOpen(true)}
            >
              Get Started
            </Button>
            <Link to="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10 font-medium"
              >
                Request Quote
              </Button>
            </Link>
          </div>
          <RfqQuickActions className="mt-6 justify-center items-center [&_p]:text-primary-foreground/90 [&_span]:text-primary-foreground" />
        </div>
      </section>

      <RFQModal open={rfqModalOpen} onOpenChange={setRfqModalOpen} />
    </div>
  );
}
