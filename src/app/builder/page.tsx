"use client"

import { useState } from "react"
import { NavTabs } from "@/components/layout/nav-tabs"
import { Sidebar } from "@/components/layout/sidebar"
import { TemplatePicker } from "@/components/templates/template-picker"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download } from "lucide-react"
import { ResumeData } from "@/lib/types"
import { ResumeProvider } from "@/context/resume-context"
import { useResume } from "@/context/resume-context"
import { SiteHeader } from "@/components/layout/site-header"
import Link from 'next/link'
import ResumePreview from "@/components/preview/resume-preview"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { ExperienceForm } from "@/components/forms/experience-form"
import { EducationForm } from "@/components/forms/education-form"
import { ProjectsForm } from "@/components/forms/projects-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { CustomSectionForm, CustomSectionItemForm } from "@/components/forms/custom-section-form"
import { initialResumeData } from "@/lib/initial-data"
import { MobileNotice } from "@/components/mobile-notice"

type ActiveSection = "personal" | "experience" | "education" | "projects" | "skills" | "custom"
type ActiveTab = "edit" | "template"

function ResumeBuilder() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("edit")
  const [activeSection, setActiveSection] = useState<ActiveSection>("personal")
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    experience: true,
    education: true,
    projects: true,
    skills: true,
    custom: true,
  })
  const [editingSectionId, setEditingSectionId] = useState<string | null>(null)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />

      <header className="relative hidden lg:flex items-center h-14 px-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-foreground/60"
            asChild
          >
            <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">My Resume</span>
            <div className="h-2 w-2 rounded-full bg-green-500" />
          </div>
        </div>
        {/* Desktop Only PDF Download Button */}
        <div className="ml-auto lg:flex items-center gap-2">
          {pdfUrl && (
            <a 
              href={pdfUrl} 
              download="resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          )}
        </div>
      </header>

      <main className="flex-1">
        {/* Mobile Notice */}
        <div className="lg:hidden">
          <MobileNotice />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
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
                      <ResumePreview resumeData={resumeData} templateName={selectedTemplate} onPDFGenerated={setPdfUrl} />
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
                  <ResumePreview resumeData={resumeData} templateName={selectedTemplate} onPDFGenerated={setPdfUrl} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
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


