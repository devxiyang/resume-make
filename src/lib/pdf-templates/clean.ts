import { PDFTemplate } from './base'
import { ResumeData } from '../types'
import { ContentText, ContentStack } from 'pdfmake/interfaces'

export class CleanTemplate extends PDFTemplate {
  constructor(data: ResumeData) {
    super(data)
    
    // 覆盖基础主题 - 使用更简洁的黑白配色
    this.theme = {
      primary: '#000000',    // 纯黑色
      secondary: '#666666',  // 中灰色
      accent: '#000000',     // 强调色也用黑色
      text: '#333333',       // 深灰色文本
      background: '#ffffff',
      divider: '#cccccc'     // 浅灰色分隔线
    }

    // 调整字体大小 - 更小更紧凑的尺寸
    this.fontSize = {
      name: 24,        // 较小的名字
      title: 14,       // 较小的标题
      heading: 12,     // 较小的段落标题
      normal: 10,
      small: 9
    }

    // 调整间距 - 更紧凑的布局
    this.spacing = {
      section: 15,     // 较小的段落间距
      item: 8,
      text: 4
    }

    // 自定义组件样式
    this.components = {
      ...this.components,
      header: (text: string, options: any = {}): ContentStack => ({
        stack: [
          {
            text: text.toUpperCase(),  // 全大写
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
                x2: 515,  // 全宽线条
                y2: 0,
                lineWidth: 0.5,  // 更细的线条
                lineColor: this.theme.divider
              }
            ]
          }
        ]
      }),

      skillBadge: (text: string): ContentText => ({
        text,
        fontSize: this.fontSize.small,
        color: this.theme.text,
        margin: [0, 0, 4, 0]  // 更小的边距
      })
    }
  }
}

export function cleanTemplate(data: ResumeData) {
  return new CleanTemplate(data).generate()
}    
