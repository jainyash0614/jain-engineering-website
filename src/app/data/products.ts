export type ProductCategoryId =
  | 'electrical-metal-boxes'
  | 'floor-distribution-system'
  | 'junction-boxes';

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
    description: 'OEM-grade modular metal boxes and control enclosures in multiple sizes and thicknesses.',
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
  {
    id: 'junction-boxes',
    name: 'Junction Boxes',
    description:
      'Heavy-duty cable management and junction box assemblies for commercial and industrial floor applications.',
    heroIntro:
      'Junction box systems with reinforced base structure, knockout-ready raceway access, and service-friendly layered construction.',
    bullets: [
      'CJB 350×350 family with 60–75 mm depth range',
      '1.6 mm GI structural parts with die-cast corner pillars',
      'Exploded, serviceable stack with cover, trap frame, and base assembly',
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
  {
    id: 'cjb-350-junction-box',
    name: 'CJB Junction Box 350×350×60–75',
    slug: 'cjb-junction-box-350x350',
    category: 'junction-boxes',
    shortDescription:
      '350×350 junction box assembly with layered cover stack, knockout-ready side plates, and adjustable 60–75 mm body depth.',
    heroImage: '/products/cjb/hero.jpg',
    galleryImages: ['/products/cjb/hero.jpg'],
    thicknessOptions: [1.6],
    sizeOptions: [{ label: '350×350 mm cutout', height: 75, width: 350, depth: 350, unit: 'mm' }],
    keySpecs: {
      'Drawing reference': 'ACJBRBDJML350 (development drawing)',
      Material: 'GI 120 GSM + CRCA + die-cast corner pillars',
      'Sheet thickness': '1.6 mm base/pressure/knockout + 1.6 mm cover/trap frame',
      'Depth range': '60.0–75.0 mm',
      'Nominal footprint': '350 × 350 mm',
      'Cover stack': 'Throw-away lid + cover plate (floor lid) + trap frame',
      'Structural stack': 'Flyover/cross bracket + pressure plates ×4 + base plate + corner pillars ×4',
      'Cable ingress': 'Knockout plate raceway entries on 4 sides',
      Finish: 'GI skin pass/spangle + DA grey powder coat (RAL 7031 on CRCA parts)',
      Compliance: 'RoHS compliant materials/processes (per ES50040083 note)',
    },
    downloads: [],
    model3d: null,
    applications: [
      'Commercial floor service junction points',
      'Control-room and utility trench terminations',
      'Plant-floor cable management access',
      'High-traffic service areas requiring flush floor interfaces',
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

