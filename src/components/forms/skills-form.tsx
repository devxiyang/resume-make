"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { Minus, Plus } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  skillGroups: z.array(z.object({
    id: z.string(),
    name: z.string().min(2, {
      message: "Group name must be at least 2 characters.",
    }),
    skills: z.array(z.string())
  }))
})

type FormValues = z.infer<typeof formSchema>

interface SkillsFormProps {
  onSave: (skillGroups: Array<{id: string, name: string, skills: string[]}>) => void
}

export function SkillsForm({ onSave }: SkillsFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillGroups: [
        {
          id: "1",
          name: "Programming Languages",
          skills: ["Java", "C++", "Python"]
        }
      ]
    }
  })

  const { fields: skillGroups, append: appendGroup, remove: removeGroup } = useFieldArray({
    name: "skillGroups",
    control: form.control
  })

  const addSkillGroup = (): void => {
    appendGroup({ id: Date.now().toString(), name: "", skills: [] })
  }

  const addSkill = (groupIndex: number): void => {
    const currentSkills: string[] = form.getValues(`skillGroups.${groupIndex}.skills`)
    form.setValue(`skillGroups.${groupIndex}.skills`, [...currentSkills, ""])
  }

  const removeSkill = (groupIndex: number, skillIndex: number): void => {
    const currentSkills: string[] = form.getValues(`skillGroups.${groupIndex}.skills`)
    form.setValue(
      `skillGroups.${groupIndex}.skills`,
      currentSkills.filter((_, i) => i !== skillIndex)
    )
  }

  function onSubmit(values: FormValues) {
    onSave(values.skillGroups)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {skillGroups.map((group, groupIndex: number) => (
              <div key={group.id} className="space-y-4">
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`skillGroups.${groupIndex}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Skill Group</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Programming Languages" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="mt-8"
                    onClick={() => removeGroup(groupIndex)}
                    type="button"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 pl-4">
                  {form.watch(`skillGroups.${groupIndex}.skills`).map((skill: string, skillIndex: number) => (
                    <div key={skillIndex} className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`skillGroups.${groupIndex}.skills.${skillIndex}`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input placeholder="Skill" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button 
                        variant="outline" 
                        size="icon"
                        type="button"
                        onClick={() => removeSkill(groupIndex, skillIndex)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => addSkill(groupIndex)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                </div>
              </div>
            ))}
            <Button
              type="button" 
              variant="outline"
              className="w-full justify-start"
              onClick={addSkillGroup}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Skill Group
            </Button>
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
