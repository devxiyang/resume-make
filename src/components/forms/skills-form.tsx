"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Minus } from "lucide-react"
import { useState } from "react"

interface SkillGroup {
  id: string
  name: string
  skills: string[]
}

export function SkillsForm() {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([
    {
      id: "1",
      name: "Programming Languages",
      skills: ["Java", "C++", "Python"],
    },
  ])

  const addSkillGroup = () => {
    setSkillGroups((prev) => [...prev, { id: Date.now().toString(), name: "", skills: [] }])
  }

  const addSkill = (groupId: string) => {
    setSkillGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return { ...group, skills: [...group.skills, ""] }
        }
        return group
      }),
    )
  }

  const removeSkill = (groupId: string, skillIndex: number) => {
    setSkillGroups((prev) =>
      prev.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            skills: group.skills.filter((_, i) => i !== skillIndex),
          }
        }
        return group
      }),
    )
  }

  const removeSkillGroup = (groupId: string) => {
    setSkillGroups((prev) => prev.filter((group) => group.id !== groupId))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skillGroups.map((group) => (
          <div key={group.id} className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 space-y-2">
                <Label htmlFor={`group-${group.id}`}>Skill Group</Label>
                <Input
                  id={`group-${group.id}`}
                  placeholder="e.g., Programming Languages"
                  value={group.name}
                  onChange={(e) => {
                    setSkillGroups((prev) =>
                      prev.map((g) => {
                        if (g.id === group.id) {
                          return { ...g, name: e.target.value }
                        }
                        return g
                      }),
                    )
                  }}
                />
              </div>
              <Button variant="outline" size="icon" className="mt-8" onClick={() => removeSkillGroup(group.id)}>
                <Minus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 pl-4">
              {group.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Skill"
                    value={skill}
                    onChange={(e) => {
                      setSkillGroups((prev) =>
                        prev.map((g) => {
                          if (g.id === group.id) {
                            const newSkills = [...g.skills]
                            newSkills[index] = e.target.value
                            return { ...g, skills: newSkills }
                          }
                          return g
                        }),
                      )
                    }}
                  />
                  <Button variant="outline" size="icon" onClick={() => removeSkill(group.id, index)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button variant="outline" className="w-full justify-start" onClick={() => addSkill(group.id)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full justify-start" onClick={addSkillGroup}>
          <Plus className="mr-2 h-4 w-4" />
          Add Skill Group
        </Button>
      </CardContent>
    </Card>
  )
}

