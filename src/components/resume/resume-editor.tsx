'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text, View, Document, Page, StyleSheet, pdf, BlobProvider } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

// 类型定义
type FormData = {
  name: string;
  email: string;
  phone: string;
  summary: string;
  experiences: string[];
  education: string;
  projects: string[];
  skills: string[];
  languages: string[];
  links: string[];
};

type ListField = keyof Pick<
  FormData,
  'experiences' | 'projects' | 'skills' | 'languages' | 'links'
>;

interface ResumePDFProps {
  formData: FormData;
}

// PDF文档组件
const ResumePDF: React.FC<ResumePDFProps> = ({ formData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      {/* 头部信息 */}
      <View style={pdfStyles.headerSection}>
        <Text style={pdfStyles.name}>{formData.name}</Text>
        <View style={pdfStyles.contactInfo}>
          {formData.email && <Text>{formData.email}</Text>}
          {formData.phone && <Text>{formData.phone}</Text>}
        </View>
      </View>

      {/* 个人总结 */}
      {formData.summary && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Summary</Text>
          <Text style={pdfStyles.sectionContent}>{formData.summary}</Text>
        </View>
      )}

      {/* 工作经历 */}
      {formData.experiences.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Experience</Text>
          {formData.experiences.map((exp, index) => (
            <Text key={index} style={pdfStyles.listItem}>• {exp}</Text>
          ))}
        </View>
      )}

      {/* 教育背景 */}
      {formData.education && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Education</Text>
          <Text style={pdfStyles.sectionContent}>{formData.education}</Text>
        </View>
      )}

      {/* 项目经历 */}
      {formData.projects.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Projects</Text>
          {formData.projects.map((proj, index) => (
            <Text key={index} style={pdfStyles.listItem}>• {proj}</Text>
          ))}
        </View>
      )}

      {/* 技能列表 */}
      {formData.skills.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Skills</Text>
          <Text style={pdfStyles.sectionContent}>
            {formData.skills.join(' • ')}
          </Text>
        </View>
      )}

      {/* 语言能力 */}
      {formData.languages.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Languages</Text>
          <Text style={pdfStyles.sectionContent}>
            {formData.languages.join(' • ')}
          </Text>
        </View>
      )}

      {/* 相关链接 */}
      {formData.links.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Links</Text>
          {formData.links.map((link, index) => (
            <Text 
              key={index} 
              style={{ ...pdfStyles.sectionContent, color: 'blue' }}
            >
              {link}
            </Text>
          ))}
        </View>
      )}
    </Page>
  </Document>
);

// 主编辑器组件
const ResumeEditor: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    summary: '',
    experiences: [''],
    education: '',
    projects: [''],
    skills: [''],
    languages: [''],
    links: [''],
  });

  // 处理列表字段变更
  const handleListChange = (
    field: ListField,
    index: number,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  // 添加列表项
  const addToList = (field: ListField) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  // 删除列表项
  const removeFromList = (field: ListField, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // 渲染列表输入组件
  const renderListInputs = (field: ListField, label: string) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {formData[field].map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
              handleListChange(field, index, e.target.value)
            }
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => removeFromList(field, index)}
          >
            ×
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="secondary"
        onClick={() => addToList(field)}
        className="w-full mt-2"
      >
        + Add {label}
      </Button>
    </div>
  );

  // 下载PDF处理
  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResumePDF formData={formData} />).toBlob();
    saveAs(blob, `${formData.name.trim() || 'resume'}.pdf`);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* 编辑区域 */}
      <div className="space-y-6">
        {/* 个人信息 */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Full Name</label>
              <Input 
                name="name" 
                value={formData.name} 
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Phone</label>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({...prev, phone: e.target.value}))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 专业信息 */}
        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Summary</label>
              <Input 
                name="summary" 
                value={formData.summary} 
                onChange={(e) => setFormData(prev => ({...prev, summary: e.target.value}))}
              />
            </div>
            {renderListInputs('experiences', 'Experience')}
            {renderListInputs('projects', 'Project')}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Education</label>
              <Input 
                name="education" 
                value={formData.education} 
                onChange={(e) => setFormData(prev => ({...prev, education: e.target.value}))}
              />
            </div>
          </CardContent>
        </Card>

        {/* 技能和语言 */}
        <Card>
          <CardHeader>
            <CardTitle>Skills & Languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderListInputs('skills', 'Skill')}
            {renderListInputs('languages', 'Language')}
            {renderListInputs('links', 'Link')}
          </CardContent>
        </Card>

        <Button 
          onClick={handleDownloadPDF} 
          className="w-full" 
          size="lg"
          disabled={!formData.name.trim()}
        >
          Download PDF
        </Button>
      </div>

      {/* 预览区域 */}
      <div className="sticky top-4 h-fit">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-white shadow-none">
              <BlobProvider document={<ResumePDF formData={formData} />}>
                {({ url }) => (
                  <iframe 
                    src={url || ''}
                    className="w-full h-[calc(100vh-100px)] border-none"
                    title="resume-preview"
                  />
                )}
              </BlobProvider>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// PDF样式定义
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
  },
  headerSection: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#333',
    paddingBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    color: '#666',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 4,
  },
  sectionContent: {
    fontSize: 10,
    marginBottom: 4,
  },
  listItem: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 4,
  },
});

export default ResumeEditor;