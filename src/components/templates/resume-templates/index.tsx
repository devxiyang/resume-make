import { ResumeData } from '@/lib/types';
import { SharpTemplate } from './sharp';
import { ModernTemplate } from './modern';

interface TemplateProps {
  data: ResumeData;
  template: string;
}

export function ResumeTemplate({ data, template }: TemplateProps) {
  // 确保模板名称是小写的
  const templateId = template.toLowerCase();
  
  switch (templateId) {
    case 'sharp':
      return <SharpTemplate data={data} />;
    case 'modern':
      return <ModernTemplate data={data} />;
    case 'clean':
      // 临时使用 Modern 模板
      return <ModernTemplate data={data} />;
    case 'fresh':
      // 临时使用 Modern 模板
      return <ModernTemplate data={data} />;
    case 'pure':
      // 临时使用 Modern 模板
      return <ModernTemplate data={data} />;
    case 'boston':
      // 临时使用 Modern 模板
      return <ModernTemplate data={data} />;
    default:
      // 默认使用 Modern 模板
      return <ModernTemplate data={data} />;
  }
} 