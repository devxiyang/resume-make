import { ResumeData } from '@/lib/types';
import { Document, Page, StyleSheet, Text, View, Link, Font } from '@react-pdf/renderer';

// 注册字体
Font.register({
  family: 'CustomFont',
  fonts: [
    { src: '/fonts/NotoSansMonoCJKhk-Regular.otf' }, // 用于中文
    { src: 'Helvetica' } // 用于英文
  ]
});

// 定义颜色常量
const colors = {
  primary: '#2c3e50',    // 深蓝灰色
  secondary: '#34495e',  // 较浅的蓝灰色
  accent: '#7f8c8d',     // 中性灰色
  background: '#ffffff', // 纯白背景
  muted: '#95a5a6',     // 浅灰色
  divider: '#ecf0f1',   // 极浅的灰色
};

// 定义间距常量
const spacing = {
  page: {
    padding: 50,        // 更大的页面边距
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  item: {
    marginBottom: 12,
  },
};

// 创建样式
const styles = StyleSheet.create({
  page: {
    padding: spacing.page.padding,
    backgroundColor: colors.background,
    color: colors.primary,
    fontFamily: 'CustomFont',
  },
  section: {
    marginBottom: spacing.section.marginBottom,
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  name: {
    fontSize: 28,
    color: colors.primary,
    marginBottom: 8,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  jobTitle: {
    fontSize: 14,
    color: colors.accent,
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 2,
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
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingBottom: 4,
    borderBottom: `0.5 solid ${colors.divider}`,
  },
  summary: {
    fontSize: 11,
    color: colors.secondary,
    lineHeight: 1.4,
    textAlign: 'center',
    marginBottom: 30,
  },
  experienceItem: {
    marginBottom: spacing.item.marginBottom,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  company: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: 'bold',
  },
  position: {
    fontSize: 11,
    color: colors.secondary,
    marginTop: 2,
  },
  date: {
    fontSize: 10,
    color: colors.muted,
    fontStyle: 'italic',
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
    marginTop: 2,
    lineHeight: 1.4,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  skillItem: {
    fontSize: 10,
    color: colors.primary,
    padding: '4 12',
    borderRadius: 12,
    border: `0.5 solid ${colors.divider}`,
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
export function CleanTemplate({ data }: { data: ResumeData }) {
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
                  <View style={[styles.skillsContainer, { marginTop: 5 }]}>
                    {project.technologies.map((tech, index) => (
                      <Text key={index} style={styles.skillItem}>
                        {tech}
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
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );
} 