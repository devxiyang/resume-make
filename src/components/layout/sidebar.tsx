"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type React from "react"
import { useState } from "react"
import { ResumeData } from "@/lib/types"

type ActiveSection = "personal" | "experience" | "education" | "projects" | "skills"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  activeSection: ActiveSection
  onSectionChange: (section: ActiveSection) => void
  onExperienceSelect: (id: string) => void
  onAddExperience: () => void
  resumeData: ResumeData
  selectedExperienceId: string | null
}

export function Sidebar({ className, activeSection, onSectionChange, onExperienceSelect, onAddExperience, resumeData, selectedExperienceId }: SidebarProps) {
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
                <Button
                  key={exp.id}
                  variant={activeSection === "experience" && selectedExperienceId === exp.id ? "secondary" : "ghost"}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => onExperienceSelect(exp.id)}
                >
                  <span className="text-xs">{exp.company || "New Experience"}</span>
                </Button>
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

