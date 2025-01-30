import { FileEdit, Layout } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface NavTabsProps {
  activeTab: "edit" | "template"
  onTabChange: (tab: "edit" | "template") => void
}

export function NavTabs({ activeTab, onTabChange }: NavTabsProps) {
  return (
    <div className="w-[72px] border-r border-gray-200 bg-gray-50/50">
      <div className="flex flex-col items-center gap-1 p-2">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full h-full aspect-square flex flex-col items-center justify-center gap-1",
            activeTab === "edit" && "bg-gray-100",
          )}
          onClick={() => onTabChange("edit")}
        >
          <FileEdit className="h-5 w-5" />
          <span className="text-[11px]">Edit</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "w-full h-full aspect-square flex flex-col items-center justify-center gap-1",
            activeTab === "template" && "bg-gray-100",
          )}
          onClick={() => onTabChange("template")}
        >
          <Layout className="h-5 w-5" />
          <span className="text-[11px]">Template</span>
        </Button>
      </div>
    </div>
  )
}

