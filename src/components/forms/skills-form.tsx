"use client"

import { useResume } from "@/context/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useResumeForm, validateSkill } from "@/hooks/use-resume-form"
import { Skill } from "@/lib/types"

export function SkillsForm() {
  const { resumeData, selectedIds } = useResume()
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
        <p className="text-gray-500">No skill selected</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Skill</CardTitle>
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
