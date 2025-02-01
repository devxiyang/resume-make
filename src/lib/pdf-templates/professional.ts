import { Content, ContentStack, ContentText, ContentColumns } from 'pdfmake/interfaces'
import { PDFTemplate } from './base'
import { ResumeData } from '../types'

export class ProfessionalTemplate extends PDFTemplate {
  constructor(data: ResumeData) {
    super(data)
    
    // 使用专业的配色方案
    this.theme = {
      primary: '#1e3a8a',    // 深蓝色
      secondary: '#475569',  // 商务灰
      accent: '#1d4ed8',     // 亮蓝色
      text: '#1f2937',       // 深灰色文本
      background: '#ffffff',
      divider: '#94a3b8'     // 中灰色分隔线
    }

    // 专业的字体大小
    this.fontSize = {
      name: 28,
      title: 15,
      heading: 13,
      normal: 11,
      small: 10
    }

    // 标准的间距
    this.spacing = {
      section: 18,
      item: 10,
      text: 5
    }

    // 自定义组件样式
    this.components = {
      ...this.components,
      header: (text: string, options: any = {}): ContentStack => ({
        stack: [
          {
            text: text.toUpperCase(),
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
                lineWidth: 0.5,
                lineColor: this.theme.divider
              }
            ]
          }
        ]
      }),

      skillBadge: (text: string): ContentText => ({
        text: `• ${text}`,
        fontSize: this.fontSize.small,
        color: this.theme.text,
        margin: [0, 0, 16, 0]
      })
    }
  }

  protected generatePersonalSection(): Content[] {
    const { personal } = this.data
    return [
      {
        text: personal.name,
        fontSize: this.fontSize.name,
        bold: true,
        color: this.theme.primary,
        alignment: 'center',
        margin: [0, 0, 0, this.spacing.text]
      } as ContentText,
      {
        text: personal.jobTitle,
        fontSize: this.fontSize.title,
        color: this.theme.secondary,
        alignment: 'center',
        margin: [0, 0, 0, this.spacing.text]
      } as ContentText,
      {
        text: [
          personal.email,
          personal.phone,
          personal.address,
          personal.linkedin,
          personal.personalWebsite
        ].filter(Boolean).join(' | '),
        fontSize: this.fontSize.small,
        color: this.theme.text,
        alignment: 'center',
        margin: [0, 0, 0, this.spacing.section]
      } as ContentText
    ]
  }

  protected generateSkillsSection(): Content[] {
    const { skills } = this.data
    if (!skills.length) return []

    return [
      this.components.header('Professional Skills'),
      {
        columns: [
          {
            width: '*',
            stack: skills.slice(0, Math.ceil(skills.length / 2)).map(skill => ({
              text: `• ${skill.name}${skill.description ? `: ${skill.description}` : ''}`,
              fontSize: this.fontSize.normal,
              color: this.theme.text,
              margin: [0, 0, 0, this.spacing.text]
            } as ContentText))
          },
          {
            width: '*',
            stack: skills.slice(Math.ceil(skills.length / 2)).map(skill => ({
              text: `• ${skill.name}${skill.description ? `: ${skill.description}` : ''}`,
              fontSize: this.fontSize.normal,
              color: this.theme.text,
              margin: [0, 0, 0, this.spacing.text]
            } as ContentText))
          }
        ],
        columnGap: 20,
        margin: [0, 0, 0, this.spacing.section]
      } as ContentColumns
    ]
  }
}

export function professionalTemplate(data: ResumeData) {
  return new ProfessionalTemplate(data).generate()
} 