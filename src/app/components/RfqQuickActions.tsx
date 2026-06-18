import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { buildWhatsappUrl, RFQ_RESPONSE_HOURS, type RfqPrefill } from '../../lib/rfq';

interface RfqQuickActionsProps {
  prefill?: RfqPrefill;
  className?: string;
  compact?: boolean;
}

export function RfqQuickActions({ prefill, className = '', compact = false }: RfqQuickActionsProps) {
  const whatsappUrl = buildWhatsappUrl(prefill);

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 ${className}`}>
      <p className={`text-muted-foreground ${compact ? 'text-xs' : 'text-sm'}`}>
        Typical response within <span className="font-medium text-foreground">{RFQ_RESPONSE_HOURS} hours</span>{' '}
        on business days.
      </p>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
        <Button type="button" variant="outline" size={compact ? 'sm' : 'default'} className="w-full sm:w-auto">
          <MessageCircle className="h-4 w-4 mr-2" />
          WhatsApp Jain
        </Button>
      </a>
    </div>
  );
}
