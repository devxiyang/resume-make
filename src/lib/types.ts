export interface PersonalInfo {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  address?: string;
  linkedin?: string;
  personalWebsite?: string;
  summary?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  state?: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  currentlyWork: boolean;
  city?: string;
  state?: string;
  description: string;
  bulletPoints: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  bulletPoints?: string[];
  technologies?: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: Array<{
    id: string;
    title: string;
    description: string;
    date?: string;
  }>;
}

export type SectionType =
  | 'personalInfo'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skills'
  | 'custom';

export interface ResumeData {
  personal: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  customSections: CustomSection[];
}

export interface ResumeContextType {
  data: ResumeData;
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedIds: {
    experience: string;
    education: string;
    project: string;
    skill: string;
    customSection: string;
    customSectionItem: string;
  };
  isEditing: boolean;
  previewMode: 'web' | 'pdf';
  setPreviewMode: (mode: 'web' | 'pdf') => void;
  setSelectedTemplate: (template: string) => void;
  addItem: (type: string) => void;
  deleteItem: (type: string, id: string) => void;
  selectItem: (type: string, id: string) => void;
  addCustomSectionItem: (sectionId: string) => void;
  selectCustomSectionItem: (sectionId: string, itemId: string) => void;
  deleteCustomSectionItem: (sectionId: string, itemId: string) => void;
  updateItem: (type: string, item: any) => void;
}