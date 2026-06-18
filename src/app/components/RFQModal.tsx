import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload } from 'lucide-react';
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { RfqQuickActions } from './RfqQuickActions';
import {
  buildRfqMessage,
  submitRfq,
  RFQ_RESPONSE_HOURS,
  type RfqPrefill,
} from '../../lib/rfq';

interface RFQModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefill?: RfqPrefill;
}

export function RFQModal({ open, onOpenChange, prefill }: RFQModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
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

  const urlPrefill = useMemo<RfqPrefill>(() => {
    const search = new URLSearchParams(window.location.search);
    return {
      product: search.get('product') ?? undefined,
      productType: search.get('productType') ?? undefined,
      categoryLabel: search.get('category') ?? undefined,
      size: search.get('size') ?? undefined,
      thickness: search.get('thickness') ?? undefined,
    };
  }, [open]);

  const mergedPrefill = useMemo<RfqPrefill>(
    () => ({
      product: prefill?.product ?? urlPrefill.product,
      productType: prefill?.productType ?? urlPrefill.productType,
      categoryLabel: prefill?.categoryLabel ?? urlPrefill.categoryLabel,
      size: prefill?.size ?? urlPrefill.size,
      thickness: prefill?.thickness ?? urlPrefill.thickness,
    }),
    [prefill, urlPrefill],
  );

  const contextMessage = useMemo(() => {
    const search = new URLSearchParams(window.location.search);
    const intent = search.get('intent');
    if (intent === 'partner') return 'Interested in partnership discussion.';
    return buildRfqMessage(mergedPrefill);
  }, [mergedPrefill, open]);

  useEffect(() => {
    if (!open) return;
    setFormData((current) => ({
      ...current,
      size: mergedPrefill.size || current.size,
      message: current.message || contextMessage,
    }));
  }, [open, mergedPrefill.size, contextMessage]);

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
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
    setFileName('');
    setFormError(null);
    setSubmitState('idle');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSubmitState('idle');

    if (!formData.company || !formData.contact || !formData.email || !formData.phone || !formData.country) {
      setFormError('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await submitRfq({
        ...formData,
        prefill: mergedPrefill,
        attachmentName: fileName || undefined,
        source: 'RFQ modal',
      });

      if (!result.ok) {
        throw new Error('Submit failed');
      }

      setSubmitState('success');
      window.setTimeout(() => {
        resetForm();
        onOpenChange(false);
      }, 1200);
    } catch {
      setSubmitState('error');
      setFormError('Unable to submit now. Please try WhatsApp or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Request a Quote</DialogTitle>
          <DialogDescription>
            Fill out the form below and our team will get back to you within {RFQ_RESPONSE_HOURS} hours.
          </DialogDescription>
        </DialogHeader>

        {mergedPrefill.product ? (
          <div className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm space-y-1">
            <p className="font-medium text-foreground">{mergedPrefill.product}</p>
            {mergedPrefill.categoryLabel ? (
              <p className="text-muted-foreground">Category: {mergedPrefill.categoryLabel}</p>
            ) : null}
            {mergedPrefill.size ? (
              <p className="text-muted-foreground">Size: {mergedPrefill.size}</p>
            ) : null}
            {mergedPrefill.thickness ? (
              <p className="text-muted-foreground">Thickness: {mergedPrefill.thickness} mm</p>
            ) : null}
          </div>
        ) : null}

        <RfqQuickActions prefill={mergedPrefill} />

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
              <Label htmlFor="email">Email *</Label>
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
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ip-rating">IP Rating</Label>
              <Select value={formData.ipRating} onValueChange={(value) => updateField('ipRating', value)}>
                <SelectTrigger id="ip-rating">
                  <SelectValue placeholder="Select IP rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ip54">IP54</SelectItem>
                  <SelectItem value="ip65">IP65</SelectItem>
                  <SelectItem value="ip66">IP66</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Approximate Size (HxWxD mm)</Label>
              <Input id="size" placeholder="e.g., 600x400x200" value={formData.size} onChange={(e) => updateField('size', e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Project Details / Requirements</Label>
            <Textarea
              id="message"
              placeholder="Please provide details about your requirements, quantities, delivery timeline, etc."
              rows={4}
              value={formData.message}
              onChange={(e) => updateField('message', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Drawing / BOQ (Optional)</Label>
            <label
              htmlFor="file-upload"
              className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer block"
            >
              <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                PDF, DXF, DWG, Excel (max. 10MB)
              </p>
              {fileName ? (
                <p className="text-xs text-foreground mt-2">Attached: {fileName}</p>
              ) : null}
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.dxf,.dwg,.xls,.xlsx"
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
            </label>
          </div>

          {formError ? (
            <p className="text-sm text-destructive">{formError}</p>
          ) : null}
          {submitState === 'success' ? (
            <p className="text-sm text-success">RFQ submitted successfully. We will contact you within {RFQ_RESPONSE_HOURS} hours.</p>
          ) : null}

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
