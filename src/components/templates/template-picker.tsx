import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { templates } from "./template-config"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { existsSync } from 'fs'
import path from 'path'

interface TemplatePickerProps {
  selectedTemplate: string
  onTemplateSelect: (id: string) => void
}

export function TemplatePicker({ selectedTemplate, onTemplateSelect }: TemplatePickerProps) {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Resume Templates</h2>
      <ScrollArea className="h-[calc(100vh-140px)]">
        <div className="grid grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                selectedTemplate === template.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onTemplateSelect(template.id)}
            >
              <div className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{template.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{template.description}</p>
                  </div>
                  <Badge variant={template.type === 'premium' ? 'default' : 'secondary'} className="text-xs">
                    {template.type}
                  </Badge>
                </div>

                {template.preview && (
                  <div className="mt-3 relative">
                    <Image
                      src={template.preview}
                      alt={template.name}
                      width={210}
                      height={297}
                      className="w-full rounded-md"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.style.display = 'none';
                      }}
                    />
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center rounded-md">
                        <div className="bg-primary text-primary-foreground rounded-full p-1.5">
                          <Check className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-3">
                  <h4 className="text-xs font-medium mb-1.5">Features</h4>
                  <ul className="space-y-1">
                    {template.features.map((feature, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-center">
                        <span className="mr-1.5">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

