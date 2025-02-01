import { ResumeData } from '@/lib/types';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { ResumeTemplate } from './resume-templates';
import { templates } from './template-config';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const sampleData: ResumeData = {
  personal: {
    name: "John Smith",
    jobTitle: "Senior Software Engineer",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    address: "San Francisco, CA",
    linkedin: "linkedin.com/in/johnsmith",
    personalWebsite: "johnsmith.dev",
    summary: "Experienced software engineer with a passion for building scalable applications.",
  },
  experiences: [
    {
      id: "exp1",
      company: "Tech Corp",
      position: "Senior Software Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      currentlyWork: true,
      description: "Leading the development of cloud-native applications.",
      bulletPoints: [
        "Architected and implemented microservices architecture",
        "Improved system performance by 40%",
      ],
    },
  ],
  education: [
    {
      id: "edu1",
      school: "University of Technology",
      degree: "Master of Computer Science",
      state: "California",
      startDate: "Sep 2015",
      endDate: "Jun 2017",
      description: "Focus on Distributed Systems",
    },
  ],
  projects: [
    {
      id: "proj1",
      name: "Cloud Platform",
      description: "Developed a scalable cloud platform",
      bulletPoints: ["Implemented CI/CD pipeline", "Containerized applications"],
      technologies: ["Kubernetes", "Docker", "AWS"],
    },
  ],
  skills: [
    {
      id: "skill1",
      name: "Technologies",
      description: "JavaScript, TypeScript, React, Node.js, AWS",
    },
  ],
  customSections: [],
};

export function PreviewGenerator() {
  const [generatingTemplate, setGeneratingTemplate] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const generatePreview = async (templateId: string) => {
    try {
      setGeneratingTemplate(templateId);
      
      // 创建PDF
      const pdfDoc = await pdf(
        <ResumeTemplate data={sampleData} template={templateId} />
      ).toBlob();

      // 转换为图片
      const url = URL.createObjectURL(pdfDoc);
      
      // 创建一个链接来下载PDF
      const link = document.createElement('a');
      link.href = url;
      link.download = `${templateId}-preview.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setProgress((prev) => prev + (100 / templates.length));
    } catch (error) {
      console.error(`Error generating preview for ${templateId}:`, error);
    } finally {
      setGeneratingTemplate(null);
    }
  };

  const generateAllPreviews = async () => {
    setProgress(0);
    for (const template of templates) {
      await generatePreview(template.id);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Preview Generator</h2>
        <p className="text-sm text-muted-foreground mb-4">
          Generate preview PDFs for all templates. You can then convert these PDFs to PNGs manually.
        </p>
        <Button onClick={generateAllPreviews} disabled={!!generatingTemplate}>
          Generate All Previews
        </Button>
      </div>

      {generatingTemplate && (
        <div className="mt-4">
          <p className="text-sm mb-2">
            Generating preview for: {generatingTemplate}...
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary rounded-full h-2 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <h3 className="font-medium">{template.name}</h3>
              <p className="text-sm text-muted-foreground">{template.id}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => generatePreview(template.id)}
              disabled={!!generatingTemplate}
            >
              Generate Preview
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 