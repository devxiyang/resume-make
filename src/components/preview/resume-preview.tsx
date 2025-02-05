'use client';

import { useEffect, useState } from 'react'
import { ResumeData } from '@/lib/types'
import { getPDFTemplate } from '@/lib/pdf-templates'
import pdfMake from 'pdfmake/build/pdfmake'

// 配置字体
// Try loading NotoSansSC font first
const loadNotoSansSC = async () => {
  try {
    const fontUrl = process.env.NEXT_PUBLIC_BASE_URL + '/fonts/NotoSansSC-normal.ttf';
    const response = await fetch(fontUrl);
    if (!response.ok) throw new Error('Font loading failed');
    
    pdfMake.fonts = {
      Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf', 
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf'
      },
      NotoSansSC: {
        normal: fontUrl,
        bold: fontUrl,
        italics: fontUrl,
        bolditalics: fontUrl
      }
    };
  } catch (err) {
    console.warn('Failed to load NotoSansSC font:', err);
    pdfMake.fonts = {
      Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-MediumItalic.ttf'
      }
    };
  }
};

loadNotoSansSC();

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
            src={pdfUrl + '#view=FitH&toolbar=0&navpanes=0&scrollbar=0'}
            className="w-full h-full"
            style={{
              border: 'none',
              display: 'block',
              backgroundColor: 'transparent',
              margin: 0,
              padding: 0,
              overflow: 'hidden',
              transform: `scale(${scale})`,
              transformOrigin: 'top center'
            }}
          />
        </div>
      )}
    </div>
  )
}

export default ResumePreview
