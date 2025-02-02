import { MonitorSmartphone, Sparkles, Layers, Paintbrush2 } from "lucide-react"
import { useTranslations } from 'next-intl'

export function MobileNotice() {
  const t = useTranslations('mobileNotice')

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-8.5rem)] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-background dark:to-background">
      <div className="max-w-md space-y-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 blur-3xl -z-10" />
          <div className="flex justify-center">
            <MonitorSmartphone className="w-16 h-16 stroke-[1.2] text-blue-600/80 dark:text-blue-400/80" />
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('description')}
          </p>
        </div>

        <ul className="space-y-4 text-left">
          <li className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-950/50 dark:to-gray-950/30 border border-white/20 dark:border-white/10 backdrop-blur-sm transition-colors hover:border-blue-500/20">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 shadow-sm border border-white/20 dark:border-white/10">
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-300">{t('features.preview')}</span>
          </li>
          <li className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-950/50 dark:to-gray-950/30 border border-white/20 dark:border-white/10 backdrop-blur-sm transition-colors hover:border-blue-500/20">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 shadow-sm border border-white/20 dark:border-white/10">
              <Layers className="w-5 h-5 text-blue-500" />
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-300">{t('features.editing')}</span>
          </li>
          <li className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-white/50 to-white/30 dark:from-gray-950/50 dark:to-gray-950/30 border border-white/20 dark:border-white/10 backdrop-blur-sm transition-colors hover:border-blue-500/20">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-white to-white/80 dark:from-gray-900 dark:to-gray-900/80 shadow-sm border border-white/20 dark:border-white/10">
              <Paintbrush2 className="w-5 h-5 text-blue-500" />
            </div>
            <span className="font-medium text-gray-600 dark:text-gray-300">{t('features.templates')}</span>
          </li>
        </ul>
      </div>
    </div>
  )
} 