"use client"

import { useResume } from "@/context/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useResumeForm, validateEducation } from "@/hooks/use-resume-form"
import { format } from "date-fns"

export function EducationForm() {
  const { resumeData, selectedIds, addItem, deleteItem } = useResume()
  const selectedEducation = resumeData.education.find(edu => edu.id === selectedIds.education)

  const form = useResumeForm({
    type: 'education',
    initialValues: selectedEducation || {
      id: '',
      school: '',
      degree: '',
      state: '',
      startDate: format(new Date(), "MMM yyyy"),
      endDate: format(new Date(), "MMM yyyy"),
      description: '',
    },
    validate: validateEducation,
  })

  if (!selectedEducation) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 mb-4">No education selected</p>
        <Button onClick={() => addItem('education')}>Add Education</Button>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Edit Education</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => addItem('education')}>
            Add New
          </Button>
          <Button variant="destructive" onClick={() => deleteItem('education', selectedEducation.id)}>
            Delete
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="school">School</Label>
            <Input
              id="school"
              value={form.values.school}
              onChange={(e) => form.handleChange('school', e.target.value)}
              onBlur={() => form.handleBlur('school')}
            />
            {form.touched.school && form.errors.school && (
              <p className="text-sm text-red-500">{form.errors.school}</p>
            )}
          </div>

          <div>
            <Label htmlFor="degree">Degree</Label>
            <Input
              id="degree"
              value={form.values.degree}
              onChange={(e) => form.handleChange('degree', e.target.value)}
              onBlur={() => form.handleBlur('degree')}
            />
            {form.touched.degree && form.errors.degree && (
              <p className="text-sm text-red-500">{form.errors.degree}</p>
            )}
          </div>

          <div>
            <Label htmlFor="state">Location</Label>
            <Input
              id="state"
              value={form.values.state}
              onChange={(e) => form.handleChange('state', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                value={form.values.startDate}
                onChange={(e) => form.handleChange('startDate', e.target.value)}
                onBlur={() => form.handleBlur('startDate')}
              />
              {form.touched.startDate && form.errors.startDate && (
                <p className="text-sm text-red-500">{form.errors.startDate}</p>
              )}
            </div>

            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                value={form.values.endDate}
                onChange={(e) => form.handleChange('endDate', e.target.value)}
                onBlur={() => form.handleBlur('endDate')}
              />
              {form.touched.endDate && form.errors.endDate && (
                <p className="text-sm text-red-500">{form.errors.endDate}</p>
              )}
            </div>
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
