"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline, Plus, Minus } from "lucide-react"
import { useState } from "react"

interface Project {
  id: string
  name: string
  description: string
  bulletPoints: string[]
}

interface ProjectsFormProps {
  projectId: string | null
  onSave: (project: Project) => void
}

export function ProjectsForm({ onSave }: ProjectsFormProps) {
  const [project, setProject] = useState<Project>({
    id: "1",
    name: "AI Platform",
    description: "build ai platform from zero to one",
    bulletPoints: [],
  })

  const addBulletPoint = () => {
    setProject((prev) => ({
      ...prev,
      bulletPoints: [...prev.bulletPoints, ""],
    }))
  }

  const removeBulletPoint = (index: number) => {
    setProject((prev) => ({
      ...prev,
      bulletPoints: prev.bulletPoints.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(project);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Project</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input id="name" placeholder="Project name" defaultValue={project.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <div className="flex gap-1 mb-2">
              <Button variant="outline" size="icon">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Underline className="h-4 w-4" />
              </Button>
            </div>
            <Textarea id="description" placeholder="Describe your project" defaultValue={project.description} />
          </div>
          <div className="space-y-2">
            <Label>Key Achievements</Label>
            {project.bulletPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={point}
                  onChange={(e) => {
                    const newPoints = [...project.bulletPoints]
                    newPoints[index] = e.target.value
                    setProject((prev) => ({ ...prev, bulletPoints: newPoints }))
                  }}
                />
                <Button variant="outline" size="icon" onClick={() => removeBulletPoint(index)}>
                  <Minus className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" className="w-full justify-start" onClick={addBulletPoint}>
              <Plus className="mr-2 h-4 w-4" />
              Add Achievement
            </Button>
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  )
}

