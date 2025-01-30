"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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

interface SkillGroup {
  id: string
  name: string
  skills: string[]
}

export function SkillsForm() {
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

  const { fields: skillGroups, append: appendGroup, remove: removeGroup } = form.useFieldArray({
    name: "skillGroups"
  })

  const addSkillGroup = () => {
    appendGroup({ id: Date.now().toString(), name: "", skills: [] })
  }

  const addSkill = (groupIndex: number) => {
    const currentSkills = form.getValues(`skillGroups.${groupIndex}.skills`)
    form.setValue(`skillGroups.${groupIndex}.skills`, [...currentSkills, ""])
  }

  const removeSkill = (groupIndex: number, skillIndex: number) => {
    const currentSkills = form.getValues(`skillGroups.${groupIndex}.skills`)
    form.setValue(
      `skillGroups.${groupIndex}.skills`,
      currentSkills.filter((_, i) => i !== skillIndex)
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6">
            {skillGroups.map((group, groupIndex) => (
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
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2 pl-4">
                  {form.watch(`skillGroups.${groupIndex}.skills`).map((skill, skillIndex) => (
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
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
