"use client"

import { useResume } from "@/context/resume-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useResumeForm, validateExperience } from "@/hooks/use-resume-form"
import { Switch } from "@/components/ui/switch"
import { format } from "date-fns"
import { EditingSpinner } from "@/components/editing-spinner"

export function ExperienceForm() {
  const { resumeData, selectedIds } = useResume()
  const selectedExperience = resumeData.experiences.find(exp => exp.id === selectedIds.experience)

  const form = useResumeForm({
    type: 'experience',
    initialValues: selectedExperience || {
      id: '',
      company: '',
      position: '',
      startDate: format(new Date(), "MMM yyyy"),
      endDate: 'Present',
      currentlyWork: true,
      description: '',
      bulletPoints: [],
    },
    validate: validateExperience,
  })

  console.log('Form values:', form.values)

  const handleAddBulletPoint = () => {
    const newBulletPoints = [...form.values.bulletPoints, '']
    form.handleChange('bulletPoints', newBulletPoints)
  }

  const handleRemoveBulletPoint = (index: number) => {
    const newBulletPoints = form.values.bulletPoints.filter((_, i) => i !== index)
    form.handleChange('bulletPoints', newBulletPoints)
  }

  const handleBulletPointChange = (index: number, value: string) => {
    const newBulletPoints = [...form.values.bulletPoints]
    newBulletPoints[index] = value
    form.handleChange('bulletPoints', newBulletPoints)
  }

  if (!selectedExperience) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500">No experience selected</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Edit Experience</CardTitle>
          <EditingSpinner />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={form.values.company}
              onChange={(e) => form.handleChange('company', e.target.value)}
              onBlur={() => form.handleBlur('company')}
            />
            {form.touched.company && form.errors.company && (
              <p className="text-sm text-red-500">{form.errors.company}</p>
            )}
          </div>

          <div>
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              value={form.values.position}
              onChange={(e) => form.handleChange('position', e.target.value)}
              onBlur={() => form.handleBlur('position')}
            />
            {form.touched.position && form.errors.position && (
              <p className="text-sm text-red-500">{form.errors.position}</p>
            )}
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
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="endDate">End Date</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="currentlyWork"
                    checked={form.values.currentlyWork}
                    onCheckedChange={(checked) => form.handleChange('currentlyWork', checked)}
                  />
                  <Label htmlFor="currentlyWork" className="text-sm text-muted-foreground">
                    I currently work here
                  </Label>
                </div>
              </div>
              <Input
                id="endDate"
                value={form.values.currentlyWork ? 'Present' : form.values.endDate}
                onChange={(e) => {
                  if (!form.values.currentlyWork) {
                    form.handleChange('endDate', e.target.value)
                  }
                }}
                onBlur={() => form.handleBlur('endDate')}
                disabled={form.values.currentlyWork}
                className={form.values.currentlyWork ? "bg-muted" : ""}
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

          <div>
            <div className="flex justify-between items-center mb-2">
              <Label>Bullet Points</Label>
              <Button type="button" variant="outline" onClick={handleAddBulletPoint}>
                Add Bullet Point
              </Button>
            </div>
            {form.values.bulletPoints.map((point, index) => (
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
