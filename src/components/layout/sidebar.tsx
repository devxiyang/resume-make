"use client"

import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { ResumeData } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ChevronDown, ChevronRight, Plus, Trash2, MoreHorizontal } from "lucide-react"
import type React from "react"
import { useState, Dispatch, SetStateAction } from "react"
import { useTranslations } from 'next-intl'

type ActiveSection = "personal" | "experience" | "education" | "projects" | "skills" | "custom"

export interface SidebarProps {
  activeSection: ActiveSection;
  onSectionChange: (section: ActiveSection) => void;
  onExperienceSelect: (id: string) => void
  onAddExperience: () => void
  onExperienceDelete: (id: string) => void
  resumeData: ResumeData
  selectedExperienceId: string | null
  onEducationSelect: (id: string) => void
  onProjectSelect: (id: string) => void
  onSkillSelect: (id: string) => void
  onAddEducation: () => void
  onAddProject: () => void
  onAddSkill: () => void
  onEducationDelete: (id: string) => void
  onProjectDelete: (id: string) => void
  onSkillDelete: (id: string) => void
  selectedEducationId: string | null
  selectedProjectId: string | null
  selectedSkillId: string | null
  onCustomSectionSelect: (id: string) => void
  onAddCustomSection: () => void
  onCustomSectionDelete: (id: string) => void
  onCustomSectionItemSelect: (sectionId: string, itemId: string) => void
  selectedCustomSectionId: string | null
  selectedIds: {
    experience: string | null;
    education: string | null;
    project: string | null;
    skill: string | null;
    customSection: string | null;
    customSectionItem: string | null;
  };
  onAddCustomSectionItem: (sectionId: string) => void;
  onCustomSectionItemDelete: (sectionId: string, itemId: string) => void;
  onCustomSectionTitleChange: (sectionId: string, title: string) => void;
  expandedSections: Record<string, boolean>;
  setExpandedSections: Dispatch<SetStateAction<Record<string, boolean>>>;
  editingSectionId: string | null;
  setEditingSectionId: (id: string | null) => void;
}

export function Sidebar({
  activeSection,
  onSectionChange,
  onExperienceSelect,
  onAddExperience,
  onExperienceDelete,
  resumeData,
  selectedExperienceId,
  onEducationSelect,
  onProjectSelect,
  onSkillSelect,
  onAddEducation,
  onAddProject,
  onAddSkill,
  onEducationDelete,
  onProjectDelete,
  onSkillDelete,
  selectedEducationId,
  selectedProjectId,
  selectedSkillId,
  onCustomSectionSelect,
  onAddCustomSection,
  onCustomSectionDelete,
  onCustomSectionItemSelect,
  selectedCustomSectionId,
  selectedIds,
  onAddCustomSectionItem,
  onCustomSectionItemDelete,
  onCustomSectionTitleChange,
  expandedSections,
  setExpandedSections,
  editingSectionId,
  setEditingSectionId,
}: SidebarProps) {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const t = useTranslations('sidebar')

  const toggleSection = (section: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const collapseAll = () => {
    const allSections = {
      experience: false,
      education: false,
      projects: false,
      skills: false,
      custom: false,
      ...resumeData.customSections?.reduce((acc, section) => ({
        ...acc,
        [section.id]: false
      }), {})
    };
    setExpandedSections(allSections);
  };

  const expandAll = () => {
    const allSections = {
      experience: true,
      education: true,
      projects: true,
      skills: true,
      custom: true,
      ...resumeData.customSections?.reduce((acc, section) => ({
        ...acc,
        [section.id]: true
      }), {})
    };
    setExpandedSections(allSections);
  };

  const isAllCollapsed = () => {
    return Object.values(expandedSections).every(value => !value);
  };

  return (
    <div className={cn("w-full h-full border-r border-gray-200 overflow-y-auto", activeSection)}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">{t('content')}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className={cn(
              "h-6 px-2 text-xs",
              isAllCollapsed() 
                ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50" 
                : "text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            )}
            onClick={isAllCollapsed() ? expandAll : collapseAll}
          >
            {isAllCollapsed() ? t('expandAll') : t('collapseAll')}
          </Button>
        </div>

        <div className="space-y-1">
          <div
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer",
              activeSection === "personal" && "bg-blue-50 text-blue-600"
            )}
            onClick={() => onSectionChange("personal")}
          >
            <span>{t('basics')}</span>
          </div>

          <div>
            <Collapsible open={expandedSections.experience}>
              <CollapsibleTrigger
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50",
                )}
                onClick={(e) => toggleSection('experience', e)}
              >
                <span>{t('experience')}</span>
                {resumeData.experiences.length > 0 && (
                  expandedSections.experience ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 mt-1 space-y-1">
                {resumeData.experiences.map((exp) => (
                  <div key={exp.id} className="flex items-center gap-1 group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start min-w-0",
                        activeSection === "experience" && selectedExperienceId === exp.id && "bg-blue-50 text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onExperienceSelect(exp.id);
                      }}
                    >
                      <span className="text-xs truncate">{exp.company || "New Experience"}</span>
                    </Button>
                    <Popover open={openPopoverId === exp.id} onOpenChange={(open) => setOpenPopoverId(open ? exp.id : null)}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-4" side="right">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Confirm Delete</h4>
                          <p className="text-xs text-muted-foreground">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => setOpenPopoverId(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onExperienceDelete(exp.id);
                                setOpenPopoverId(null);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={onAddExperience}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  <span className="text-xs">{t('customSection.addItem')}</span>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div>
            <Collapsible open={expandedSections.education}>
              <CollapsibleTrigger
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50",
                )}
                onClick={(e) => toggleSection('education', e)}
              >
                <span>{t('education')}</span>
                {resumeData.education.length > 0 && (
                  expandedSections.education ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 mt-1 space-y-1">
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="flex items-center gap-1 group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start min-w-0",
                        activeSection === "education" && selectedEducationId === edu.id && "bg-blue-50 text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEducationSelect(edu.id);
                      }}
                    >
                      <span className="text-xs truncate">{edu.school || "New Education"}</span>
                    </Button>
                    <Popover open={openPopoverId === edu.id} onOpenChange={(open) => setOpenPopoverId(open ? edu.id : null)}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-4" side="right">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Confirm Delete</h4>
                          <p className="text-xs text-muted-foreground">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => setOpenPopoverId(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onEducationDelete(edu.id);
                                setOpenPopoverId(null);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={onAddEducation}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  <span className="text-xs">{t('customSection.addItem')}</span>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div>
            <Collapsible open={expandedSections.projects}>
              <CollapsibleTrigger
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50",
                )}
                onClick={(e) => toggleSection('projects', e)}
              >
                <span>{t('projects')}</span>
                {resumeData.projects.length > 0 && (
                  expandedSections.projects ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 mt-1 space-y-1">
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="flex items-center gap-1 group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start min-w-0",
                        activeSection === "projects" && selectedProjectId === project.id && "bg-blue-50 text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectSelect(project.id);
                      }}
                    >
                      <span className="text-xs truncate">{project.name || "New Project"}</span>
                    </Button>
                    <Popover open={openPopoverId === project.id} onOpenChange={(open) => setOpenPopoverId(open ? project.id : null)}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-4" side="right">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Confirm Delete</h4>
                          <p className="text-xs text-muted-foreground">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => setOpenPopoverId(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onProjectDelete(project.id);
                                setOpenPopoverId(null);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={onAddProject}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  <span className="text-xs">{t('customSection.addItem')}</span>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div>
            <Collapsible open={expandedSections.skills}>
              <CollapsibleTrigger
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50",
                )}
                onClick={(e) => toggleSection('skills', e)}
              >
                <span>{t('skills')}</span>
                {resumeData.skills.length > 0 && (
                  expandedSections.skills ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )
                )}
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 mt-1 space-y-1">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-1 group">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start min-w-0",
                        activeSection === "skills" && selectedSkillId === skill.id && "bg-blue-50 text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSkillSelect(skill.id);
                      }}
                    >
                      <span className="text-xs truncate">{skill.name || "New Skill"}</span>
                    </Button>
                    <Popover open={openPopoverId === skill.id} onOpenChange={(open) => setOpenPopoverId(open ? skill.id : null)}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-4" side="right">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">Confirm Delete</h4>
                          <p className="text-xs text-muted-foreground">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => setOpenPopoverId(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onSkillDelete(skill.id);
                                setOpenPopoverId(null);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                ))}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start"
                  onClick={onAddSkill}
                >
                  <Plus className="h-3 w-3 mr-2" />
                  <span className="text-xs">{t('customSection.addItem')}</span>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="pt-2">
            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 uppercase">
              {t('customSection.title')}
            </div>
            {resumeData.customSections?.map((section) => (
              <Collapsible 
                key={section.id}
                open={expandedSections[section.id]}
              >
                <div className="flex items-center justify-between px-4 py-2 text-sm hover:bg-gray-50">
                  {editingSectionId === section.id ? (
                    <Input
                      className="h-6 text-sm"
                      value={section.title}
                      onChange={(e) => onCustomSectionTitleChange(section.id, e.target.value)}
                      onBlur={() => setEditingSectionId(null)}
                      onClick={(e) => e.stopPropagation()}
                      autoFocus
                      placeholder={t('customSection.sectionTitle')}
                    />
                  ) : (
                    <span 
                      className={cn(
                        "flex-1 cursor-pointer",
                        activeSection === "custom" && 
                        selectedCustomSectionId === section.id && 
                        !selectedIds.customSectionItem &&
                        "text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (activeSection === "custom" && selectedCustomSectionId === section.id) {
                          setEditingSectionId(section.id);
                        } else {
                          onSectionChange("custom");
                          onCustomSectionSelect(section.id);
                        }
                      }}
                    >
                      {section.title || t('customSection.newSection')}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <Popover open={openPopoverId === section.id} onOpenChange={(open) => setOpenPopoverId(open ? section.id : null)}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 hover:bg-gray-100"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-4" side="right">
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">{t('customSection.confirmDelete.title')}</h4>
                          <p className="text-xs text-muted-foreground">
                            {t('customSection.confirmDelete.message')}
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={() => setOpenPopoverId(null)}
                            >
                              {t('customSection.confirmDelete.cancel')}
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onCustomSectionDelete(section.id);
                                setOpenPopoverId(null);
                              }}
                            >
                              {t('customSection.confirmDelete.delete')}
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    <CollapsibleTrigger
                      className="cursor-pointer"
                      onClick={(e) => toggleSection(section.id, e)}
                    >
                      {expandedSections[section.id] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent className="pl-8 mt-1 space-y-1">
                  {section.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-1 group">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "flex-1 justify-start min-w-0",
                          activeSection === "custom" && 
                          selectedCustomSectionId === section.id && 
                          selectedIds.customSectionItem === item.id &&
                          "bg-blue-50 text-blue-600"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSectionChange("custom");
                          onCustomSectionItemSelect(section.id, item.id);
                        }}
                      >
                        <span className="text-xs truncate">{item.title || t('customSection.newItem')}</span>
                      </Button>
                      <Popover open={openPopoverId === item.id} onOpenChange={(open) => setOpenPopoverId(open ? item.id : null)}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-2 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-4" side="right">
                          <div className="space-y-2">
                            <h4 className="font-medium text-sm">Confirm Delete</h4>
                            <p className="text-xs text-muted-foreground">
                              Are you sure you want to delete this item?
                            </p>
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="h-7 text-xs"
                                onClick={() => setOpenPopoverId(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onCustomSectionItemDelete(section.id, item.id);
                                  setOpenPopoverId(null);
                                }}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  ))}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddCustomSectionItem(section.id);
                    }}
                  >
                    <Plus className="h-3 w-3 mr-2" />
                    <span className="text-xs">{t('customSection.addItem')}</span>
                  </Button>
                </CollapsibleContent>
              </Collapsible>
            ))}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-sm mt-2"
              onClick={(e) => {
                e.stopPropagation();
                onAddCustomSection();
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('customSection.add')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

