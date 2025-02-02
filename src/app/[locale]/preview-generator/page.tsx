'use client';

import { PreviewGenerator } from "@/components/templates/preview-generator";
import { SiteHeader } from "@/components/layout/site-header";

export default function PreviewGeneratorPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto py-8">
        <PreviewGenerator />
      </div>
    </div>
  );
} 