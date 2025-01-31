import { ResumeData } from '@/lib/types';
import { SharpTemplate } from './sharp';
import { ModernTemplate } from './modern';
import { CleanTemplate } from './clean';
import { FreshTemplate } from './fresh';
import { PureTemplate } from './pure';
import { BostonTemplate } from './boston';

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
      return <CleanTemplate data={data} />;
    case 'fresh':
      return <FreshTemplate data={data} />;
    case 'pure':
      return <PureTemplate data={data} />;
    case 'boston':
      return <BostonTemplate data={data} />;
    default:
      // 默认使用 Modern 模板
      return <ModernTemplate data={data} />;
  }
} 