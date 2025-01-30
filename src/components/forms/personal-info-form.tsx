"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function PersonalInfoForm() {
  return (
    <div className="max-w-[800px]">
      <h1 className="text-2xl font-semibold mb-8">Edit Personal Information</h1>
      <div className="space-y-8">
        <div className="space-y-4">
          <Label htmlFor="job-title">Job title</Label>
          <Input id="job-title" placeholder="Your job title" defaultValue="ML Engineering Expert" className="h-12" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="first-name">First name</Label>
            <Input id="first-name" placeholder="First name" defaultValue="Xiyang" className="h-12" />
          </div>
          <div className="space-y-4">
            <Label htmlFor="last-name">Last name</Label>
            <Input id="last-name" placeholder="Last name" defaultValue="Dev" className="h-12" />
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="email">Email address</Label>
          <Input id="email" type="email" placeholder="Email" defaultValue="murphyxiaoxi@163.com" className="h-12" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="phone">Phone number</Label>
            <Input id="phone" placeholder="Phone" defaultValue="123456" className="h-12" />
          </div>
          <div className="space-y-4">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input id="linkedin" placeholder="LinkedIn URL" defaultValue="linkedin.com/xiyang" className="h-12" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label htmlFor="professional-website">Professional website</Label>
            <Input id="professional-website" placeholder="Website URL" defaultValue="devxiyang.com" className="h-12" />
          </div>
          <div className="space-y-4">
            <Label htmlFor="personal-website">Personal website</Label>
            <Input id="personal-website" placeholder="Website URL" defaultValue="devxiyang.com" className="h-12" />
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="summary">Summary</Label>
          <div className="flex gap-2 mb-2">
            <Button variant="outline" size="sm" className="h-8 px-3 font-medium">
              B
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 italic font-medium">
              I
            </Button>
            <Button variant="outline" size="sm" className="h-8 px-3 underline font-medium">
              U
            </Button>
          </div>
          <Textarea id="summary" placeholder="Add your summary or objective here" className="min-h-[120px]" />
        </div>
      </div>
    </div>
  )
}

