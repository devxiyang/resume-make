"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type React from "react"
import { useState } from "react"
import { ResumeData } from "@/lib/types"
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
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ActiveSection = "personal" | "experience" | "education" | "projects" | "skills"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  activeSection: ActiveSection
  onSectionChange: (section: ActiveSection) => void
  onExperienceSelect: (id: string) => void
  onAddExperience: () => void
  onExperienceDelete: (id: string) => void
  resumeData: ResumeData
  selectedExperienceId: string | null
}

export function Sidebar({ className, activeSection, onSectionChange, onExperienceSelect, onAddExperience, onExperienceDelete, resumeData, selectedExperienceId }: SidebarProps) {
  const [isExperienceOpen, setIsExperienceOpen] = useState(true)
  const [isEducationOpen, setIsEducationOpen] = useState(true)
  const [isProjectsOpen, setIsProjectsOpen] = useState(true)
  const [isSkillsOpen, setIsSkillsOpen] = useState(true)

  return (
    <div className={cn("w-[280px] border-r border-gray-200 overflow-y-auto", className)}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Content</span>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-blue-600">
            Collapseall
          </Button>
        </div>

        <div className="space-y-1">
          <Collapsible open={activeSection === "personal"} onOpenChange={() => onSectionChange("personal")}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-start font-medium">
                <ChevronDown className="h-4 w-4 mr-2" />
                Personal Information
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 mt-1">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
              >
                <span className="text-xs font-semibold">Basics</span>
              </Button>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isExperienceOpen} onOpenChange={setIsExperienceOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => onSectionChange("experience")}
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Experience
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 mt-1 space-y-1">
              {resumeData.experiences.map((exp) => (
                <div key={exp.id} className="flex items-center gap-1">
                  <Button
                    variant={activeSection === "experience" && selectedExperienceId === exp.id ? "secondary" : "ghost"}
                    size="sm"
                    className="flex-1 justify-start"
                    onClick={() => onExperienceSelect(exp.id)}
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
                        <h4 className="font-medium text-sm">确认删除</h4>
                        <p className="text-xs text-muted-foreground">
                          确定要删除这条经历吗？
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
                            取消
                          </Button>
                          <Button
                            size="sm"
                            className="h-7 bg-red-600 hover:bg-red-700 text-white text-xs"
                            onClick={() => onExperienceDelete(exp.id)}
                          >
                            删除
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

          <Collapsible open={isEducationOpen} onOpenChange={setIsEducationOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => onSectionChange("education")}
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Education
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 mt-1 space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <span className="text-xs truncate">University of Shan...</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Plus className="h-3 w-3 mr-2" />
                <span className="text-xs">Add</span>
              </Button>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isProjectsOpen} onOpenChange={setIsProjectsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => onSectionChange("projects")}
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Projects
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 mt-1 space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <span className="text-xs">AI Platform</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Plus className="h-3 w-3 mr-2" />
                <span className="text-xs">Add</span>
              </Button>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible open={isSkillsOpen} onOpenChange={setIsSkillsOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start font-medium"
                onClick={() => onSectionChange("skills")}
              >
                <ChevronDown className="h-4 w-4 mr-2" />
                Skills
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-8 mt-1 space-y-1">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <span className="text-xs">English</span>
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Plus className="h-3 w-3 mr-2" />
                <span className="text-xs">Add</span>
              </Button>
            </CollapsibleContent>
          </Collapsible>

          <div className="pt-2">
            <div className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 uppercase">
              Custom Section
              <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-600 border-yellow-200">
                Premium
              </Badge>
            </div>
            <Collapsible>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" className="w-full justify-start font-medium">
                  <ChevronDown className="h-4 w-4 mr-2" />
                  Award
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pl-8 mt-1">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Plus className="h-3 w-3 mr-2" />
                  <span className="text-xs">Add</span>
                </Button>
              </CollapsibleContent>
            </Collapsible>
          </div>

          <Button variant="ghost" className="w-full justify-start text-sm mt-2">
            <Plus className="h-4 w-4 mr-2" />
            Add Custom Section
            <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-600 border-yellow-200">
              Premium
            </Badge>
          </Button>
        </div>
      </div>
    </div>
  )
}

