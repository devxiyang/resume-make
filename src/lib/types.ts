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
  institution: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  gpa?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
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