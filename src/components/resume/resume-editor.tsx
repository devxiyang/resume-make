'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Text, View, Document, Page, StyleSheet, pdf, BlobProvider } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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

const ResumePDF: React.FC<ResumePDFProps> = ({ formData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.headerSection}>
        <Text style={pdfStyles.name}>{formData.name}</Text>
        <View style={pdfStyles.contactInfo}>
          {formData.email && <Text>{formData.email}</Text>}
          {formData.phone && <Text>{formData.phone}</Text>}
        </View>
      </View>

      {formData.summary && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Summary</Text>
          <Text style={pdfStyles.sectionContent}>{formData.summary}</Text>
        </View>
      )}

      {formData.experiences.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Experience</Text>
          {formData.experiences.map((exp, index) => (
            <Text key={index} style={pdfStyles.listItem}>• {exp}</Text>
          ))}
        </View>
      )}

      {formData.education && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Education</Text>
          <Text style={pdfStyles.sectionContent}>{formData.education}</Text>
        </View>
      )}

      {formData.projects.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Projects</Text>
          {formData.projects.map((proj, index) => (
            <Text key={index} style={pdfStyles.listItem}>• {proj}</Text>
          ))}
        </View>
      )}

      {formData.skills.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Skills</Text>
          <Text style={pdfStyles.sectionContent}>
            {formData.skills.join(' • ')}
          </Text>
        </View>
      )}

      {formData.languages.some(Boolean) && (
        <View style={pdfStyles.section}>
          <Text style={pdfStyles.sectionTitle}>Languages</Text>
          <Text style={pdfStyles.sectionContent}>
            {formData.languages.join(' • ')}
          </Text>
        </View>
      )}

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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const addToList = (field: ListField) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeFromList = (field: ListField, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const renderListInputs = (field: ListField, label: string) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      {formData[field].map((item, index) => (
        <div key={index} className="flex gap-2">
          <Input
            value={item}
            onChange={(e) =>
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

  const handleDownloadPDF = async () => {
    const blob = await pdf(<ResumePDF formData={formData} />).toBlob();
    saveAs(blob, `${formData.name.trim() || 'resume'}.pdf`);
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Phone</label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Summary</label>
              <Input
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
              />
            </div>
            {renderListInputs('experiences', 'Experience')}
            {renderListInputs('projects', 'Project')}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Education</label>
              <Input
                value={formData.education}
                onChange={(e) => setFormData(prev => ({ ...prev, education: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

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

        {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <Button 
            className="w-full" 
            size="lg"
            disabled={!formData.name.trim()}
          >
            Preview & Download PDF
          </Button>
          <DialogContent className="max-w-4xl h-[90vh]">
            <div className="h-[80vh]">
              <BlobProvider document={<ResumePDF formData={formData} />}>
                {({ url }) => (
                  <iframe 
                    src={url || ''}
                    className="w-full h-full border-none"
                    title="pdf-preview"
                  />
                )}
              </BlobProvider>
            </div>
            <Button onClick={handleDownloadPDF} className="mt-4">
              Download PDF
            </Button>
          </DialogContent>
        </Dialog> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className="w-full"
              size="lg"
              disabled={!formData.name.trim()}
            >
              Preview & Download PDF
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl h-[90vh]">
            <div className="h-[80vh]">
              <BlobProvider document={<ResumePDF formData={formData} />}>
                {({ url }) => (
                  <iframe
                    src={url || ''}
                    className="w-full h-full border-none"
                    title="pdf-preview"
                  />
                )}
              </BlobProvider>
            </div>
            <Button onClick={handleDownloadPDF} className="mt-4">
              Download PDF
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="sticky top-4 h-fit">
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-6 bg-white space-y-4">
              <div className="mb-6 pb-4 border-b-2 border-gray-800">
                <h1 className="text-2xl font-bold mb-2">{formData.name}</h1>
                <div className="flex justify-between text-sm text-gray-600">
                  {formData.email && <span>{formData.email}</span>}
                  {formData.phone && <span>{formData.phone}</span>}
                </div>
              </div>

              {formData.summary && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">Summary</h2>
                  <p className="text-sm">{formData.summary}</p>
                </div>
              )}

              {formData.experiences.some(Boolean) && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">Experience</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {formData.experiences.map((exp, index) => (
                      <li key={index} className="text-sm">{exp}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.education && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">Education</h2>
                  <p className="text-sm">{formData.education}</p>
                </div>
              )}

              {formData.projects.some(Boolean) && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">Projects</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {formData.projects.map((proj, index) => (
                      <li key={index} className="text-sm">{proj}</li>
                    ))}
                  </ul>
                </div>
              )}

              {formData.skills.some(Boolean) && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">Skills</h2>
                  <p className="text-sm">{formData.skills.join(' • ')}</p>
                </div>
              )}

              {formData.languages.some(Boolean) && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">Languages</h2>
                  <p className="text-sm">{formData.languages.join(' • ')}</p>
                </div>
              )}

              {formData.links.some(Boolean) && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2 border-b border-gray-200 pb-1">Links</h2>
                  <div className="space-y-1">
                    {formData.links.map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        className="text-sm text-blue-600 hover:underline block"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

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