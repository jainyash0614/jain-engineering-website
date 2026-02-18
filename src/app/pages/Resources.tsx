import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Video, Download } from 'lucide-react';

export function Resources() {
  const articles = [
    {
      category: 'Technical Guide',
      title: 'IP65 vs IP66: Which Rating Do You Need?',
      description: 'Understand the difference between IP ratings and choose the right protection level for your application.',
      readTime: '5 min read',
      icon: BookOpen
    },
    {
      category: 'Material Guide',
      title: 'SS304 vs SS316: Making the Right Choice',
      description: 'Compare stainless steel grades for corrosion resistance, cost, and application suitability.',
      readTime: '7 min read',
      icon: FileText
    },
    {
      category: 'Technical Guide',
      title: 'Outdoor Corrosion Protection Best Practices',
      description: 'How powder coating, gaskets, and material selection work together for long-term durability.',
      readTime: '6 min read',
      icon: BookOpen
    },
    {
      category: 'Specification Guide',
      title: 'How to Specify Cutouts and Mounting Holes',
      description: 'Complete guide to providing cutout specifications, tolerances, and mounting plate details.',
      readTime: '8 min read',
      icon: FileText
    },
    {
      category: 'Installation Guide',
      title: 'Proper Grounding and Earthing for Metal Enclosures',
      description: 'Electrical safety requirements and best practices for grounding electrical enclosures.',
      readTime: '6 min read',
      icon: BookOpen
    },
    {
      category: 'Technical Guide',
      title: 'Understanding Powder Coating Specifications',
      description: 'Coating thickness, adhesion, salt spray hours, and what they mean for your application.',
      readTime: '5 min read',
      icon: FileText
    },
    {
      category: 'Application Note',
      title: 'Solar Junction Box Selection Criteria',
      description: 'Key considerations for selecting junction boxes in solar installations.',
      readTime: '7 min read',
      icon: BookOpen
    },
    {
      category: 'Technical Guide',
      title: 'Thermal Management in Electrical Enclosures',
      description: 'Ventilation, heat dissipation, and preventing component overheating.',
      readTime: '9 min read',
      icon: FileText
    },
    {
      category: 'Video Tutorial',
      title: 'Factory Tour: Our Manufacturing Process',
      description: 'Walk through our facility and see how enclosures are made from start to finish.',
      readTime: '12 min video',
      icon: Video
    },
    {
      category: 'Specification Guide',
      title: 'Custom Enclosure Design Checklist',
      description: 'Everything you need to provide for a custom enclosure quote.',
      readTime: '4 min read',
      icon: FileText
    },
    {
      category: 'Material Guide',
      title: 'Mild Steel vs Aluminum Enclosures',
      description: 'Weight, cost, corrosion resistance, and strength comparison.',
      readTime: '6 min read',
      icon: BookOpen
    },
    {
      category: 'Technical Guide',
      title: 'Cable Entry Methods and Gland Selection',
      description: 'Different cable entry options and how to maintain IP ratings.',
      readTime: '7 min read',
      icon: FileText
    }
  ];

  const categoryColors: { [key: string]: string } = {
    'Technical Guide': 'bg-primary/10 text-primary',
    'Material Guide': 'bg-primary/10 text-primary',
    'Specification Guide': 'bg-success/10 text-success',
    'Installation Guide': 'bg-warning/10 text-warning',
    'Application Note': 'bg-primary/10 text-primary',
    'Video Tutorial': 'bg-destructive/10 text-destructive'
  };
  const resourceDownloads = [
    { name: 'Complete Product Catalog', size: '8.4 MB', format: 'PDF', fileUrl: '/resources/complete-product-catalog.pdf' },
    { name: 'IP Rating Reference Chart', size: '1.2 MB', format: 'PDF', fileUrl: '/resources/ip-rating-reference-chart.pdf' },
    { name: 'Material Comparison Guide', size: '2.1 MB', format: 'PDF', fileUrl: '/resources/material-comparison-guide.pdf' },
    { name: 'Standard Dimensions Sheet', size: '956 KB', format: 'PDF', fileUrl: '/resources/standard-dimensions-sheet.pdf' },
    { name: 'Custom Design Template', size: '1.8 MB', format: 'DXF', fileUrl: '/resources/custom-design-template.dxf' },
    { name: 'Installation Guidelines', size: '3.2 MB', format: 'PDF', fileUrl: '/resources/installation-guidelines.pdf' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-background to-surface text-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h1 className="mb-6">Technical Resources</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Guides, specifications, and best practices to help you select and specify 
              the right enclosures for your application.
            </p>
          </div>
        </div>
      </div>

      {/* Resource Library */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => {
            const Icon = article.icon;
            const topic = encodeURIComponent(article.title);
            return (
              <Link
                key={index}
                to={`/contact?intent=resource-help&topic=${topic}`}
                className="group block"
                aria-label={`Read more about ${article.title}`}
              >
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <Badge className={categoryColors[article.category] || 'bg-muted text-muted-foreground'}>
                        {article.category}
                      </Badge>
                      <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    <h3 className="mb-3 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {article.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                      <span className="text-sm text-primary font-medium group-hover:underline">
                        Read more →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Downloadable Resources */}
      <div className="bg-surface-2 border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="mb-4">Downloadable Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technical documentation for reference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {resourceDownloads.map((file) => (
              <a key={file.fileUrl} href={file.fileUrl} download>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-primary/10 rounded flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.format} • {file.size}</div>
                      </div>
                    </div>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="mb-4">Need Help with Your Specification?</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Our engineering team is available to discuss your requirements
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact?intent=engineering-help">
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors">
              Contact Engineering
            </button>
          </Link>
          <Link to="/products">
            <button className="px-6 py-3 border-2 border-border text-foreground rounded-lg hover:border-primary/50 transition-colors">
              Browse Products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
