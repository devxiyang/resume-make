import type { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Download, FileText, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'
import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

export const metadata: Metadata = {
  metadataBase: new URL('https://resumemaker.cc'),
  title: {
    default: 'Resume Maker - Create Professional Resumes Online',
    template: '%s | Resume Maker'
  },
  description: 'Create professional resumes with our easy-to-use online resume builder. Choose from modern templates, customize with ease, and download your resume in minutes.',
  keywords: 'resume builder, cv maker, resume templates, professional resume, job application, career tools, resume generator',
  authors: [{ name: 'DevXiyang', url: 'https://x.com/devxiyang' }],
  creator: 'Xiyang Dev',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://resumemaker.cc',
    title: 'Resume Maker - Create Professional Resumes Online',
    description: 'Create professional resumes with our easy-to-use online resume builder. Choose from modern templates, customize with ease, and download your resume in minutes.',
    siteName: 'Resume Maker',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resume Maker - Professional Resume Builder',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Maker - Create Professional Resumes Online',
    description: 'Create professional resumes with our easy-to-use online resume builder. Choose from modern templates, customize with ease, and download your resume in minutes.',
    creator: '@devxiyang',
    images: ['/twitter-image.png'],
  },
  alternates: {
    canonical: 'https://resumemaker.cc',
  },
  verification: {
    google: 'your-google-site-verification',
  }
}

// Add structured data for the landing page
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Resume Maker',
  description: 'Create professional resumes with our easy-to-use online resume builder.',
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
  featureList: [
    'Modern resume templates',
    'Real-time preview',
    'Easy customization',
    'PDF download',
    'Professional designs',
    'Mobile responsive'
  ]
}

export default function LandingPage() {
  const t = useTranslations('landing')
  const whyChooseFeatures = t.raw('whyChoose.features') as string[]
  
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            🚀 {t('hero.quickStart')}
          </div>
          <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {t('hero.title')} <br />
            <span className="text-primary">{t('hero.titleHighlight')}</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            {t('hero.description')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/builder">
              <Button size="lg" className="h-12 px-8">
                {t('hero.buttons.start')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="h-12 px-8">
                {t('hero.buttons.templates')}
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
            <h3 className="text-xl font-bold">{t('features.title.modern')}</h3>
            <p className="text-muted-foreground">
              {t('features.description.modern')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{t('features.title.customization')}</h3>
            <p className="text-muted-foreground">
              {t('features.description.customization')}
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">{t('features.title.download')}</h3>
            <p className="text-muted-foreground">
              {t('features.description.download')}
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-muted/50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">{t('whyChoose.title')}</h2>
            <p className="text-muted-foreground max-w-[42rem]">
              {t('whyChoose.subtitle')}
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
            {t('cta.title')}
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-[42rem] mx-auto">
            {t('cta.description')}
          </p>
          <Link href="/builder">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              {t('cta.button')}
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
              <span className="font-bold">{t('footer.title')}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {t('footer.copyright')}
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