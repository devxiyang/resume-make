import { Content, TDocumentDefinitions, ContentText, ContentColumns, ContentStack } from 'pdfmake/interfaces'
import { ResumeData } from '../types'

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
    protected theme: any
    protected fontSize: any
    protected spacing: any
    protected components: any
    protected data: ResumeData

    constructor(data: ResumeData) {
        this.data = data
    }

    protected abstract generatePersonalSection(): Content[]
    protected abstract generateExperienceSection(): Content[]
    protected abstract generateSkillsSection(): Content[]
    protected abstract generateCustomSections(): Content[]

    public generate() {
        return {
            content: [
                ...this.generatePersonalSection(),
                ...this.generateExperienceSection(),
                ...this.generateSkillsSection(),
                ...this.generateCustomSections()
            ],
            defaultStyle: {
                font: 'NotoSansSC'
            },
            fonts: {
                NotoSansSC: {
                    normal: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYw.ttf',
                    bold: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYw.ttf',
                    italics: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYw.ttf',
                    bolditalics: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYw.ttf'
                }
            }
        }
    }
} 
