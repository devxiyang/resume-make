'use client'

import { useResume } from "@/context/resume-context"
import { useTranslations } from "next-intl"

export function EditingSpinner() {
  const { isEditing } = useResume()
  const t = useTranslations()

  if (!isEditing) return null

  return (
    <div className="flex items-center gap-2">
      <div className="h-4 w-4">
        <div className="animate-spin h-4 w-4 rounded-full border-2 border-green-500 border-t-transparent" />
      </div>
      <span className="text-xs text-green-600 font-medium">{t('builder.status.editing')}</span>
    </div>
  )
} 