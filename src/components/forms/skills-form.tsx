"use client"

import { useResume } from "@/context/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useResumeForm, validateSkill } from "@/hooks/use-resume-form"
import { Skill } from "@/lib/types"

export function SkillsForm() {
  const { resumeData, selectedIds, addItem, deleteItem } = useResume()
  const selectedSkill = resumeData.skills.find(skill => skill.id === selectedIds.skill)

  const form = useResumeForm<Skill>({
    type: 'skill',
    initialValues: selectedSkill || {
      id: '',
      name: '',
      description: '',
    },
    validate: validateSkill,
  })

  if (!selectedSkill) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 mb-4">No skill selected</p>
        <Button onClick={() => addItem('skill')}>Add Skill</Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Skill</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => addItem('skill')}>
            Add New
          </Button>
          <Button variant="destructive" onClick={() => deleteItem('skill', selectedSkill.id)}>
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Skill Name</Label>
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
              className="h-24"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
