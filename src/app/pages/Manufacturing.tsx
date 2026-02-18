import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  FileText, 
  Scissors, 
  Maximize, 
  Zap, 
  Droplet, 
  Palette, 
  Wrench, 
  CheckCircle, 
  Package, 
  Truck,
  ChevronRight
} from 'lucide-react';

interface ManufacturingStep {
  id: number;
  title: string;
  icon: any;
  description: string;
  checklist: string[];
  qualityGate: string;
  color: string;
}

export function Manufacturing() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  const steps: ManufacturingStep[] = [
    {
      id: 1,
      title: 'Design & Drawing Approval',
      icon: FileText,
      description: 'Customer provides specifications or selects from standard models. Our engineering team reviews for manufacturability and provides technical drawings for approval.',
      checklist: [
        'Specification review',
        'Technical drawing creation',
        'Customer approval',
        'BOM generation'
      ],
      qualityGate: 'Drawing sign-off by customer and engineering lead',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Material Cutting',
      icon: Scissors,
      description: 'Precision CNC cutting of metal sheets to exact dimensions. All materials are inspected and certified before cutting begins.',
      checklist: [
        'Material certificate verification',
        'CNC program setup',
        'Precision cutting',
        'Dimension verification'
      ],
      qualityGate: 'Random sample measurement, <±0.5mm tolerance',
      color: 'bg-indigo-500'
    },
    {
      id: 3,
      title: 'Bending & Forming',
      icon: Maximize,
      description: 'CNC press brake bending to create enclosure shape. Each bend is programmed for consistency and checked against specifications.',
      checklist: [
        'Bending program setup',
        'First-piece inspection',
        'Batch processing',
        'Angle verification'
      ],
      qualityGate: 'First-piece and in-process bend angle checks',
      color: 'bg-violet-500'
    },
    {
      id: 4,
      title: 'Welding',
      icon: Zap,
      description: 'MIG/TIG welding of seams and joints. Welders are trained and certified. All welds are inspected for strength and appearance.',
      checklist: [
        'Joint preparation',
        'Tack welding',
        'Full seam welding',
        'Weld quality inspection'
      ],
      qualityGate: 'Visual and penetration testing on sample welds',
      color: 'bg-purple-500'
    },
    {
      id: 5,
      title: 'Surface Preparation',
      icon: Droplet,
      description: 'Chemical cleaning and pre-treatment to ensure optimal coating adhesion. Phosphating or chromating depending on material and application.',
      checklist: [
        'Degreasing',
        'Chemical treatment',
        'Rinsing',
        'Drying'
      ],
      qualityGate: 'Surface cleanliness verification',
      color: 'bg-pink-500'
    },
    {
      id: 6,
      title: 'Powder Coating',
      icon: Palette,
      description: 'Electrostatic powder coating followed by high-temperature curing. Coating thickness 60-80 microns. Color per customer specification.',
      checklist: [
        'Powder application (60-80μ)',
        'Curing at 180-200°C',
        'Cooling',
        'Thickness measurement'
      ],
      qualityGate: 'Thickness gauge check, adhesion test',
      color: 'bg-red-500'
    },
    {
      id: 7,
      title: 'Assembly',
      icon: Wrench,
      description: 'Installation of hinges, locks, gaskets, mounting plates, and accessories. All hardware is torqued to specification.',
      checklist: [
        'Hardware installation',
        'Gasket fitting',
        'Mounting plate assembly',
        'Functional testing'
      ],
      qualityGate: 'Door operation, lock function, seal check',
      color: 'bg-orange-500'
    },
    {
      id: 8,
      title: 'Final QC',
      icon: CheckCircle,
      description: 'Comprehensive inspection against customer specifications. IP rating verification, dimensional check, coating inspection, and functional testing.',
      checklist: [
        'Dimension verification',
        'IP rating water test',
        'Visual inspection',
        'Documentation'
      ],
      qualityGate: 'Final inspection report signed by QC manager',
      color: 'bg-green-500'
    },
    {
      id: 9,
      title: 'Packing',
      icon: Package,
      description: 'Industrial-grade packaging with protective materials. Each unit is individually wrapped and boxed with desiccant to prevent moisture damage.',
      checklist: [
        'Protective wrapping',
        'Carton packing',
        'Labeling',
        'Documentation insert'
      ],
      qualityGate: 'Packing checklist verification',
      color: 'bg-teal-500'
    },
    {
      id: 10,
      title: 'Dispatch',
      icon: Truck,
      description: 'Scheduled dispatch per customer requirements. All shipments are tracked and documented with packing lists and test reports.',
      checklist: [
        'Shipment scheduling',
        'Loading supervision',
        'Documentation handover',
        'Tracking number provision'
      ],
      qualityGate: 'Dispatch checklist and customer notification',
      color: 'bg-cyan-500'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background to-surface text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-6">Manufacturing Excellence</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Transparent, traceable manufacturing from design to dispatch. 
              Every step documented, every gate verified.
            </p>
          </div>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="border-b border-border bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-sm text-muted-foreground">Units/Month Capacity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success mb-2">7-10 Days</div>
              <div className="text-sm text-muted-foreground">Prototype Lead Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-warning mb-2">3-4 Weeks</div>
              <div className="text-sm text-muted-foreground">Bulk Production</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">&lt;0.5%</div>
              <div className="text-sm text-muted-foreground">Rejection Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Manufacturing Timeline */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="mb-4">Our Manufacturing Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Click any step to see the detailed checklist and quality gates
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block overflow-x-auto pb-8">
          <div className="flex items-start space-x-4 min-w-max px-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isSelected = selectedStep === step.id;
              return (
                <div key={step.id} className="flex items-start">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => setSelectedStep(isSelected ? null : step.id)}
                      className={`w-20 h-20 rounded-xl flex items-center justify-center transition-all ${
                        isSelected 
                          ? `${step.color} text-white scale-110 shadow-lg` 
                          : 'bg-surface-2 text-muted-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="h-10 w-10" />
                    </button>
                    <div className="mt-3 text-center w-32">
                      <div className={`text-sm font-medium mb-1 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                        Step {step.id}
                      </div>
                      <div className="text-xs text-muted-foreground leading-tight">
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ChevronRight className="h-6 w-6 text-border mt-7 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-4">
          {steps.map((step) => {
            const Icon = step.icon;
            const isSelected = selectedStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setSelectedStep(isSelected ? null : step.id)}
                className={`w-full text-left transition-all ${
                  isSelected ? 'ring-2 ring-primary' : ''
                }`}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${step.color} text-white`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-muted-foreground mb-1">Step {step.id}</div>
                        <div className="font-medium">{step.title}</div>
                      </div>
                      <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                    </div>
                  </CardContent>
                </Card>
              </button>
            );
          })}
        </div>

        {/* Step Details */}
        {selectedStep !== null && (
          <div className="mt-12">
            {steps.filter(s => s.id === selectedStep).map(step => {
              const Icon = step.icon;
              return (
                <Card key={step.id} className="border-2 border-primary">
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6 mb-6">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${step.color} text-white flex-shrink-0`}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="flex-1">
                        <Badge className="mb-2">Step {step.id} of {steps.length}</Badge>
                        <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                        <p className="text-foreground text-lg">{step.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-success" />
                          Process Checklist
                        </h4>
                        <ul className="space-y-2">
                          {step.checklist.map((item, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                              <span className="text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-4 flex items-center">
                          <CheckCircle className="h-5 w-5 mr-2 text-warning" />
                          Quality Gate
                        </h4>
                        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                          <p className="text-foreground">{step.qualityGate}</p>
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground">
                          Each quality gate must pass before proceeding to the next step. 
                          All checks are documented and signed off by the responsible supervisor.
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-surface-2 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="mb-4">Want to See Our Factory?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We welcome facility visits from potential partners. See our processes in action.
          </p>
          <Link to="/contact?intent=factory-visit">
            <Button size="lg">
              Schedule a Factory Visit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
