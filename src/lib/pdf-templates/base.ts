import { Content, TDocumentDefinitions, ContentText, ContentColumns, ContentStack } from 'pdfmake/interfaces'
import { ResumeData } from '../types'

export interface Theme {
  primary: string
  secondary: string
  accent: string
  text: string
  background: string
  divider: string
}

export interface FontSize {
  name: number
  title: number
  heading: number
  normal: number
  small: number
}

export interface Spacing {
  section: number
  item: number
  text: number
}

export interface Components {
  header: (text: string, options?: any) => ContentStack
  divider: () => ContentStack
  skillBadge: (text: string) => ContentText
  timelineItem: (title: string, subtitle: string, date: string, description?: string) => Content[]
}

export class PDFTemplate {
  protected theme: Theme = {
    primary: '#2563eb',
    secondary: '#475569',
    accent: '#3b82f6',
    text: '#1f2937',
    background: '#ffffff',
    divider: '#e2e8f0'
  }

  protected fontSize: FontSize = {
    name: 24,
    title: 14,
    heading: 12,
    normal: 10,
    small: 9
  }

  protected spacing: Spacing = {
    section: 15,
    item: 10,
    text: 5
  }

  protected components: Components = {
    header: (text: string, options: any = {}): ContentStack => ({
      stack: [
        {
          text,
          fontSize: this.fontSize.heading,
          bold: true,
          color: this.theme.primary,
          margin: [0, this.spacing.section, 0, this.spacing.item],
          ...options
        }
      ]
    }),

    divider: (): ContentStack => ({
      stack: [
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
      ],
      margin: [0, this.spacing.item, 0, this.spacing.item]
    }),

    skillBadge: (text: string): ContentText => ({
      text,
      fontSize: this.fontSize.small,
      color: this.theme.text,
      fillColor: this.theme.background,
      margin: [0, 2, 4, 2]
    }),

    timelineItem: (title: string, subtitle: string, date: string, description?: string): Content[] => {
      const items: Content[] = [
        {
          columns: [
            {
              text: title,
              bold: true,
              fontSize: this.fontSize.normal,
              color: this.theme.text
            } as ContentText,
            {
              text: date,
              fontSize: this.fontSize.small,
              color: this.theme.secondary,
              alignment: 'right'
            } as ContentText
          ]
        } as ContentColumns,
        {
          text: subtitle,
          italics: true,
          color: this.theme.secondary,
          fontSize: this.fontSize.normal,
          margin: [0, 0, 0, description ? this.spacing.text : this.spacing.item]
        } as ContentText
      ]

      if (description) {
        items.push({
          text: description,
          fontSize: this.fontSize.normal,
          color: this.theme.text,
          margin: [0, 0, 0, this.spacing.item]
        } as ContentText)
      }

      return items
    }
  }

  constructor(protected data: ResumeData) {}

  protected generatePersonalSection(): Content[] {
    const { personal } = this.data
    return [
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
      } as ContentText,
      {
        text: [
          personal.email,
          personal.phone,
          personal.address,
          personal.linkedin,
          personal.personalWebsite
        ].filter(Boolean).join(' • '),
        fontSize: this.fontSize.small,
        color: this.theme.text,
        margin: [0, 0, 0, this.spacing.section]
      } as ContentText
    ]
  }

  protected generateSummarySection(): Content[] {
    const { personal } = this.data
    if (!personal.summary) return []

    return [
      this.components.header('Summary'),
      {
        text: personal.summary,
        fontSize: this.fontSize.normal,
        color: this.theme.text,
        margin: [0, 0, 0, this.spacing.section]
      } as ContentText
    ]
  }

  protected generateExperienceSection(): Content[] {
    const { experiences } = this.data
    if (!experiences.length) return []

    return [
      this.components.header('Experience'),
      ...experiences.flatMap(exp => [
        ...this.components.timelineItem(
          exp.company,
          exp.position,
          `${exp.startDate} - ${exp.currentlyWork ? 'Present' : exp.endDate}`
        ),
        ...exp.bulletPoints.map(point => ({
          text: `• ${point}`,
          fontSize: this.fontSize.normal,
          color: this.theme.text,
          margin: [10, 0, 0, this.spacing.text]
        } as ContentText))
      ])
    ]
  }

  protected generateEducationSection(): Content[] {
    const { education } = this.data
    if (!education.length) return []

    return [
      this.components.header('Education'),
      ...education.flatMap(edu =>
        this.components.timelineItem(
          edu.school,
          edu.degree,
          `${edu.startDate} - ${edu.endDate}`,
          edu.description
        )
      )
    ]
  }

  protected generateSkillsSection(): Content[] {
    const { skills } = this.data
    if (!skills.length) return []

    return [
      this.components.header('Skills'),
      {
        text: skills.map(skill => skill.name).join(' • '),
        fontSize: this.fontSize.normal,
        color: this.theme.text,
        margin: [0, 0, 0, this.spacing.section]
      } as ContentText
    ]
  }

  public generate(): TDocumentDefinitions {
    return {
      content: [
        ...this.generatePersonalSection(),
        ...this.generateSummarySection(),
        ...this.generateExperienceSection(),
        ...this.generateEducationSection(),
        ...this.generateSkillsSection()
      ],
      defaultStyle: {
        font: 'Roboto'
      },
      pageMargins: [40, 40, 40, 40]
    }
  }
} 
