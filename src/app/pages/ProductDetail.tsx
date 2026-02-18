import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';
import { 
  Download, 
  Share2, 
  Box,
  FileText,
  Wrench
} from 'lucide-react';
import { RFQModal } from '../components/RFQModal';
import { getProductBySlug, getProductsByCategory, type Product } from '../data/products';
import { Product3DViewerFrame } from '../components/Product3DViewerFrame';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function ProductDetail() {
  const { slug } = useParams();
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  const product: Product | undefined = slug ? getProductBySlug(slug) : undefined;

  const primarySize = product?.sizeOptions[0];
  const galleryImages = product?.galleryImages?.length
    ? product.galleryImages
    : product?.heroImage
      ? [product.heroImage]
      : [];
  const [selectedSizeLabel, setSelectedSizeLabel] = useState(primarySize?.label ?? '');
  const [selectedImage, setSelectedImage] = useState<string | null>(galleryImages[0] ?? null);

  useEffect(() => {
    setSelectedImage(galleryImages[0] ?? null);
    setSelectedSizeLabel(product?.sizeOptions[0]?.label ?? '');
  }, [product?.slug]);

  const selectedSize = product?.sizeOptions.find((s) => s.label === selectedSizeLabel) ?? primarySize;
  const datasheetDownload = product?.downloads.find((d) => d.type === 'datasheet');
  const filteredDownloads = (product?.downloads ?? []).filter((item) => {
    if (!item.sizeLabel) return true;
    return item.sizeLabel === selectedSizeLabel;
  });
  const drawingDownload = filteredDownloads.find((d) => d.type === 'drawing');
  const dxfDownload = filteredDownloads.find((d) => d.type === 'dxf');
  const stepDownload = filteredDownloads.find((d) => d.type === 'other' || d.type === 'step');

  const handleShareDrawing = async () => {
    const shareTarget = drawingDownload?.fileUrl ? `${window.location.origin}${drawingDownload.fileUrl}` : window.location.href;
    try {
      await navigator.clipboard.writeText(shareTarget);
      setShareCopied(true);
      window.setTimeout(() => setShareCopied(false), 1600);
    } catch {
      window.open(shareTarget, '_blank', 'noopener,noreferrer');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="mb-4">Product not found</h1>
          <p className="text-muted-foreground mb-6">
            The product you are looking for does not exist or the link is incorrect.
          </p>
          <Link to="/products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-foreground">
              {product?.name ?? 'Product'}
            </span>
          </div>
        </div>
      </div>

      {/* Product Header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <h1>{product?.name ?? 'Product'}</h1>
              {product && <Badge>{product.category === 'electrical-metal-boxes' ? 'Metal Box' : 'Floor Distribution'}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Jain Engineering Works • Faridabad • OEM supply
            </p>
            {product && (
              <p className="text-lg text-foreground max-w-2xl">{product.shortDescription}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-4 lg:mt-0">
            <Button 
              size="lg" 
              onClick={() => setRfqModalOpen(true)}
            >
              Request Quote
            </Button>
            {datasheetDownload ? (
              <a href={datasheetDownload.fileUrl} download className="w-full">
                <Button size="lg" variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Datasheet
                </Button>
              </a>
            ) : null}
            <Button size="lg" variant="outline" onClick={handleShareDrawing}>
              <Share2 className="h-4 w-4 mr-2" />
              {shareCopied ? 'Copied' : 'Share Drawing'}
            </Button>
          </div>
        </div>

        {/* Controls under title */}
        {product && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Thickness selection</h3>
                <div className="flex flex-wrap gap-2">
                  {product.thicknessOptions.map((t) => (
                    <Badge key={t} variant="outline">
                      {t.toFixed(1)} mm
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-medium mb-2">Size selection</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizeOptions.map((s) => (
                    <Badge
                      key={s.label}
                      variant={selectedSizeLabel === s.label ? 'default' : 'secondary'}
                      className="cursor-pointer"
                      onClick={() => setSelectedSizeLabel(s.label)}
                    >
                      {s.label}
                    </Badge>
                  ))}
                </div>
                <button className="mt-2 text-xs text-primary underline-offset-4 hover:underline">
                  View size matrix
                </button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 space-y-1 text-sm text-muted-foreground">
                <p>
                  Thickness, size and quantity selections from your RFQ will be mapped here. This
                  block can be extended into a live RFQ summary when wiring the backend.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="3d">3D View</TabsTrigger>
            <TabsTrigger value="downloads">Downloads</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div>
                {selectedImage ? (
                  <ImageWithFallback
                    src={selectedImage}
                    alt={`${product.name} product view`}
                    className="aspect-square w-full rounded-lg border border-border object-cover"
                  />
                ) : (
                  <div className="aspect-square bg-surface-2 rounded-lg border border-border flex items-center justify-center">
                    <Box className="h-32 w-32 text-muted-foreground" />
                  </div>
                )}
                <div className="grid grid-cols-4 gap-2 mt-4">
                  {galleryImages.length > 0
                    ? galleryImages.slice(0, 4).map((imageUrl, index) => (
                        <button
                          type="button"
                          key={imageUrl}
                          onClick={() => setSelectedImage(imageUrl)}
                          className={`aspect-square rounded border-2 overflow-hidden transition-colors ${
                            selectedImage === imageUrl
                              ? 'border-primary'
                              : 'border-transparent hover:border-primary/60'
                          }`}
                          aria-label={`Show image ${index + 1}`}
                        >
                          <ImageWithFallback
                            src={imageUrl}
                            alt={`${product.name} thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))
                    : [1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="aspect-square bg-surface-2 rounded border-2 border-transparent flex items-center justify-center"
                        >
                          <Box className="h-8 w-8 text-muted-foreground" />
                        </div>
                      ))}
                </div>
              </div>

              {/* Key Specs */}
              <div>
                <h2 className="mb-6">Key Features</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium mb-1">Robust Construction</h4>
                      <p className="text-sm text-muted-foreground">
                        Metal enclosure body with reinforced corners and repeatable fabrication
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium mb-1">Weather Protection</h4>
                      <p className="text-sm text-muted-foreground">
                        IP rating and gasket selection can be defined as per your project standard
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium mb-1">Corrosion Resistant</h4>
                      <p className="text-sm text-muted-foreground">
                        Powder-coated finish suitable for outdoor and industrial environments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div>
                      <h4 className="font-medium mb-1">Easy Installation</h4>
                      <p className="text-sm text-muted-foreground">
                        Knockout pattern and mounting accessories configurable to your application
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-surface-2 rounded-lg border border-border">
                  <h4 className="font-medium mb-3">Standard Lead Time</h4>
                  <p className="text-2xl font-semibold text-primary mb-1">
                    Typically 2–3 weeks for standard sizes
                  </p>
                  <p className="text-sm text-muted-foreground">For standard configurations</p>
                </div>
              </div>
            </div>

            {/* Applications */}
            {product && (
              <div>
                <h2 className="mb-4">Applications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {product.applications.map((app, index) => (
                    <Card key={index}>
                      <CardContent className="p-4 flex items-center space-x-3">
                        <Wrench className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-sm">{app}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* Specifications Tab */}
          <TabsContent value="specs">
            <div className="max-w-4xl">
              <h2 className="mb-6">Technical Specifications</h2>
              <div className="bg-surface border border-border rounded-lg overflow-hidden">
                <table className="w-full">
                  <tbody className="divide-y divide-border">
                    {Object.entries(product.keySpecs).map(([key, value], index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-surface-2' : 'bg-surface'}>
                        <td className="px-6 py-4 font-medium text-foreground w-1/3">
                          {key}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-6 bg-warning/10 border border-warning/30 rounded-lg">
                <h4 className="font-medium mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-warning" />
                  Customization Available
                </h4>
                <p className="text-sm text-foreground">
                  All specifications can be customized to your requirements including dimensions, thickness, 
                  cutouts, mounting plates, and color. Contact us with your specific needs.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* 3D View Tab */}
          <TabsContent value="3d">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* 3D Viewer */}
              <div className="lg:col-span-3">
                <Product3DViewerFrame
                  title={product?.name}
                  height={selectedSize?.height ?? 400}
                  width={selectedSize?.width ?? 300}
                  depth={selectedSize?.depth ?? 200}
                  unit={selectedSize?.unit ?? 'mm'}
                  modelUrl={product?.model3d}
                />
              </div>

              {/* Dimension Details */}
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Dimensions</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Height</div>
                        <div className="text-lg font-semibold">{selectedSize?.height ?? '-'} mm</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Width</div>
                        <div className="text-lg font-semibold">{selectedSize?.width ?? '-'} mm</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Depth</div>
                        <div className="text-lg font-semibold">{selectedSize?.depth ?? '-'} mm</div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="font-medium mb-3 text-sm">Download Drawings</h4>
                      <div className="space-y-2">
                        {drawingDownload ? (
                          <a href={drawingDownload.fileUrl} download>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Download className="h-4 w-4 mr-2" />
                              2D PDF
                            </Button>
                          </a>
                        ) : null}
                        {dxfDownload ? (
                          <a href={dxfDownload.fileUrl} download>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Download className="h-4 w-4 mr-2" />
                              DXF File
                            </Button>
                          </a>
                        ) : null}
                        {stepDownload ? (
                          <a href={stepDownload.fileUrl} download>
                            <Button variant="outline" size="sm" className="w-full justify-start">
                              <Download className="h-4 w-4 mr-2" />
                              STEP File
                            </Button>
                          </a>
                        ) : null}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Downloads Tab */}
          <TabsContent value="downloads">
            <div className="max-w-4xl">
              <h2 className="mb-6">Downloads & Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDownloads.map((file) => (
                  <a key={file.id} href={file.fileUrl} download>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{file.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {file.format}
                              {file.size ? ` • ${file.size}` : ''}
                            </div>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <div className="max-w-4xl">
              <h2 className="mb-4">Applications</h2>
              <p className="text-sm text-muted-foreground mb-4">
                The list below is indicative. Use your own sector-specific references when wiring
                this to real project data.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.applications.map((app) => (
                  <Card key={app}>
                    <CardContent className="p-4 flex items-center space-x-3">
                      <Wrench className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{app}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="mb-6">Related Products</h2>
          <p className="text-sm text-muted-foreground mb-4">
            These are sample cross-links within the same product family. Extend this section with
            your real related SKUs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getProductsByCategory(product.category)
              .filter((p) => p.slug !== product.slug)
              .map((related) => (
                <Link key={related.id} to={`/products/${related.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="aspect-square bg-surface-2 rounded-lg border border-border mb-4 flex items-center justify-center">
                        {related.heroImage ? (
                          <ImageWithFallback
                            src={related.heroImage}
                            alt={related.name}
                            className="h-full w-full rounded-lg object-cover"
                          />
                        ) : (
                          <Box className="h-16 w-16 text-muted-foreground" />
                        )}
                      </div>
                      <h4 className="font-medium mb-1">{related.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {related.shortDescription}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <RFQModal open={rfqModalOpen} onOpenChange={setRfqModalOpen} />
    </div>
  );
}
