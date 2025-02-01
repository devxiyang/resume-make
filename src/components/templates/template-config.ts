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
    id: 'professional',
    name: 'Professional',
    type: 'free',
    description: 'A polished template that exudes professionalism and competence.',
    preview: '/templates/professional.jpg',
    features: [
      'Classic layout',
      'Professional typography',
      'Clean design',
      'Perfect for business professionals',
    ],
  },
  {
    id: 'fresh',
    name: 'Fresh',
    type: 'free',
    description: 'A vibrant and energetic template that stands out.',
    preview: '/templates/fresh.jpg',
    features: [
      'Fresh color scheme',
      'Modern layout',
      'Eye-catching design',
      'Perfect for creative roles',
    ],
  },
  {
    id: 'clean',
    name: 'Clean',
    type: 'free',
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