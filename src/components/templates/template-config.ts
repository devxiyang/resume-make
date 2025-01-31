import { ResumeData } from '@/lib/types';

export interface Template {
  id: string;
  name: string;
  type: 'free' | 'premium';
  description: string;
  preview: string;
  features: string[];
}

export const templates: Template[] = [
  {
    id: 'modern',
    name: 'Modern',
    type: 'free',
    description: 'A contemporary template with a modern and fresh look.',
    preview: '/templates/modern.jpg',
    features: [
      'Modern design',
      'Accent colors',
      'Visual hierarchy',
      'Perfect for creative industries',
    ],
  },
  {
    id: 'clean',
    name: 'Clean',
    type: 'premium',
    description: 'A minimalist template that focuses on content.',
    preview: '/templates/clean.jpg',
    features: [
      'Minimalist design',
      'Content focused',
      'Clean typography',
      'Perfect for academics',
    ],
  }
]; 