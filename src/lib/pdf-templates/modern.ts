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
      textDark: '#1e293b',   // 更深的灰色，用于重要文本
      background: '#ffffff',
      divider: '#e2e8f0'     // 浅色分隔线
    }

    // 现代化的字体大小
    this.fontSize = {
      name: 24,              // 减小名字尺寸到原来的60%左右
      title: 12,             // 减小职位标题到原来的60%左右
      heading: 13,           // 保持标题大小
      normal: 10,            // 保持正文字体
      small: 9               // 保持小字体
    }

    // 优化的间距
    this.spacing = {
      section: 6,            // 进一步减小段落间距
      item: 4,              // 进一步减小项目间距
      text: 2               // 保持小的文本间距
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
            lineHeight: 1,                          // 添加最小行高
            margin: [0, this.spacing.section, 0, 0]  // 使用负边距拉近与分割线的距离
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
            ],
            margin: [0, 0, 0, this.spacing.item]    // 增加分割线与内容之间的距离
          }
        ]
      }),

      skillBadge: (text: string): ContentText => ({
        text,
        fontSize: this.fontSize.small,
        color: this.theme.accent,
        margin: [0, 1, 8, 1],                       // 减小垂直间距
        background: '#f0f9ff'
      }),

      twoColumnLayout: (leftContent: Content[], rightContent: Content[]): ContentColumns => ({
        columns: [
          {
            width: '60%',  // 左侧内容占60%
            stack: leftContent
          },
          {
            width: '40%',  // 右侧内容占40%
            stack: rightContent
          }
        ],
        columnGap: 20
      }),

      titleDateRow: (title: string, date?: string, options: any = {}): ContentColumns => ({
        columns: [
          {
            width: '*',
            text: title,
            fontSize: this.fontSize.normal,
            bold: true,
            color: options.color || this.theme.secondary  // 允许自定义颜色
          } as ContentText,
          date ? {
            width: 'auto',
            text: date,
            fontSize: this.fontSize.small,
            color: this.theme.secondary,
            alignment: 'right'
          } as ContentText : []
        ],
        columnGap: 10
      }),

      titleDescriptionItem: (title: string, description?: string, options: any = {}): Content[] => {
        const items: Content[] = [
          this.components.titleDateRow(title, options.date, options)
        ]

        if (description) {
          items.push({
            text: description,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: options.margin || [0, this.spacing.text, 0, this.spacing.item] as [number, number, number, number]
          } as ContentText)
        }

        return items
      }
    }
  }

  protected generatePersonalSection(): Content[] {
    const { personal } = this.data

    const leftContent = [
      {
        text: personal.name,
        fontSize: this.fontSize.name,
        bold: true,
        color: this.theme.primary,
        margin: [0, 0, 0, this.spacing.text] as [number, number, number, number]
      } as ContentText,
      {
        text: personal.jobTitle,
        fontSize: this.fontSize.title,
        color: this.theme.accent,
        margin: [0, 0, 0, this.spacing.text] as [number, number, number, number]
      } as ContentText,
      personal.summary ? {
        text: personal.summary,
        fontSize: this.fontSize.normal,
        color: this.theme.text,
        lineHeight: 1.2,
        margin: [0, this.spacing.section, 0, 0] as [number, number, number, number]
      } as ContentText : []
    ]

    const rightContent = [
      {
        columns: [
          { text: 'Email:', width: 40, color: this.theme.text, fontSize: this.fontSize.normal },
          { text: personal.email, color: this.theme.text, fontSize: this.fontSize.normal }
        ],
        margin: [0, 0, 0, this.spacing.text]
      },
      {
        columns: [
          { text: 'Tel:', width: 40, color: this.theme.text, fontSize: this.fontSize.normal },
          { text: personal.phone, color: this.theme.text, fontSize: this.fontSize.normal }
        ],
        margin: [0, 0, 0, this.spacing.text]
      },
      personal.address ? {
        columns: [
          { text: 'Addr:', width: 40, color: this.theme.text, fontSize: this.fontSize.normal },
          { text: personal.address, color: this.theme.text, fontSize: this.fontSize.normal }
        ],
        margin: [0, 0, 0, this.spacing.text]
      } : [],
      personal.personalWebsite ? {
        columns: [
          { text: 'Web:', width: 40, color: this.theme.text, fontSize: this.fontSize.normal },
          { text: personal.personalWebsite, color: this.theme.text, fontSize: this.fontSize.normal }
        ],
        margin: [0, 0, 0, this.spacing.text]
      } : []
    ]

    return [{
      columns: [
        {
          width: '*',
          stack: leftContent
        },
        {
          width: 'auto',
          stack: rightContent,
          margin: [20, 0, 0, 0]  // 添加左边距代替 columnGap
        }
      ]
    } as ContentColumns]
  }

  protected generateExperienceSection(): Content[] {
    const { experiences } = this.data
    if (!experiences?.length) return []

    return [
      this.components.header('Professional Experience'),
      ...experiences.map((exp: Experience, index: number) => ({
        stack: [
          ...this.components.titleDescriptionItem(
            exp.company,
            exp.position,
            {
              date: `${exp.startDate} - ${exp.endDate || 'Present'}`,
              margin: [0, 0, 0, this.spacing.text] as [number, number, number, number],
              color: this.theme.textDark  // 公司名称使用更深的颜色
            }
          ),
          ...exp.bulletPoints.map((point: string) => ({
            text: `• ${point}`,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [10, 1, 0, 0] as [number, number, number, number]  // 减小项目点之间的间距
          }))
        ],
        margin: [0, 0, 0, index < experiences.length - 1 ? this.spacing.item : this.spacing.section] as [number, number, number, number]
      } as ContentStack))
    ]
  }

  protected generateSkillsSection(): Content[] {
    const { skills } = this.data
    if (!skills.length) return []

    return [
      this.components.header('Skills & Expertise'),
      ...skills.map(skill => ({
        columns: [
          {
            width: 'auto',
            text: skill.name,
            fontSize: this.fontSize.normal,
            bold: true,
            color: this.theme.secondary  // 技能名称使用次要色
          },
          {
            width: '*',
            text: skill.description || '',
            fontSize: this.fontSize.normal,
            color: this.theme.text
          }
        ],
        columnGap: 8,
        margin: [0, 0, 0, this.spacing.text]
      } as ContentColumns))
    ]
  }

  protected generateCustomSections(): Content[] {
    const { customSections } = this.data
    if (!customSections?.length) return []

    return customSections.flatMap(section => [
      this.components.header(section.title),
      ...section.items.flatMap((item, index) =>
        this.components.titleDescriptionItem(
          item.title,
          item.description,
          {
            date: item.date,
            margin: [0, 0, 0, index < section.items.length - 1 ? this.spacing.item : 0] as [number, number, number, number],
            color: this.theme.textDark  // 自定义部分标题使用更深的颜色
          }
        )
      )
    ])
  }

  public generate() {
    return {
      content: [
        ...this.generatePersonalSection(),
        ...this.generateExperienceSection(),
        ...this.generateEducationSection(),
        ...this.generateProjectsSection(),
        ...this.generateSkillsSection(),
        ...this.generateCustomSections()
      ],
      defaultStyle: {
        font: 'NotoSansSC'
      },
      fonts: {
        NotoSansSC: {
          normal: process.env.NEXT_PUBLIC_BASE_URL + '/fonts/NotoSansSC-normal.ttf',
          bold: process.env.NEXT_PUBLIC_BASE_URL + '/fonts/NotoSansSC-normal.ttf',
          italics: process.env.NEXT_PUBLIC_BASE_URL + '/fonts/NotoSansSC-normal.ttf',
          bolditalics: process.env.NEXT_PUBLIC_BASE_URL + '/fonts/NotoSansSC-normal.ttf'
        }
      }
    }
  }

  protected generateEducationSection(): Content[] {
    const { education } = this.data
    if (!education?.length) return []

    return [
      this.components.header('Education'),
      ...education.map((edu, index) => ({
        stack: [
          ...this.components.titleDescriptionItem(
            edu.school,
            edu.degree,
            {
              date: `${edu.startDate} - ${edu.endDate}`,
              margin: [0, 0, 0, this.spacing.text] as [number, number, number, number],
              color: this.theme.textDark
            }
          ),
          edu.description ? {
            text: edu.description,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [0, 0, 0, this.spacing.text] as [number, number, number, number]
          } : []
        ],
        margin: [0, 0, 0, index < education.length - 1 ? this.spacing.item : this.spacing.section] as [number, number, number, number]
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
          ...this.components.titleDescriptionItem(
            project.name,
            project.description,
            {
              margin: [0, 0, 0, this.spacing.text] as [number, number, number, number],
              color: this.theme.textDark
            }
          ),
          project.technologies ? {
            text: project.technologies.join(', '),
            fontSize: this.fontSize.normal,
            color: this.theme.secondary,
            margin: [0, 0, 0, this.spacing.text] as [number, number, number, number]
          } : [],
          ...(project.bulletPoints || []).map((point: string) => ({
            text: `• ${point}`,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [10, 1, 0, 0] as [number, number, number, number]
          }))
        ],
        margin: [0, 0, 0, index < projects.length - 1 ? this.spacing.item : this.spacing.section] as [number, number, number, number]
      } as ContentStack))
    ]
  }
}

export function modernTemplate(data: ResumeData) {
  return new ModernTemplate(data).generate()
} 
