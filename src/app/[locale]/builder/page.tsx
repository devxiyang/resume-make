"use client"

import { useState } from "react"
import { NavTabs } from "@/components/layout/nav-tabs"
import { Sidebar } from "@/components/layout/sidebar"
import { TemplatePicker } from "@/components/templates/template-picker"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Download, Save, Upload } from "lucide-react"
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
import { useTranslations } from 'next-intl'
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

// Add File System Access API type declarations
declare global {
  interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>;
  }
}

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
    updateItem,
    updateResumeData 
  } = useResume()
  const t = useTranslations()
  const { toast } = useToast()

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

  const saveResumeDataToFile = async () => {
    try {
      // 请求用户选择保存目录
      const handle = await window.showDirectoryPicker();
      
      // 创建文件名，使用时间戳确保唯一性
      const fileName = `resume-${new Date().toISOString().split('T')[0]}.json`;
      
      // 获取文件句柄
      const fileHandle = await handle.getFileHandle(fileName, { create: true });
      
      // 创建可写流
      const writable = await fileHandle.createWritable();
      
      // 将简历数据转换为JSON字符串并写入
      await writable.write(JSON.stringify(resumeData, null, 2));
      
      // 关闭流
      await writable.close();

      // 显示成功提示
      toast({
        title: "保存成功",
        description: `简历数据已保存至 ${fileName}`,
        duration: 3000,
      });
      
    } catch (error) {
      console.error('保存文件时出错:', error);
      // 显示错误提示
      toast({
        variant: "destructive",
        title: "保存失败",
        description: error instanceof Error ? error.message : "保存文件时出错，请重试",
        duration: 3000,
      });
    }
  };

  const loadResumeDataFromFile = async () => {
    try {
      // 创建文件选择器
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      
      // 监听文件选择
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        try {
          const text = await file.text();
          const data = JSON.parse(text);
          
          // 验证数据结构
          if (!data.personal || !Array.isArray(data.experiences) || !Array.isArray(data.education)) {
            throw new Error('无效的简历数据格式');
          }

          // 更新简历数据
          updateResumeData(data);
          
          toast({
            title: "导入成功",
            description: "简历数据已成功导入",
            duration: 3000,
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "导入失败",
            description: "文件格式错误或数据无效",
            duration: 3000,
          });
        }
      };

      input.click();
    } catch (error) {
      console.error('导入文件时出错:', error);
      toast({
        variant: "destructive",
        title: "导入失败",
        description: error instanceof Error ? error.message : "导入文件时出错，请重试",
        duration: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
        <SiteHeader />
        <Toaster />

      <header className="relative hidden lg:flex items-center h-14 px-4 border-b border-border">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-foreground/60"
            asChild
          >
            {/* <Link href="/dashboard">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Dashboard
            </Link> */}
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{t('builder.myResume')}</span>
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/60 hover:text-foreground"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('builder.actions.import.title')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('builder.actions.import.description')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('builder.actions.import.cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={loadResumeDataFromFile}>
                    {t('builder.actions.import.confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-foreground/60 hover:text-foreground"
                >
                  <Save className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t('builder.actions.save.title')}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {t('builder.actions.save.description')}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t('builder.actions.save.cancel')}</AlertDialogCancel>
                  <AlertDialogAction onClick={saveResumeDataToFile}>
                    {t('builder.actions.save.confirm')}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {pdfUrl && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground/60 hover:text-foreground"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t('builder.actions.download.title')}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('builder.actions.download.description')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('builder.actions.download.cancel')}</AlertDialogCancel>
                    <AlertDialogAction asChild>
                      <a href={pdfUrl} download="resume.pdf">
                        {t('builder.actions.download.confirm')}
                      </a>
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
        {/* Empty div to maintain layout */}
        <div className="ml-auto" />
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


