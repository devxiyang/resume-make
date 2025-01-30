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
// import { ResumePreview } from "@/components/preview/resume-preview"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download } from "lucide-react"
import { Education, Experience, ResumeData, Skill, CustomSection } from "@/lib/types"
import { Project } from "@/lib/types"
import { format } from "date-fns"
import { CustomSectionForm } from "@/components/forms/custom-section-form"
import dynamic from "next/dynamic"

// 关键：动态导入，不在 SSR 渲染
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

export default function Page() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit")
  const [activeSection, setActiveSection] = useState<ActiveSection>("experience")
  const [selectedTemplate, setSelectedTemplate] = useState("sharp")
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>("1")
  const [selectedEducationId, setSelectedEducationId] = useState<string | null>("1")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>("1")
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>("1")
  const [selectedCustomSectionId, setSelectedCustomSectionId] = useState<string | null>(null)
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

  const handleEducationSelect = (id: string) => {
    setSelectedEducationId(id)
    setActiveSection("education")
  }

  const handleProjectSelect = (id: string) => {
    setSelectedProjectId(id)
    setActiveSection("projects")
  }

  const handleSkillSelect = (id: string) => {
    setSelectedSkillId(id)
    setActiveSection("skills")
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

  const handleSkillSave = (skill: Skill) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === skill.id ? skill : s)),
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

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      school: "",
      degree: "",
      state: "",
      startDate: format(new Date(), "MMM yyyy"),
      endDate: format(new Date(), "MMM yyyy"),
      description: "",
    }
    
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }))
    
    setSelectedEducationId(newEducation.id)
    setActiveSection("education")
  }

  const handleAddProject = () => {
    const newProject: Project = {
      id: `proj-${Date.now()}`,
      name: "",
      description: "",
      bulletPoints: [],
      technologies: [],
    }
    
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
    
    setSelectedProjectId(newProject.id)
    setActiveSection("projects")
  }

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: "",
      description: "",
    }
    
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
    
    setSelectedSkillId(newSkill.id)
    setActiveSection("skills")
  }

  const handleEducationDelete = (educationId: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== educationId)
    }))
    
    if (selectedEducationId === educationId) {
      const remainingEducation = resumeData.education.filter(edu => edu.id !== educationId)
      setSelectedEducationId(remainingEducation[0]?.id || null)
    }
  }

  const handleProjectDelete = (projectId: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== projectId)
    }))
    
    if (selectedProjectId === projectId) {
      const remainingProjects = resumeData.projects.filter(proj => proj.id !== projectId)
      setSelectedProjectId(remainingProjects[0]?.id || null)
    }
  }

  const handleSkillDelete = (skillId: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== skillId)
    }))
    
    if (selectedSkillId === skillId) {
      const remainingSkills = resumeData.skills.filter(skill => skill.id !== skillId)
      setSelectedSkillId(remainingSkills[0]?.id || null)
    }
  }

  const handleAddCustomSection = () => {
    const newSection: CustomSection = {
      id: `custom-${Date.now()}`,
      title: "New Section",
      items: []
    }
    
    setResumeData(prev => ({
      ...prev,
      customSections: [...(prev.customSections || []), newSection]
    }))
    
    setSelectedCustomSectionId(newSection.id)
    setActiveSection("custom")
  }

  const handleCustomSectionDelete = (sectionId: string) => {
    setResumeData(prev => ({
      ...prev,
      customSections: prev.customSections.filter(section => section.id !== sectionId)
    }))
    
    if (selectedCustomSectionId === sectionId) {
      const remainingSections = resumeData.customSections.filter(section => section.id !== sectionId)
      setSelectedCustomSectionId(remainingSections[0]?.id || null)
    }
  }

  const handleCustomSectionSelect = (id: string) => {
    setSelectedCustomSectionId(id)
    setActiveSection("custom")
  }

  const handleCustomSectionSave = (section: CustomSection) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => 
        s.id === section.id ? section : s
      ),
    }))
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
        return <EducationForm educationId={selectedEducationId} onSave={handleEducationSave} />
      case "projects":
        return (
          <ProjectsForm 
            projectId={selectedProjectId} 
            onSave={handleProjectSave}
            initialData={resumeData.projects.find(proj => proj.id === selectedProjectId)}
          />
        )
      case "skills":
        return (
          <SkillsForm 
            skillId={selectedSkillId}
            onSave={handleSkillSave}
            initialData={resumeData.skills.find(skill => skill.id === selectedSkillId)}
          />
        )
      case "custom":
        return (
          <CustomSectionForm 
            sectionId={selectedCustomSectionId}
            onSave={handleCustomSectionSave}
            initialData={resumeData.customSections.find(
              section => section.id === selectedCustomSectionId
            )}
          />
        )
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
              onEducationSelect={handleEducationSelect}
              onProjectSelect={handleProjectSelect}
              onSkillSelect={handleSkillSelect}
              onAddExperience={handleAddExperience}
              onAddEducation={handleAddEducation}
              onAddProject={handleAddProject}
              onAddSkill={handleAddSkill}
              onExperienceDelete={handleExperienceDelete}
              onEducationDelete={handleEducationDelete}
              onProjectDelete={handleProjectDelete}
              onSkillDelete={handleSkillDelete}
              onCustomSectionSelect={handleCustomSectionSelect}
              onAddCustomSection={handleAddCustomSection}
              onCustomSectionDelete={handleCustomSectionDelete}
              resumeData={resumeData}
              selectedExperienceId={selectedExperienceId}
              selectedEducationId={selectedEducationId}
              selectedProjectId={selectedProjectId}
              selectedSkillId={selectedSkillId}
              selectedCustomSectionId={selectedCustomSectionId}
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
