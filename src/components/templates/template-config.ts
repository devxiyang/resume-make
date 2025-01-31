import { ResumeData } from '@/lib/types';
import { ModernTemplate } from './resume-templates/modern';
import { SharpTemplate } from './resume-templates/sharp';

export interface Template {
  id: string;
  name: string;
  type: 'free' | 'premium';
  description: string;
  preview: string;
  features: string[];
  component: React.ComponentType<{ data: ResumeData }>;
}

export const templates: Template[] = [
  {
    id: 'sharp',
    name: 'Sharp',
    type: 'free',
    description: 'A clean and professional template with a sharp design.',
    preview: '/templates/sharp.png',
    features: [
      'Clean layout',
      'Professional design',
      'Easy to read',
      'Perfect for traditional industries',
    ],
    component: SharpTemplate,
  },
  {
    id: 'modern',
    name: 'Modern',
    type: 'free',
    description: 'A contemporary template with a modern and fresh look.',
    preview: '/templates/modern.png',
    features: [
      'Modern design',
      'Accent colors',
      'Visual hierarchy',
      'Perfect for creative industries',
    ],
    component: ModernTemplate,
  },
  {
    id: 'clean',
    name: 'Clean',
    type: 'premium',
    description: 'A minimalist template that focuses on content.',
    preview: '/templates/clean.png',
    features: [
      'Minimalist design',
      'Content focused',
      'Clean typography',
      'Perfect for academics',
    ],
    component: ModernTemplate,
  },
  {
    id: 'fresh',
    name: 'Fresh',
    type: 'premium',
    description: 'A vibrant template with a fresh perspective.',
    preview: '/templates/fresh.png',
    features: [
      'Vibrant design',
      'Creative layout',
      'Modern typography',
      'Perfect for startups',
    ],
    component: ModernTemplate,
  },
  {
    id: 'pure',
    name: 'Pure',
    type: 'premium',
    description: 'A pure and elegant template design.',
    preview: '/templates/pure.png',
    features: [
      'Elegant design',
      'Balanced layout',
      'Professional look',
      'Perfect for executives',
    ],
    component: ModernTemplate,
  },
  {
    id: 'boston',
    name: 'Boston',
    type: 'premium',
    description: 'A sophisticated template with a classic touch.',
    preview: '/templates/boston.png',
    features: [
      'Classic design',
      'Sophisticated layout',
      'Traditional elements',
      'Perfect for finance',
    ],
    component: ModernTemplate,
  },
]; 