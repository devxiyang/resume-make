'use client';

import { ResumeData } from '@/lib/types';
import { PDFViewer } from '@react-pdf/renderer';
import { PDFPreview } from './pdf-preview';

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <PDFViewer
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: '#f3f4f6'
      }}
    >
      <PDFPreview data={data} />
    </PDFViewer>
  );
}

export default ResumePreview;
