import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Download, FileText, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/layout/site-header'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-4 pt-24 md:pt-32 pb-12">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            🚀 Your professional resume in minutes
          </div>
          <h1 className="font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Create Your Perfect Resume <br />
            <span className="text-primary">With Ease</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Build professional resumes that stand out. Choose from modern templates, customize with ease, 
            and download in seconds. Your next career move starts here.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/builder">
              <Button size="lg" className="h-12 px-8">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/templates">
              <Button size="lg" variant="outline" className="h-12 px-8">
                View Templates
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
            <h3 className="text-xl font-bold">Modern Templates</h3>
            <p className="text-muted-foreground">
              Choose from our collection of professionally designed templates that catch the eye.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Easy Customization</h3>
            <p className="text-muted-foreground">
              Customize every aspect of your resume with our intuitive editor.
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Download className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Instant Download</h3>
            <p className="text-muted-foreground">
              Download your resume in PDF format, ready to send to employers.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full bg-muted/50 py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold">Why Choose Resume Maker</h2>
            <p className="text-muted-foreground max-w-[42rem]">
              We make resume creation simple and effective, helping you land your dream job.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              "Professional templates designed by experts",
              "Real-time preview as you edit",
              "Easy-to-use interface",
              "Export to PDF in one click",
              "Mobile responsive design",
              "Free to use",
              "Multiple layout options",
              "Regular updates and new features",
            ].map((feature, index) => (
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
            Ready to Create Your Professional Resume?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-[42rem] mx-auto">
            Join thousands of job seekers who have successfully created their resumes using our platform.
          </p>
          <Link href="/builder">
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
    </div>
  )
} 