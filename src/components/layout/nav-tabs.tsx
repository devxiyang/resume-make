import { FileEdit, Layout, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'

interface NavTabsProps {
  activeTab: "edit" | "template"
  onTabChange: (tab: "edit" | "template") => void
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  const t = useTranslations('navigation')

  return (
    <div className="border-r bg-muted">
      <div className="flex flex-col items-center gap-2 py-4">
        <button
          className={cn(
            "p-2 rounded-lg transition-colors",
            activeTab === "edit"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/40"
          )}
          onClick={() => onTabChange("edit")}
          title={t('tabs.edit')}
        >
          <Pencil className="h-5 w-5" />
        </button>
        <button
          className={cn(
            "p-2 rounded-lg transition-colors",
            activeTab === "template"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/40"
          )}
          onClick={() => onTabChange("template")}
          title={t('tabs.template')}
        >
          <Layout className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

