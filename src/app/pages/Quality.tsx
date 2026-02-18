import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  CheckCircle, 
  FileCheck, 
  Download, 
  Award,
  ClipboardCheck,
  Search,
  FlaskConical
} from 'lucide-react';

export function Quality() {
  const qualityGates = [
    {
      stage: 'Incoming Inspection',
      icon: Search,
      checks: [
        'Material certificate verification',
        'Dimension spot checks',
        'Surface quality inspection',
        'Supplier documentation review'
      ],
      frequency: 'Every batch',
      responsible: 'Incoming QC Team'
    },
    {
      stage: 'In-Process Inspection',
      icon: ClipboardCheck,
      checks: [
        'First-piece inspection for each setup',
        'Random sampling during production',
        'Weld quality checks',
        'Coating thickness measurement',
        'Dimensional verification'
      ],
      frequency: 'Continuous',
      responsible: 'Production & QC Supervisors'
    },
    {
      stage: 'Final Inspection',
      icon: CheckCircle,
      checks: [
        'Complete dimensional inspection',
        'IP rating water/dust test (sample basis)',
        'Door operation and seal check',
        'Coating adhesion test',
        'Visual inspection for defects',
        'Hardware torque verification',
        'Documentation completeness'
      ],
      frequency: '100% inspection',
      responsible: 'Final QC Team'
    }
  ];

  const certifications = [
    {
      title: 'ISO 9001:2015',
      description: 'Quality Management System certification',
      status: 'Active',
      year: '2020'
    },
    {
      title: 'ISO 14001:2015',
      description: 'Environmental Management System',
      status: 'Active',
      year: '2021'
    },
    {
      title: 'IEC 62208 Compliance',
      description: 'Empty enclosures for electrical installations',
      status: 'Tested',
      year: 'Ongoing'
    }
  ];

  const testingCapabilities = [
    {
      icon: FlaskConical,
      title: 'IP Rating Testing',
      description: 'Water spray and dust ingress testing per IEC 60529 for IP54/IP65/IP66 verification'
    },
    {
      icon: Award,
      title: 'Coating Tests',
      description: 'Thickness measurement, adhesion test, salt spray test (500+ hours), impact resistance'
    },
    {
      icon: FileCheck,
      title: 'Dimensional Inspection',
      description: 'CMM and precision measurement tools for ±0.5mm tolerance verification'
    }
  ];

  const downloads = [
    { name: 'Quality Manual', size: '3.2 MB', format: 'PDF' },
    { name: 'ISO 9001 Certificate', size: '1.1 MB', format: 'PDF' },
    { name: 'Sample Inspection Report', size: '845 KB', format: 'PDF' },
    { name: 'QC Checklist Template', size: '567 KB', format: 'PDF' },
    { name: 'Material Certificate Sample', size: '689 KB', format: 'PDF' },
    { name: 'Test Report Sample', size: '1.3 MB', format: 'PDF' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background to-surface text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-6">Quality & Certifications</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Multi-stage quality control with documented checkpoints. 
              Every enclosure is inspected, tested, and certified before dispatch.
            </p>
          </div>
        </div>
      </div>

      {/* Quality Gates */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="mb-4">Three-Stage Quality Control</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our quality system ensures defects are caught early and consistently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {qualityGates.map((gate, index) => {
            const Icon = gate.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <h3 className="text-center mb-4">{gate.stage}</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium text-foreground mb-2">Key Checks:</div>
                      <ul className="space-y-2">
                        {gate.checks.map((check, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm text-muted-foreground">
                            <CheckCircle className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
                            <span>{check}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 border-t border-border space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frequency:</span>
                        <span className="font-medium">{gate.frequency}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Responsible:</span>
                        <span className="font-medium text-right">{gate.responsible}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quality Metrics */}
        <div className="bg-surface-2 rounded-2xl p-8 mb-16 border border-border">
          <h3 className="text-2xl font-semibold text-center mb-8">Our Quality Metrics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">&lt;0.5%</div>
              <div className="text-sm text-foreground">Rejection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-success mb-2">100%</div>
              <div className="text-sm text-foreground">Final Inspection</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-warning mb-2">98%+</div>
              <div className="text-sm text-foreground">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">Zero</div>
              <div className="text-sm text-foreground">Field Complaints Target</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testing Capabilities */}
      <div className="bg-surface-2 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="mb-4">In-House Testing Capabilities</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We don't rely on external labs for routine testing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testingCapabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-surface rounded-xl flex items-center justify-center shadow-md border border-border">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="mb-3">{capability.title}</h3>
                  <p className="text-muted-foreground">{capability.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="mb-4">Certifications & Compliance</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our processes and products meet international standards
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {certifications.map((cert, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <Award className="h-10 w-10 text-warning" />
                  <Badge variant={cert.status === 'Active' ? 'default' : 'secondary'}>
                    {cert.status}
                  </Badge>
                </div>
                <h3 className="mb-2">{cert.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                <p className="text-xs text-muted-foreground">Certified since {cert.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-semibold mb-3">Additional Testing</h3>
          <p className="text-foreground max-w-2xl mx-auto mb-6">
            For specialized requirements, we work with accredited third-party labs for 
            salt spray testing (ASTM B117), EMC/EMI testing, seismic certification, 
            and other industry-specific tests.
          </p>
        </div>
      </div>

      {/* Downloads Section */}
      <div className="bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="mb-4">Download Quality Documentation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sample reports and certificates for your review
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {downloads.map((file, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                      <FileCheck className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{file.name}</div>
                      <div className="text-xs text-muted-foreground">{file.format} • {file.size}</div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
