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
    id: 'professional',
    name: 'Professional',
    description: 'A polished template that exudes professionalism and competence.',
    tags: ['Classic', 'Business', 'Traditional'],
    bestFor: 'Business professionals and executives',
  },
  {
    id: 'fresh',
    name: 'Fresh',
    description: 'A vibrant and energetic template that stands out from the crowd.',
    tags: ['Modern', 'Creative', 'Dynamic'],
    bestFor: 'Creative professionals and startups',
  },
  {
    id: 'clean',
    name: 'Clean',
    description: 'Minimalist design that puts your content front and center.',
    tags: ['Minimal', 'Simple', 'Versatile'],
    bestFor: 'All industries, especially traditional sectors',
  }
]

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Header */}
      <section className="container max-w-4xl mx-auto px-4 pt-12 md:pt-16 pb-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="font-bold tracking-tight text-3xl sm:text-4xl">
            Professional Resume Templates
          </h1>
          <p className="max-w-[32rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Choose from our collection of professionally designed templates. 
            Each template is crafted to help you stand out.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="container max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="group flex flex-col bg-card rounded-lg border transition-all hover:shadow-lg">
              <div className="relative aspect-[1/1.414] overflow-hidden rounded-t-lg bg-muted">
                <Image
                  src={`/templates/${template.id}.jpg`}
                  alt={`${template.name} Template Preview - Best for ${template.bestFor}`}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
                  priority={template.id === 'modern' || template.id === 'sharp'}
                  className="object-contain"
                />
              </div>
              <div className="p-3 space-y-2">
                <h2 className="text-lg font-bold">{template.name} Resume Template</h2>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Best for:</span> {template.bestFor}
                  </p>
                </div>
                <Link href={`/builder?template=${template.id}`} aria-label={`Use ${template.name} template`}>
                  <Button className="w-full h-8 text-sm">
                    Use this template
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-lg bg-primary p-4 text-center">
          <h2 className="text-lg md:text-xl font-bold text-primary-foreground mb-2">
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-primary-foreground/90 mb-4 max-w-[32rem] mx-auto text-sm">
            Choose your favorite template and start building your resume now.
          </p>
          <Link href="/builder" aria-label="Start building your resume">
            <Button size="default" variant="secondary" className="h-8 px-4">
              Start Building Now
              <ArrowRight className="ml-2 h-3 w-3" />
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