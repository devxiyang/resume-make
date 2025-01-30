export interface PersonalInfo {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  address?: string;
  linkedin?: string;
  professionalWebsite?: string;
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
  previewMode: 'web' | 'pdf'; 
  setPreviewMode: (mode: 'web' | 'pdf') => void;
}