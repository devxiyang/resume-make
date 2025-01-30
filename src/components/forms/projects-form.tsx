"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Bold, Italic, Underline, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.", 
  }),
  bulletPoints: z.array(z.string()).default([]),
})

type FormValues = z.infer<typeof formSchema>

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

export function ProjectsForm({ projectId, onSave }: ProjectsFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "AI Platform",
      description: "build ai platform from zero to one",
      bulletPoints: [],
    },
  })

  function onSubmit(values: FormValues) {
    const project: Project = {
      id: projectId || "new",
      ...values,
    }
    onSave(project)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Project</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
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
                  <FormControl>
                    <Textarea placeholder="Describe your project" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bulletPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Achievements</FormLabel>
                  {field.value.map((point, index) => (
                    <div key={index} className="flex gap-2 mt-2">
                      <FormControl>
                        <Textarea
                          value={point}
                          onChange={(e) => {
                            const newBulletPoints = [...field.value]
                            newBulletPoints[index] = e.target.value
                            field.onChange(newBulletPoints)
                          }}
                          className="flex-1"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newBulletPoints = field.value.filter((_, i) => i !== index)
                          field.onChange(newBulletPoints)
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => field.onChange([...field.value, ""])}
                    className="w-full mt-2 justify-start"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Achievement
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
