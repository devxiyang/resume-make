import { Content, ContentStack, ContentText, ContentColumns } from 'pdfmake/interfaces'
import { PDFTemplate } from './base'
import { ResumeData } from '../types'

export class FreshTemplate extends PDFTemplate {
  constructor(data: ResumeData) {
    super(data)
    
    // 使用清新的配色方案
    this.theme = {
      primary: '#10b981',    // 清新的绿色
      secondary: '#6b7280',  // 中性灰色
      accent: '#34d399',     // 浅绿色
      text: '#374151',       // 深灰色文本
      background: '#ffffff',
      divider: '#e5e7eb'     // 浅灰色分隔线
    }

    // 现代化的字体大小
    this.fontSize = {
      name: 32,
      title: 16,
      heading: 14,
      normal: 11,
      small: 10
    }

    // 适中的间距
    this.spacing = {
      section: 20,
      item: 12,
      text: 6
    }

    // 自定义组件样式
    this.components = {
      ...this.components,
      header: (text: string, options: any = {}): ContentStack => ({
        stack: [
          {
            text,
            fontSize: this.fontSize.heading,
            bold: true,
            color: this.theme.primary,
            margin: [0, this.spacing.section, 0, this.spacing.text]
          } as ContentText,
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 515,
                y2: 0,
                lineWidth: 1,
                lineColor: this.theme.accent
              }
            ]
          }
        ]
      }),

      skillBadge: (text: string): ContentText => ({
        text,
        fontSize: this.fontSize.small,
        color: this.theme.primary,
        margin: [0, 2, 8, 2]
      })
    }
  }

  protected generatePersonalSection(): Content[] {
    const { personal } = this.data
    return [
      {
        columns: [
          {
            width: '*',
            stack: [
              {
                text: personal.name,
                fontSize: this.fontSize.name,
                bold: true,
                color: this.theme.primary,
                margin: [0, 0, 0, this.spacing.text]
              } as ContentText,
              {
                text: personal.jobTitle,
                fontSize: this.fontSize.title,
                color: this.theme.secondary,
                margin: [0, 0, 0, this.spacing.text]
              } as ContentText
            ]
          },
          {
            width: 'auto',
            stack: [
              {
                text: [
                  { text: '✉ ', color: this.theme.primary },
                  personal.email
                ],
                fontSize: this.fontSize.small,
                margin: [0, 0, 0, this.spacing.text]
              },
              {
                text: [
                  { text: '☏ ', color: this.theme.primary },
                  personal.phone
                ],
                fontSize: this.fontSize.small,
                margin: [0, 0, 0, this.spacing.text]
              },
              personal.linkedin && {
                text: [
                  { text: '⌲ ', color: this.theme.primary },
                  personal.linkedin
                ],
                fontSize: this.fontSize.small,
                margin: [0, 0, 0, this.spacing.text]
              }
            ].filter(Boolean)
          }
        ],
        columnGap: 10,
        margin: [0, 0, 0, this.spacing.section]
      } as ContentColumns
    ]
  }
}

export function freshTemplate(data: ResumeData) {
  return new FreshTemplate(data).generate()
} 