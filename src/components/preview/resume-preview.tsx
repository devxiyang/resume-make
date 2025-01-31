'use client';

import PDFPreview from './pdf-preview'
import { ResumeData } from '@/lib/types'

interface ResumePreviewProps {
  data: ResumeData
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  if (!data) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No resume data available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full overflow-auto">
      <PDFPreview 
        resumeData={data}
        scale={1.5}
      />
    </div>
  )
}

export default ResumePreview
