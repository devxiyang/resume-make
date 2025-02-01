import { Content, ContentStack, ContentText, ContentColumns } from 'pdfmake/interfaces'
import { PDFTemplate } from './base'
import { ResumeData, Experience } from '../types'

export class ModernTemplate extends PDFTemplate {
  constructor(data: ResumeData) {
    super(data)
    
    // 现代感的配色方案
    this.theme = {
      primary: '#2563eb',    // 明亮的蓝色
      secondary: '#64748b',  // 优雅的灰色
      accent: '#3b82f6',     // 活力蓝
      text: '#334155',       // 深灰文本
      background: '#ffffff',
      divider: '#e2e8f0'     // 浅色分隔线
    }

    // 现代化的字体大小
    this.fontSize = {
      name: 36,              // 更大的名字尺寸
      title: 18,             // 更突出的职位标题
      heading: 15,           // 清晰的标题
      normal: 11,
      small: 10
    }

    // 优化的间距
    this.spacing = {
      section: 24,           // 更大的段落间距
      item: 14,             // 适中的项目间距
      text: 6
    }

    // 现代化的组件样式
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
                lineWidth: 2,              // 更粗的分隔线
                lineColor: this.theme.accent
              }
            ]
          }
        ]
      }),

      skillBadge: (text: string): ContentText => ({
        text,
        fontSize: this.fontSize.small,
        color: this.theme.accent,
        margin: [0, 2, 12, 2],            // 更大的水平间距
        background: '#f0f9ff'             // 浅蓝色背景
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
                color: this.theme.accent,
                margin: [0, 0, 0, this.spacing.section]
              } as ContentText,
              personal.summary && {
                text: personal.summary,
                fontSize: this.fontSize.normal,
                color: this.theme.text,
                margin: [0, 0, 0, this.spacing.section]
              }
            ].filter(Boolean)
          },
          {
            width: 'auto',
            stack: [
              {
                text: [
                  { text: '✉  ', color: this.theme.primary },
                  { text: personal.email, color: this.theme.text }
                ],
                fontSize: this.fontSize.normal,
                margin: [0, 0, 0, this.spacing.text]
              },
              {
                text: [
                  { text: '📱 ', color: this.theme.primary },
                  { text: personal.phone, color: this.theme.text }
                ],
                fontSize: this.fontSize.normal,
                margin: [0, 0, 0, this.spacing.text]
              },
              personal.linkedin && {
                text: [
                  { text: '🔗 ', color: this.theme.primary },
                  { text: personal.linkedin, color: this.theme.text }
                ],
                fontSize: this.fontSize.normal,
                margin: [0, 0, 0, this.spacing.text]
              },
              personal.personalWebsite && {
                text: [
                  { text: '🌐 ', color: this.theme.primary },
                  { text: personal.personalWebsite, color: this.theme.text }
                ],
                fontSize: this.fontSize.normal,
                margin: [0, 0, 0, this.spacing.text]
              }
            ].filter(Boolean)
          }
        ],
        columnGap: 20,
        margin: [0, 0, 0, this.spacing.section * 1.5]
      } as ContentColumns
    ]
  }

  protected generateExperienceSection(): Content[] {
    const { experiences } = this.data
    if (!experiences?.length) return []

    return [
      this.components.header('Professional Experience'),
      ...experiences.map((exp: Experience, index: number) => ({
        stack: [
          {
            columns: [
              {
                width: '*',
                stack: [
                  {
                    text: exp.company,
                    fontSize: this.fontSize.normal,
                    bold: true,
                    color: this.theme.primary
                  } as ContentText,
                  {
                    text: exp.position,
                    fontSize: this.fontSize.normal,
                    italics: true,
                    color: this.theme.secondary
                  } as ContentText
                ]
              },
              {
                width: 'auto',
                text: `${exp.startDate} - ${exp.endDate || 'Present'}`,
                fontSize: this.fontSize.small,
                color: this.theme.secondary,
                alignment: 'right'
              } as ContentText
            ],
            columnGap: 10
          } as ContentColumns,
          ...exp.bulletPoints.map((point: string) => ({
            text: `• ${point}`,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [0, this.spacing.text, 0, 0]
          }))
        ],
        margin: [0, 0, 0, index < experiences.length - 1 ? this.spacing.item : this.spacing.section]
      } as ContentStack))
    ]
  }

  protected generateSkillsSection(): Content[] {
    const { skills } = this.data
    if (!skills.length) return []

    return [
      this.components.header('Skills & Expertise'),
      {
        columns: [
          {
            width: '*',
            stack: skills.slice(0, Math.ceil(skills.length / 2)).map(skill => ({
              columns: [
                {
                  width: 'auto',
                  text: skill.name,
                  fontSize: this.fontSize.normal,
                  bold: true,
                  color: this.theme.primary,
                  margin: [0, 0, 10, this.spacing.text]
                },
                {
                  width: '*',
                  text: skill.description || '',
                  fontSize: this.fontSize.normal,
                  color: this.theme.text,
                  margin: [0, 0, 0, this.spacing.text]
                }
              ],
              columnGap: 10
            }))
          },
          {
            width: '*',
            stack: skills.slice(Math.ceil(skills.length / 2)).map(skill => ({
              columns: [
                {
                  width: 'auto',
                  text: skill.name,
                  fontSize: this.fontSize.normal,
                  bold: true,
                  color: this.theme.primary,
                  margin: [0, 0, 10, this.spacing.text]
                },
                {
                  width: '*',
                  text: skill.description || '',
                  fontSize: this.fontSize.normal,
                  color: this.theme.text,
                  margin: [0, 0, 0, this.spacing.text]
                }
              ],
              columnGap: 10
            }))
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
