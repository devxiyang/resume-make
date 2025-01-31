import { ResumeData } from '@/lib/types';
import { Document, Page, StyleSheet, Text, View, Link } from '@react-pdf/renderer';

// 定义颜色常量
const colors = {
  primary: '#14213d',    // 深蓝色
  secondary: '#284b63',  // 中蓝色
  accent: '#3c6e71',     // 蓝绿色
  background: '#ffffff', // 纯白背景
  muted: '#6b7280',     // 中性灰色
  divider: '#e5e7eb',   // 浅灰色
  surface: '#f8fafc',   // 背景灰色
};

// 定义间距常量
const spacing = {
  page: {
    padding: 48,
  },
  section: {
    marginBottom: 24,
  },
  item: {
    marginBottom: 16,
  },
};

// 创建样式
const styles = StyleSheet.create({
  page: {
    padding: spacing.page.padding,
    backgroundColor: colors.background,
    color: colors.primary,
  },
  section: {
    marginBottom: spacing.section.marginBottom,
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    color: colors.primary,
    marginBottom: 4,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  jobTitle: {
    fontSize: 14,
    color: colors.accent,
    marginBottom: 12,
    letterSpacing: 1,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 20,
    fontSize: 10,
    color: colors.muted,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    color: colors.accent,
    textDecoration: 'none',
  },
  sectionTitle: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    backgroundColor: colors.surface,
    padding: 8,
  },
  summary: {
    fontSize: 11,
    color: colors.secondary,
    lineHeight: 1.5,
    marginTop: 12,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  experienceItem: {
    marginBottom: spacing.item.marginBottom,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    alignItems: 'flex-start',
  },
  company: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 11,
    color: colors.accent,
    marginTop: 2,
  },
  date: {
    fontSize: 10,
    color: colors.muted,
    textAlign: 'right',
  },
  description: {
    fontSize: 10,
    color: colors.secondary,
    marginTop: 4,
    lineHeight: 1.4,
  },
  bulletPoint: {
    fontSize: 10,
    color: colors.secondary,
    marginLeft: 10,
    marginTop: 4,
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    padding: '0 20',
  },
  skillItem: {
    fontSize: 10,
    color: colors.secondary,
    backgroundColor: colors.surface,
    padding: '4 12',
    borderRadius: 2,
  },
  divider: {
    borderBottom: `1 solid ${colors.divider}`,
    marginVertical: 4,
  },
});

// 个人信息部分
function PersonalInfoSection({ data }: { data: ResumeData['personal'] }) {
  return (
    <View style={styles.header}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.jobTitle}>{data.jobTitle}</Text>
      <View style={styles.contactInfo}>
        {data.email && (
          <View style={styles.contactItem}>
            <Link src={`mailto:${data.email}`} style={styles.link}>
              {data.email}
            </Link>
          </View>
        )}
        {data.phone && <Text style={styles.contactItem}>{data.phone}</Text>}
        {data.address && <Text style={styles.contactItem}>{data.address}</Text>}
        {data.linkedin && (
          <View style={styles.contactItem}>
            <Link src={`https://${data.linkedin}`} style={styles.link}>
              {data.linkedin}
            </Link>
          </View>
        )}
        {data.personalWebsite && (
          <View style={styles.contactItem}>
            <Link src={`https://${data.personalWebsite}`} style={styles.link}>
              {data.personalWebsite}
            </Link>
          </View>
        )}
      </View>
      {data.summary && (
        <Text style={styles.summary}>{data.summary}</Text>
      )}
    </View>
  );
}

// 主模板组件
export function BostonTemplate({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PersonalInfoSection data={data.personal} />

        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experiences.map((exp) => (
              <View key={exp.id} style={styles.experienceItem}>
                <View style={styles.companyHeader}>
                  <View>
                    <Text style={styles.company}>{exp.company}</Text>
                    <Text style={styles.position}>{exp.position}</Text>
                  </View>
                  <Text style={styles.date}>
                    {exp.startDate} - {exp.currentlyWork ? 'Present' : exp.endDate}
                  </Text>
                </View>
                {exp.description && (
                  <Text style={styles.description}>{exp.description}</Text>
                )}
                {exp.bulletPoints?.map((point, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {point}
                  </Text>
                ))}
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.experienceItem}>
                <View style={styles.companyHeader}>
                  <View>
                    <Text style={styles.company}>{edu.school}</Text>
                    <Text style={styles.position}>{edu.degree}</Text>
                  </View>
                  <Text style={styles.date}>
                    {edu.startDate} - {edu.endDate}
                  </Text>
                </View>
                {edu.description && (
                  <Text style={styles.description}>{edu.description}</Text>
                )}
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        )}

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notable Projects</Text>
            {data.projects.map((project) => (
              <View key={project.id} style={styles.experienceItem}>
                <Text style={styles.company}>{project.name}</Text>
                {project.description && (
                  <Text style={styles.description}>{project.description}</Text>
                )}
                {project.bulletPoints?.map((point, index) => (
                  <Text key={index} style={styles.bulletPoint}>
                    • {point}
                  </Text>
                ))}
                {project.technologies && (
                  <View style={[styles.skillsContainer, { marginTop: 8 }]}>
                    {project.technologies.map((tech, index) => (
                      <Text key={index} style={styles.skillItem}>
                        {tech}
                      </Text>
                    ))}
                  </View>
                )}
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies</Text>
            <View style={styles.skillsContainer}>
              {data.skills.map((skillGroup) => (
                <Text key={skillGroup.id} style={styles.skillItem}>
                  {skillGroup.name}
                  {skillGroup.description && ` - ${skillGroup.description}`}
                </Text>
              ))}
            </View>
          </View>
        )}

        {data.customSections?.map((section) => (
          <View key={section.id} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items.map((item) => (
              <View key={item.id} style={styles.experienceItem}>
                <Text style={styles.company}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <View style={styles.divider} />
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
} 