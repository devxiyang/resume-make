"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { type CustomSection } from '@/lib/types'
import { useEffect } from "react"
import { Plus, Minus } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Section title must be at least 2 characters.",
  }),
  items: z.array(z.object({
    id: z.string(),
    title: z.string().min(2, {
      message: "Item title must be at least 2 characters.",
    }),
    description: z.string(),
    date: z.string().optional(),
  }))
})

type FormValues = z.infer<typeof formSchema>

interface CustomSectionFormProps {
  sectionId: string | null;
  onSave: (section: CustomSection) => void;
  initialData?: CustomSection;
}

export function CustomSectionForm({ sectionId, onSave, initialData }: CustomSectionFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      items: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "items",
    control: form.control,
  })

  useEffect(() => {
    if (initialData) {
      form.reset({
        title: initialData.title,
        items: initialData.items,
      })
    }
  }, [initialData, form])

  function onSubmit(values: FormValues) {
    const section: CustomSection = {
      id: sectionId || "new",
      title: values.title,
      items: values.items,
    }
    onSave(section)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Custom Section</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter section title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <FormLabel>Items</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ id: `item-${Date.now()}`, title: "", description: "", date: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <FormField
                      control={form.control}
                      name={`items.${index}.title`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Item title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="mt-8 hover:text-red-500"
                      onClick={() => remove(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name={`items.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., 2023 or 2020-2022" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`items.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Describe this item" 
                            className="min-h-[100px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>

            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
} 