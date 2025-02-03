import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"
import { templates } from "./template-config"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useTranslations } from 'next-intl'

interface TemplatePickerProps {
  selectedTemplate: string
  onTemplateSelect: (id: string) => void
}

export function TemplatePicker({ selectedTemplate, onTemplateSelect }: TemplatePickerProps) {
  const t = useTranslations('templates')

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">{t('title')}</h2>
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
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{t(`list.${template.id}.name`)}</h3>
                  <Badge 
                    variant={template.type === 'premium' ? 'default' : 'secondary'} 
                    className="text-xs min-w-[48px] text-center"
                  >
                    {t(`types.${template.type}`)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">{t(`list.${template.id}.description`)}</p>

                {template.preview && (
                  <div className="mt-3 relative">
                    <Image
                      src={template.preview}
                      alt={t(`list.${template.id}.name`)}
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
                  <h4 className="text-xs font-medium mb-1.5">{t('features')}</h4>
                  <ul className="space-y-1">
                    {t.raw(`list.${template.id}.features`).map((feature: string, index: number) => (
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

