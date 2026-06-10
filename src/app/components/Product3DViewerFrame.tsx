import { Suspense, lazy, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { RotateCw, ZoomIn, ZoomOut, Eye, EyeOff, Box, Lightbulb } from 'lucide-react';

const FDSFloorBox3D = lazy(() =>
  import('./FDSFloorBox3D').then((module) => ({ default: module.FDSFloorBox3D })),
);

export type Product3DVariant = 'enclosure-box' | 'fds-floor-box';

interface Product3DViewerFrameProps {
  title?: string;
  height: number;
  width: number;
  depth: number;
  unit?: string;
  modelUrl?: string | null;
  variant?: Product3DVariant;
}

function GenericEnclosurePreview({
  height,
  width,
  depth,
  unit,
  modelUrl,
  showDimensions,
  exploded,
  rotationX,
  rotationY,
  zoom,
  lighting,
  dragging,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
  onPointerMove,
}: {
  height: number;
  width: number;
  depth: number;
  unit: string;
  modelUrl: string | null;
  showDimensions: boolean;
  exploded: boolean;
  rotationX: number;
  rotationY: number;
  zoom: number;
  lighting: number;
  dragging: boolean;
  onPointerDown: () => void;
  onPointerUp: () => void;
  onPointerLeave: () => void;
  onPointerMove: (event: ReactPointerEvent<HTMLDivElement>) => void;
}) {
  const modelWidth = Math.max(140, Math.min(320, Math.round(width * 0.42)));
  const modelHeight = Math.max(100, Math.min(260, Math.round(height * 0.35)));
  const modelDepth = Math.max(70, Math.min(200, Math.round(depth * 0.28)));

  return (
    <div
      className="bg-gradient-to-br from-surface-2 to-surface rounded-lg aspect-video flex items-center justify-center relative border-2 border-border overflow-hidden select-none"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      style={{ cursor: dragging ? 'grabbing' : 'grab' }}
    >
      <div className="absolute top-3 left-3 z-20 rounded-md border border-border bg-background/95 px-2 py-1 text-xs text-muted-foreground">
        Drag to rotate
      </div>

      <div
        className="relative z-10"
        style={{
          transformStyle: 'preserve-3d',
          transform: `scale(${zoom}) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
          transition: dragging ? 'none' : 'transform 160ms ease',
          filter: `brightness(${lighting})`,
        }}
      >
        <div
          className="absolute rounded-md border border-border bg-card shadow-md"
          style={{
            width: `${modelWidth}px`,
            height: `${modelHeight}px`,
            transform: `translate3d(-50%, -50%, ${modelDepth / 2 + (exploded ? 16 : 0)}px)`,
            left: '50%',
            top: '50%',
          }}
        />
        <div
          className="absolute rounded-md border border-border bg-surface-2"
          style={{
            width: `${modelWidth}px`,
            height: `${modelHeight}px`,
            transform: `translate3d(-50%, -50%, -${modelDepth / 2 + (exploded ? 16 : 0)}px)`,
            left: '50%',
            top: '50%',
          }}
        />
        <div
          className="absolute border border-border bg-surface"
          style={{
            width: `${modelDepth}px`,
            height: `${modelHeight}px`,
            transform: `translate3d(-50%, -50%, -${modelWidth / 2 + (exploded ? 10 : 0)}px) rotateY(90deg)`,
            left: '50%',
            top: '50%',
          }}
        />
        <div
          className="absolute border border-border bg-surface"
          style={{
            width: `${modelDepth}px`,
            height: `${modelHeight}px`,
            transform: `translate3d(-50%, -50%, ${modelWidth / 2 + (exploded ? 10 : 0)}px) rotateY(90deg)`,
            left: '50%',
            top: '50%',
          }}
        />
        <div
          className="absolute border border-border bg-surface-2"
          style={{
            width: `${modelWidth}px`,
            height: `${modelDepth}px`,
            transform: `translate3d(-50%, -50%, ${modelHeight / 2 + (exploded ? 10 : 0)}px) rotateX(90deg)`,
            left: '50%',
            top: '50%',
          }}
        />
        <div
          className="absolute border border-border bg-surface-2"
          style={{
            width: `${modelWidth}px`,
            height: `${modelDepth}px`,
            transform: `translate3d(-50%, -50%, -${modelHeight / 2 + (exploded ? 10 : 0)}px) rotateX(90deg)`,
            left: '50%',
            top: '50%',
          }}
        />
      </div>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 rounded-md border border-border bg-background/95 px-3 py-1 text-xs text-muted-foreground">
        {modelUrl ? 'Interactive 3D preview (model linked)' : 'Interactive dimensional preview'}
      </div>

      {showDimensions && (
        <>
          <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
            H: {height} {unit}
          </div>
          <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
            W: {width} {unit}
          </div>
          <div className="absolute bottom-8 right-8 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
            D: {depth} {unit}
          </div>
        </>
      )}

      {exploded && (
        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">
          Exploded View
        </div>
      )}
    </div>
  );
}

export function Product3DViewerFrame({
  title = '3D Model',
  height,
  width,
  depth,
  unit = 'mm',
  modelUrl = null,
  variant = 'enclosure-box',
}: Product3DViewerFrameProps) {
  const [showDimensions, setShowDimensions] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [rotationX, setRotationX] = useState(-18);
  const [rotationY, setRotationY] = useState(28);
  const [zoom, setZoom] = useState(1);
  const [lighting, setLighting] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [fdsKey, setFdsKey] = useState(0);

  const isFds = variant === 'fds-floor-box';
  const bodyDepth = height > 0 ? height : 95;
  const cutoutWidth = width;
  const cutoutDepth = depth;

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging || isFds) return;
    setRotationY((prev) => prev + event.movementX * 0.35);
    setRotationX((prev) => Math.max(-70, Math.min(70, prev - event.movementY * 0.3)));
  };

  const handleReset = () => {
    setRotationX(-18);
    setRotationY(28);
    setZoom(1);
    setExploded(false);
    setLighting(1);
    if (isFds) setFdsKey((k) => k + 1);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 lg:p-6">
          {isFds ? (
            <div className="relative rounded-lg aspect-video border-2 border-border overflow-hidden bg-[#f4f5f7]">
              <div className="absolute top-3 left-3 z-20 rounded-md border border-border bg-background/95 px-2 py-1 text-xs text-muted-foreground">
                Drag to orbit • Scroll to zoom
              </div>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 rounded-md border border-border bg-background/95 px-3 py-1 text-xs text-muted-foreground">
                FDS floor distribution box — {title}
              </div>
              {showDimensions && (
                <>
                  <div className="absolute top-8 right-4 z-20 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
                    Cutout: {cutoutWidth} × {cutoutDepth} {unit}
                  </div>
                  <div className="absolute bottom-8 left-4 z-20 bg-surface px-3 py-1 rounded shadow-md text-sm font-medium border border-border">
                    Body depth: {bodyDepth} {unit}
                  </div>
                </>
              )}
              {exploded && (
                <div className="absolute top-4 right-4 z-20 bg-primary text-primary-foreground px-3 py-1 rounded text-sm font-medium">
                  Exploded View
                </div>
              )}
              <Suspense
                fallback={
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    Loading 3D model…
                  </div>
                }
              >
                <FDSFloorBox3D
                  key={`${fdsKey}-${cutoutWidth}-${cutoutDepth}-${exploded}-${lighting}`}
                  cutoutWidth={cutoutWidth}
                  cutoutDepth={cutoutDepth}
                  bodyDepth={bodyDepth}
                  exploded={exploded}
                  lighting={lighting}
                />
              </Suspense>
            </div>
          ) : (
            <GenericEnclosurePreview
              height={height}
              width={width}
              depth={depth}
              unit={unit}
              modelUrl={modelUrl}
              showDimensions={showDimensions}
              exploded={exploded}
              rotationX={rotationX}
              rotationY={rotationY}
              zoom={zoom}
              lighting={lighting}
              dragging={dragging}
              onPointerDown={() => setDragging(true)}
              onPointerUp={() => setDragging(false)}
              onPointerLeave={() => setDragging(false)}
              onPointerMove={handlePointerMove}
            />
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleReset}>
          <RotateCw className="h-4 w-4 mr-2" />
          Reset View
        </Button>
        {!isFds && (
          <>
            <Button variant="outline" size="sm" onClick={() => setZoom((z) => Math.min(1.7, z + 0.1))}>
              <ZoomIn className="h-4 w-4 mr-2" />
              Zoom In
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoom((z) => Math.max(0.75, z - 0.1))}>
              <ZoomOut className="h-4 w-4 mr-2" />
              Zoom Out
            </Button>
          </>
        )}
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
