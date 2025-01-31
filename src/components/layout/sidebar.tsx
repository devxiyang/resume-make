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

  return (
    <div className={cn("w-full h-full border-r border-gray-200 overflow-y-auto", activeSection)}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Content</span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 px-2 text-xs text-blue-600"
            onClick={collapseAll}
          >
            Collapse all
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
            <span>Basics</span>
          </div>

          <div>
            <Collapsible open={expandedSections.experience}>
              <CollapsibleTrigger
                className={cn(
                  "flex w-full items-center justify-between px-4 py-2 text-sm cursor-pointer hover:bg-gray-50",
                )}
                onClick={(e) => toggleSection('experience', e)}
              >
                <span>Experience</span>
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
                  <div key={exp.id} className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start",
                        activeSection === "experience" && selectedExperienceId === exp.id && "bg-blue-50 text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onExperienceSelect(exp.id);
                      }}
                    >
                      <span className="text-xs">{exp.company || "New Experience"}</span>
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:text-red-500"
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
                              onClick={(e) => {
                                e.preventDefault();
                                (e.currentTarget.closest('[data-radix-popper-content-wrapper]') as HTMLElement)
                                  ?.querySelector('[data-radix-popper-close-trigger]')
                                  ?.dispatchEvent(new MouseEvent('click'));
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onExperienceDelete(exp.id);
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
                  <span className="text-xs">Add</span>
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
                <span>Education</span>
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
                  <div key={edu.id} className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start",
                        activeSection === "education" && selectedEducationId === edu.id && "bg-blue-50 text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEducationSelect(edu.id);
                      }}
                    >
                      <span className="text-xs">{edu.school || "New Education"}</span>
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:text-red-500"
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
                              onClick={(e) => {
                                e.preventDefault();
                                (e.currentTarget.closest('[data-radix-popper-content-wrapper]') as HTMLElement)
                                  ?.querySelector('[data-radix-popper-close-trigger]')
                                  ?.dispatchEvent(new MouseEvent('click'));
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onEducationDelete(edu.id);
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
                  <span className="text-xs">Add</span>
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
                <span>Projects</span>
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
                  <div key={project.id} className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start",
                        activeSection === "projects" && selectedProjectId === project.id && "bg-blue-50 text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onProjectSelect(project.id);
                      }}
                    >
                      <span className="text-xs">{project.name || "New Project"}</span>
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:text-red-500"
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
                              onClick={(e) => {
                                e.preventDefault();
                                (e.currentTarget.closest('[data-radix-popper-content-wrapper]') as HTMLElement)
                                  ?.querySelector('[data-radix-popper-close-trigger]')
                                  ?.dispatchEvent(new MouseEvent('click'));
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onProjectDelete(project.id);
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
                  <span className="text-xs">Add</span>
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
                <span>Skills</span>
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
                  <div key={skill.id} className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "flex-1 justify-start",
                        activeSection === "skills" && selectedSkillId === skill.id && "bg-blue-50 text-blue-600"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSkillSelect(skill.id);
                      }}
                    >
                      <span className="text-xs">{skill.name || "New Skill"}</span>
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="px-2 hover:text-red-500"
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
                              onClick={(e) => {
                                e.preventDefault();
                                (e.currentTarget.closest('[data-radix-popper-content-wrapper]') as HTMLElement)
                                  ?.querySelector('[data-radix-popper-close-trigger]')
                                  ?.dispatchEvent(new MouseEvent('click'));
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onSkillDelete(skill.id);
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
                  <span className="text-xs">Add</span>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <div className="pt-2">
            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 uppercase">
              Custom Section
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
                      placeholder="Section Title"
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
                      {section.title || "New Section"}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <Popover>
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
                          <h4 className="font-medium text-sm">Confirm Delete</h4>
                          <p className="text-xs text-muted-foreground">
                            Are you sure you want to delete this item?
                          </p>
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                (e.currentTarget.closest('[data-radix-popper-content-wrapper]') as HTMLElement)
                                  ?.querySelector('[data-radix-popper-close-trigger]')
                                  ?.dispatchEvent(new MouseEvent('click'));
                              }}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                              onClick={(e) => {
                                e.preventDefault();
                                onCustomSectionDelete(section.id);
                              }}
                            >
                              Delete
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
                    <div key={item.id} className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "flex-1 justify-start",
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
                        <span className="text-xs">{item.title || "New Item"}</span>
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="px-2 hover:text-red-500"
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
                                onClick={(e) => {
                                  e.preventDefault();
                                  (e.currentTarget.closest('[data-radix-popper-content-wrapper]') as HTMLElement)
                                    ?.querySelector('[data-radix-popper-close-trigger]')
                                    ?.dispatchEvent(new MouseEvent('click'));
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                                onClick={(e) => {
                                  e.preventDefault();
                                  onCustomSectionItemDelete(section.id, item.id);
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
                    <span className="text-xs">Add Item</span>
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
              Add Custom Section
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

