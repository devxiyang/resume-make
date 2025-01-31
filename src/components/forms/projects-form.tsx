"use client"

import { useResume } from "@/context/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useResumeForm, validateProject } from "@/hooks/use-resume-form"
import { Project } from "@/lib/types"

export function ProjectsForm() {
  const { resumeData, selectedIds, addItem, deleteItem } = useResume()
  const selectedProject = resumeData.projects.find(proj => proj.id === selectedIds.project)

  const form = useResumeForm<Project>({
    type: 'project',
    initialValues: selectedProject || {
      id: '',
      name: '',
      description: '',
      bulletPoints: [],
      technologies: [],
    },
    validate: validateProject,
  })

  const handleAddBulletPoint = () => {
    const newBulletPoints = [...(form.values.bulletPoints || []), '']
    form.handleChange('bulletPoints', newBulletPoints)
  }

  const handleRemoveBulletPoint = (index: number) => {
    const newBulletPoints = (form.values.bulletPoints || []).filter((_, i) => i !== index)
    form.handleChange('bulletPoints', newBulletPoints)
  }

  const handleBulletPointChange = (index: number, value: string) => {
    const newBulletPoints = [...(form.values.bulletPoints || [])]
    newBulletPoints[index] = value
    form.handleChange('bulletPoints', newBulletPoints)
  }

  const handleAddTechnology = () => {
    const newTechnologies = [...(form.values.technologies || []), '']
    form.handleChange('technologies', newTechnologies)
  }

  const handleRemoveTechnology = (index: number) => {
    const newTechnologies = (form.values.technologies || []).filter((_, i) => i !== index)
    form.handleChange('technologies', newTechnologies)
  }

  const handleTechnologyChange = (index: number, value: string) => {
    const newTechnologies = [...(form.values.technologies || [])]
    newTechnologies[index] = value
    form.handleChange('technologies', newTechnologies)
  }

  if (!selectedProject) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 mb-4">No project selected</p>
        <Button onClick={() => addItem('project')}>Add Project</Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Project</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => addItem('project')}>
            Add New
          </Button>
          <Button variant="destructive" onClick={() => deleteItem('project', selectedProject.id)}>
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={form.values.name}
              onChange={(e) => form.handleChange('name', e.target.value)}
              onBlur={() => form.handleBlur('name')}
            />
            {form.touched.name && form.errors.name && (
              <p className="text-sm text-red-500">{form.errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.values.description}
              onChange={(e) => form.handleChange('description', e.target.value)}
              onBlur={() => form.handleBlur('description')}
              className="h-24"
            />
            {form.touched.description && form.errors.description && (
              <p className="text-sm text-red-500">{form.errors.description}</p>
            )}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Technologies Used</Label>
              <Button type="button" variant="outline" onClick={handleAddTechnology}>
                Add Technology
              </Button>
            </div>
            {(form.values.technologies || []).map((tech, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <Input
                  value={tech}
                  onChange={(e) => handleTechnologyChange(index, e.target.value)}
                  placeholder={`Technology ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveTechnology(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Bullet Points</Label>
              <Button type="button" variant="outline" onClick={handleAddBulletPoint}>
                Add Bullet Point
              </Button>
            </div>
            {(form.values.bulletPoints || []).map((point, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <Input
                  value={point}
                  onChange={(e) => handleBulletPointChange(index, e.target.value)}
                  placeholder={`Bullet point ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => handleRemoveBulletPoint(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
