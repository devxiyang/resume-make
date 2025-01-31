import Link from 'next/link'
import { FileText } from 'lucide-react'

export function SiteHeader() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6" />
          <span className="font-bold">Resume Maker</span>
        </Link>
        <Link 
          href="https://x.com/devxiyang" 
          target="_blank"
          rel="noopener noreferrer" 
          className="hover:opacity-80 transition-opacity"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
          </svg>
        </Link>
      </div>
    </nav>
  )
} 