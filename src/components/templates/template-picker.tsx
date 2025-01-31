import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { templates } from "./template-config"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"

interface TemplatePickerProps {
  selectedTemplate: string
  onTemplateSelect: (id: string) => void
}

export function TemplatePicker({ selectedTemplate, onTemplateSelect }: TemplatePickerProps) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Resume Templates</h2>
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="grid grid-cols-1 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`relative cursor-pointer overflow-hidden transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              {/* 预览图 */}
              <div className="aspect-[210/297] relative">
                <Image
                  src={template.preview}
                  alt={template.name}
                  width={210}
                  height={297}
                  className="w-full h-full object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-2">
                      <Check className="w-6 h-6" />
                    </div>
                  </div>
                )}
              </div>

              {/* 模板信息 */}
              <div className="p-4 bg-background/90">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <Badge variant={template.type === 'premium' ? 'default' : 'secondary'}>
                    {template.type}
                  </Badge>
                </div>

                {/* 特性列表 */}
                <ul className="mt-3 space-y-1">
                  {template.features.map((feature, index) => (
                    <li key={index} className="text-xs text-muted-foreground flex items-center">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

