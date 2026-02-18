import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent } from '../components/ui/card';
import { Mail, Phone, MapPin, Calendar, MessageSquare, Upload } from 'lucide-react';

export function Contact() {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const inferredMessage = useMemo(() => {
    const intent = searchParams.get('intent');
    const topic = searchParams.get('topic');
    const product = searchParams.get('product');
    const productType = searchParams.get('productType');
    const contextParts = [topic, product, productType].filter(Boolean).join(' | ');

    if (intent === 'factory-visit') {
      return 'We would like to schedule a factory visit. Preferred date/time: ';
    }
    if (intent === 'resource-help') {
      return `Need help with technical resource: ${contextParts}.`;
    }
    if (intent === 'partner') {
      return 'Interested in becoming a supply/distribution partner.';
    }
    return contextParts ? `Inquiry context: ${contextParts}.` : '';
  }, [searchParams]);

  const [formData, setFormData] = useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    partnerType: '',
    volume: '',
    material: '',
    ipRating: '',
    size: '',
    message: '',
  });

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      message: current.message || inferredMessage,
    }));
  }, [inferredMessage]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitState('idle');

    if (!formData.company || !formData.contact || !formData.email || !formData.phone || !formData.country || !formData.message) {
      setFormError('Please fill all required fields before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setSubmitState('success');
    } catch {
      setSubmitState('error');
      setFormError('Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call or WhatsApp',
      detail: '+91 98765 43210',
      action: 'Call Now',
      link: 'tel:+919876543210'
    },
    {
      icon: Mail,
      title: 'Email Us',
      detail: 'info@jainengineeringworks.com',
      action: 'Send Email',
      link: 'mailto:info@jainengineeringworks.com'
    },
    {
      icon: Calendar,
      title: 'Schedule a Call',
      detail: 'Book a 30-min consultation',
      action: 'Schedule',
      link: '/contact?intent=schedule-call'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background to-surface text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground">
              Ready to discuss your metal boxes, metal plates or sheet metal requirements? Fill out the form below or reach out directly.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-semibold">Request for Quotation</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Company Name *</Label>
                      <Input id="company" placeholder="Your Company Ltd." required value={formData.company} onChange={(e) => updateField('company', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contact">Contact Person *</Label>
                      <Input id="contact" placeholder="John Doe" required value={formData.contact} onChange={(e) => updateField('contact', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" type="email" placeholder="john@company.com" required value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input id="phone" type="tel" placeholder="+1 234 567 890" required value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" value={formData.city} onChange={(e) => updateField('city', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Input id="country" placeholder="USA" required value={formData.country} onChange={(e) => updateField('country', e.target.value)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="partner-type">Partner Type *</Label>
                      <Select value={formData.partnerType} onValueChange={(value) => updateField('partnerType', value)}>
                        <SelectTrigger id="partner-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="oem">OEM</SelectItem>
                          <SelectItem value="epc">EPC Contractor</SelectItem>
                          <SelectItem value="panel">Panel Builder</SelectItem>
                          <SelectItem value="integrator">System Integrator</SelectItem>
                          <SelectItem value="distributor">Distributor</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="volume">Monthly Volume Estimate</Label>
                      <Select value={formData.volume} onValueChange={(value) => updateField('volume', value)}>
                        <SelectTrigger id="volume">
                          <SelectValue placeholder="Select volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 units</SelectItem>
                          <SelectItem value="10-50">10-50 units</SelectItem>
                          <SelectItem value="50-100">50-100 units</SelectItem>
                          <SelectItem value="100-500">100-500 units</SelectItem>
                          <SelectItem value="500+">500+ units</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="material">Material Preference</Label>
                      <Select value={formData.material} onValueChange={(value) => updateField('material', value)}>
                        <SelectTrigger id="material">
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ms">Mild Steel (MS)</SelectItem>
                          <SelectItem value="ss304">Stainless Steel 304</SelectItem>
                          <SelectItem value="ss316">Stainless Steel 316</SelectItem>
                          <SelectItem value="aluminum">Aluminum</SelectItem>
                          <SelectItem value="mixed">Mixed / Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ip-rating">IP Rating Requirement</Label>
                      <Select value={formData.ipRating} onValueChange={(value) => updateField('ipRating', value)}>
                        <SelectTrigger id="ip-rating">
                          <SelectValue placeholder="Select IP rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ip54">IP54</SelectItem>
                          <SelectItem value="ip65">IP65</SelectItem>
                          <SelectItem value="ip66">IP66</SelectItem>
                          <SelectItem value="other">Other / Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="size">Approximate Size (HxWxD mm)</Label>
                      <Input id="size" placeholder="e.g., 600x400x200" value={formData.size} onChange={(e) => updateField('size', e.target.value)} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Project Details / Requirements *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please provide details about your requirements, quantities, delivery timeline, customization needs, etc."
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Upload Drawing / BOQ (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                      <Upload className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                      <p className="text-sm text-muted-foreground mb-1 font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, DXF, DWG, Excel, Images (max. 10MB)
                      </p>
                      {fileName ? (
                        <p className="text-xs text-foreground mt-2">Attached: {fileName}</p>
                      ) : null}
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        accept=".pdf,.dxf,.dwg,.xls,.xlsx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 10 * 1024 * 1024) {
                            setFormError('File size exceeds 10MB limit.');
                            e.currentTarget.value = '';
                            return;
                          }
                          setFileName(file.name);
                        }}
                      />
                    </div>
                  </div>

                  {formError ? (
                    <p className="text-sm text-destructive">{formError}</p>
                  ) : null}
                  {submitState === 'success' ? (
                    <p className="text-sm text-success">Thanks for your inquiry. Our team will respond within 24 hours.</p>
                  ) : null}

                  <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information Sidebar */}
          <div className="space-y-6">
            {/* Quick Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{method.title}</h4>
                          <p className="text-sm text-muted-foreground">{method.detail}</p>
                        </div>
                      </div>
                      {method.link.startsWith('/') ? (
                        <Link to={method.link}>
                          <Button variant="outline" size="sm" className="w-full">
                            {method.action}
                          </Button>
                        </Link>
                      ) : (
                        <a href={method.link}>
                          <Button variant="outline" size="sm" className="w-full">
                            {method.action}
                          </Button>
                        </a>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Office Location */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-2">Factory & Office</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Faridabad, Haryana<br />
                      India
                    </p>
                  </div>
                </div>
                
                {/* Map Placeholder */}
                <div className="w-full h-40 bg-surface-2 rounded-lg border border-border flex items-center justify-center mt-4">
                  <MapPin className="h-8 w-8 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            {/* Business Hours */}
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium mb-4">Business Hours</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Saturday</span>
                    <span className="font-medium">9:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sunday</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  For urgent inquiries outside business hours, please use WhatsApp
                </p>
              </CardContent>
            </Card>

            {/* Response Time */}
            <Card className="bg-primary/10 border-primary/30">
              <CardContent className="p-6">
                <h4 className="font-medium mb-2">Response Time</h4>
                <p className="text-sm text-foreground">
                  We typically respond to inquiries within <span className="font-semibold">24 hours</span> on business days.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
