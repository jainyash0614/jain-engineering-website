import type { FormEvent } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { CheckCircle, TrendingUp, Users, Shield, Zap } from 'lucide-react';

export function BecomePartner() {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Thank you for your interest! Our partnership team will review your application and contact you within 48 hours.');
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Competitive Pricing',
      description: 'Volume-based pricing with transparent cost structure. No hidden fees.'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Assigned account manager and engineering support for your projects.'
    },
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Consistent quality with documented QC at every stage. Zero-compromise approach.'
    },
    {
      icon: Zap,
      title: 'Fast Turnaround',
      description: 'Priority production scheduling for partners. Predictable lead times.'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Submit Application',
      description: 'Fill out the partnership form with your business details and requirements'
    },
    {
      step: '2',
      title: 'Initial Discussion',
      description: 'Our team reviews your application and schedules a call to understand your needs'
    },
    {
      step: '3',
      title: 'Sample Order',
      description: 'Place a trial order to experience our quality and service firsthand'
    },
    {
      step: '4',
      title: 'Partnership Agreement',
      description: 'Sign agreement with pricing, terms, and support structure finalized'
    }
  ];

  const requirements = [
    'Established business in relevant industry (EPC, panel building, OEM, distribution)',
    'Minimum projected volume of 50+ units/month or equivalent annual commitment',
    'Technical capability to provide specifications or work with our engineering team',
    'Valid business registration and tax documentation',
    'References from existing customers or suppliers (optional but preferred)'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background to-surface text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Become a Partner</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our network of trusted OEMs, EPCs, panel builders, and system integrators. 
              Build a reliable supply relationship backed by consistent quality and engineering support.
            </p>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="mb-4">Partnership Benefits</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            What you get when you partner with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="bg-surface-2 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12">
            <h2 className="mb-4">Partner Onboarding Process</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four simple steps to become a partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((item, index) => (
              <div key={index} className="relative">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Requirements & Application Form */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Requirements Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="mb-4">Partnership Requirements</h3>
                <ul className="space-y-3">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{req}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-border">
                  <h4 className="font-medium mb-2 text-sm">Not sure if you qualify?</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    We evaluate each application individually. Even if you don't meet all requirements, 
                    we encourage you to apply.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Partnership Application</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="company-name">Company Name *</Label>
                      <Input id="company-name" placeholder="Your Company Ltd." required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Contact Person *</Label>
                      <Input id="contact-name" placeholder="John Doe" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="designation">Designation *</Label>
                      <Input id="designation" placeholder="Procurement Manager" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john@company.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input id="phone" type="tel" placeholder="+1 234 567 890" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" placeholder="New York" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" placeholder="USA" required />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="website">Company Website</Label>
                      <Input id="website" type="url" placeholder="https://yourcompany.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="business-type">Business Type *</Label>
                      <Select required>
                        <SelectTrigger id="business-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oem">OEM Manufacturer</SelectItem>
                          <SelectItem value="epc">EPC Contractor</SelectItem>
                          <SelectItem value="panel">Panel Builder</SelectItem>
                          <SelectItem value="integrator">System Integrator</SelectItem>
                          <SelectItem value="distributor">Distributor</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="years-business">Years in Business *</Label>
                      <Select required>
                        <SelectTrigger id="years-business">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="2-5">2-5 years</SelectItem>
                          <SelectItem value="5-10">5-10 years</SelectItem>
                          <SelectItem value="10+">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="industries">Industries Served *</Label>
                      <Input 
                        id="industries" 
                        placeholder="e.g., Solar, Industrial Automation, Infrastructure" 
                        required 
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="territory">Primary Territory/Region *</Label>
                      <Input id="territory" placeholder="e.g., North America, India" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expected-volume">Expected Monthly Volume *</Label>
                      <Select required>
                        <SelectTrigger id="expected-volume">
                          <SelectValue placeholder="Select volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="50-100">50-100 units</SelectItem>
                          <SelectItem value="100-300">100-300 units</SelectItem>
                          <SelectItem value="300-500">300-500 units</SelectItem>
                          <SelectItem value="500-1000">500-1000 units</SelectItem>
                          <SelectItem value="1000+">1000+ units</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="product-interest">Product Categories of Interest *</Label>
                      <Input 
                        id="product-interest" 
                        placeholder="e.g., Junction boxes, Control panels, Custom fabrication" 
                        required 
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="current-suppliers">Current Enclosure Suppliers</Label>
                      <Input 
                        id="current-suppliers" 
                        placeholder="Optional - helps us understand the market" 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="business-details">Tell Us About Your Business *</Label>
                    <Textarea
                      id="business-details"
                      placeholder="Please describe your business, typical project sizes, key customers (if shareable), and why you're interested in partnering with us."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="special-requirements">Special Requirements or Questions</Label>
                    <Textarea
                      id="special-requirements"
                      placeholder="Any specific customization needs, delivery requirements, or questions you have"
                      rows={3}
                    />
                  </div>

                  <div className="flex items-start space-x-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      className="mt-1"
                      required 
                    />
                    <Label htmlFor="terms" className="text-sm text-muted-foreground cursor-pointer">
                      I confirm that the information provided is accurate and agree to the terms of the 
                      partnership evaluation process. I understand that approval is at the discretion of 
                      the company and meeting requirements does not guarantee partnership.
                    </Label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg">
                      Submit Application
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="mb-4">Questions About Partnership?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Our business development team is happy to discuss partnership opportunities
          </p>
          <Button size="lg" className="bg-background text-foreground hover:bg-surface-2">
            Schedule a Call
          </Button>
        </div>
      </div>
    </div>
  );
}
