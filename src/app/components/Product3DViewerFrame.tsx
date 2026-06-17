import { Suspense, lazy, useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { RotateCw, Eye, EyeOff, Box, Lightbulb } from 'lucide-react';
import type { MetalBoxStyle } from './MetalBox3D';

const FDSFloorBox3D = lazy(() =>
  import('./FDSFloorBox3D').then((module) => ({ default: module.FDSFloorBox3D })),
);

const MetalBox3D = lazy(() =>
  import('./MetalBox3D').then((module) => ({ default: module.MetalBox3D })),
);

export type Product3DVariant = 'enclosure-box' | 'fds-floor-box';

interface Product3DViewerFrameProps {
  title?: string;
  height: number;
  width: number;
  depth: number;
  unit?: string;
  variant?: Product3DVariant;
  metalBoxStyle?: MetalBoxStyle;
  wallThickness?: number;
}

export function Product3DViewerFrame({
  title = '3D Model',
  height,
  width,
  depth,
  unit = 'mm',
  variant = 'enclosure-box',
  metalBoxStyle = 'enclosure',
  wallThickness = 1.6,
}: Product3DViewerFrameProps) {
  const [showDimensions, setShowDimensions] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [lighting, setLighting] = useState(1);
  const [viewerKey, setViewerKey] = useState(0);

  const isFds = variant === 'fds-floor-box';
  const isModular = metalBoxStyle === 'modular-mount';
  const bodyDepth = height > 0 ? height : 95;

  const handleReset = () => {
    setExploded(false);
    setLighting(1);
    setViewerKey((k) => k + 1);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 lg:p-6">
          <div className="relative rounded-lg aspect-video border-2 border-border overflow-hidden bg-[#f4f5f7]">
            <div className="absolute top-3 left-3 z-20 rounded-md border border-border bg-background/95 px-2 py-1 text-xs text-muted-foreground">
              Drag to orbit • Scroll to zoom
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 rounded-md border border-border bg-background/95 px-3 py-1 text-xs text-muted-foreground">
              {isFds ? `FDS floor distribution box — ${title}` : `Metal box — ${title}`}
            </div>

            {showDimensions && isFds && (
              <>
                <div className="absolute top-8 right-4 z-20 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
                  Cutout: {width} × {depth} {unit}
                </div>
                <div className="absolute bottom-8 left-4 z-20 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
                  Body depth: {bodyDepth} {unit}
                </div>
              </>
            )}

            {showDimensions && !isFds && isModular && (
              <>
                <div className="absolute top-8 right-4 z-20 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
                  Internal: {width} × {height} × {depth} {unit}
                </div>
                <div className="absolute bottom-8 left-4 z-20 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
                  Wall: {wallThickness} {unit}
                </div>
              </>
            )}

            {showDimensions && !isFds && !isModular && (
              <>
                <div className="absolute top-8 right-4 z-20 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
                  H: {height} {unit}
                </div>
                <div className="absolute bottom-8 left-4 z-20 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
                  W: {width} × D: {depth} {unit}
                </div>
              </>
            )}

            {exploded && (
              <div className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">
                Exploded View
              </div>
            )}

            <div className="absolute inset-0">
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Loading 3D model…
                  </div>
                }
              >
                {isFds ? (
                  <FDSFloorBox3D
                    key={`fds-${viewerKey}-${width}-${depth}-${exploded}-${lighting}`}
                    cutoutWidth={width}
                    cutoutDepth={depth}
                    bodyDepth={bodyDepth}
                    exploded={exploded}
                    lighting={lighting}
                  />
                ) : (
                  <MetalBox3D
                    key={`mb-${viewerKey}-${width}-${height}-${depth}-${metalBoxStyle}-${exploded}-${lighting}`}
                    width={width}
                    height={height}
                    depth={depth}
                    wallThickness={wallThickness}
                    style={metalBoxStyle}
                    exploded={exploded}
                    lighting={lighting}
                  />
                )}
              </Suspense>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCw className="h-4 w-4 mr-2" />
          Reset View
        </Button>
        <Button
          variant={showDimensions ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowDimensions((v) => !v)}
        >
          {showDimensions ? <Eye className="h-4 w-4 mr-2" /> : <EyeOff className="h-4 w-4 mr-2" />}
          Dimensions
        </Button>
        <Button variant={exploded ? 'default' : 'outline'} size="sm" onClick={() => setExploded((v) => !v)}>
          <Box className="h-4 w-4 mr-2" />
          Explode
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLighting((v) => (v >= 1.25 ? 0.9 : Number((v + 0.1).toFixed(2))))}
        >
          <Lightbulb className="h-4 w-4 mr-2" />
          Lighting
        </Button>
      </div>
    </div>
  );
}
