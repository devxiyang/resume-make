import { Content, ContentStack, ContentText, ContentColumns } from 'pdfmake/interfaces'
import { PDFTemplate } from './base'
import { ResumeData } from '../types'

export class CleanTemplate extends PDFTemplate {
  constructor(data: ResumeData) {
    super(data)
    
    // 清新简约的配色方案
    this.theme = {
      primary: '#0891b2',    // 清新的青色
      secondary: '#64748b',  // 柔和的灰色
      accent: '#0ea5e9',     // 明亮的蓝色
      text: '#334155',       // 深灰文本
      textDark: '#1e293b',   // 更深的灰色
      background: '#ffffff',
      divider: '#e2e8f0'     // 浅色分隔线
    }

    // 简约的字体大小
    this.fontSize = {
      name: 28,              // 更大的名字尺寸
      title: 14,             // 适中的职位标题
      heading: 16,           // 较大的标题
      normal: 10,            // 正常文本
      small: 9               // 小字体
    }

    // 宽松的间距
    this.spacing = {
      section: 12,           // 较大的段落间距
      item: 6,              // 适中的项目间距
      text: 3               // 较大的文本间距
    }

    // 简约的组件样式
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
          } as ContentText
        ]
      })
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
        color: this.theme.secondary,
        margin: [0, 0, 0, this.spacing.section] as [number, number, number, number]
      } as ContentText,
      personal.summary ? {
        text: personal.summary,
        fontSize: this.fontSize.normal,
        color: this.theme.text,
        margin: [0, 0, 0, this.spacing.section] as [number, number, number, number]
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
          margin: [20, 0, 0, 0]
        }
      ]
    } as ContentColumns]
  }

  protected generateExperienceSection(): Content[] {
    const { experiences } = this.data
    if (!experiences?.length) return []

    return [
      this.components.header('Experience'),
      ...experiences.map((exp, index) => ({
        stack: [
          ...this.components.titleDescriptionItem(
            exp.company,
            exp.position,
            {
              date: `${exp.startDate} - ${exp.endDate || 'Present'}`,
              margin: [0, 0, 0, this.spacing.text] as [number, number, number, number],
              color: this.theme.textDark
            }
          ),
          ...exp.bulletPoints.map((point: string) => ({
            text: `• ${point}`,
            fontSize: this.fontSize.normal,
            color: this.theme.text,
            margin: [10, 1, 0, 0] as [number, number, number, number]
          }))
        ],
        margin: [0, 0, 0, index < experiences.length - 1 ? this.spacing.item : this.spacing.section] as [number, number, number, number]
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
            text: project.technologies.join(' • '),
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

  protected generateSkillsSection(): Content[] {
    const { skills } = this.data
    if (!skills.length) return []

    return [
      this.components.header('Skills'),
      ...skills.map(skill => ({
        columns: [
          {
            width: 'auto',
            text: skill.name,
            fontSize: this.fontSize.normal,
            bold: true,
            color: this.theme.secondary
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
            color: this.theme.textDark
          }
        )
      )
    ])
  }
}

export function cleanTemplate(data: ResumeData) {
  return new CleanTemplate(data).generate()
}    
