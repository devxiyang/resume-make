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
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SiteHeader />

      {/* Header */}
      <section className="relative overflow-hidden bg-[#1a1e2c] dark:bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
          <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        </div>
        <div className="container relative max-w-4xl mx-auto px-4 pt-24 md:pt-32 pb-16">
          <div className="flex flex-col items-center text-center space-y-4">
            <h1 className="font-bold tracking-tight text-4xl sm:text-5xl text-white">
              {t('templates.title')}
            </h1>
            <p className="max-w-[32rem] leading-normal text-slate-300 sm:text-lg sm:leading-7">
              {t('templates.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/5 to-transparent dark:via-blue-900/5" />
        <div className="container relative max-w-4xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templateIds.map((id) => (
              <div key={id} className="group flex flex-col bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl">
                <div className="relative aspect-[1/1.414] overflow-hidden rounded-t-xl bg-slate-100 dark:bg-slate-900">
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
                <div className="p-6 space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{t(`templates.list.${id}.name`)}</h2>
                    <p className="text-slate-600 dark:text-slate-300">{t(`templates.list.${id}.description`)}</p>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        <span className="font-medium">{t('templates.bestFor')}:</span> {t(`templates.list.${id}.bestFor`)}
                      </p>
                    </div>
                  </div>
                  <Link href={`/builder?template=${id}`} aria-label={t('templates.useTemplate', { name: t(`templates.list.${id}.name`) })}>
                    <Button className="w-full h-10 bg-blue-500 hover:bg-blue-600 text-white">
                      {t('templates.useTemplate', { name: t(`templates.list.${id}.name`) })}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-4xl mx-auto px-4 py-20">
        <div className="rounded-xl bg-[#1a1e2c] dark:bg-slate-800 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('templates.cta.title')}
          </h2>
          <p className="text-slate-300 mb-8 max-w-[32rem] mx-auto">
            {t('templates.cta.description')}
          </p>
          <Link href="/builder" aria-label={t('templates.cta.button')}>
            <Button size="lg" className="h-12 px-8 bg-blue-500 hover:bg-blue-600 text-white">
              {t('templates.cta.button')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="font-bold">{t('site.title')}</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
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