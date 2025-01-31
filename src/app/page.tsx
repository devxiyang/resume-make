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
import { CustomSectionForm } from "@/components/forms/custom-section-form"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download, Laptop, Smartphone, ArrowRight } from "lucide-react"
import { ResumeData } from "@/lib/types"
import dynamic from "next/dynamic"
import { ResumeProvider } from "@/context/resume-context"
import { useResume } from "@/context/resume-context"

// 动态导入预览组件
const ResumePreview = dynamic(() => import("@/components/preview/resume-preview"), { ssr: false });

type ActiveSection = "personal" | "experience" | "education" | "projects" | "skills" | "custom"
type ActiveTab = "edit" | "template"

const initialResumeData: ResumeData = {
  personal: {
    name: "Xiyang Dev",
    jobTitle: "ML ENGINEERING EXPERT",
    email: "murphyxiaoxi@163.com",
    phone: "123456",
    address: "Shanghai, China",
    linkedin: "linkedin.com/xiyang",
    professionalWebsite: "devxiyang.com",
    personalWebsite: "devxiyang.com",
    summary: "",
  },
  experiences: [
    {
      id: "1",
      company: "Mihoyo",
      position: "ML Engineering Expert",
      startDate: "Dec 2022",
      endDate: "Present",
      currentlyWork: true,
      description: "Work in ML Infra",
      bulletPoints: ["java", "c++"],
    },
    {
      id: "2",
      company: "Haluo",
      position: "ML Engineering Expert",
      startDate: "Oct 2019",
      endDate: "Aug 2022",
      currentlyWork: false,
      description: "build the ai infra start 0 to 1",
      bulletPoints: ["leader"],
    },
  ],
  education: [
    {
      id: "1",
      school: "University of Shanghai for Secience and Technology",
      degree: "Master",
      state: "Shanghai, China",
      startDate: "Sep 2014",
      endDate: "Jun 2017",
      description: "CS",
    },
  ],
  projects: [
    {
      id: "1",
      name: "AI Platform",
      description: "build ai platform from zero to one",
      bulletPoints: [] as string[],
      technologies: [] as string[],
    },
  ],
  skills: [
    {
      id: "1",
      name: "English",
      description: "English is my mother language",
    },
  ],
  customSections: [],
}

function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit")
  const [activeSection, setActiveSection] = useState<ActiveSection>("experience")
  const [isMobile, setIsMobile] = useState(false)
  const { resumeData, selectedTemplate, selectedIds, setSelectedTemplate, addItem, deleteItem, selectItem } = useResume()

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
        return <CustomSectionForm />
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
    <div className="min-h-screen flex flex-col bg-white">
      <header className="flex items-center h-14 px-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-600">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">My Resume</span>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
        </div>
        <Button variant="default" size="sm" className="ml-auto bg-blue-600 hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </header>

      <div className="flex-1 grid grid-cols-[72px_280px_1fr]">
        <NavTabs activeTab={activeTab} onTabChange={setActiveTab} />
        {activeTab === "edit" ? (
          <>
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
                addItem('customSection')
                setActiveSection('custom')
              }}
              onExperienceDelete={(id) => deleteItem('experience', id)}
              onEducationDelete={(id) => deleteItem('education', id)}
              onProjectDelete={(id) => deleteItem('project', id)}
              onSkillDelete={(id) => deleteItem('skill', id)}
              onCustomSectionDelete={(id) => deleteItem('customSection', id)}
            />
            <div className="flex divide-x divide-gray-200 h-[calc(100vh-56px)]">
              <div className="w-2/5 p-8 overflow-y-auto">{renderForm()}</div>
              <div className="w-3/5 bg-gray-100 overflow-hidden flex flex-col">
                <ResumePreview data={resumeData} />
              </div>
            </div>
          </>
        ) : (
          <>
            <TemplatePicker selectedTemplate={selectedTemplate} onTemplateSelect={setSelectedTemplate} />
            <div className="p-6 bg-gray-500 overflow-y-auto">
              <ResumePreview data={resumeData} />
            </div>
          </>
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
