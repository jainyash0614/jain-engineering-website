import { Button } from './ui/button';
import { RfqQuickActions } from './RfqQuickActions';
import type { RfqPrefill } from '../../lib/rfq';

interface StickyRfqBarProps {
  onRequestQuote: () => void;
  prefill?: RfqPrefill;
}

export function StickyRfqBar({ onRequestQuote, prefill }: StickyRfqBarProps) {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <RfqQuickActions prefill={prefill} compact className="sm:flex-1" />
        <Button size="lg" onClick={onRequestQuote} className="w-full sm:w-auto shrink-0">
          Request RFQ
        </Button>
      </div>
    </div>
  );
}
