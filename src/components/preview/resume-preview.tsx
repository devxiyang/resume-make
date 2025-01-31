'use client';

import { useEffect, useState } from 'react';
import { ResumeData } from '@/lib/types';
import { PDFViewer } from '@react-pdf/renderer';
import { useResume } from '@/context/resume-context';
import { ResumeTemplate } from '../templates/resume-templates';

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { previewData, selectedTemplate } = useResume()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="animate-pulse">Loading preview...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading preview</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      <PDFViewer
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          backgroundColor: '#f3f4f6'
        }}
      >
        <ResumeTemplate data={previewData} template={selectedTemplate} />
      </PDFViewer>
    </div>
  );
}

export default ResumePreview;
