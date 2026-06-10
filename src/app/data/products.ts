export type ProductCategoryId = 'electrical-metal-boxes' | 'floor-distribution-system';

export type MetalBoxViewerStyle = 'modular-mount' | 'enclosure';

export interface SizeOption {
  label: string;
  height: number;
  width: number;
  depth: number;
  unit: 'mm';
}

export interface DownloadItem {
  id: string;
  type: 'datasheet' | 'drawing' | 'dxf' | 'step' | 'other';
  label: string;
  format: string;
  size?: string;
  fileUrl: string;
  sizeLabel?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategoryId;
  shortDescription: string;
  heroImage: string | null;
  galleryImages?: string[];
  thicknessOptions: number[];
  sizeOptions: SizeOption[];
  keySpecs: Record<string, string>;
  downloads: DownloadItem[];
  model3d: string | null;
  viewerStyle?: MetalBoxViewerStyle;
  applications: string[];
}

export interface ProductCategory {
  id: ProductCategoryId;
  name: string;
  description: string;
  heroIntro: string;
  bullets: string[];
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'electrical-metal-boxes',
    name: 'Electrical Metal Boxes',
    description: 'OEM-grade junction boxes and control enclosures in multiple sizes and thicknesses.',
    heroIntro:
      'Standard and custom electrical metal boxes for OEM supply, panel builders, and EPC contractors.',
    bullets: [
      'Thickness options: 1.0 / 1.2 / 1.6 mm',
      'Standard IP54–IP66 configurations',
      'Wall, floor, and pole mounting options',
    ],
  },
  {
    id: 'floor-distribution-system',
    name: 'Floor Distribution System',
    description: 'Raised-floor distribution solutions for commercial and industrial installations.',
    heroIntro:
      'Floor distribution systems compatible with common raised-floor standards for corporate and industrial environments.',
    bullets: [
      'Flush and pop-up configurations',
      'Multiple outlet and data combinations',
      'Service-friendly modular construction',
    ],
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'mb16008v-8-module-vertical',
    name: '8 Module Vertical Metal Box 130×130×60',
    slug: 'mb16008v-8-module-vertical',
    category: 'electrical-metal-boxes',
    shortDescription:
      '1.6 mm pre-galvanized vertical mounting box for modular wiring devices — 8 module, 60 mm depth.',
    heroImage: '/products/jeb/hero.jpg',
    galleryImages: ['/products/jeb/hero.jpg', '/products/jeb/view-2.jpg', '/products/jeb/view-3.jpg'],
    thicknessOptions: [1.6],
    sizeOptions: [
      { label: '130×130×60 mm (internal)', height: 130, width: 130, depth: 60, unit: 'mm' },
    ],
    keySpecs: {
      Material: 'Galvanized steel, 275 GSM',
      'Sheet thickness': '1.6 mm',
      'Internal size': '130 × 130 × 60 mm',
      Finish: 'Pre-galvanized spangle finish',
      Knockouts: 'Dual knockouts on all faces; earth terminal on back',
      Mounting: 'Sliding top/bottom lugs for faceplate fixing',
    },
    downloads: [],
    model3d: null,
    viewerStyle: 'modular-mount',
    applications: [
      'Modular switch and socket assemblies',
      'Commercial wiring device mounting',
      'Flush wall boxes for MCB / MCCB plates',
      'OEM panel builder supply',
    ],
  },
  {
    id: 'jeb-400x300x200',
    name: 'JEB Series Junction Box 400×300×200',
    slug: 'jeb-400x300x200',
    category: 'electrical-metal-boxes',
    shortDescription:
      'Wall-mount junction box for feeders and distribution circuits with IP65 protection.',
    heroImage: '/products/jeb/hero.jpg',
    galleryImages: [
      '/products/jeb/hero.jpg',
      '/products/jeb/view-2.jpg',
      '/products/jeb/view-3.jpg',
      '/products/jeb/view-4.jpg',
    ],
    thicknessOptions: [1.0, 1.2, 1.6],
    sizeOptions: [
      { label: '400×300×200 mm', height: 400, width: 300, depth: 200, unit: 'mm' },
      { label: '500×400×200 mm', height: 500, width: 400, depth: 200, unit: 'mm' },
    ],
    keySpecs: {
      Material: 'Mild Steel (MS)',
      Finish: 'Epoxy polyester powder coat, RAL 7035 equivalent',
      'Gland Plate': 'Removable bottom gland plate',
      Gasket: 'Continuous PU foam gasket',
      Mounting: 'Wall-mount with rear holes / optional mounting brackets',
    },
    downloads: [
      {
        id: 'datasheet',
        type: 'datasheet',
        label: 'JEB series datasheet',
        format: 'PDF',
        size: '2.4 MB',
        fileUrl: '/downloads/jeb/jeb-series-datasheet.pdf',
      },
      {
        id: '2d-drawing',
        type: 'drawing',
        label: '2D dimension drawing - 400×300×200',
        format: 'PDF',
        size: '1.1 MB',
        fileUrl: '/downloads/jeb/jeb-400x300x200-drawing.pdf',
        sizeLabel: '400×300×200 mm',
      },
      {
        id: '2d-drawing-500',
        type: 'drawing',
        label: '2D dimension drawing - 500×400×200',
        format: 'PDF',
        size: '1.2 MB',
        fileUrl: '/downloads/jeb/jeb-500x400x200-drawing.pdf',
        sizeLabel: '500×400×200 mm',
      },
      {
        id: 'dxf',
        type: 'dxf',
        label: 'DXF cutout template',
        format: 'DXF',
        size: '860 KB',
        fileUrl: '/downloads/jeb/jeb-cutout-template.dxf',
      },
      {
        id: 'step',
        type: 'other',
        label: 'STEP 3D model',
        format: 'STEP',
        size: '3.2 MB',
        fileUrl: '/downloads/jeb/jeb-3d-model.step',
      },
    ],
    model3d: '/models/jeb-400x300x200.glb',
    viewerStyle: 'enclosure',
    applications: [
      'Feeder and distribution junctions',
      'Outdoor cable terminations',
      'Motor and pump connections',
      'Solar string junctions',
    ],
  },
  {
    id: 'cpb-control-panel-enclosure',
    name: 'CPB Series Control Panel Enclosure',
    slug: 'cpb-control-panel-enclosure',
    category: 'electrical-metal-boxes',
    shortDescription:
      'Floor-standing control panel enclosure for MCCs and automation panels.',
    heroImage: '/products/cpb/hero.jpg',
    galleryImages: [
      '/products/cpb/hero.jpg',
      '/products/cpb/view-2.jpg',
      '/products/cpb/view-3.jpg',
      '/products/cpb/view-4.jpg',
    ],
    thicknessOptions: [1.6],
    sizeOptions: [
      { label: '1600×800×400 mm', height: 1600, width: 800, depth: 400, unit: 'mm' },
      { label: '1800×1000×500 mm', height: 1800, width: 1000, depth: 500, unit: 'mm' },
    ],
    keySpecs: {
      Material: 'Mild Steel (MS)',
      Finish: 'Textured powder coat, RAL 7035 equivalent',
      Plinth: 'Detachable plinth with leveling arrangement',
      Doors: 'Single / double door options with reinforced stiffeners',
      Mounting: 'Floor-standing with gland plate and lifting hooks',
    },
    downloads: [
      {
        id: 'datasheet',
        type: 'datasheet',
        label: 'CPB series datasheet',
        format: 'PDF',
        size: '2.0 MB',
        fileUrl: '/downloads/cpb/cpb-series-datasheet.pdf',
      },
      {
        id: '2d-drawing-1600',
        type: 'drawing',
        label: '2D dimension drawing - 1600×800×400',
        format: 'PDF',
        size: '1.3 MB',
        fileUrl: '/downloads/cpb/cpb-1600x800x400-drawing.pdf',
        sizeLabel: '1600×800×400 mm',
      },
      {
        id: '2d-drawing-1800',
        type: 'drawing',
        label: '2D dimension drawing - 1800×1000×500',
        format: 'PDF',
        size: '1.4 MB',
        fileUrl: '/downloads/cpb/cpb-1800x1000x500-drawing.pdf',
        sizeLabel: '1800×1000×500 mm',
      },
      {
        id: 'dxf',
        type: 'dxf',
        label: 'DXF panel cutout template',
        format: 'DXF',
        size: '950 KB',
        fileUrl: '/downloads/cpb/cpb-panel-cutout-template.dxf',
      },
      {
        id: 'step',
        type: 'other',
        label: 'STEP assembly model',
        format: 'STEP',
        size: '4.1 MB',
        fileUrl: '/downloads/cpb/cpb-assembly-model.step',
      },
    ],
    model3d: '/models/cpb-control-panel-enclosure.glb',
    viewerStyle: 'enclosure',
    applications: ['MCC panels', 'PLC / automation panels', 'Instrumentation panels'],
  },
  {
    id: 'fds-floor-box-rcp',
    name: 'FDS Series Floor Distribution Box – Rectangular',
    slug: 'fds-floor-distribution-rectangular',
    category: 'floor-distribution-system',
    shortDescription:
      'Rectangular floor distribution box for raised-floor systems with electrical and data outlets.',
    heroImage: '/products/fds/hero.jpg',
    galleryImages: [
      '/products/fds/hero.jpg',
      '/products/fds/view-2.jpg',
      '/products/fds/view-3.jpg',
      '/products/fds/view-4.jpg',
    ],
    thicknessOptions: [1.2],
    sizeOptions: [
      { label: '300×300 mm cutout', height: 95, width: 300, depth: 300, unit: 'mm' },
      { label: '400×300 mm cutout', height: 95, width: 400, depth: 300, unit: 'mm' },
    ],
    keySpecs: {
      Material: 'Galvanized steel body with stainless steel trim options',
      Finish: 'Powder coated internal parts, brushed trim options',
      'Outlet Modules': 'Mixed power + data plates (configurable)',
      Ingress: 'Cable entry from underside of raised floor',
      Cover: 'Flush cover with anti-slip finish',
    },
    downloads: [
      {
        id: '2d-drawing-300',
        type: 'drawing',
        label: '2D drawing - 300×300 cutout',
        format: 'PDF',
        size: '1.0 MB',
        fileUrl: '/downloads/fds/fds-300x300-drawing.pdf',
        sizeLabel: '300×300 mm cutout',
      },
      {
        id: '2d-drawing-400',
        type: 'drawing',
        label: '2D drawing - 400×300 cutout',
        format: 'PDF',
        size: '1.0 MB',
        fileUrl: '/downloads/fds/fds-400x300-drawing.pdf',
        sizeLabel: '400×300 mm cutout',
      },
      {
        id: 'dxf',
        type: 'dxf',
        label: 'DXF module plate template',
        format: 'DXF',
        size: '720 KB',
        fileUrl: '/downloads/fds/fds-module-template.dxf',
      },
      {
        id: 'step',
        type: 'other',
        label: 'STEP floor box model',
        format: 'STEP',
        size: '2.6 MB',
        fileUrl: '/downloads/fds/fds-floor-box.step',
      },
    ],
    model3d: '/models/fds-floor-distribution-rectangular.glb',
    applications: [
      'Corporate offices',
      'Control rooms',
      'Data centers',
      'Training and conference facilities',
    ],
  },
];

export function getCategoryById(id: ProductCategoryId): ProductCategory | undefined {
  return PRODUCT_CATEGORIES.find((c) => c.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategoryId): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

