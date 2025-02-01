import Link from "next/link"
import { Button } from "@/components/ui/button"

export function MobileNotice() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[calc(100vh-8.5rem)]">
      <div className="max-w-md space-y-6">
        <div className="flex justify-center">
          <svg
            className="w-24 h-24 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold tracking-tight">为获得最佳体验</h2>
        <p className="text-muted-foreground">
          我们建议您使用桌面设备编辑简历。在更大的屏幕上，您可以：
        </p>
        <ul className="space-y-3 text-left">
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 mt-1 text-green-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>实时预览简历效果，所见即所得</span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 mt-1 text-green-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>使用更丰富的编辑功能，轻松调整内容布局</span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="w-5 h-5 mt-1 text-green-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>获得完整的模板预览和自定义选项</span>
          </li>
        </ul>
        <div className="pt-4">
          <Button
            variant="outline"
            className="w-full"
            asChild
          >
            <Link href="/dashboard">
              返回仪表盘
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 