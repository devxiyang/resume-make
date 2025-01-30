export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin?: string;
  github?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  city: string;
  state: string;
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
  bulletPoints: string[];
  technologies: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  description?: string;
}

export type SectionType = 
  | 'personalInfo'
  | 'education' 
  | 'experience'
  | 'projects'
  | 'skills'; 