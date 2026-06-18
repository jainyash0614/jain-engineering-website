export const JAIN_RFQ_EMAIL = 'jain_engineeringworks@yahoo.co.in';
export const JAIN_WHATSAPP_PHONE = '919990007858';
export const RFQ_RESPONSE_HOURS = 24;

export interface RfqPrefill {
  product?: string;
  productType?: string;
  categoryLabel?: string;
  size?: string;
  thickness?: string;
}

export interface RfqFormData {
  company: string;
  contact: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  partnerType: string;
  volume: string;
  material: string;
  ipRating: string;
  size: string;
  message: string;
  attachmentName?: string;
}

export interface RfqSubmitPayload extends RfqFormData {
  prefill?: RfqPrefill;
  source?: string;
}

export const CATEGORY_LABELS: Record<string, string> = {
  'electrical-metal-boxes': 'Electrical Metal Boxes',
  'floor-distribution-system': 'Floor Distribution System',
  'junction-boxes': 'Junction Boxes',
};

export function buildWhatsappUrl(prefill?: RfqPrefill) {
  const parts = [
    'Hello Jain Engineering Works,',
    'I would like to request a quote.',
    prefill?.product ? `Product: ${prefill.product}` : null,
    prefill?.categoryLabel ? `Category: ${prefill.categoryLabel}` : null,
    prefill?.size ? `Size: ${prefill.size}` : null,
    prefill?.thickness ? `Thickness: ${prefill.thickness} mm` : null,
  ].filter(Boolean);

  return `https://wa.me/${JAIN_WHATSAPP_PHONE}?text=${encodeURIComponent(parts.join('\n'))}`;
}

export function buildRfqMessage(prefill?: RfqPrefill) {
  const lines = [
    prefill?.product ? `Product: ${prefill.product}` : null,
    prefill?.categoryLabel ? `Category: ${prefill.categoryLabel}` : null,
    prefill?.size ? `Size: ${prefill.size}` : null,
    prefill?.thickness ? `Thickness: ${prefill.thickness} mm` : null,
    prefill?.productType ? `Product family: ${prefill.productType}` : null,
  ].filter(Boolean);

  if (lines.length === 0) return '';
  return `RFQ context:\n${lines.join('\n')}\n\n`;
}

function formatEmailBody(payload: RfqSubmitPayload) {
  const { prefill, source, attachmentName, ...form } = payload;
  const context = buildRfqMessage(prefill);

  return [
    `New RFQ submission${source ? ` (${source})` : ''}`,
    '',
    context || null,
    `Company: ${form.company}`,
    `Contact: ${form.contact}`,
    `Email: ${form.email}`,
    `Phone: ${form.phone}`,
    `City: ${form.city || '—'}`,
    `Country: ${form.country}`,
    `Partner type: ${form.partnerType || '—'}`,
    `Volume: ${form.volume || '—'}`,
    `Material: ${form.material || '—'}`,
    `IP rating: ${form.ipRating || '—'}`,
    `Size: ${form.size || '—'}`,
    attachmentName ? `Attachment: ${attachmentName} (see form upload if provided)` : null,
    '',
    'Requirements:',
    form.message || '—',
  ]
    .filter((line) => line !== null)
    .join('\n');
}

function openMailtoFallback(payload: RfqSubmitPayload) {
  const subject = encodeURIComponent(
    `RFQ: ${payload.company}${payload.prefill?.product ? ` — ${payload.prefill.product}` : ''}`,
  );
  const body = encodeURIComponent(formatEmailBody(payload));
  window.location.href = `mailto:${JAIN_RFQ_EMAIL}?subject=${subject}&body=${body}`;
}

export async function submitRfq(payload: RfqSubmitPayload): Promise<{ ok: boolean; method: 'api' | 'web3forms' | 'mailto' }> {
  try {
    const response = await fetch('/api/send-rfq', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return { ok: true, method: 'api' };
    }
  } catch {
    // Fall through to alternate delivery methods.
  }

  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  if (accessKey) {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Website RFQ — ${payload.company}`,
        from_name: payload.contact,
        email: payload.email,
        message: formatEmailBody(payload),
        phone: payload.phone,
        company: payload.company,
      }),
    });

    const result = await response.json();
    if (response.ok && result.success) {
      return { ok: true, method: 'web3forms' };
    }
  }

  openMailtoFallback(payload);
  return { ok: true, method: 'mailto' };
}
