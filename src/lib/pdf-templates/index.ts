import { TDocumentDefinitions } from 'pdfmake/interfaces'
import { ResumeData } from '../types'
import { cleanTemplate } from './clean'
import { modernTemplate } from './modern'
import { freshTemplate } from './fresh'
import { professionalTemplate } from './professional'

export type PDFTemplate = (data: ResumeData) => TDocumentDefinitions

const templates: Record<string, PDFTemplate> = {
  clean: cleanTemplate,
  modern: modernTemplate,
  fresh: freshTemplate,
  professional: professionalTemplate
}

export function getPDFTemplate(name: string = 'clean'): PDFTemplate {
  const template = templates[name]
  if (!template) {
    throw new Error(`Template "${name}" not found`)
  }
  return template
}

export * from './clean'
export * from './modern'
export * from './fresh'
export * from './professional' 
