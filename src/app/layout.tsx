// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "Resume Maker",
//   description: "Create professional resumes with ease",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }

import "./globals.css"
import "./print-styles.css"
import type React from "react"
import type { Metadata } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-sc',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://resumemaker.cc'),
  title: {
    default: 'Resume Builder - Create Professional Resumes Online',
    template: '%s | Resume Builder'
  },
  description: 'Create professional resumes with our easy-to-use online resume builder. Choose from modern templates, customize your content, and download your resume in PDF format.',
  keywords: 'resume builder, cv maker, professional resume, job application, career tools, resume templates, AI resume builder',
  authors: [{ name: 'Resume Builder Team' }],
  creator: 'Resume Builder Team',
  publisher: 'Resume Builder',
  openGraph: {
    title: 'Resume Builder - Create Professional Resumes Online',
    description: 'Create professional resumes with our easy-to-use online resume builder. Choose from modern templates, customize your content, and download your resume in PDF format.',
    type: 'website',
    locale: 'en_US',
    url: 'https://resumemaker.cc',
    siteName: 'Resume Builder',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resume Builder Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resume Builder - Create Professional Resumes Online',
    description: 'Create professional resumes with our easy-to-use online resume builder. Choose from modern templates, customize your content, and download your resume in PDF format.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${notoSansSC.variable}`}>
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
        {children}
      </body>
    </html>
  )
}
