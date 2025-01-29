'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Trash2 } from 'lucide-react';

type EducationEntry = {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  description: string;
};

type WorkExperience = {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
  technologies: string;
};

type Project = {
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string;
};

type ResumeData = {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedIn: string;
  };
  education: EducationEntry[];
  workExperience: WorkExperience[];
  projects: Project[];
};

export default function ResumeEditor() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      linkedIn: ''
    },
    education: [createNewEducation()],
    workExperience: [createNewWorkExperience()],
    projects: [createNewProject()]
  });

  function createNewEducation(): EducationEntry {
    return {
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    };
  }

  function createNewWorkExperience(): WorkExperience {
    return {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      technologies: ''
    };
  }

  function createNewProject(): Project {
    return {
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      technologies: ''
    };
  }

  const updateField = <T extends EducationEntry | WorkExperience | Project>(
    section: Extract<keyof ResumeData, 'education' | 'workExperience' | 'projects'>, 
    index: number, 
    field: keyof T, 
    value: string
  ) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] as T[]).map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addEntry = (section: Extract<keyof ResumeData, 'education' | 'workExperience' | 'projects'>, createFn: () => any) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], createFn()]
    }));
  };

  const removeEntry = (section: Extract<keyof ResumeData, 'education' | 'workExperience' | 'projects'>, index: number) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">简历编辑器</h1>

      {/* 个人信息 */}
      <Accordion type="single" defaultValue="personal-info" collapsible>
        <AccordionItem value="personal-info">
          <AccordionTrigger className="text-lg font-semibold">个人信息</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'name', label: '姓名', type: 'text' },
                { id: 'email', label: '邮箱', type: 'email' },
                { id: 'phone', label: '电话', type: 'tel' },
                { id: 'linkedIn', label: 'LinkedIn', type: 'url' }
              ].map(({ id, label, type }) => (
                <div key={id} className="space-y-2">
                  <Label htmlFor={id}>{label}</Label>
                  <Input
                    id={id}
                    type={type}
                    value={resumeData.personalInfo[id as keyof typeof resumeData.personalInfo]}
                    onChange={(e) => handlePersonalInfoChange(id as any, e.target.value)}
                  />
                </div>
              ))}
              <div className="space-y-2 col-span-2">
                <Label htmlFor="address">地址</Label>
                <Input
                  id="address"
                  value={resumeData.personalInfo.address}
                  onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* 教育经历 */}
      <Accordion type="multiple">
        <AccordionItem value="education">
          <AccordionTrigger className="text-lg font-semibold">教育经历</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {resumeData.education.map((edu, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>学校名称</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) => updateField('education', index, 'school', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>学位</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => updateField('education', index, 'degree', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>开始日期</Label>
                    <Input
                      type="date"
                      value={edu.startDate}
                      onChange={(e) => updateField('education', index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>结束日期</Label>
                    <Input
                      type="date"
                      value={edu.endDate}
                      onChange={(e) => updateField('education', index, 'endDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>描述</Label>
                    <Textarea
                      value={edu.description}
                      onChange={(e) => updateField('education', index, 'description', e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry('education', index)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    删除
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => addEntry('education', createNewEducation)}
            >
              <Plus className="w-4 h-4 mr-2" />
              添加教育经历
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* 工作经历 */}
      <Accordion type="multiple">
        <AccordionItem value="work-experience">
          <AccordionTrigger className="text-lg font-semibold">工作经历</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {resumeData.workExperience.map((work, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>公司名称</Label>
                    <Input
                      value={work.company}
                      onChange={(e) => updateField('workExperience', index, 'company', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>职位</Label>
                    <Input
                      value={work.position}
                      onChange={(e) => updateField('workExperience', index, 'position', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>开始日期</Label>
                    <Input
                      type="date"
                      value={work.startDate}
                      onChange={(e) => updateField('workExperience', index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>结束日期</Label>
                    <Input
                      type="date"
                      value={work.endDate}
                      onChange={(e) => updateField('workExperience', index, 'endDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>工作职责</Label>
                    <Textarea
                      value={work.responsibilities}
                      onChange={(e) => updateField('workExperience', index, 'responsibilities', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>使用技术</Label>
                    <Input
                      value={work.technologies}
                      onChange={(e) => updateField('workExperience', index, 'technologies', e.target.value)}
                      placeholder="用逗号分隔技术栈"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry('workExperience', index)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    删除
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => addEntry('workExperience', createNewWorkExperience)}
            >
              <Plus className="w-4 h-4 mr-2" />
              添加工作经历
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* 项目经历 */}
      <Accordion type="multiple">
        <AccordionItem value="projects">
          <AccordionTrigger className="text-lg font-semibold">项目经历</AccordionTrigger>
          <AccordionContent className="space-y-4">
            {resumeData.projects.map((project, index) => (
              <div key={index} className="border p-4 rounded-lg space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>项目名称</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => updateField('projects', index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>担任角色</Label>
                    <Input
                      value={project.role}
                      onChange={(e) => updateField('projects', index, 'role', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>开始日期</Label>
                    <Input
                      type="date"
                      value={project.startDate}
                      onChange={(e) => updateField('projects', index, 'startDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>结束日期</Label>
                    <Input
                      type="date"
                      value={project.endDate}
                      onChange={(e) => updateField('projects', index, 'endDate', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>项目描述</Label>
                    <Textarea
                      value={project.description}
                      onChange={(e) => updateField('projects', index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>使用技术</Label>
                    <Input
                      value={project.technologies}
                      onChange={(e) => updateField('projects', index, 'technologies', e.target.value)}
                      placeholder="用逗号分隔技术栈"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeEntry('projects', index)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    删除
                  </Button>
                </div>
              </div>
            ))}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => addEntry('projects', createNewProject)}
            >
              <Plus className="w-4 h-4 mr-2" />
              添加项目经历
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex justify-center">
        <Button onClick={() => console.log(resumeData)} size="lg">
          保存简历
        </Button>
      </div>
    </div>
  );
}
