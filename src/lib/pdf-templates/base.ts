import { Content, TDocumentDefinitions, ContentText, ContentColumns, ContentStack } from 'pdfmake/interfaces'
import { ResumeData } from '../types'

interface CustomDocumentDefinitions extends TDocumentDefinitions {
    fonts?: {
        [key: string]: {
            normal?: string;
            bold?: string;
            italics?: string;
            bolditalics?: string;
        };
    };
}

export interface Theme {
    primary: string
    secondary: string
    accent: string
    text: string
    textDark: string
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
    twoColumnLayout: (leftContent: Content[], rightContent: Content[], options?: { columnGap?: number }) => ContentColumns
    titleDateRow: (title: string, date?: string, options?: { color?: string }) => ContentColumns
    titleDescriptionItem: (title: string, description?: string, options?: {
        date?: string
        margin?: [number, number, number, number]
        color?: string
    }) => Content[]
}

export abstract class PDFTemplate {
    protected theme: Theme = {
        primary: '#2563eb',    // 明亮的蓝色
        secondary: '#64748b',  // 优雅的灰色
        accent: '#3b82f6',     // 活力蓝
        text: '#334155',       // 深灰文本
        textDark: '#1e293b',   // 更深的灰色
        background: '#ffffff',
        divider: '#e2e8f0'     // 浅色分隔线
    }

    protected fontSize: FontSize = {
        name: 24,
        title: 12,
        heading: 13,
        normal: 10,
        small: 9
    }

    protected spacing: Spacing = {
        section: 6,
        item: 4,
        text: 2
    }

    protected components: Components = {
        header: (text: string, options: any = {}): ContentStack => ({
            stack: [
                {
                    text,
                    fontSize: this.fontSize.heading,
                    bold: true,
                    color: this.theme.primary,
                    lineHeight: 1,
                    margin: [0, this.spacing.section, 0, 0]
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
                    ],
                    margin: [0, 0, 0, this.spacing.item]
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
            margin: [0, 0, 0, this.spacing.item]
        }),

        skillBadge: (text: string): ContentText => ({
            text,
            fontSize: this.fontSize.small,
            color: this.theme.accent,
            margin: [0, 1, 8, 1],
            background: '#f0f9ff'
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
        },

        twoColumnLayout: (leftContent: Content[], rightContent: Content[], options = { columnGap: 20 }): ContentColumns => ({
            columns: [
                {
                    width: '*',
                    stack: leftContent
                },
                {
                    width: 'auto',
                    stack: rightContent
                }
            ],
            columnGap: options.columnGap
        }),

        titleDateRow: (title: string, date?: string, options: any = {}): ContentColumns => ({
            columns: [
                {
                    width: '*',
                    text: title,
                    fontSize: this.fontSize.normal,
                    bold: true,
                    color: options.color || this.theme.primary
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
                    margin: options.margin || [0, this.spacing.text, 0, this.spacing.item]
                } as ContentText)
            }

            return items
        }
    }

    constructor(protected data: ResumeData) { }

    protected abstract generatePersonalSection(): Content[]
    protected abstract generateExperienceSection(): Content[]
    protected abstract generateEducationSection(): Content[]
    protected abstract generateSkillsSection(): Content[]
    protected abstract generateProjectsSection(): Content[]
    protected abstract generateCustomSections(): Content[]

    public generate(): CustomDocumentDefinitions {
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
                fontSize: this.fontSize.normal,
                font: 'Roboto',
                lineHeight: 1.4
            },
            pageMargins: [40, 40, 40, 40],
        }
    }
} 
