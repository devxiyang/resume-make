import { ResumeData } from '@/lib/types';

export interface Template {
  id: string;
  type: 'free' | 'premium';
  preview: string;
}

export const templates: Template[] = [
  {
    id: 'modern',
    type: 'free',
    preview: '/templates/modern.jpg',
  },
  {
    id: 'professional',
    type: 'free',
    preview: '/templates/professional.jpg',
  },
  {
    id: 'fresh',
    type: 'free',
    preview: '/templates/fresh.jpg',
  },
  {
    id: 'clean',
    type: 'free',
    preview: '/templates/clean.jpg',
  }
]; 