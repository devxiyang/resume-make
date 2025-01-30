import { useEffect, useRef, useState } from 'react';
import { ResumeData } from '@/lib/types';

interface ResumePreviewProps {
  data: ResumeData
  forPDF?: boolean
}

export function ResumePreview({ data, forPDF = true }: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const A4_WIDTH = 210;  // mm
  const PADDING = 30;    // px

  const previewContainerStyle = {
    height: "100%",
    overflow: "auto",
    padding: "24px",
    backgroundColor: "#f3f4f6",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    position: "relative" as const,
  }

  const containerStyle = {
    width: forPDF ? `${A4_WIDTH}mm` : "100%",
    backgroundColor: "white",
    padding: `${PADDING}px`,
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    position: "relative" as const,
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
    <div style={previewContainerStyle} className="resume-preview">
      <div style={containerStyle} ref={containerRef}>
        {/* Personal Information */}
        <div style={styles.header}>
          <h1 style={styles.name}>{data.personal.name}</h1>
          <h2 style={styles.jobTitle}>{data.personal.jobTitle}</h2>
          <p style={styles.contact}>
            {data.personal.email} • {data.personal.phone}
            {data.personal.address && ` • ${data.personal.address}`}
            {data.personal.linkedin && ` • ${data.personal.linkedin}`}
          </p>
          {data.personal.summary && (
            <p style={{ ...styles.description, marginTop: "8px" }}>
              {data.personal.summary}
            </p>
          )}
        </div>

        {/* Experience Section */}
        {data.experiences.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Experience</h3>
            <div>
              {data.experiences.map((exp) => (
                <div key={exp.id} style={styles.itemContainer}>
                  <div style={styles.itemHeader}>
                    <h4 style={styles.itemTitle}>{exp.company}</h4>
                    <span style={styles.itemDate}>
                      {exp.startDate} - {exp.currentlyWork ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div style={styles.itemSubtitle}>
                    {exp.position}
                    {exp.city && exp.state && ` • ${exp.city}, ${exp.state}`}
                  </div>
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
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Education</h3>
            <div>
              {data.education.map((edu) => (
                <div key={edu.id} style={styles.itemContainer}>
                  <div style={styles.itemHeader}>
                    <h4 style={styles.itemTitle}>
                      {edu.school}, {edu.state && `, ${edu.state}`}
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
        )}

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Projects</h3>
            <div>
              {data.projects.map((project) => (
                <div key={project.id} style={styles.itemContainer}>
                  <h4 style={styles.itemTitle}>{project.name}</h4>
                  <p style={styles.description}>{project.description}</p>
                  {project.bulletPoints && project.bulletPoints?.length > 0 && (
                    <ul style={styles.bulletList}>
                      {project.bulletPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  )}
                  {project.technologies && (
                    <p style={styles.description}>
                      Technologies: {project.technologies.join(", ")}
                    </p>
                  )}
                  {(project.demoUrl || project.repoUrl) && (
                    <p style={styles.description}>
                      {project.demoUrl && `Demo: ${project.demoUrl} `}
                      {project.repoUrl && `Repo: ${project.repoUrl}`}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Skills</h3>
            <div>
              {data.skills.map((skill) => (
                <div key={skill.id} style={styles.skillGroup}>
                  <span style={styles.skillGroupName}>{skill.name}</span>
                  {skill.description && <p style={styles.description}>{skill.description}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Sections */}
        {data.customSections.map((section) => (
          <div key={section.id} style={styles.section}>
            <h3 style={styles.sectionTitle}>{section.title}</h3>
            <div>
              {section.items.map((item) => (
                <div key={item.id} style={styles.itemContainer}>
                  <div style={styles.itemHeader}>
                    <h4 style={styles.itemTitle}>{item.title}</h4>
                    {item.date && (
                      <span style={styles.itemDate}>{item.date}</span>
                    )}
                  </div>
                  <p style={styles.description}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
