'use client';

import { useEffect, useState } from 'react'
import { ResumeData } from '@/lib/types'
import { getPDFTemplate } from '@/lib/pdf-templates'
import pdfMake from 'pdfmake/build/pdfmake'

interface ResumePreviewProps {
  resumeData: ResumeData
  templateName?: string
  scale?: number
  onPDFGenerated?: (url: string) => void
}

const ResumePreview = ({ resumeData, templateName = 'clean', scale = 1, onPDFGenerated }: ResumePreviewProps) => {
  const [error, setError] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!resumeData) {
      console.log('Resume data missing')
      return
    }

    // 清理之前的URL
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl)
    }

    // 配置字体
    pdfMake.fonts = {
      NotoSansSC: {
        normal: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYw.ttf',
        bold: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYw.ttf',
        italics: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYw.ttf',
        bolditalics: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYw.ttf'
      }
    }

    const generatePDF = async () => {
      try {
        // 获取模板并生成文档定义
        const template = getPDFTemplate(templateName)
        const docDefinition = template(resumeData)

        // 生成PDF
        const pdfDocGenerator = pdfMake.createPdf(docDefinition)

        pdfDocGenerator.getDataUrl((dataUrl) => {
          setPdfUrl(dataUrl)
          onPDFGenerated?.(dataUrl)
        })

      } catch (error) {
        console.error('Error in PDF generation:', error)
        setError(error instanceof Error ? error.message : 'Unknown error occurred')
      }
    }

    generatePDF()

    // 清理函数
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl)
      }
    }
  }, [resumeData, templateName, scale, onPDFGenerated])

  if (!resumeData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No resume data available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      {error && (
        <div className="text-red-500 p-4">
          Error: {error}
        </div>
      )}
      {pdfUrl && (
        <div className="w-full h-full overflow-hidden">
          <iframe
            src={pdfUrl + '#zoom=FitW&toolbar=0&navpanes=0&scrollbar=0'}
            className="w-full h-full"
            style={{
              border: 'none',
              display: 'block',
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0,
              overflow: 'hidden'
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ResumePreview
