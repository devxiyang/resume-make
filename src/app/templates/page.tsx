import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'

export const metadata: Metadata = {
  title: 'Professional Resume Templates | Resume Maker',
  description: 'Choose from our collection of professionally designed resume templates. Modern, creative, and traditional templates for all industries and career levels.',
  keywords: 'resume templates, CV templates, professional templates, modern resume, creative resume, job application templates',
  openGraph: {
    title: 'Professional Resume Templates | Resume Maker',
    description: 'Choose from our collection of professionally designed resume templates. Modern, creative, and traditional templates for all industries and career levels.',
    type: 'website',
    url: 'https://resumemaker.cc/templates',
    images: [
      {
        url: '/og-templates.png',
        width: 1200,
        height: 630,
        alt: 'Resume Templates Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Resume Templates | Resume Maker',
    description: 'Choose from our collection of professionally designed resume templates. Modern, creative, and traditional templates for all industries and career levels.',
    images: ['/twitter-templates.png'],
  },
}

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a focus on readability and visual hierarchy.',
    tags: ['Professional', 'Creative', 'Tech'],
    bestFor: 'Tech, Design, and Marketing professionals',
  },
  {
    id: 'sharp',
    name: 'Sharp',
    description: 'Bold and impactful layout that commands attention with strong typography.',
    tags: ['Bold', 'Corporate', 'Executive'],
    bestFor: 'Business executives and managers',
  },
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimalist design that puts your content front and center.',
    tags: ['Minimal', 'Simple', 'Versatile'],
    bestFor: 'All industries, especially traditional sectors',
  },
  {
    id: 'fresh',
    name: 'Fresh',
    description: 'Modern and energetic design with a perfect balance of creativity and professionalism.',
    tags: ['Creative', 'Dynamic', 'Modern'],
    bestFor: 'Creative professionals and startups',
  },
  {
    id: 'pure',
    name: 'Pure',
    description: 'Elegant and refined layout with perfect whitespace distribution.',
    tags: ['Elegant', 'Refined', 'Classic'],
    bestFor: 'Academic and research positions',
  },
  {
    id: 'boston',
    name: 'Boston',
    description: 'Traditional yet modern design that exudes professionalism and competence.',
    tags: ['Professional', 'Traditional', 'Structured'],
    bestFor: 'Finance and consulting professionals',
  },
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Header */}
      <section className="container max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="font-bold tracking-tight text-4xl sm:text-5xl">
            Professional Resume Templates
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Choose from our collection of professionally designed templates. 
            Each template is crafted to help you stand out and land your dream job.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div key={template.id} className="group flex flex-col bg-card rounded-lg border transition-all hover:shadow-lg">
              <div className="relative aspect-[1/1.4] overflow-hidden rounded-t-lg bg-muted">
                <Image
                  src={`/templates/${template.id}.jpg`}
                  alt={`${template.name} Template Preview - Best for ${template.bestFor}`}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                  priority={template.id === 'modern' || template.id === 'sharp'}
                  className="object-contain"
                />
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold">{template.name} Resume Template</h2>
                <p className="text-muted-foreground">{template.description}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Best for:</span> {template.bestFor}
                  </p>
                </div>
                <Link href={`/builder?template=${template.id}`} aria-label={`Use ${template.name} template`}>
                  <Button className="w-full mt-4">
                    Use this template
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="rounded-lg bg-primary p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-[42rem] mx-auto">
            Choose your favorite template and start building your resume now.
          </p>
          <Link href="/builder" aria-label="Start building your resume">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Start Building Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="font-bold">Resume Maker</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Resume Maker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Professional Resume Templates',
            description: 'Collection of professional resume templates for all industries and career levels.',
            url: 'https://resumemaker.cc/templates',
            numberOfItems: templates.length,
            itemListElement: templates.map((template, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Product',
                name: `${template.name} Resume Template`,
                description: template.description,
                image: `/templates/${template.id}.jpg`,
                url: `https://resumemaker.cc/builder?template=${template.id}`,
                offers: {
                  '@type': 'Offer',
                  price: '0',
                  priceCurrency: 'USD',
                  availability: 'https://schema.org/InStock',
                },
              },
            })),
          }),
        }}
      />
    </div>
  )
} 