'use client';

import { JSX, useRef, useState, useEffect } from 'react';
import { ResumeData } from '@/lib/types';
import { PDFViewer } from '@react-pdf/renderer';
import { PDFPreview } from './pdf-preview';

interface ResumePreviewProps {
  data: ResumeData
}

export function ResumePreview({ data}: ResumePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [pages, setPages] = useState<number>(1);

  const A4_WIDTH = 210;  // mm
  const A4_HEIGHT = 297; // mm
  const PADDING = 30;    // px

  const previewContainerStyle = {
    height: "100%",
    overflowY: "scroll",
    padding: "24px",
    backgroundColor: "#f3f4f6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    '@media print': {
      padding: 0,
      overflow: 'visible',
      backgroundColor: 'white'
    }
  } as const;

  const pageStyle = {
    width: `${A4_WIDTH}mm`,
    minHeight: `${A4_HEIGHT}mm`,
    backgroundColor: "white",
    padding: `${PADDING}px`,
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
    position: "relative",
    '@media print': {
      boxShadow: "none !important",
      marginBottom: "0 !important",
      pageBreakAfter: "always"
    }
  } as const;

  const styles = {
    header: {
      textAlign: "center",
      marginBottom: "32px",
      breakInside: "avoid",
      pageBreakInside: "avoid"
    } as const,
    name: {
      fontSize: "24px",
      fontWeight: "bold"
    },
    jobTitle: {
      fontSize: "18px", 
      fontWeight: "600",
      color: "#666666",
      textTransform: "uppercase"
    } as const,
    contact: {
      fontSize: "14px",
      color: "#666666"
    },
    section: {
      marginBottom: "24px",
      breakInside: "avoid",
      pageBreakInside: "avoid",
      position: "relative"
    } as const,
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "600",
      borderBottom: "1px solid #d1d5db",
      paddingBottom: "4px",
      marginBottom: "16px",
      textTransform: "uppercase"
    } as const,
    itemContainer: {
      marginBottom: "16px",
      breakInside: "avoid",
      pageBreakInside: "avoid",
      position: "relative"
    } as const,
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
      marginBottom: "8px",
      breakInside: "avoid",
      pageBreakInside: "avoid"
    } as const,
    skillGroupName: {
      fontWeight: "600"
    },
    skillList: {
      fontSize: "14px"
    },
    pageBreak: {
      display: 'none',
      '@media print': {
        display: 'block',
        height: '0px',
        visibility: 'hidden',
        pageBreakBefore: 'always'
      }
    },
    printOnly: {
      display: 'none',
      '@media print': {
        display: 'block'
      }
    },
    pagePlaceholder: {
      height: "100%",
      backgroundColor: "rgba(243, 244, 246, 0.5)",
      border: "2px dashed #e5e7eb"
    } as const
  };

  const PAGE_HEIGHT_MM = A4_HEIGHT;
  const PAGE_HEIGHT_PX = PAGE_HEIGHT_MM * 3.78; // 精确换算 1mm=3.779527559px

  useEffect(() => {
    const calculatePages = () => {
      if (contentRef.current) {
        const contentNodes = contentRef.current.children;
        let currentHeight = 0;
        let pageCount = 1;
        const PAGE_CONTENT_HEIGHT = PAGE_HEIGHT_PX - PADDING * 2; // 减去padding

        Array.from(contentNodes).forEach(node => {
          const styles = window.getComputedStyle(node);
          const marginTop = parseFloat(styles.marginTop);
          const marginBottom = parseFloat(styles.marginBottom);
          const nodeHeight = node.getBoundingClientRect().height + marginTop + marginBottom;

          if (currentHeight + nodeHeight > PAGE_CONTENT_HEIGHT) {
            pageCount++;
            currentHeight = nodeHeight;
          } else {
            currentHeight += nodeHeight;
          }
        });

        setPages(pageCount);
      }
    };

    calculatePages();
    const resizeObserver = new ResizeObserver(calculatePages);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [data]);

  const renderContent = () => (
    <div ref={contentRef} style={{ 
      position: 'relative',
      flexGrow: 1,
      breakInside: 'avoid' 
    }}>
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
        <div style={{...styles.printOnly, height: '1px'}} aria-hidden="true" />
      )}
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
        <div style={{ ...styles.section, breakBefore: 'avoid' }}>
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
        <div style={{ 
          ...styles.section,
          pageBreakInside: 'avoid',
          breakInside: 'avoid-column' 
        }}>
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
        <div style={{ 
          ...styles.section,
          minHeight: '50mm'
        }}>
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
  );

  const pageContentStyle = {
    padding: `${PADDING}px 0`,
    minHeight: `calc(${PAGE_HEIGHT_MM}mm - ${PADDING * 2}px)`,
    boxSizing: 'border-box' as const
  };

  const renderPages = () => {
    return Array.from({ length: pages }).map((_, index) => {
      const isLastPage = index === pages - 1;
      const contentOffset = index * (PAGE_HEIGHT_PX - PADDING * 2);
      
      return (
        <div
          key={index}
          style={{
            ...pageStyle,
            height: `${PAGE_HEIGHT_MM}mm`,
            marginBottom: "24px",
            overflow: "hidden",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            position: "relative",
            background: "white",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
          className="resume-page"
        >
          <div style={{ 
            transform: `translateY(-${contentOffset}px)`,
            position: "relative",
            height: `${pages * PAGE_HEIGHT_PX}px`,
            padding: `${PADDING}px 0`,
            minHeight: `calc(${PAGE_HEIGHT_MM}mm - ${PADDING * 2}px)`,
            boxSizing: 'border-box'
          }}>
            {renderContent()}
            {/* 优雅的分页分隔线 */}
            {!isLastPage && (
              <div style={{
                position: "absolute",
                bottom: 0,
                left: "30px",
                right: "30px",
                height: "1px",
                background: "linear-gradient(to right, transparent 10%, #e5e7eb 50%, transparent 90%)"
              }} />
            )}
          </div>
        </div>
      );
    });
  };

  return (
    <PDFViewer
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        backgroundColor: '#f3f4f6'
      }}
    >
      <PDFPreview data={data} />
    </PDFViewer>
  );
}

export default ResumePreview;
