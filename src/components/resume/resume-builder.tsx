"use client"

import { useState } from "react"
import { Link, Mail, MapPin, Phone, Plus, Trash2, X, Printer } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ResumeData, Experience, Education, Skill } from "@/types/resume"

const templates: { [key: string]: ResumeData } = {
  software_engineer: {
    personalDetails: {
      name: "Alex Johnson",
      role: "Software Engineer",
      location: "San Francisco, CA",
      email: "alex@example.com",
      phone: "(123) 456-7890",
      url: "https://alexjohnson.dev",
    },
    about: "Passionate software engineer with 5+ years of experience in developing scalable web applications.",
    experiences: [
      {
        id: "1",
        employer: "Tech Solutions Inc.",
        position: "Senior Software Engineer",
        period: "2018 - Present",
        description:
          "Lead developer for cloud-based SaaS products, focusing on performance optimization and scalability.",
      },
      {
        id: "2",
        employer: "StartUp Innovations",
        position: "Full Stack Developer",
        period: "2015 - 2018",
        description: "Developed and maintained multiple client-facing web applications using React and Node.js.",
      },
    ],
    education: [
      {
        id: "1",
        school: "University of Technology",
        degree: "B.S. in Computer Science",
        period: "2011 - 2015",
      },
    ],
    skills: [
      { id: "1", name: "JavaScript" },
      { id: "2", name: "React" },
      { id: "3", name: "Node.js" },
      { id: "4", name: "Python" },
      { id: "5", name: "AWS" },
    ],
  },
  // You can add more templates here
}

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalDetails: {
      name: "",
      role: "",
      location: "",
      email: "",
      phone: "",
      url: "",
    },
    about: "",
    experiences: [{ id: "1", employer: "", position: "", period: "", description: "" }],
    education: [{ id: "1", school: "", degree: "", period: "" }],
    skills: [],
  })

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experiences: [
        ...resumeData.experiences,
        { id: Date.now().toString(), employer: "", position: "", period: "", description: "" },
      ],
    })
  }

  const removeExperience = (id: string) => {
    if (resumeData.experiences.length > 1) {
      setResumeData({
        ...resumeData,
        experiences: resumeData.experiences.filter((exp) => exp.id !== id),
      })
    }
  }

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, { id: Date.now().toString(), school: "", degree: "", period: "" }],
    })
  }

  const removeEducation = (id: string) => {
    if (resumeData.education.length > 1) {
      setResumeData({
        ...resumeData,
        education: resumeData.education.filter((edu) => edu.id !== id),
      })
    }
  }

  const addSkill = (skillName: string) => {
    if (skillName.trim() !== "") {
      setResumeData({
        ...resumeData,
        skills: [...resumeData.skills, { id: Date.now().toString(), name: skillName.trim() }],
      })
    }
  }

  const removeSkill = (id: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill.id !== id),
    })
  }

  const applyTemplate = (templateName: string) => {
    if (templates[templateName]) {
      setResumeData(templates[templateName])
    }
  }

  return (
    <div className="min-h-screen bg-blue-500 p-4">
      <div className="mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <div className="mb-6">
          <Select onValueChange={applyTemplate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Choose template" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="software_engineer">Software Engineer</SelectItem>
              {/* Add more templates here */}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column - Photo and Personal Info */}
          <div className="col-span-1 space-y-6">
            {/* Profile Picture */}
            <div className="relative mx-auto w-48 h-48">
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center text-gray-500 text-sm">
                <div className="text-center">
                  <div>Select your picture</div>
                  <div>↓</div>
                </div>
              </div>
            </div>

            {/* About Me Section */}
            <div className="space-y-2">
              <h2 className="text-sm font-semibold tracking-wide text-gray-900">ABOUT ME</h2>
              <textarea
                placeholder="Enter your professional summary"
                className="w-full h-32 p-2 text-sm border rounded-md resize-none"
                value={resumeData.about}
                onChange={(e) => setResumeData({ ...resumeData, about: e.target.value })}
              />
            </div>

            {/* Personal Details Section */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold tracking-wide text-gray-900">PERSONAL DETAILS</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Enter Location"
                    className="text-sm"
                    value={resumeData.personalDetails.location}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        personalDetails: { ...resumeData.personalDetails, location: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Enter your email"
                    className="text-sm"
                    value={resumeData.personalDetails.email}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        personalDetails: { ...resumeData.personalDetails, email: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Enter your phone"
                    className="text-sm"
                    value={resumeData.personalDetails.phone}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        personalDetails: { ...resumeData.personalDetails, phone: e.target.value },
                      })
                    }
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Link className="w-4 h-4 text-gray-500" />
                  <Input
                    placeholder="Enter URL"
                    className="text-sm"
                    value={resumeData.personalDetails.url}
                    onChange={(e) =>
                      setResumeData({
                        ...resumeData,
                        personalDetails: { ...resumeData.personalDetails, url: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <Input
                placeholder="Your Name"
                className="text-3xl font-bold text-blue-500 border-none p-0 h-auto"
                value={resumeData.personalDetails.name}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personalDetails: { ...resumeData.personalDetails, name: e.target.value },
                  })
                }
              />
              <Input
                placeholder="YOUR ROLE"
                className="text-sm font-medium text-gray-600 border-none p-0 h-auto"
                value={resumeData.personalDetails.role}
                onChange={(e) =>
                  setResumeData({
                    ...resumeData,
                    personalDetails: { ...resumeData.personalDetails, role: e.target.value },
                  })
                }
              />
            </div>

            {/* Experience Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold tracking-wide text-gray-900">EXPERIENCE</h2>
                <Button variant="ghost" size="sm" onClick={addExperience} className="text-blue-500 hover:text-blue-700">
                  <Plus className="w-4 h-4" />
                  Add Experience
                </Button>
              </div>

              {resumeData.experiences.map((exp, index) => (
                <div key={exp.id} className="space-y-2 border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <Input
                      placeholder="Employer"
                      className="text-sm"
                      value={exp.employer}
                      onChange={(e) => {
                        const newExperiences = [...resumeData.experiences]
                        newExperiences[index].employer = e.target.value
                        setResumeData({ ...resumeData, experiences: newExperiences })
                      }}
                    />
                    {resumeData.experiences.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeExperience(exp.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-between gap-4">
                    <Input
                      placeholder="POSITION"
                      className="text-sm flex-grow"
                      value={exp.position}
                      onChange={(e) => {
                        const newExperiences = [...resumeData.experiences]
                        newExperiences[index].position = e.target.value
                        setResumeData({ ...resumeData, experiences: newExperiences })
                      }}
                    />
                    <Input
                      placeholder="From - Until"
                      className="text-sm w-32"
                      value={exp.period}
                      onChange={(e) => {
                        const newExperiences = [...resumeData.experiences]
                        newExperiences[index].period = e.target.value
                        setResumeData({ ...resumeData, experiences: newExperiences })
                      }}
                    />
                  </div>
                  <textarea
                    placeholder="Enter your work experience description"
                    className="w-full h-24 p-2 text-sm border rounded-md resize-none"
                    value={exp.description}
                    onChange={(e) => {
                      const newExperiences = [...resumeData.experiences]
                      newExperiences[index].description = e.target.value
                      setResumeData({ ...resumeData, experiences: newExperiences })
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Education Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-semibold tracking-wide text-gray-900">EDUCATION</h2>
                <Button variant="ghost" size="sm" onClick={addEducation} className="text-blue-500 hover:text-blue-700">
                  <Plus className="w-4 h-4" />
                  Add Education
                </Button>
              </div>

              {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="space-y-2 border-b pb-4 last:border-0">
                  <div className="flex justify-between items-start">
                    <Input
                      placeholder="School"
                      className="text-sm"
                      value={edu.school}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education]
                        newEducation[index].school = e.target.value
                        setResumeData({ ...resumeData, education: newEducation })
                      }}
                    />
                    {resumeData.education.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeEducation(edu.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="flex justify-between gap-4">
                    <Input
                      placeholder="DEGREE"
                      className="text-sm flex-grow"
                      value={edu.degree}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education]
                        newEducation[index].degree = e.target.value
                        setResumeData({ ...resumeData, education: newEducation })
                      }}
                    />
                    <Input
                      placeholder="From - Until"
                      className="text-sm w-32"
                      value={edu.period}
                      onChange={(e) => {
                        const newEducation = [...resumeData.education]
                        newEducation[index].period = e.target.value
                        setResumeData({ ...resumeData, education: newEducation })
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h2 className="text-sm font-semibold tracking-wide text-gray-900">SKILLS</h2>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                    <span className="text-sm">{skill.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeSkill(skill.id)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter skill"
                  className="text-sm"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      addSkill(e.currentTarget.value)
                      e.currentTarget.value = ""
                    }
                  }}
                />
                <Button
                  onClick={() => {
                    const input = document.querySelector('input[placeholder="Enter skill"]') as HTMLInputElement
                    if (input) {
                      addSkill(input.value)
                      input.value = ""
                    }
                  }}
                >
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Button onClick={() => window.print()} className="fixed bottom-4 right-4 print:hidden">
          <Printer className="w-4 h-4 mr-2" />
          Print Resume
        </Button>
      </div>
    </div>
  )
}