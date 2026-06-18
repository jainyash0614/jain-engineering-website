import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

interface RfqBody {
  company: string;
  contact: string;
  email: string;
  phone: string;
  city?: string;
  country: string;
  partnerType?: string;
  volume?: string;
  material?: string;
  ipRating?: string;
  size?: string;
  message?: string;
  attachmentName?: string;
  source?: string;
  prefill?: {
    product?: string;
    productType?: string;
    categoryLabel?: string;
    size?: string;
    thickness?: string;
  };
}

function formatHtml(body: RfqBody) {
  const rows = [
    ['Company', body.company],
    ['Contact', body.contact],
    ['Email', body.email],
    ['Phone', body.phone],
    ['City', body.city || '—'],
    ['Country', body.country],
    ['Partner type', body.partnerType || '—'],
    ['Volume', body.volume || '—'],
    ['Material', body.material || '—'],
    ['IP rating', body.ipRating || '—'],
    ['Size', body.size || '—'],
    ['Product', body.prefill?.product || '—'],
    ['Category', body.prefill?.categoryLabel || '—'],
    ['Configured size', body.prefill?.size || '—'],
    ['Thickness', body.prefill?.thickness ? `${body.prefill.thickness} mm` : '—'],
    ['Attachment', body.attachmentName || '—'],
    ['Source', body.source || 'Website'],
  ];

  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;">${label}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${value}</td></tr>`,
    )
    .join('');

  return `
    <h2>New RFQ submission</h2>
    <table style="border-collapse:collapse;width:100%;max-width:640px;">${table}</table>
    <h3 style="margin-top:24px;">Requirements</h3>
    <p style="white-space:pre-wrap;">${body.message || '—'}</p>
  `;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.RFQ_TO_EMAIL || 'jain_engineeringworks@yahoo.co.in';

  if (!smtpUser || !smtpPass) {
    return res.status(503).json({ error: 'Email service is not configured' });
  }

  const body = req.body as RfqBody;
  if (!body?.company || !body?.contact || !body?.email || !body?.phone || !body?.country) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mail.yahoo.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Jain Engineering RFQ" <${smtpUser}>`,
      to: toEmail,
      replyTo: body.email,
      subject: `Website RFQ — ${body.company}${body.prefill?.product ? ` (${body.prefill.product})` : ''}`,
      text: formatHtml(body).replace(/<[^>]+>/g, ' '),
      html: formatHtml(body),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error('RFQ email failed', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
