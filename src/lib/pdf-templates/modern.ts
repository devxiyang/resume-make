import { Content, ContentStack, ContentText, ContentColumns } from 'pdfmake/interfaces'
import { PDFTemplate } from './base'
import { ResumeData } from '../types'

export class ModernTemplate extends PDFTemplate {
  constructor(data: ResumeData) {
    super(data)
    
    // 覆盖基础主题 - 使用更现代的配色
    this.theme = {
      primary: '#3b82f6',    // 明亮的蓝色
      secondary: '#64748b',  // 柔和的灰色
      accent: '#6366f1',     // 靛蓝色
      text: '#334155',       // 深灰色
      background: '#ffffff',
      divider: '#e2e8f0'
    }

    // 调整字体大小 - 更大更现代的尺寸
    this.fontSize = {
      name: 36,        // 更大的名字
      title: 20,       // 更大的标题
      heading: 18,     // 更大的段落标题
      normal: 12,
      small: 11
    }

    // 调整间距 - 更宽松的布局
    this.spacing = {
      section: 30,     // 更大的段落间距
      item: 15,
      text: 8
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
            color: this.theme.accent,  // 使用靛蓝色
            margin: [0, this.spacing.section, 0, this.spacing.text]
          } as ContentText,
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 40,  // 短线条
                y2: 0,
                lineWidth: 4,  // 更粗的线条
                lineColor: this.theme.primary
              }
            ]
          }
        ]
      }),

      skillBadge: (text: string): ContentText => ({
        text,
        fontSize: this.fontSize.small,
        color: this.theme.background,
        background: this.theme.primary,  // 添加背景色
        margin: [0, 2, 8, 2]
      })
    }
  }

  protected generateSkillsSection(): Content[] {
    const { skills } = this.data
    if (!skills.length) return []

    return [
      this.components.header('Skills'),
      {
        columns: [
          {
            stack: skills.slice(0, Math.ceil(skills.length / 2)).map(skill => ({
              text: `• ${skill.name}`,
              fontSize: this.fontSize.normal,
              color: this.theme.text,
              margin: [0, 0, 0, this.spacing.text]
            } as ContentText))
          },
          {
            stack: skills.slice(Math.ceil(skills.length / 2)).map(skill => ({
              text: `• ${skill.name}`,
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

export function modernTemplate(data: ResumeData) {
  return new ModernTemplate(data).generate()
} 
