import type { Metadata } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations()

  return {
    title: t('templates.title'),
    description: t('templates.subtitle'),
    keywords: t('metadata.keywords'),
    openGraph: {
      title: t('templates.title'),
      description: t('templates.subtitle'),
      type: 'website',
      url: 'https://resumemaker.cc/templates',
      images: [
        {
          url: '/og-templates.png',
          width: 1200,
          height: 630,
          alt: t('templates.title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('templates.title'),
      description: t('templates.subtitle'),
      images: ['/twitter-templates.png'],
    },
  }
}

const templateIds = ['modern', 'professional', 'fresh', 'clean'] as const
type TemplateId = typeof templateIds[number]

function generateJsonLd(t: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('templates.title'),
    description: t('templates.subtitle'),
    url: 'https://resumemaker.cc/templates',
    numberOfItems: templateIds.length,
    itemListElement: templateIds.map((id, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: t(`templates.list.${id}.name`),
        description: t(`templates.list.${id}.description`),
        image: `/templates/${id}.jpg`,
        url: `https://resumemaker.cc/builder?template=${id}`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  }
}

export default function TemplatesPage() {
  const t = useTranslations()
  const jsonLd = generateJsonLd(t)
  
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Header */}
      <section className="container max-w-4xl mx-auto px-4 pt-12 md:pt-16 pb-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="font-bold tracking-tight text-3xl sm:text-4xl">
            {t('templates.title')}
          </h1>
          <p className="max-w-[32rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {t('templates.subtitle')}
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="container max-w-4xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templateIds.map((id) => (
            <div key={id} className="group flex flex-col bg-card rounded-lg border transition-all hover:shadow-lg">
              <div className="relative aspect-[1/1.414] overflow-hidden rounded-t-lg bg-muted">
                <Image
                  src={`/templates/${id}.jpg`}
                  alt={t('templates.imageAlt', {
                    name: t(`templates.list.${id}.name`),
                    bestFor: t(`templates.list.${id}.bestFor`)
                  })}
                  fill
                  quality={100}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 30vw"
                  priority={id === 'modern' || id === 'professional'}
                  className="object-contain"
                />
              </div>
              <div className="p-3 space-y-2">
                <h2 className="text-lg font-bold">{t(`templates.list.${id}.name`)}</h2>
                <p className="text-sm text-muted-foreground">{t(`templates.list.${id}.description`)}</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.raw(`templates.list.${id}.features`).map((feature: string) => (
                    <span
                      key={feature}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">{t('templates.bestFor')}:</span> {t(`templates.list.${id}.bestFor`)}
                  </p>
                </div>
                <Link href={`/builder?template=${id}`} aria-label={t('templates.useTemplate', { name: t(`templates.list.${id}.name`) })}>
                  <Button className="w-full h-8 text-sm">
                    {t('templates.useTemplate', { name: t(`templates.list.${id}.name`) })}
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
            {t('templates.cta.title')}
          </h2>
          <p className="text-primary-foreground/90 mb-4 max-w-[32rem] mx-auto text-sm">
            {t('templates.cta.description')}
          </p>
          <Link href="/builder" aria-label={t('templates.cta.button')}>
            <Button size="default" variant="secondary" className="h-8 px-4">
              {t('templates.cta.button')}
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
              <span className="font-bold">{t('site.title')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t('landing.footer.copyright')}
            </p>
          </div>
        </div>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
} 