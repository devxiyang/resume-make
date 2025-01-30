'use client';

import { ResumeData } from '@/lib/types';
import { Document, Page, StyleSheet, Text, View, Link } from '@react-pdf/renderer';

// 定义颜色和尺寸常量
const COLORS = {
  primary: '#1a1a1a',
  secondary: '#666666',
  accent: '#2563eb',
  border: '#e5e7eb',
  background: '#ffffff',
  muted: '#94a3b8',
  light: '#f1f5f9'  // 添加浅色背景
} as const;

const SPACING = {
  page: 30,
  section: 16,
  sectionAfterHeader: 12,
  item: 12,
  text: 4,
  title: 12,
  header: 24,
  nameTitle: 16
} as const;

// 创建PDF样式表
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: COLORS.background,
    padding: `${SPACING.page}px`,
    fontSize: 10,
    lineHeight: 1.6,
    color: COLORS.primary,
  },
  header: {
    marginBottom: `${SPACING.sectionAfterHeader}px`,
    textAlign: 'center',
    fontFamily: 'Helvetica-Bold',
    padding: `${SPACING.title}px ${SPACING.page}px`,  // 增加水平内边距
    // backgroundColor: COLORS.light,  // 添加背景色
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: `${SPACING.nameTitle}px`,
    color: COLORS.primary,  // 改用主色
    letterSpacing: 0.5,
  },
  jobTitle: {
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: `${SPACING.title}px`,
    color: COLORS.accent,  // 改用强调色
    fontWeight: 'medium',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: `${SPACING.text}px`,
  },
  contactItem: {
    fontSize: 9,
    color: COLORS.secondary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  dividerDot: {
    fontSize: 9,
    color: COLORS.muted,
    marginHorizontal: 8,
  },
  summary: {
    fontSize: 10,
    marginTop: `${SPACING.item * 1.5}px`,
    color: COLORS.secondary,
    textAlign: 'center',
    maxWidth: '85%',
    alignSelf: 'center',
    lineHeight: 1.5,
    paddingTop: `${SPACING.text}px`,
    fontStyle: 'italic',  // 添加斜体样式
  },
  section: {
    marginBottom: `${SPACING.section}px`,
  },
  sectionAfterHeader: {
    marginTop: 0,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
    borderBottomStyle: 'solid',
    paddingBottom: 4,
    marginBottom: `${SPACING.item}px`,
    color: COLORS.accent,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  itemContainer: {
    marginBottom: `${SPACING.item}px`,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: `${SPACING.text}px`,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  itemSubtitle: {
    fontSize: 10,
    color: COLORS.secondary,
    marginBottom: `${SPACING.text}px`,
  },
  itemDate: {
    fontSize: 9,
    color: COLORS.muted,
  },
  bulletList: {
    marginLeft: 12,
    fontSize: 9,
    color: COLORS.secondary,
  },
  bullet: {
    marginBottom: 2,
  },
  skillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: `${SPACING.item}px`,
  },
  skillItem: {
    backgroundColor: '#f8fafc',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 9,
  },
  link: {
    color: COLORS.accent,
    textDecoration: 'none',
    fontSize: 9,
  },
  divider: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.border,
    marginVertical: `${SPACING.item}px`,
  },
  watermark: {
    position: 'absolute',
    bottom: `${SPACING.page}px`,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 8,
    color: COLORS.muted,
    opacity: 0.5,
  },
  watermarkLink: {
    color: COLORS.accent,
    textDecoration: 'none',
  }
});

// 修改个人信息的渲染部分
const PersonalInfoSection = ({ data }: { data: ResumeData['personal'] }) => {
  const contactInfo = [
    data.email,
    data.phone,
    data.address,
    data.linkedin && `LinkedIn: ${data.linkedin}`,
    data.professionalWebsite && `Portfolio: ${data.professionalWebsite}`
  ].filter(Boolean);

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.jobTitle}>{data.jobTitle}</Text>
      
      <View style={styles.contactContainer}>
        {contactInfo.map((info, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.contactItem}>{info}</Text>
          </View>
        ))}
      </View>

      {data.summary && (
        <Text style={styles.summary}>
          &ldquo;{data.summary}&rdquo;
        </Text>
      )}
    </View>
  );
};

export const PDFPreview = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <PersonalInfoSection data={data.personal} />

      {/* 工作经历 */}
      {data.experiences.length > 0 && (
        <View style={[styles.section, styles.sectionAfterHeader]}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {data.experiences.map((exp) => (
            <View key={exp.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{exp.company}</Text>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.currentlyWork ? 'Present' : exp.endDate}
                </Text>
              </View>
              <Text style={styles.itemSubtitle}>
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

      {/* 水印 */}
      <Text style={styles.watermark}>
        Made with{' '}
        <Link
          src="https://resumemaker.cc"
          style={styles.watermarkLink}
        >
          resumemaker.cc
        </Link>
      </Text>
    </Page>
  </Document>
); 