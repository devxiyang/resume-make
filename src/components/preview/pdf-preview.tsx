'use client';

import { useEffect, useState } from 'react'
import { ResumeData } from '@/lib/types'
import { getPDFTemplate } from '@/lib/pdf-templates'
import pdfMake from 'pdfmake/build/pdfmake'

// // 辅助函数：将ArrayBuffer转换为Base64字符串
// function arrayBufferToBase64(buffer: ArrayBuffer): string {
//   const binary = new Uint8Array(buffer).reduce(
//     (data, byte) => data + String.fromCharCode(byte),
//     ''
//   );
//   return btoa(binary);
// }

interface PDFPreviewProps {
  resumeData: ResumeData
  templateName?: string
  scale?: number
}

const PDFPreview = ({ resumeData, templateName = 'clean', scale = 1 }: PDFPreviewProps) => {
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

    // 配置中文字体
    pdfMake.fonts = {
      SourceHanSans: {
        normal: '/fonts/SourceHanSansCN-Regular.ttf',
        bold: '/fonts/SourceHanSansCN-Bold.ttf',
        italics: '/fonts/SourceHanSansCN-Regular.ttf',
        bolditalics: '/fonts/SourceHanSansCN-Bold.ttf'
      }
    }

    const generatePDF = async () => {
      try {
        // 获取模板并生成文档定义
        const template = getPDFTemplate(templateName)
        const docDefinition = template(resumeData)

        // 设置默认字体
        docDefinition.defaultStyle = {
          ...docDefinition.defaultStyle,
          font: 'SourceHanSans'
        }

        // 生成PDF
        const pdfDocGenerator = pdfMake.createPdf(docDefinition)
        
        pdfDocGenerator.getDataUrl((dataUrl) => {
          setPdfUrl(dataUrl)
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
  }, [resumeData, templateName, scale])

  if (!resumeData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-gray-500">No resume data available</p>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error}
        </div>
      )}
      {pdfUrl && (
        <>
          <iframe
            src={pdfUrl}
            className="w-full h-[calc(100vh-200px)] border border-gray-200 shadow-lg"
            style={{ minHeight: '600px' }}
          />
          <a 
            href={pdfUrl} 
            download="resume.pdf"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Download PDF
          </a>
        </>
      )}
    </div>
  )
}

export default PDFPreview 