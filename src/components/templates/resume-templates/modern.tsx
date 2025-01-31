import { ResumeData } from '@/lib/types';
import { Document, Page, StyleSheet, Text, View, Link, Font } from '@react-pdf/renderer';

// 注册字体
Font.register({
  family: 'Noto Sans SC',
  src: '/fonts/NotoSansMonoCJKhk-Regular.otf',
});

// 定义颜色常量
const colors = {
  primary: '#2D3748',
  secondary: '#4A5568',
  accent: '#3182CE',
  background: '#FFFFFF',
  muted: '#718096',
  divider: '#E2E8F0',
};

// 定义间距常量
const spacing = {
  page: {
    padding: 40,
    marginBottom: 20,
  },
  section: {
    marginBottom: 15,
  },
  item: {
    marginBottom: 10,
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
    marginBottom: 20,
    borderBottom: `2 solid ${colors.accent}`,
    paddingBottom: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 16,
    color: colors.secondary,
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 10,
    borderBottom: `1 solid ${colors.divider}`,
    paddingBottom: 5,
  },
  summary: {
    fontSize: 11,
    color: colors.secondary,
    lineHeight: 1.5,
    marginBottom: spacing.section.marginBottom,
  },
  experienceItem: {
    marginBottom: spacing.item.marginBottom,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  company: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primary,
  },
  position: {
    fontSize: 11,
    color: colors.secondary,
  },
  date: {
    fontSize: 10,
    color: colors.muted,
  },
  description: {
    fontSize: 10,
    color: colors.secondary,
    marginTop: 5,
  },
  bulletPoint: {
    fontSize: 10,
    color: colors.secondary,
    marginLeft: 10,
    marginTop: 2,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillItem: {
    fontSize: 10,
    color: colors.secondary,
    backgroundColor: colors.divider,
    padding: '4 8',
    borderRadius: 4,
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
    </View>
  );
}

// 主模板组件
export function ModernTemplate({ data }: { data: ResumeData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <PersonalInfoSection data={data.personal} />

        {data.personal.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{data.personal.summary}</Text>
          </View>
        )}

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
            {data.skills.map((skillGroup) => (
              <View key={skillGroup.id} style={styles.experienceItem}>
                <Text style={styles.company}>{skillGroup.name}</Text>
                <Text style={styles.description}>{skillGroup.description}</Text>
              </View>
            ))}
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
