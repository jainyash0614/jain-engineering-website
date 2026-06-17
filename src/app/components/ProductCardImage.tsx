import { ImageWithFallback } from './figma/ImageWithFallback';
import { cn } from './ui/utils';

type ProductImageVariant = 'card' | 'hero' | 'thumb';

interface ProductCardImageProps {
  src: string;
  alt: string;
  className?: string;
  variant?: ProductImageVariant;
}

const frameClasses: Record<ProductImageVariant, string> = {
  card: 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/2]',
  hero: 'aspect-[4/3] sm:aspect-[16/10] lg:aspect-[3/2]',
  thumb: 'aspect-square',
};

export function ProductCardImage({ src, alt, className, variant = 'card' }: ProductCardImageProps) {
  return (
    <div
      className={cn(
        'w-full bg-surface-2 rounded-lg border border-border overflow-hidden flex items-center justify-center',
        frameClasses[variant],
        className,
      )}
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        className="max-h-full max-w-full h-full w-full object-contain p-1.5 sm:p-2 md:p-3"
      />
    </div>
  );
}
