import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { FileText, Download } from 'lucide-react';

const DOWNLOADS = [
  {
    id: 'capabilities',
    name: 'Jain Engineering Works – Capabilities Deck',
    description: 'Overview of manufacturing capabilities, product lines, and typical project profiles.',
    format: 'PDF',
    size: '4.2 MB',
  },
  {
    id: 'sample-datasheet',
    name: 'Sample Datasheet – Electrical Metal Box',
    description: 'Placeholder datasheet layout for metal box SKUs.',
    format: 'PDF',
    size: '2.0 MB',
  },
  {
    id: 'sample-inspection',
    name: 'Sample Inspection Report',
    description: 'Illustrative in-process and final inspection checklist.',
    format: 'PDF',
    size: '1.1 MB',
  },
  {
    id: 'drawing-templates',
    name: 'Drawing Templates (DXF/PDF)',
    description: 'Placeholder templates for cutouts and mounting plates.',
    format: 'DXF / PDF',
    size: 'multiple',
  },
];

export function Downloads() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-surface border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="mb-3">Downloads</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Centralised location for datasheets, sample inspection reports, and drawing templates.
            Replace these placeholders with your actual files when they are ready.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DOWNLOADS.map((file) => (
            <Card key={file.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-start justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">{file.name}</div>
                    <p className="text-xs text-muted-foreground mb-1">{file.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {file.format} • {file.size}
                    </p>
                  </div>
                </div>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="border border-border rounded-xl p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold mb-1">Need a specific document?</h2>
            <p className="text-sm text-muted-foreground max-w-xl">
              Share your project details and we&apos;ll provide drawings, datasheets, or inspection
              formats aligned to your internal templates.
            </p>
          </div>
          <a href="/contact">
            <Button>Request Document</Button>
          </a>
        </div>
      </div>
    </div>
  );
}

