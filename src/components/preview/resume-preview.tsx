interface ResumeData {
    personal: {
      firstName: string
      lastName: string
      jobTitle: string
      email: string
      phone: string
      linkedin: string
      professionalWebsite: string
      personalWebsite: string
      summary: string
    }
    experiences: Array<{
      id: string
      company: string
      position: string
      startDate: string
      endDate: string
      description: string
      bulletPoints: string[]
    }>
    education: Array<{
      id: string
      school: string
      degree: string
      field: string
      startDate: string
      endDate: string
      city: string
      state: string
      description: string
    }>
    projects: Array<{
      id: string
      name: string
      description: string
      bulletPoints: string[]
    }>
    skills: Array<{
      id: string
      group: string
      skills: string[]
    }>
  }
  
  interface ResumePreviewProps {
    data: ResumeData
  }
  
  export function ResumePreview({ data }: ResumePreviewProps) {
    return (
      <div className="w-full max-w-[800px] mx-auto bg-white p-12 shadow-sm">
        {/* Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl font-bold">
            {data.personal.firstName} {data.personal.lastName}
          </h1>
          <h2 className="text-xl font-semibold text-gray-600 uppercase">{data.personal.jobTitle}</h2>
          <p className="text-sm text-gray-600">
            {data.personal.email} • {data.personal.phone} • {data.personal.professionalWebsite} •{" "}
            {data.personal.personalWebsite} • {data.personal.linkedin}
          </p>
        </div>
  
        {/* Experience Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-4 uppercase">Experience</h3>
          <div className="space-y-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">{exp.company}</h4>
                  <span className="text-sm">
                    {exp.startDate} - {exp.endDate || "Present"}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mb-1">{exp.position}</div>
                <p className="text-sm mb-2">{exp.description}</p>
                {exp.bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside text-sm">
                    {exp.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Projects Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-4 uppercase">Projects</h3>
          <div className="space-y-4">
            {data.projects.map((project) => (
              <div key={project.id}>
                <h4 className="font-semibold">{project.name}</h4>
                <p className="text-sm">{project.description}</p>
                {project.bulletPoints.length > 0 && (
                  <ul className="list-disc list-inside text-sm mt-2">
                    {project.bulletPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
  
        {/* Education Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-4 uppercase">Education</h3>
          <div className="space-y-4">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold">
                    {edu.school}, {edu.city}
                    {edu.state && `, ${edu.state}`}
                  </h4>
                  <span className="text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-sm text-gray-600">{edu.degree}</div>
                <p className="text-sm">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* Skills Section */}
        {data.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-4 uppercase">Skills</h3>
            <div className="space-y-2">
              {data.skills.map((skillGroup) => (
                <div key={skillGroup.id}>
                  <span className="font-semibold">{skillGroup.group}:</span>{" "}
                  <span className="text-sm">{skillGroup.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
  
  