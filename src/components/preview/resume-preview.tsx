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
  forPDF?: boolean
}

export function ResumePreview({ data, forPDF = true }: ResumePreviewProps) {
  const containerStyle = {
    width: forPDF ? "210mm" : "100%", // A4 width for PDF
    margin: "0 auto",
    backgroundColor: "white",
    padding: "48px",
    ...(forPDF && {
      height: "297mm", // A4 height
      overflow: "hidden"
    })
  }

  const styles = {
    header: {
      textAlign: "center" as const,
      marginBottom: "32px"
    },
    name: {
      fontSize: "24px",
      fontWeight: "bold"
    },
    jobTitle: {
      fontSize: "18px",
      fontWeight: "600",
      color: "#666666",
      textTransform: "uppercase" as const
    },
    contact: {
      fontSize: "14px",
      color: "#666666"
    },
    section: {
      marginBottom: "24px"
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      borderBottom: "1px solid #d1d5db",
      paddingBottom: "4px",
      marginBottom: "16px",
      textTransform: "uppercase" as const
    },
    itemContainer: {
      marginBottom: "16px"
    },
    itemHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    },
    itemTitle: {
      fontWeight: "600"
    },
    itemDate: {
      fontSize: "14px"
    },
    itemSubtitle: {
      fontSize: "14px",
      color: "#666666",
      marginBottom: "4px"
    },
    description: {
      fontSize: "14px",
      marginBottom: "8px"
    },
    bulletList: {
      listStyleType: "disc",
      paddingLeft: "20px",
      fontSize: "14px",
      marginTop: "8px"
    },
    skillGroup: {
      marginBottom: "8px"
    },
    skillGroupName: {
      fontWeight: "600"
    },
    skillList: {
      fontSize: "14px"
    }
  }

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.name}>
          {data.personal.firstName} {data.personal.lastName}
        </h1>
        <h2 style={styles.jobTitle}>
          {data.personal.jobTitle}
        </h2>
        <p style={styles.contact}>
          {data.personal.email} • {data.personal.phone} • {data.personal.professionalWebsite} •{" "}
          {data.personal.personalWebsite} • {data.personal.linkedin}
        </p>
      </div>

      {/* Experience Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Experience</h3>
        <div>
          {data.experiences.map((exp) => (
            <div key={exp.id} style={styles.itemContainer}>
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>{exp.company}</h4>
                <span style={styles.itemDate}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </span>
              </div>
              <div style={styles.itemSubtitle}>{exp.position}</div>
              <p style={styles.description}>{exp.description}</p>
              {exp.bulletPoints.length > 0 && (
                <ul style={styles.bulletList}>
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
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Projects</h3>
        <div>
          {data.projects.map((project) => (
            <div key={project.id} style={styles.itemContainer}>
              <h4 style={styles.itemTitle}>{project.name}</h4>
              <p style={styles.description}>{project.description}</p>
              {project.bulletPoints.length > 0 && (
                <ul style={styles.bulletList}>
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
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Education</h3>
        <div>
          {data.education.map((edu) => (
            <div key={edu.id} style={styles.itemContainer}>
              <div style={styles.itemHeader}>
                <h4 style={styles.itemTitle}>
                  {edu.school}, {edu.city}
                  {edu.state && `, ${edu.state}`}
                </h4>
                <span style={styles.itemDate}>
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
              <div style={styles.itemSubtitle}>{edu.degree}</div>
              <p style={styles.description}>{edu.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Section */}
      {data.skills.length > 0 && (
        <div>
          <h3 style={styles.sectionTitle}>Skills</h3>
          <div>
            {data.skills.map((skillGroup) => (
              <div key={skillGroup.id} style={styles.skillGroup}>
                <span style={styles.skillGroupName}>{skillGroup.group}:</span>{" "}
                <span style={styles.skillList}>{skillGroup.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
