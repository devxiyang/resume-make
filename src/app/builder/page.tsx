"use client"

import { useState, useEffect } from "react"
import { NavTabs } from "@/components/layout/nav-tabs"
import { Sidebar } from "@/components/layout/sidebar"
import { TemplatePicker } from "@/components/templates/template-picker"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { ExperienceForm } from "@/components/forms/experience-form"
import { EducationForm } from "@/components/forms/education-form"
import { ProjectsForm } from "@/components/forms/projects-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { CustomSectionForm, CustomSectionItemForm } from "@/components/forms/custom-section-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download, Laptop, Smartphone, ArrowRight, FileText } from "lucide-react"
import { ResumeData } from "@/lib/types"
import dynamic from "next/dynamic"
import { ResumeProvider } from "@/context/resume-context"
import { useResume } from "@/context/resume-context"
import { SiteHeader } from "@/components/layout/site-header"
import Link from 'next/link'

// 动态导入预览组件
const ResumePreview = dynamic(() => import("@/components/preview/resume-preview"), { ssr: false });

type ActiveSection = "personal" | "experience" | "education" | "projects" | "skills" | "custom"
type ActiveTab = "edit" | "template"

const initialResumeData: ResumeData = {
  personal: {
    name: "Xiyang Dev",
    jobTitle: "ML ENGINEERING EXPERT",
    email: "devxiyang@mock.com",
    phone: "123456",
    personalWebsite: "devxiyang.com",
    linkedin: "linkedin.com/xiyang",
    summary: "Experienced ML Engineering Expert with a strong background in building and scaling AI infrastructure. Proven track record in leading teams and delivering high-impact machine learning solutions.",
  },
  experiences: [
    {
      id: "1",
      company: "Mihoyo",
      position: "ML Engineering Expert",
      startDate: "Dec 2022",
      endDate: "Present",
      currentlyWork: true,
      description: "Leading the ML Infrastructure team to build and scale AI platforms.",
      bulletPoints: [
        "Designed and implemented a distributed training platform supporting 1000+ GPU clusters",
        "Led the development of ML pipeline automation tools, improving team efficiency by 40%",
        "Architected real-time model serving infrastructure handling 10M+ requests per day",
        "Mentored a team of 5 ML engineers and established best practices for ML systems"
      ],
    },
    {
      id: "2",
      company: "Haluo",
      position: "ML Engineering Expert",
      startDate: "Oct 2019",
      endDate: "Aug 2022",
      currentlyWork: false,
      description: "Built the AI infrastructure from ground up, establishing core ML platforms and practices.",
      bulletPoints: [
        "Spearheaded the development of company's first ML platform from scratch",
        "Implemented end-to-end ML pipelines for model training, evaluation, and deployment",
        "Reduced model deployment time from days to hours through automation",
        "Collaborated with research teams to optimize model performance and resource utilization"
      ],
    },
  ],
  education: [
    {
      id: "1",
      school: "University of Shanghai for Science and Technology",
      degree: "Master of Computer Science",
      state: "Shanghai",
      startDate: "Sep 2014",
      endDate: "Jun 2017",
      description: "Focus on Machine Learning and Distributed Systems",
    },
  ],
  projects: [
    {
      id: "1",
      name: "AI Platform",
      description: "Enterprise-scale machine learning platform built from the ground up",
      bulletPoints: [
        "Developed a scalable ML platform supporting multiple ML frameworks",
        "Implemented automated model training and deployment pipelines",
        "Built monitoring and observability systems for ML models",
        "Integrated with cloud services for cost-effective resource management"
      ],
      technologies: ["Python", "Kubernetes", "TensorFlow", "PyTorch", "Docker"],
    },
    {
      id: "2",
      name: "ML Pipeline Automation",
      description: "Automated ML workflow system for streamlining model development",
      bulletPoints: [
        "Created a unified pipeline for data preprocessing, training, and model deployment",
        "Implemented A/B testing framework for model evaluation",
        "Built real-time monitoring dashboards for model performance",
        "Reduced model iteration cycle time by 60%"
      ],
      technologies: ["Python", "Apache Airflow", "MLflow", "Redis", "PostgreSQL"],
    },
  ],
  skills: [
    {
      id: "1",
      name: "Programming",
      description: "Python, Java, C++, Go, SQL",
    },
    {
      id: "2",
      name: "ML Technologies",
      description: "TensorFlow, PyTorch, Scikit-learn, Kubernetes, Docker",
    },
    {
      id: "3",
      name: "Cloud Platforms",
      description: "AWS, GCP, Azure, Kubernetes, Docker",
    },
    {
      id: "4",
      name: "Tools & Frameworks",
      description: "Git, CI/CD, MLflow, Kubeflow, Apache Airflow",
    },
  ],
  customSections: [],
}

function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit")
  const [activeSection, setActiveSection] = useState<ActiveSection>("personal")
  const [isMobile, setIsMobile] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    experience: true,
    education: true,
    projects: true,
    skills: true,
    custom: true,
  })
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)
  const { 
    resumeData, 
    selectedTemplate, 
    selectedIds, 
    isEditing,
    setSelectedTemplate, 
    addItem, 
    deleteItem, 
    selectItem, 
    addCustomSectionItem, 
    selectCustomSectionItem, 
    deleteCustomSectionItem, 
    updateItem 
  } = useResume()

  // 检测设备类型
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const renderForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm />
      case "experience":
        return <ExperienceForm />
      case "education":
        return <EducationForm />
      case "projects":
        return <ProjectsForm />
      case "skills":
        return <SkillsForm />
      case "custom":
        return selectedIds.customSectionItem ? <CustomSectionItemForm /> : <CustomSectionForm />
      default:
        return null
    }
  }

  if (isMobile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-white">
        <div className="relative mb-8">
          <Smartphone className="w-16 h-16 text-red-500 absolute -left-4 top-0 transform -rotate-12 opacity-50" />
          <Laptop className="w-20 h-20 text-blue-600 relative z-10" />
        </div>
        
        <h1 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
          Desktop Only
        </h1>
        
        <div className="max-w-sm text-center space-y-4">
          <p className="text-gray-600">
            For the best resume building experience, please use a desktop or laptop computer.
          </p>
          
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
            <Smartphone className="w-5 h-5" />
            <ArrowRight className="w-4 h-4" />
            <Laptop className="w-6 h-6 text-blue-600" />
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-700">
              Tip: Our resume builder requires a larger screen for precise formatting and the best editing experience.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />

      <header className="relative flex items-center h-14 px-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-foreground/60">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">My Resume</span>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {/* <Button variant="default" size="sm" className="bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button> */}
        </div>
      </header>

      <div className="flex-1 grid grid-cols-[72px_1fr]">
        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "edit" ? (
          <div className="grid grid-cols-[300px_1fr]">
            <Sidebar
              activeSection={activeSection}
              onSectionChange={setActiveSection}
              resumeData={resumeData}
              selectedIds={selectedIds}
              selectedExperienceId={selectedIds.experience}
              selectedEducationId={selectedIds.education}
              selectedProjectId={selectedIds.project}
              selectedSkillId={selectedIds.skill}
              selectedCustomSectionId={selectedIds.customSection}
              expandedSections={expandedSections}
              setExpandedSections={setExpandedSections}
              editingSectionId={editingSectionId}
              setEditingSectionId={setEditingSectionId}
              onExperienceSelect={(id) => {
                selectItem('experience', id)
                setActiveSection('experience')
              }}
              onEducationSelect={(id) => {
                selectItem('education', id)
                setActiveSection('education')
              }}
              onProjectSelect={(id) => {
                selectItem('project', id)
                setActiveSection('projects')
              }}
              onSkillSelect={(id) => {
                selectItem('skill', id)
                setActiveSection('skills')
              }}
              onCustomSectionSelect={(id) => {
                selectItem('customSection', id)
                setActiveSection('custom')
              }}
              onCustomSectionTitleChange={(sectionId, title) => {
                const section = resumeData.customSections.find(s => s.id === sectionId);
                if (!section) return;
                const updatedSection = { ...section, title };
                updateItem('customSection', updatedSection);
              }}
              onCustomSectionItemSelect={(sectionId, itemId) => {
                selectCustomSectionItem(sectionId, itemId)
                setActiveSection('custom')
              }}
              onAddExperience={() => {
                addItem('experience')
                setActiveSection('experience')
              }}
              onAddEducation={() => {
                addItem('education')
                setActiveSection('education')
              }}
              onAddProject={() => {
                addItem('project')
                setActiveSection('projects')
              }}
              onAddSkill={() => {
                addItem('skill')
                setActiveSection('skills')
              }}
              onAddCustomSection={() => {
                const newId = `customSection-${Date.now()}`;
                addItem('customSection');
                selectItem('customSection', newId);
                setActiveSection('custom');
                setExpandedSections(prev => ({
                  ...prev,
                  [newId]: true
                }));
                setEditingSectionId(newId);
              }}
              onExperienceDelete={(id) => deleteItem('experience', id)}
              onEducationDelete={(id) => deleteItem('education', id)}
              onProjectDelete={(id) => deleteItem('project', id)}
              onSkillDelete={(id) => deleteItem('skill', id)}
              onCustomSectionDelete={(id) => deleteItem('customSection', id)}
              onAddCustomSectionItem={addCustomSectionItem}
              onCustomSectionItemDelete={deleteCustomSectionItem}
            />
            <div className="flex flex-col divide-y divide-gray-200 h-[calc(100vh-56px)]">
              <div className="flex divide-x divide-gray-200 flex-1">
                <div className="w-[40%] p-8 overflow-y-auto">{renderForm()}</div>
                <div className="w-[60%] bg-gray-100 overflow-hidden">
                  <ResumePreview data={resumeData} />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-[600px_1fr]">
            <div className="border-r border-gray-200 overflow-hidden">
              <TemplatePicker selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />
            </div>
            <div className="bg-gray-100">
              <ResumePreview data={resumeData} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <ResumeProvider initialData={initialResumeData}>
      <ResumeBuilder />
    </ResumeProvider>
  )
}


