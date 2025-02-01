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

// 检测文本是否包含中文字符
function containsChinese(text: string): boolean {
  return /[\u4E00-\u9FFF]/.test(text)
}

// 检测简历数据中是否包含中文
function resumeContainsChinese(data: ResumeData): boolean {
  const { personal, experiences, education, projects, skills, customSections } = data
  
  // 检查个人信息
  if (containsChinese(personal.name) || 
      containsChinese(personal.jobTitle) || 
      containsChinese(personal.summary || '')) {
    return true
  }

  // 检查工作经验
  if (experiences?.some(exp => 
    containsChinese(exp.company) || 
    containsChinese(exp.position) || 
    containsChinese(exp.description) ||
    exp.bulletPoints.some(point => containsChinese(point))
  )) {
    return true
  }

  // 检查教育经历
  if (education?.some(edu => 
    containsChinese(edu.school) || 
    containsChinese(edu.degree) || 
    containsChinese(edu.description)
  )) {
    return true
  }

  // 检查项目经历
  if (projects?.some(proj => 
    containsChinese(proj.name) || 
    containsChinese(proj.description) ||
    (proj.bulletPoints || []).some(point => containsChinese(point))
  )) {
    return true
  }

  // 检查技能
  if (skills?.some(skill => 
    containsChinese(skill.name) || 
    containsChinese(skill.description || '')
  )) {
    return true
  }

  // 检查自定义部分
  if (customSections?.some(section => 
    containsChinese(section.title) || 
    section.items.some(item => 
      containsChinese(item.title) || 
      containsChinese(item.description)
    )
  )) {
    return true
  }

  return false
}

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