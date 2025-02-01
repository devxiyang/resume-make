import { useState } from "react"
import { Button } from "@/components/ui/button"
import { templates } from "./template-config"
import { sampleData } from "@/lib/sample-data"
import { getPDFTemplate } from "@/lib/pdf-templates"
import pdfMake from "pdfmake/build/pdfmake"

// 配置字体
pdfMake.fonts = {
    NotoSansSC: {
        normal: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYw.ttf',
        bold: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYw.ttf',
        italics: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYw.ttf',
        bolditalics: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaGzjCnYw.ttf'
    }
}

export function PreviewGenerator() {
    const [generatingTemplate, setGeneratingTemplate] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const generatePreview = async (templateId: string) => {
        try {
            setGeneratingTemplate(templateId);

            // 获取模板并生成PDF定义
            const template = getPDFTemplate(templateId);
            const docDefinition = template(sampleData);

            // 生成PDF
            const pdfDocGenerator = pdfMake.createPdf(docDefinition);

            // 下载PDF
            pdfDocGenerator.download(`${templateId}.pdf`);

            setProgress((prev) => prev + (100 / templates.length));
        } catch (error) {
            console.error(`Error generating preview for ${templateId}:`, error);
        } finally {
            setGeneratingTemplate(null);
        }
    };

    const generateAllPreviews = async () => {
        setProgress(0);
        for (const template of templates) {
            await generatePreview(template.id);
        }
    };

    return (
        <div className="p-6">
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Preview Generator</h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Generate preview PDFs for all templates. You can then convert these PDFs to JPGs manually.
                </p>
                <Button onClick={generateAllPreviews} disabled={!!generatingTemplate}>
                    Generate All Previews
                </Button>
            </div>

            {generatingTemplate && (
                <div className="mt-4">
                    <p className="text-sm mb-2">
                        Generating preview for: {generatingTemplate}...
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-primary rounded-full h-2 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            )}

            <div className="mt-6 space-y-4">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                    >
                        <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-sm text-muted-foreground">{template.id}</p>
                        </div>
                        <Button
                            variant="outline"
                            onClick={() => generatePreview(template.id)}
                            disabled={!!generatingTemplate}
                        >
                            Generate Preview
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
} 