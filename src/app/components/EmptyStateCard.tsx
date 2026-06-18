import type { ReactNode } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

interface EmptyStateCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export function EmptyStateCard({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateCardProps) {
  return (
    <Card className="border-dashed border-border bg-surface-2/60">
      <CardContent className="p-8 text-center flex flex-col items-center">
        <div className="mb-4 text-muted-foreground">{icon}</div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground max-w-md mb-6">{description}</p>
        <Button onClick={onAction}>{actionLabel}</Button>
      </CardContent>
    </Card>
  );
}
