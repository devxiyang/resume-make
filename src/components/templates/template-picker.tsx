import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

const templates = [
  { id: "sharp", name: "Sharp", type: "free" },
  { id: "modern", name: "Modern", type: "free" },
  { id: "clean", name: "Clean", type: "premium" },
  { id: "fresh", name: "Fresh", type: "premium" },
  { id: "pure", name: "Pure", type: "premium" },
  { id: "boston", name: "Boston", type: "premium" },
]

interface TemplatePickerProps {
  selectedTemplate: string
  onTemplateSelect: (id: string) => void
}

export function TemplatePicker({ selectedTemplate, onTemplateSelect }: TemplatePickerProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Resume Templates</h2>
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`relative cursor-pointer overflow-hidden ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <div className="aspect-[210/297]">
                <Image
                  src="/placeholder.svg?height=297&width=210"
                  alt={template.name}
                  width={210}
                  height={297}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-background/90 flex justify-between items-center">
                <span className="text-sm font-medium">{template.name}</span>
                {template.type === "premium" && (
                  <span className="text-xs bg-yellow-500/20 text-yellow-700 px-2 py-0.5 rounded">Premium</span>
                )}
                {template.type === "free" && (
                  <span className="text-xs bg-blue-500/20 text-blue-700 px-2 py-0.5 rounded">Free</span>
                )}
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

