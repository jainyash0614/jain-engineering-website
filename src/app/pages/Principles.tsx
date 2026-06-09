import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  FileCheck, 
  Lock, 
  TrendingUp, 
  CheckCircle2,
  Users,
  Target,
  Award
} from 'lucide-react';

export function Principles() {
  const principles = [
    {
      icon: Shield,
      title: 'Multi-Stage Quality Gates',
      description: 'We run checks at three levels: incoming inspection, in-process inspection, and final inspection before dispatch.',
      commitment: 'Documented checkpoints and consistent output.'
    },
    {
      icon: Target,
      title: 'Material Standards & Traceability',
      description: 'We procure material only from approved suppliers and maintain batch traceability with Material Test Certificates (MTCs).',
      commitment: 'Full traceability from mill to finished product.'
    },
    {
      icon: Award,
      title: 'Finishing Standards',
      description: 'Our finishing process follows defined parameters for surface prep, coating thickness, and curing. We verify finish quality through batch checks (adhesion and corrosion-resistance where applicable).',
      commitment: 'Reliable finish quality for long service life.'
    },
    {
      icon: Lock,
      title: 'OEM Confidentiality',
      description: 'We treat OEM data as confidential-drawings, BOMs, specifications, and volumes remain protected.',
      commitment: 'NDAs supported by disciplined information handling.'
    },
    {
      icon: FileCheck,
      title: 'Compliance & Documentation',
      description: 'We align production to relevant standards and provide documentation required for partner approvals (inspection records, test reports, and dispatch documentation).',
      commitment: 'Compliance-ready documentation on time.'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Improvement & Value Engineering',
      description: 'We review feedback and refine processes continuously. For custom requirements, we propose manufacturable, cost-effective options without compromising quality.',
      commitment: 'Smarter designs, stable production, better outcomes.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background to-surface text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-6">Our Operating Principles</h1>
            <p className="text-xl text-muted-foreground mb-8">
              These are the standards we follow on every order-prototype to production.
              They protect quality, timelines, and your OEM requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Principles Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="space-y-12">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div key={index} className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="flex items-start space-x-4 lg:col-span-1">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl mb-2">{principle.title}</h2>
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                  <p className="text-lg text-foreground leading-relaxed">
                    {principle.description}
                  </p>
                  <div className="flex items-start space-x-3 bg-primary/10 p-4 rounded-lg border border-border">
                    <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-medium text-primary">Our Commitment:</span>
                      <span className="text-foreground ml-2">{principle.commitment}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promise Banner */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="mb-4">Our Promise to You</h2>
          <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto mb-8">
            If we can't meet these standards on your order, we won't take it. 
            Your reputation is on the line, and we take that seriously.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-background text-foreground hover:bg-surface-2">
                Start a Conversation
              </Button>
            </Link>
            <Link to="/partner">
              <Button size="lg" variant="outline" className="bg-transparent text-primary-foreground border-primary-foreground/50 hover:bg-primary-foreground/10">
                Become a Partner
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-12">Why These Principles Matter</h2>
          
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Users className="h-8 w-8 text-primary flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">For Panel Builders & Integrators</h3>
                    <p className="text-foreground">
                      You need enclosures that fit perfectly the first time. No rework, no delays, 
                      no surprises. Our quality gates and precision manufacturing ensure your assembly 
                      process runs smoothly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Target className="h-8 w-8 text-success flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">For OEM Procurement Teams</h3>
                    <p className="text-foreground">
                      You need a supplier who can scale with your projects while maintaining consistency. 
                      Our documented processes and traceability give you confidence to standardize on our products.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-8 w-8 text-warning flex-shrink-0" />
                  <div>
                    <h3 className="mb-2">For EPCs & Project Managers</h3>
                    <p className="text-foreground">
                      You need reliable timelines and field-proven products. Our manufacturing capacity 
                      and quality standards mean your site installation goes as planned.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
