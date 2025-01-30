"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Bold, Italic, Underline } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Education {
  id: string
  school: string
  degree: string
  field: string
  city: string
  state: string
  startDate: string
  endDate: string
  description: string
}

interface EducationFormProps {
  educationId: string | null
  onSave: (education: Education) => void
}

export function EducationForm({ }: EducationFormProps) {
  const education = {
    id: "1",
    school: "University of Shanghai for Secience and Technology",
    degree: "Master",
    field: "CS",
    city: "Shanghai",
    state: "",
    startDate: "09/2014",
    endDate: "06/2017",
    description: "CS",
  }

  // const _handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   onSave(education);
  // }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="school">School</Label>
          <Input id="school" placeholder="School name" defaultValue={education.school} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="degree">Degree</Label>
            <Select defaultValue={education.degree}>
              <SelectTrigger>
                <SelectValue placeholder="Select degree" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="associate">Associate&apos;s</SelectItem>
                <SelectItem value="bachelor">Bachelor&apos;s</SelectItem>
                <SelectItem value="master">Master&apos;s</SelectItem>
                <SelectItem value="doctorate">Doctorate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="field">Field of Study</Label>
            <Input id="field" placeholder="Field of study" defaultValue={education.field} />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input id="startDate" placeholder="MM/YYYY" defaultValue={education.startDate} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input id="endDate" placeholder="MM/YYYY" defaultValue={education.endDate} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input id="city" placeholder="City" defaultValue={education.city} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" placeholder="State" defaultValue={education.state} />
          </div>
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
          <Textarea
            id="description"
            placeholder="Add additional details about your education"
            defaultValue={education.description}
          />
        </div>
        <Button type="submit">Save Changes</Button>
      </CardContent>
    </Card>
  )
}

