import { Content, ContentStack, ContentText, ContentColumns } from 'pdfmake/interfaces'
import { PDFTemplate } from './base'
import { ResumeData } from '../types'

export class ProfessionalTemplate extends PDFTemplate {
  constructor(data: ResumeData) {
    super(data)
    
    // 商务风格的配色方案
    this.theme = {
      primary: '#1e40af',    // 深蓝色
      secondary: '#475569',  // 商务灰
      accent: '#3b82f6',     // 亮蓝色
      text: '#334155',       // 深灰文本
      textDark: '#0f172a',   // 近黑色
      background: '#ffffff',
      divider: '#cbd5e1'     // 浅灰分隔线
    }

    // 正式的字体大小
    this.fontSize = {
      name: 26,              // 适中的名字大小
      title: 13,             // 职位标题
      heading: 15,           // 段落标题
      normal: 10,            // 正常文本
      small: 9               // 小字体
    }

    // 严谨的间距
    this.spacing = {
      section: 12,           // 段落间距
      item: 6,              // 项目间距
      text: 3               // 文本间距
    }

    // 正式的组件样式
    this.components = {
      ...this.components,
      header: (text: string, options: any = {}): ContentStack => ({
        stack: [
          {
            text: text.toUpperCase(),
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
                x2: 515,
                y2: 0,
                lineWidth: 1,
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
        margin: [0, 1, 8, 1]
      })
    }
  }

  protected generatePersonalSection(): Content[] {
    const { personal } = this.data

    const nameSection = {
      stack: [
        {
          text: personal.name.toUpperCase(),
          fontSize: this.fontSize.name,
          bold: true,
          color: this.theme.primary,
          alignment: 'center',
          margin: [0, 0, 0, this.spacing.text]
        } as ContentText,
        {
          text: personal.jobTitle.toUpperCase(),
          fontSize: this.fontSize.title,
          color: this.theme.secondary,
          alignment: 'center',
          margin: [0, 0, 0, this.spacing.section]
        } as ContentText
      ],
      margin: [0, 0, 0, this.spacing.section]
    } as ContentStack

    const contactInfo = {
      stack: [
        {
          text: [
            { text: 'Email: ', bold: true },
            personal.email,
            '    ',
            { text: 'Tel: ', bold: true },
            personal.phone
          ],
          fontSize: this.fontSize.normal,
          color: this.theme.text,
          alignment: 'center'
        },
        personal.address || personal.personalWebsite ? {
          text: [
            personal.address ? [
              { text: 'Address: ', bold: true },
              personal.address
            ] : [],
            personal.address && personal.personalWebsite ? '    ' : [],
            personal.personalWebsite ? [
              { text: 'Website: ', bold: true },
              personal.personalWebsite
            ] : []
          ],
          fontSize: this.fontSize.normal,
          color: this.theme.text,
          alignment: 'center',
          margin: [0, this.spacing.text, 0, 0]
        } : {}
      ],
      margin: [0, 0, 0, this.spacing.section]
    } as ContentStack

    const summarySection = personal.summary ? {
      stack: [
        {
          text: 'PROFESSIONAL SUMMARY',
          fontSize: this.fontSize.normal,
          bold: true,
          color: this.theme.textDark,
          margin: [0, 0, 0, this.spacing.text]
        } as ContentText,
        {
          text: personal.summary,
          fontSize: this.fontSize.normal,
          color: this.theme.text,
          lineHeight: 1.4,
          margin: [0, 0, 0, this.spacing.section]
        } as ContentText
      ]
    } as ContentStack : []

    return [nameSection, contactInfo, summarySection]
  }

  protected generateExperienceSection(): Content[] {
    const { experiences } = this.data
    if (!experiences?.length) return []

    return [
      this.components.header('Professional Experience'),
      ...experiences.map((exp, index) => ({
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
                    color: this.theme.textDark
                  },
                  {
                    text: exp.position,
                    fontSize: this.fontSize.normal,
                    italics: true,
                    color: this.theme.secondary,
                    margin: [0, this.spacing.text, 0, 0]
                  }
                ]
              },
              {
                width: 'auto',
                text: `${exp.startDate} - ${exp.endDate || 'Present'}`,
                fontSize: this.fontSize.small,
                color: this.theme.secondary,
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
                width: '*',
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
                    italics: true,
                    color: this.theme.secondary,
                    margin: [0, this.spacing.text, 0, 0]
                  }
                ]
              },
              {
                width: 'auto',
                text: `${edu.startDate} - ${edu.endDate}`,
                fontSize: this.fontSize.small,
                color: this.theme.secondary,
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
            text: [
              { text: 'Technologies: ', bold: true },
              project.technologies.join(' • ')
            ],
            fontSize: this.fontSize.small,
            color: this.theme.text,
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
      this.components.header('Skills & Expertise'),
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
                width: '*',
                text: item.title,
                fontSize: this.fontSize.normal,
                bold: true,
                color: this.theme.textDark
              },
              item.date ? {
                width: 'auto',
                text: item.date,
                fontSize: this.fontSize.small,
                color: this.theme.secondary,
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

export function professionalTemplate(data: ResumeData) {
  return new ProfessionalTemplate(data).generate()
} 