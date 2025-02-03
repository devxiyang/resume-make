import { SiteHeader } from '@/components/layout/site-header'
import { Button } from '@/components/ui/button'
import { Link } from '@/i18n/routing'
import { ArrowRight, CheckCircle2, Download, FileText, Sparkles } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'

// Add structured data for the landing page
function generateJsonLd(t: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t('site.title'),
    description: t('metadata.description'),
    url: 'https://resumemaker.cc',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    author: {
      '@type': 'Person',
      name: 'Xiyang Dev',
      url: 'https://x.com/devxiyang'
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    featureList: t.raw('landing.whyChoose.features')
  }
}

export default function LandingPage() {
  const t = useTranslations()
  const whyChooseFeatures = t.raw('landing.whyChoose.features') as string[]
  const jsonLd = generateJsonLd(t)
  
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            🚀 {t('landing.hero.quickStart')}
          </div>
          <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {t('landing.hero.title')} <br />
            <span className="text-primary">{t('landing.hero.titleHighlight')}</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {t('landing.hero.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/builder">
              <Button size="lg" className="h-12 px-8">
                {t('landing.hero.buttons.start')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="h-12 px-8">
                {t('landing.hero.buttons.templates')}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold">{t('landing.showcase.title')}</h2>
          <p className="text-muted-foreground max-w-[42rem]">
            {t('landing.showcase.description')}
          </p>
        </div>
        <div className="relative">
          {/* Builder Interface */}
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <div className="aspect-[21/9]">
              <Image
                src="/builder-capture.png"
                alt="Resume Builder Interface"
                fill
                className="object-cover"
                quality={95}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
          
          {/* Modern Template */}
          <div className="absolute -right-4 top-8 w-[35%] transform rotate-3 z-10">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <div className="aspect-[3/4]">
                <Image
                  src="/templates/modern.jpg"
                  alt="Modern Resume Template"
                  fill
                  className="object-contain bg-white"
                  quality={95}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{t('landing.showcase.builder.title')}</h3>
            <p className="text-muted-foreground">{t('landing.showcase.builder.description')}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{t('landing.showcase.template.title')}</h3>
            <p className="text-muted-foreground">{t('landing.showcase.template.description')}</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{t('landing.features.title.modern')}</h3>
            <p className="text-muted-foreground">
              {t('landing.features.description.modern')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{t('landing.features.title.customization')}</h3>
            <p className="text-muted-foreground">
              {t('landing.features.description.customization')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{t('landing.features.title.download')}</h3>
            <p className="text-muted-foreground">
              {t('landing.features.description.download')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-muted/50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">{t('landing.whyChoose.title')}</h2>
            <p className="text-muted-foreground max-w-[42rem]">
              {t('landing.whyChoose.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseFeatures.map((feature: string, index: number) => (
              <div key={index} className="flex items-center space-x-4 bg-background p-4 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="rounded-lg bg-primary p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
            {t('landing.cta.title')}
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-[42rem] mx-auto">
            {t('landing.cta.description')}
          </p>
          <Link href="/builder">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              {t('landing.cta.button')}
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
              <span className="font-bold">{t('landing.footer.title')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t('landing.footer.copyright')}
            </p>
          </div>
        </div>
      </footer>

      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  )
} 