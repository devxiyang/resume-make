'use client';

import PDFPreview from './pdf-preview'
import { ResumeData } from '@/lib/types'
import { useResume } from '@/context/resume-context'

interface ResumePreviewProps {
  data: ResumeData
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { selectedTemplate } = useResume()

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
        templateName={selectedTemplate}
        scale={1.5}
      />
    </div>
  )
}

export default ResumePreview
