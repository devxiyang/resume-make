"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Bold, Italic, Underline } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const formSchema = z.object({
  school: z.string().min(2, {
    message: "School name must be at least 2 characters.",
  }),
  degree: z.string().min(1, {
    message: "Please select a degree.",
  }),
  field: z.string().min(2, {
    message: "Field of study must be at least 2 characters.",
  }),
  city: z.string().optional(),
  state: z.string().optional(),
  startDate: z.string().min(7, {
    message: "Please enter a valid start date (MM/YYYY).",
  }),
  endDate: z.string().min(7, {
    message: "Please enter a valid end date (MM/YYYY).",
  }),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

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

export function EducationForm({ educationId, onSave }: EducationFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: "University of Shanghai for Science and Technology",
      degree: "master",
      field: "CS",
      city: "Shanghai",
      state: "",
      startDate: "09/2014",
      endDate: "06/2017",
      description: "CS",
    },
  })

  function onSubmit(values: FormValues) {
    const education: Education = {
      id: educationId || "new",
      ...values,
    }
    onSave(education)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Education</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="school"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School</FormLabel>
                  <FormControl>
                    <Input placeholder="School name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="degree"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Degree</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select degree" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="associate">Associate&apos;s</SelectItem>
                        <SelectItem value="bachelor">Bachelor&apos;s</SelectItem>
                        <SelectItem value="master">Master&apos;s</SelectItem>
                        <SelectItem value="doctorate">Doctorate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="field"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="Field of study" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YYYY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Date</FormLabel>
                    <FormControl>
                      <Input placeholder="MM/YYYY" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <div className="flex gap-1 mb-2">
                    <Button type="button" variant="outline" size="icon">
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon">
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button type="button" variant="outline" size="icon">
                      <Underline className="h-4 w-4" />
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Add additional details about your education"
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
