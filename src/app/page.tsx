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
import { Experience } from "@/types/resume"

type ActiveSection = "personal" | "experience" | "education" | "projects" | "skills"
type ActiveTab = "edit" | "template"

const initialResumeData: {
  personal: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    linkedin: string;
    professionalWebsite: string;
    personalWebsite: string;
    summary: string;
  };
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: {
    id: string;
    group: string;
    skills: string[];
  }[];
} = {
  personal: {
    firstName: "Xiyang",
    lastName: "Dev",
    jobTitle: "ML ENGINEERING EXPERT",
    email: "murphyxiaoxi@163.com",
    phone: "123456",
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
      field: "CS",
      startDate: "Sep 2014",
      endDate: "Jun 2017",
      city: "Shanghai",
      state: "",
      description: "CS",
    },
  ],
  projects: [
    {
      id: "1",
      name: "AI Platform",
      description: "build ai platform from zero to one",
      bulletPoints: [] as Array<string | never>,
    },
  ],
  skills: [
    {
      id: "1",
      group: "English",
      skills: ["Fluent"],
    },
  ],
}

interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  city: string;
  state: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  bulletPoints: Array<string | never>;
}

export default function Page() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit")
  const [activeSection, setActiveSection] = useState<ActiveSection>("experience")
  const [selectedTemplate, setSelectedTemplate] = useState("sharp")
  const [selectedExperienceId, setSelectedExperienceId] = useState<string | null>("1")
  const [resumeData, setResumeData] = useState(initialResumeData)

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
      projects: prev.projects.map((proj) => (proj.id === project.id ? project : proj)),
    }))
  }

  const handleSkillsSave = (skills: {id: string, name: string, skills: string[]}[]) => {
    setResumeData((prev) => ({
      ...prev,
      skills: skills.map(skill => ({
        id: skill.id,
        group: skill.name,
        skills: skill.skills
      }))
    }))
  }

  const renderForm = () => {
    switch (activeSection) {
      case "personal":
        return <PersonalInfoForm />
      case "experience":
        return <ExperienceForm experienceId={selectedExperienceId} onSave={handleExperienceSave} />
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

