import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { ResumeData } from '@/lib/types';

// 创建PDF样式表
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontSize: 12,
    lineHeight: 1.5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#666666',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  contact: {
    color: '#666666',
    marginBottom: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 600,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 4,
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  itemContainer: {
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  itemTitle: {
    fontWeight: 600,
  },
  bulletList: {
    marginLeft: 20,
    marginTop: 8,
  },
  skillGroup: {
    marginBottom: 8,
  },
});

export const PDFPreview = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page} wrap>
      {/* 个人信息 */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personal.name}</Text>
        <Text style={styles.jobTitle}>{data.personal.jobTitle}</Text>
        <Text style={styles.contact}>
          {[data.personal.email, data.personal.phone, data.personal.address]
            .filter(Boolean)
            .join(' • ')}
        </Text>
        {data.personal.summary && (
          <Text style={{ marginTop: 8 }}>{data.personal.summary}</Text>
        )}
      </View>

      {/* 工作经历 */}
      {data.experiences.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experiences.map((exp) => (
            <View key={exp.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.company}</Text>
                <Text>
                  {exp.startDate} - {exp.currentlyWork ? 'Present' : exp.endDate}
                </Text>
              </View>
              <Text style={{ color: '#666666' }}>
                {exp.position}
                {exp.city && exp.state && ` • ${exp.city}, ${exp.state}`}
              </Text>
              {exp.bulletPoints.map((point, index) => (
                <Text key={index} style={styles.bulletList}>
                  • {point}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* 教育经历 */}
      {data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {data.education.map((edu) => (
            <View key={edu.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>
                  {edu.school}{edu.state && `, ${edu.state}`}
                </Text>
                <Text>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
              <Text style={{ color: '#666666' }}>{edu.degree}</Text>
              <Text style={{ marginTop: 4 }}>{edu.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* 项目经历 */}
      {data.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {data.projects.map((project) => (
            <View key={project.id} style={styles.itemContainer} wrap={false}>
              <Text style={styles.itemTitle}>{project.name}</Text>
              <Text style={{ marginBottom: 4 }}>{project.description}</Text>
              {project.bulletPoints?.map((point, index) => (
                <Text key={index} style={styles.bulletList}>
                  • {point}
                </Text>
              ))}
              {project.technologies && (
                <Text style={{ marginTop: 4 }}>
                  Technologies: {project.technologies.join(', ')}
                </Text>
              )}
              {(project.demoUrl || project.repoUrl) && (
                <Text style={{ marginTop: 4 }}>
                  {project.demoUrl && `Demo: ${project.demoUrl} `}
                  {project.repoUrl && `Repo: ${project.repoUrl}`}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* 技能 */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          {data.skills.map((skill) => (
            <View key={skill.id} style={styles.skillGroup}>
              <Text style={styles.itemTitle}>{skill.name}</Text>
              {skill.description && <Text>{skill.description}</Text>}
            </View>
          ))}
        </View>
      )}

      {/* 自定义模块 */}
      {data.customSections.map((section) => (
        <View key={section.id} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                {item.date && <Text>{item.date}</Text>}
              </View>
              <Text>{item.description}</Text>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
); 