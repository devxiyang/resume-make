"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { Bold, Italic, Underline } from "lucide-react"
import { useForm } from "@/hooks/use-form"
import { useResume } from "@/context/resume-context"
import { Label } from "@/components/ui/label"
import { EditingSpinner } from "@/components/editing-spinner"
import { useTranslations } from 'next-intl'

export function PersonalInfoForm() {
  const { resumeData, updateResumeData } = useResume()
  const t = useTranslations('personalInfo')

  const form = useForm({
    initialValues: resumeData.personal,
    onSubmit: (values) => {
      updateResumeData({ personal: values })
    },
    onChange: (values) => {
      updateResumeData({ personal: values })
    },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.name) errors.name = t('name.required')
      if (!values.email) errors.email = t('email.required')
      if (!values.jobTitle) errors.jobTitle = t('jobTitle.required')
      return errors
    },
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{t('title')}</CardTitle>
          <EditingSpinner />
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">{t('name.label')}</Label>
            <Input
              id="name"
              value={form.values.name}
              onChange={(e) => form.handleChange('name', e.target.value)}
            />
            {form.touched.name && form.errors.name && (
              <p className="text-sm text-red-500">{form.errors.name}</p>
            )}
          </div>

          <div>
            <Label htmlFor="jobTitle">{t('jobTitle.label')}</Label>
            <Input
              id="jobTitle"
              value={form.values.jobTitle}
              onChange={(e) => form.handleChange('jobTitle', e.target.value)}
            />
            {form.touched.jobTitle && form.errors.jobTitle && (
              <p className="text-sm text-red-500">{form.errors.jobTitle}</p>
            )}
          </div>

          <div>
            <Label htmlFor="email">{t('email.label')}</Label>
            <Input
              id="email"
              type="email"
              value={form.values.email}
              onChange={(e) => form.handleChange('email', e.target.value)}
            />
            {form.touched.email && form.errors.email && (
              <p className="text-sm text-red-500">{form.errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">{t('phone.label')}</Label>
            <Input
              id="phone"
              value={form.values.phone}
              onChange={(e) => form.handleChange('phone', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="address">{t('address.label')}</Label>
            <Input
              id="address"
              value={form.values.address}
              onChange={(e) => form.handleChange('address', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="personalWebsite">{t('personalWebsite.label')}</Label>
            <Input
              id="personalWebsite"
              value={form.values.personalWebsite}
              onChange={(e) => form.handleChange('personalWebsite', e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="summary">{t('summary.label')}</Label>
            <Textarea
              id="summary"
              value={form.values.summary}
              onChange={(e) => form.handleChange('summary', e.target.value)}
              className="h-32"
            />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
