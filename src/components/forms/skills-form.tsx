"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect } from "react"
import { type Skill } from '@/lib/types'

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Skill name must be at least 2 characters.",
  }),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface SkillsFormProps {
  skillId: string | null;
  onSave: (skill: Skill) => void;
  initialData?: Skill;
}

export function SkillsForm({ skillId, onSave, initialData }: SkillsFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        description: initialData.description || "",
      })
    }
  }, [initialData, form])

  function onSubmit(values: FormValues) {
    const skill: Skill = {
      id: skillId || "new",
      name: values.name,
      description: values.description,
    }
    onSave(skill)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Skill</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skill Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter skill name" {...field} />
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
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your skill level or additional details" 
                      {...field} 
                    />
                  </FormControl>
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
