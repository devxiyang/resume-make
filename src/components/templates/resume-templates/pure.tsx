import { ResumeData } from '@/lib/types';
import { Document, Page, StyleSheet, Text, View, Link, Font } from '@react-pdf/renderer';

// 注册字体
Font.register({
  family: 'Noto Sans SC',
  src: '/fonts/NotoSansMonoCJKhk-Regular.otf',
});

// 定义颜色常量
const colors = {
  primary: '#374151',    // 深灰色
  secondary: '#4b5563',  // 中灰色
  accent: '#9ca3af',     // 浅灰色
  background: '#ffffff', // 纯白背景
  muted: '#6b7280',     // 中性灰色
  divider: '#e5e7eb',   // 极浅灰色
  surface: '#f9fafb',   // 背景灰色
};

// 定义间距常量
const spacing = {
  page: {
    padding: 45,
  },
  section: {
    marginBottom: 25,
  },
  item: {
    marginBottom: 15,
  },
};

// 创建样式
const styles = StyleSheet.create({
  page: {
    padding: spacing.page.padding,
    backgroundColor: colors.background,
    color: colors.primary,
    fontFamily: 'Noto Sans SC',
  },
  section: {
    marginBottom: spacing.section.marginBottom,
  },
  header: {
    marginBottom: 35,
    borderBottom: `1 solid ${colors.divider}`,
    paddingBottom: 20,
  },
  name: {
    fontSize: 28,
    color: colors.primary,
    marginBottom: 4,
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 14,
    color: colors.accent,
    marginBottom: 15,
    letterSpacing: 2,
  },
  contactInfo: {
    flexDirection: 'row',
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
    marginBottom: 15,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  summary: {
    fontSize: 11,
    color: colors.secondary,
    lineHeight: 1.5,
    marginTop: 10,
  },
  experienceItem: {
    marginBottom: spacing.item.marginBottom,
    paddingLeft: 12,
    borderLeft: `1 solid ${colors.divider}`,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  company: {
    fontSize: 12,
    color: colors.primary,
    letterSpacing: 0.5,
  },
  position: {
    fontSize: 11,
    color: colors.secondary,
    marginTop: 2,
    fontStyle: 'italic',
  },
  date: {
    fontSize: 10,
    color: colors.muted,
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
    gap: 15,
  },
  skillItem: {
    fontSize: 10,
    color: colors.secondary,
  },
  skillDivider: {
    color: colors.divider,
    marginHorizontal: 5,
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
export function PureTemplate({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PersonalInfoSection data={data.personal} />

        {data.experiences.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
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
              </View>
            ))}
          </View>
        )}

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
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
                        {index < (project.technologies?.length || 0) - 1 && (
                          <Text style={styles.skillDivider}>•</Text>
                        )}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.experienceItem}>
              <View style={styles.skillsContainer}>
                {data.skills.map((skillGroup, index) => (
                  <Text key={skillGroup.id} style={styles.skillItem}>
                    {skillGroup.name}
                    {skillGroup.description && ` - ${skillGroup.description}`}
                    {index < data.skills.length - 1 && (
                      <Text style={styles.skillDivider}>•</Text>
                    )}
                  </Text>
                ))}
              </View>
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
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
} 