'use client';

import { useEffect, useState } from 'react'
import { ResumeData } from '@/lib/types'
import { TDocumentDefinitions, Content } from 'pdfmake/interfaces'

// 辅助函数：将ArrayBuffer转换为Base64字符串
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const binary = new Uint8Array(buffer).reduce(
    (data, byte) => data + String.fromCharCode(byte),
    ''
  );
  return btoa(binary);
}

// 导入字体
const pdfFonts = {
  Roboto: {
    normal: '/fonts/Roboto-Regular.ttf',
    bold: '/fonts/Roboto-Medium.ttf',
    italics: '/fonts/Roboto-Italic.ttf',
    bolditalics: '/fonts/Roboto-MediumItalic.ttf'
  },
  // 添加思源黑体 (Noto Sans SC)
  NotoSansSC: {
    normal: '/fonts/NotoSansSC-Regular.ttf',
    bold: '/fonts/NotoSansSC-Bold.ttf',
    italics: '/fonts/NotoSansSC-Regular.ttf',
    bolditalics: '/fonts/NotoSansSC-Bold.ttf'
  }
};

interface PDFPreviewProps {
  resumeData: ResumeData
  scale?: number
}

const PDFPreview = ({ resumeData, scale = 1 }: PDFPreviewProps) => {
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
        // 动态导入pdfmake
        const pdfMake = await import('pdfmake/build/pdfmake')

        // 加载字体
        const loadFonts = async () => {
          const fonts: { [key: string]: string } = {};
          for (const [fontFamily, styles] of Object.entries(pdfFonts)) {
            for (const [style, url] of Object.entries(styles)) {
              const response = await fetch(url);
              const buffer = await response.arrayBuffer();
              const key = style === 'normal' ? fontFamily : `${fontFamily}-${style}`;
              fonts[key] = arrayBufferToBase64(buffer);
            }
          }
          return fonts;
        };

        // 等待字体加载完成
        const fonts = await loadFonts();
        
        // 设置字体
        pdfMake.default.vfs = fonts;
        pdfMake.default.fonts = {
          Roboto: {
            normal: 'Roboto',
            bold: 'Roboto-bold',
            italics: 'Roboto-italics',
            bolditalics: 'Roboto-bolditalics'
          },
          NotoSansSC: {
            normal: 'NotoSansSC',
            bold: 'NotoSansSC-bold',
            italics: 'NotoSansSC-italics',
            bolditalics: 'NotoSansSC-bolditalics'
          }
        };

        const { personal, experiences, education, skills } = resumeData

        // 创建文档定义
        const docDefinition: TDocumentDefinitions = {
          content: [
            // 个人信息
            {
              text: personal.name,
              fontSize: 24,
              bold: true,
              margin: [0, 0, 0, 5],
              font: 'NotoSansSC'  // 使用中文字体
            },
            {
              text: personal.jobTitle,
              fontSize: 14,
              margin: [0, 0, 0, 5],
              font: 'NotoSansSC'  // 使用中文字体
            },
            {
              text: [
                personal.email,
                personal.phone,
                personal.address,
                personal.linkedin,
                personal.personalWebsite
              ].filter(Boolean).join(' • '),
              fontSize: 10,
              margin: [0, 0, 0, 15]
            },

            // 概要
            ...(personal.summary ? [
              {
                text: 'Summary',
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 5]
              },
              {
                text: personal.summary,
                fontSize: 10,
                margin: [0, 0, 0, 15],
                font: 'NotoSansSC'  // 使用中文字体
              }
            ] : []),

            // 工作经验
            ...(experiences.length > 0 ? [
              {
                text: 'Experience',
                fontSize: 12,
                bold: true,
                margin: [0, 0, 0, 10]
              },
              ...experiences.map(exp => [
                {
                  columns: [
                    {
                      text: exp.company,
                      bold: true,
                      fontSize: 11,
                      font: 'NotoSansSC'  // 使用中文字体
                    },
                    {
                      text: `${exp.startDate} - ${exp.currentlyWork ? 'Present' : exp.endDate}`,
                      fontSize: 10,
                      alignment: 'right'
                    }
                  ],
                  margin: [0, 5, 0, 0]
                },
                {
                  text: exp.position,
                  fontSize: 10,
                  italics: true,
                  margin: [0, 3, 0, 3],
                  font: 'NotoSansSC'  // 使用中文字体
                },
                ...exp.bulletPoints.map(point => ({
                  text: `• ${point}`,
                  fontSize: 10,
                  margin: [10, 2, 0, 0],
                  font: 'NotoSansSC'  // 使用中文字体
                })),
                { text: '', margin: [0, 5, 0, 0] }
              ]).flat()
            ] : []),

            // 教育经历
            ...(education.length > 0 ? [
              {
                text: 'Education',
                fontSize: 12,
                bold: true,
                margin: [0, 10, 0, 10]
              },
              ...education.map(edu => [
                {
                  columns: [
                    {
                      text: edu.school,
                      bold: true,
                      fontSize: 11,
                      font: 'NotoSansSC'  // 使用中文字体
                    },
                    {
                      text: `${edu.startDate} - ${edu.endDate}`,
                      fontSize: 10,
                      alignment: 'right'
                    }
                  ],
                  margin: [0, 5, 0, 0]
                },
                {
                  text: edu.degree,
                  fontSize: 10,
                  margin: [0, 3, 0, 3],
                  font: 'NotoSansSC'  // 使用中文字体
                },
                ...(edu.description ? [{
                  text: edu.description,
                  fontSize: 10,
                  margin: [0, 3, 0, 5],
                  font: 'NotoSansSC'  // 使用中文字体
                }] : [])
              ]).flat()
            ] : []),

            // 技能
            ...(skills.length > 0 ? [
              {
                text: 'Skills',
                fontSize: 12,
                bold: true,
                margin: [0, 10, 0, 5]
              },
              {
                text: skills.map(skill => skill.name).join(' • '),
                fontSize: 10,
                margin: [0, 0, 0, 10],
                font: 'NotoSansSC'  // 使用中文字体
              }
            ] : [])
          ] as Content[],
          defaultStyle: {
            font: 'Roboto'  // 使用Roboto作为默认字体，对于中文内容单独指定NotoSansSC
          },
          pageMargins: [40, 40, 40, 40]
        }

        // 生成PDF
        const pdfDoc = pdfMake.default.createPdf(docDefinition)
        
        // 获取PDF blob
        pdfDoc.getBlob((blob: Blob) => {
          const blobUrl = URL.createObjectURL(blob)
          setPdfUrl(blobUrl)
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
  }, [resumeData, scale])

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