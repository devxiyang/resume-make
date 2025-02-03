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
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#1a1e2c] dark:bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
          <div className="absolute bottom-0 -right-4 w-72 h-72 bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />
        </div>
        <div className="container relative max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-12">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center rounded-lg bg-blue-500 px-3 py-1 text-sm font-medium text-white">
              ✨ {t('landing.hero.quickStart')}
            </div>
            <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white">
              {t('landing.hero.title')} <br />
              <span className="text-blue-500">{t('landing.hero.titleHighlight')}</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-slate-300 sm:text-xl sm:leading-8">
              {t('landing.hero.description')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/builder">
                <Button size="lg" className="h-12 px-8 bg-blue-500 hover:bg-blue-600 text-white">
                  {t('landing.hero.buttons.start')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/templates">
                <Button size="lg" variant="outline" className="h-12 px-8 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 hover:border-white/30">
                  {t('landing.hero.buttons.templates')}
                  <Sparkles className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section className="relative overflow-hidden bg-slate-50 dark:bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/5 to-transparent dark:via-blue-900/5" />
        <div className="container relative max-w-6xl mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center space-y-4 mb-16">
            <div className="inline-flex items-center rounded-lg bg-blue-500 px-3 py-1 text-sm font-medium text-white">
              💫 Powerful Resume Builder
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              {t('landing.showcase.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 max-w-[42rem] text-lg">
              {t('landing.showcase.description')}
            </p>
          </div>

          {/* Image Showcase */}
          <div className="relative mb-16">
            {/* Builder Interface */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-slate-800">
              <div className="aspect-[16/9] md:aspect-[21/9]">
                <Image
                  src="/builder-capture.png"
                  alt="Resume Builder Interface"
                  fill
                  className="object-cover"
                  quality={95}
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>
            
            {/* Modern Template */}
            <div className="hidden md:block absolute -right-4 top-8 w-[30%] transform rotate-3 z-10">
              <div className="relative rounded-xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-slate-800">
                <div className="aspect-[3/4]">
                  <Image
                    src="/templates/modern.jpg"
                    alt="Modern Resume Template"
                    fill
                    className="object-contain bg-white"
                    quality={95}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20" />
              </div>
            </div>
          </div>

          {/* Mobile Template Preview */}
          <div className="md:hidden relative rounded-xl overflow-hidden shadow-xl mb-16">
            <div className="aspect-[3/4]">
              <Image
                src="/templates/modern.jpg"
                alt="Modern Resume Template"
                fill
                className="object-contain bg-white"
                quality={95}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />
          </div>

          {/* Text Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-xl font-semibold">{t('landing.showcase.builder.title')}</h3>
              <p className="text-muted-foreground">{t('landing.showcase.builder.description')}</p>
            </div>
            <div className="space-y-3 text-center md:text-left">
              <h3 className="text-xl font-semibold">{t('landing.showcase.template.title')}</h3>
              <p className="text-muted-foreground">{t('landing.showcase.template.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-blue-100/20 to-slate-50 dark:from-slate-950 dark:via-blue-900/10 dark:to-slate-950" />
        <div className="container relative max-w-6xl mx-auto px-4 py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl transition-colors hover:bg-white hover:shadow-lg dark:hover:bg-slate-800">
              <div className="rounded-full bg-blue-500/10 p-4 transition-transform group-hover:scale-110">
                <Sparkles className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{t('landing.features.title.modern')}</h3>
              <p className="text-slate-600 dark:text-slate-300">
                {t('landing.features.description.modern')}
              </p>
            </div>
            <div className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl transition-colors hover:bg-gradient-to-br hover:from-violet-500/5 hover:to-blue-500/5">
              <div className="rounded-full bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-4 ring-1 ring-violet-500/20 transition-transform group-hover:scale-110">
                <FileText className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-bold">{t('landing.features.title.customization')}</h3>
              <p className="text-muted-foreground">
                {t('landing.features.description.customization')}
              </p>
            </div>
            <div className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl transition-colors hover:bg-gradient-to-br hover:from-violet-500/5 hover:to-blue-500/5">
              <div className="rounded-full bg-gradient-to-br from-violet-500/10 to-blue-500/10 p-4 ring-1 ring-violet-500/20 transition-transform group-hover:scale-110">
                <Download className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-xl font-bold">{t('landing.features.title.download')}</h3>
              <p className="text-muted-foreground">
                {t('landing.features.description.download')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-[#1a1e2c] dark:bg-slate-900 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-white">{t('landing.whyChoose.title')}</h2>
            <p className="text-slate-300 max-w-[42rem]">
              {t('landing.whyChoose.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {whyChooseFeatures.map((feature: string, index: number) => (
              <div key={index} className="flex items-center space-x-4 bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                <span className="text-slate-300">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container max-w-6xl mx-auto px-4 py-20">
        <div className="rounded-lg bg-blue-500 p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {t('landing.cta.title')}
          </h2>
          <p className="text-white/90 mb-8 max-w-[42rem] mx-auto">
            {t('landing.cta.description')}
          </p>
          <Link href="/builder">
            <Button size="lg" variant="secondary" className="h-12 px-8 bg-white text-blue-500 hover:bg-slate-100">
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