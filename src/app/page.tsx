"use client"

import { useState } from "react"
import { NavTabs } from "@/components/layout/nav-tabs"
import { Sidebar } from "@/components/layout/sidebar"
import { TemplatePicker } from "@/components/templates/template-picker"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { ExperienceForm } from "@/components/forms/experience-form"
import { EducationForm } from "@/components/forms/education-form"
import { ProjectsForm } from "@/components/forms/projects-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { ResumePreview } from "@/components/preview/resume-preview"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download } from "lucide-react"
import { Education, Experience, ResumeData, Skill } from "@/lib/types"
import { Project } from "@/lib/types"
import { format } from "date-fns"

type ActiveSection = "personal" | "experience" | "education" | "projects" | "skills"
type ActiveTab = "edit" | "template"

const initialResumeData: ResumeData = {
  personal: {
    name: "Murphy Xiaoxi",
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
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit")
  const [activeSection, setActiveSection] = useState<ActiveSection>("experience")
  const [selectedTemplate, setSelectedTemplate] = useState("sharp")
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>("1")
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData)

  const handleExperienceSelect = (id: string) => {
    setSelectedExperienceId(id)
    setActiveSection("experience")
  }

  const handleExperienceSave = (experience: Experience) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === experience.id ? experience : exp)),
    }))
  }

  const handleEducationSave = (education: Education) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === education.id ? education : edu)),
    }))
  }

  const handleProjectSave = (project: Project) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj: Project) => (proj.id === project.id ? project : proj)),
    }))
  }

  const handleSkillsSave = (skills: Skill[]) => {
    setResumeData((prev) => ({
      ...prev,
      skills
    }))
  }

  const handleExperienceClick = (experienceId: string) => {
    setSelectedExperienceId(experienceId)
    setActiveSection("experience")
  }

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: `exp-${Date.now()}`,
      company: "",
      position: "",
      startDate: format(new Date(), "MMM yyyy"),
      endDate: "Present",
      currentlyWork: true,
      description: "",
      bulletPoints: [],
    }
    
    setResumeData(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExperience]
    }))
    
    setSelectedExperienceId(newExperience.id)
    setActiveSection("experience")
  }

  const handleExperienceDelete = (experienceId: string) => {
    setResumeData(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== experienceId)
    }))
    
    if (selectedExperienceId === experienceId) {
      const remainingExperiences = resumeData.experiences.filter(exp => exp.id !== experienceId)
      setSelectedExperienceId(remainingExperiences[0]?.id || null)
    }
  }

  const renderForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm />
      case "experience":
        return (
          <ExperienceForm 
            experienceId={selectedExperienceId} 
            onSave={handleExperienceSave} 
            initialData={resumeData.experiences.find(exp => exp.id === selectedExperienceId)} 
          />
        )
      case "education":
        return <EducationForm educationId={selectedExperienceId} onSave={handleEducationSave} />
      case "projects":
        return <ProjectsForm projectId={selectedExperienceId} onSave={handleProjectSave} />
      case "skills":
        return <SkillsForm onSave={handleSkillsSave} />
      default:
        return null
    }
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
              onSectionChange={(section: string) => setActiveSection(section as ActiveSection)}
              onExperienceSelect={handleExperienceSelect}
              onAddExperience={handleAddExperience}
              onExperienceDelete={handleExperienceDelete}
              resumeData={resumeData}
              selectedExperienceId={selectedExperienceId}
            />
            <div className="flex divide-x divide-gray-200">
              <div className="w-2/5 p-8 overflow-y-auto">{renderForm()}</div>
              <div className="w-3/5 p-8 bg-gray-500 overflow-y-auto">
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
