import { Inter, Noto_Sans_SC } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { cn } from '@/lib/utils'
import { routing } from '@/i18n/routing'
import type { Metadata } from 'next'
import "./globals.css"
import "./print-styles.css"

const inter = Inter({ subsets: ['latin'] })

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
})

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale }
}: Omit<Props, 'children'>): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' })

  return {
    metadataBase: new URL('https://resumemaker.cc'),
    title: {
      default: t('title'),
      template: `%s | ${t('titleTemplate')}`
    },
    description: t('description'),
    keywords: t('keywords'),
    authors: [{ name: t('author') }],
    creator: t('author'),
    publisher: t('publisher'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: 'https://resumemaker.cc',
      siteName: t('siteName'),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: t('ogImageAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      creator: '@resumebuilder',
      images: ['/twitter-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: 'https://resumemaker.cc',
      languages: {
        'en-US': '/en',
        'zh-CN': '/zh',
      },
    },
    manifest: '/site.webmanifest',
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    },
    verification: {
      google: 'your-google-site-verification',
    },
    category: 'productivity',
  }
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: Props) {
  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  const messages = await getMessages(locale)

  return (
    <html lang={locale} className={`${notoSansSC.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Resume Builder',
              description: 'Create professional resumes with our easy-to-use online resume builder.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web Browser',
              url: 'https://resumemaker.cc',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              featureList: [
                'Multiple professional templates',
                'Real-time preview',
                'PDF download',
                'Easy content editing',
                'Mobile responsive',
                'AI-powered suggestions',
              ],
              author: {
                '@type': 'Organization',
                name: 'Resume Builder Team',
                url: 'https://resumemaker.cc'
              },
              browserRequirements: 'Requires JavaScript. Requires HTML5.',
              permissions: 'none',
              softwareVersion: '1.0.0'
            }),
          }}
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", notoSansSC.className)}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}