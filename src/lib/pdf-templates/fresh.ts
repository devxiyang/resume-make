import { Content, ContentStack, ContentText, ContentColumns } from 'pdfmake/interfaces'
import { PDFTemplate } from './base'
import { ResumeData } from '../types'

export class FreshTemplate extends PDFTemplate {
  constructor(data: ResumeData) {
    super(data)
    
    // 现代感的配色方案
    this.theme = {
      primary: '#8b5cf6',    // 活力紫色
      secondary: '#6b7280',  // 中性灰色
      accent: '#a78bfa',     // 浅紫色
      text: '#374151',       // 深灰文本
      textDark: '#111827',   // 近黑色
      background: '#ffffff',
      divider: '#e5e7eb'     // 浅灰分隔线
    }

    // 现代的字体大小
    this.fontSize = {
      name: 32,              // 大号名字
      title: 14,             // 职位标题
      heading: 18,           // 大标题
      normal: 10,            // 正常文本
      small: 9               // 小字体
    }

    // 现代的间距
    this.spacing = {
      section: 15,           // 较大的段落间距
      item: 8,              // 项目间距
      text: 4               // 文本间距
    }

    // 现代的组件样式
    this.components = {
      ...this.components,
      header: (text: string, options: any = {}): ContentStack => ({
        stack: [
          {
            text,
            fontSize: this.fontSize.heading,
            bold: true,
            color: this.theme.primary,
            margin: [0, this.spacing.section, 0, this.spacing.item]
          } as ContentText,
          {
            canvas: [
              {
                type: 'line',
                x1: 0,
                y1: 0,
                x2: 40,
                y2: 0,
                lineWidth: 3,
                lineColor: this.theme.accent
              }
            ],
            margin: [0, 0, 0, this.spacing.item]
          }
        ]
      }),

      skillBadge: (text: string): ContentText => ({
        text: `[ ${text} ]`,
        fontSize: this.fontSize.small,
        color: this.theme.primary,
        margin: [0, 2, 10, 2]
      })
    }
  }

  protected generatePersonalSection(): Content[] {
    const { personal } = this.data

    const nameSection = {
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
          margin: [0, 0, 0, this.spacing.section]
        } as ContentText
      ],
      margin: [0, 0, 0, this.spacing.section]
    } as ContentStack

    const contactInfo = [
      {
        columns: [
          { text: 'Email:', width: 45, color: this.theme.textDark, bold: true, fontSize: this.fontSize.normal },
          { text: personal.email, color: this.theme.text, fontSize: this.fontSize.normal }
        ],
        margin: [0, 0, 0, this.spacing.text]
      },
      {
        columns: [
          { text: 'Tel:', width: 45, color: this.theme.textDark, bold: true, fontSize: this.fontSize.normal },
          { text: personal.phone, color: this.theme.text, fontSize: this.fontSize.normal }
        ],
        margin: [0, 0, 0, this.spacing.text]
      }
    ]

    if (personal.address) {
      contactInfo.push({
        columns: [
          { text: 'Addr:', width: 45, color: this.theme.textDark, bold: true, fontSize: this.fontSize.normal },
          { text: personal.address, color: this.theme.text, fontSize: this.fontSize.normal }
        ],
        margin: [0, 0, 0, this.spacing.text]
      })
    }

    if (personal.personalWebsite) {
      contactInfo.push({
        columns: [
          { text: 'Web:', width: 45, color: this.theme.textDark, bold: true, fontSize: this.fontSize.normal },
          { text: personal.personalWebsite, color: this.theme.text, fontSize: this.fontSize.normal }
        ],
        margin: [0, 0, 0, this.spacing.text]
      })
    }

    const summarySection = personal.summary ? {
      stack: [
        {
          text: 'Summary',
          fontSize: this.fontSize.normal,
          bold: true,
          color: this.theme.textDark,
          margin: [0, this.spacing.item, 0, this.spacing.text]
        } as ContentText,
        {
          text: personal.summary,
          fontSize: this.fontSize.normal,
          color: this.theme.text,
          lineHeight: 1.4
        } as ContentText
      ],
      margin: [0, 0, 0, this.spacing.section]
    } as ContentStack : []

    return [
      nameSection,
      {
        columns: [
          {
            width: '*',
            stack: [summarySection]
          },
          {
            width: 'auto',
            stack: contactInfo,
            margin: [20, 0, 0, 0]
          }
        ]
      } as ContentColumns
    ]
  }

  protected generateExperienceSection(): Content[] {
    const { experiences } = this.data
    if (!experiences?.length) return []

    return [
      this.components.header('Experience'),
      ...experiences.map((exp, index) => ({
        stack: [
          {
            columns: [
              {
                stack: [
                  {
                    text: exp.company,
                    fontSize: this.fontSize.normal,
                    bold: true,
                    color: this.theme.textDark
                  },
                  {
                    text: exp.position,
                    fontSize: this.fontSize.normal,
                    color: this.theme.secondary,
                    margin: [0, this.spacing.text, 0, 0]
                  }
                ]
              },
              {
                text: `${exp.startDate} - ${exp.endDate || 'Present'}`,
                fontSize: this.fontSize.small,
                color: this.theme.accent,
                alignment: 'right'
              }
            ],
            columnGap: 10,
            margin: [0, 0, 0, this.spacing.text]
          } as ContentColumns,
          ...exp.bulletPoints.map((point: string) => ({
            text: `• ${point}`,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [10, 1, 0, 0]
          }))
        ],
        margin: [0, 0, 0, index < experiences.length - 1 ? this.spacing.item : 0]
      } as ContentStack))
    ]
  }

  protected generateEducationSection(): Content[] {
    const { education } = this.data
    if (!education?.length) return []

    return [
      this.components.header('Education'),
      ...education.map((edu, index) => ({
        stack: [
          {
            columns: [
              {
                stack: [
                  {
                    text: edu.school,
                    fontSize: this.fontSize.normal,
                    bold: true,
                    color: this.theme.textDark
                  },
                  {
                    text: edu.degree,
                    fontSize: this.fontSize.normal,
                    color: this.theme.secondary,
                    margin: [0, this.spacing.text, 0, 0]
                  }
                ]
              },
              {
                text: `${edu.startDate} - ${edu.endDate}`,
                fontSize: this.fontSize.small,
                color: this.theme.accent,
                alignment: 'right'
              }
            ],
            columnGap: 10,
            margin: [0, 0, 0, this.spacing.text]
          } as ContentColumns,
          edu.description ? {
            text: edu.description,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [0, 0, 0, this.spacing.text]
          } : []
        ],
        margin: [0, 0, 0, index < education.length - 1 ? this.spacing.item : 0]
      } as ContentStack))
    ]
  }

  protected generateProjectsSection(): Content[] {
    const { projects } = this.data
    if (!projects?.length) return []

    return [
      this.components.header('Projects'),
      ...projects.map((project, index) => ({
        stack: [
          {
            text: project.name,
            fontSize: this.fontSize.normal,
            bold: true,
            color: this.theme.textDark,
            margin: [0, 0, 0, this.spacing.text]
          } as ContentText,
          project.description ? {
            text: project.description,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [0, 0, 0, this.spacing.text]
          } : [],
          project.technologies ? {
            stack: [
              {
                text: 'Technologies:',
                fontSize: this.fontSize.small,
                bold: true,
                color: this.theme.secondary,
                margin: [0, 0, 0, this.spacing.text]
              },
              {
                columns: project.technologies.map(tech => ({
                  text: tech,
                  fontSize: this.fontSize.small,
                  color: this.theme.primary,
                  margin: [0, 0, 10, 0]
                }))
              }
            ],
            margin: [0, 0, 0, this.spacing.text]
          } : [],
          ...(project.bulletPoints || []).map((point: string) => ({
            text: `• ${point}`,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [10, 1, 0, 0]
          }))
        ],
        margin: [0, 0, 0, index < projects.length - 1 ? this.spacing.item : 0]
      } as ContentStack))
    ]
  }

  protected generateSkillsSection(): Content[] {
    const { skills } = this.data
    if (!skills.length) return []

    return [
      this.components.header('Skills'),
      ...skills.map((skill, index) => ({
        stack: [
          {
            text: skill.name,
            fontSize: this.fontSize.normal,
            bold: true,
            color: this.theme.textDark,
            margin: [0, 0, 0, this.spacing.text]
          } as ContentText,
          {
            text: skill.description || '',
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [0, 0, 0, index < skills.length - 1 ? this.spacing.item : 0]
          } as ContentText
        ]
      } as ContentStack))
    ]
  }

  protected generateCustomSections(): Content[] {
    const { customSections } = this.data
    if (!customSections?.length) return []

    return customSections.flatMap(section => [
      this.components.header(section.title),
      ...section.items.map((item, index) => ({
        stack: [
          {
            columns: [
              {
                text: item.title,
                fontSize: this.fontSize.normal,
                bold: true,
                color: this.theme.textDark
              },
              item.date ? {
                text: item.date,
                fontSize: this.fontSize.small,
                color: this.theme.accent,
                alignment: 'right'
              } : []
            ],
            columnGap: 10,
            margin: [0, 0, 0, this.spacing.text]
          } as ContentColumns,
          item.description ? {
            text: item.description,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [0, 0, 0, index < section.items.length - 1 ? this.spacing.item : 0]
          } : []
        ]
      } as ContentStack))
    ])
  }
}

export function freshTemplate(data: ResumeData) {
  return new FreshTemplate(data).generate()
} 