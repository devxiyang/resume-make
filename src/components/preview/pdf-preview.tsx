'use client';

import { ResumeData } from '@/lib/types';
import { 
  Document, 
  Page, 
  StyleSheet, 
  Text, 
  View, 
  Link,
  Font 
} from '@react-pdf/renderer';

// // 只导入必要的字体
// Font.register({
//   family: 'Helvetica',
//   fonts: [
//     { src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT0kLW-43aMEzIO6XUTLjad8.woff2' },
//     { 
//       src: 'https://fonts.gstatic.com/s/helveticaneue/v70/1Ptsg8zYS_SKggPNyC0IT0kLW-43aMEzIO6XUTLjad8.woff2',
//       fontWeight: 'bold' 
//     }
//   ]
// });

// 定义颜色和尺寸常量
const COLORS = {
  primary: '#000000',           // 最深，用于名字和标题
  secondary: '#222222',         // 次深，用于重要内容
  tertiary: '#444444',          // 用于普通内容
  quaternary: '#666666',        // 用于次要内容
  muted: '#888888',            // 最浅，用于辅助信息
  border: '#00000010',         // 分割线颜色更浅
  background: '#ffffff',
} as const;

const SPACING = {
  page: 40,
  section: 16,
  item: 8,
  text: 4,
} as const;

// 创建PDF样式表
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: COLORS.background,
    padding: `${SPACING.page}px`,
    fontSize: 10,
    color: COLORS.primary,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: `${SPACING.section * 2}px`,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: COLORS.primary,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: `${SPACING.item * 1.5}px`,
    color: COLORS.secondary,
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  contactItem: {
    fontSize: 10,
    color: COLORS.quaternary,
  },
  dividerDot: {
    marginHorizontal: 4,
    color: COLORS.muted,
  },
  summary: {
    fontSize: 10,
    marginTop: `${SPACING.text}px`,
    color: COLORS.tertiary,
  },
  section: {
    marginBottom: `${SPACING.section}px`,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 900,
    textTransform: 'uppercase',
    marginBottom: `${SPACING.section}px`,  // 增加标题和内容之间的间距
    paddingBottom: `${SPACING.text}px`,    // 减小标题和分割线之间的间距
    borderBottom: '0.5px solid ' + COLORS.border,  // 分割线稍微粗一点但更浅
    color: COLORS.primary,
    letterSpacing: 1,
  },
  lastSection: {
    marginBottom: `${SPACING.section}px`,
    paddingBottom: `${SPACING.section}px`,
  },
  itemContainer: {
    marginBottom: `${SPACING.section}px`,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: `${SPACING.text}px`,
    color: COLORS.tertiary,
  },
  itemDate: {
    fontSize: 10,
    textAlign: 'right',
    color: COLORS.muted,
  },
  bulletList: {
    marginLeft: 12,
    fontSize: 10,
    marginBottom: `${SPACING.text}px`,
    color: COLORS.tertiary,
  },
  workDescription: {
    fontSize: 10,
    marginBottom: `${SPACING.text}px`,
    color: COLORS.quaternary,
  },
});

// 修改个人信息的渲染部分
const PersonalInfoSection = ({ data }: { data: ResumeData['personal'] }) => {
  const contactInfo = [
    data.email,
    data.phone,
    data.professionalWebsite,
    data.linkedin && `linkedin.com/${data.linkedin}`,
  ].filter(Boolean);

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.jobTitle}>{data.jobTitle}</Text>
      <View style={styles.contactContainer}>
        {contactInfo.map((info, index) => (
          <Text key={index}>
            <Text style={styles.contactItem}>{info}</Text>
            {index < contactInfo.length - 1 && <Text style={styles.dividerDot}>•</Text>}
          </Text>
        ))}
      </View>
      {data.summary && (
        <Text style={styles.summary}>{data.summary}</Text>
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {data.experiences.map((exp) => (
            <View key={exp.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemTitle}>{exp.position} at {exp.company}</Text>
                  <Text style={styles.workDescription}>{exp.description}</Text>
                </View>
                <Text style={styles.itemDate}>
                  {exp.startDate} - {exp.currentlyWork ? 'Present' : exp.endDate}
                </Text>
              </View>
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
                <View>
                  <Text style={styles.itemTitle}>
                    {edu.school}
                  </Text>
                  <Text style={styles.itemSubtitle}>{edu.degree}</Text>
                  {edu.description && (
                    <Text style={styles.workDescription}>{edu.description}</Text>
                  )}
                </View>
                <Text style={styles.itemDate}>
                  {edu.startDate} - {edu.endDate}
                </Text>
              </View>
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
              <Text style={styles.workDescription}>{project.description}</Text>
              {project.bulletPoints?.map((point, index) => (
                <Text key={index} style={styles.bulletList}>
                  • {point}
                </Text>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* 技能 */}
      {data.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.itemContainer} wrap={false}>
            {data.skills.map((skill, index) => (
              <View key={skill.id} style={{ marginBottom: index < data.skills.length - 1 ? SPACING.text : 0 }}>
                <Text>
                  <Text style={styles.itemTitle}>{skill.name}</Text>
                  {skill.description && (
                    <Text style={styles.workDescription}> - {skill.description}</Text>
                  )}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* 自定义模块 */}
      {data.customSections.map((section, sectionIndex) => (
        <View key={section.id} style={sectionIndex === data.customSections.length - 1 ? styles.lastSection : styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          {section.items.map((item) => (
            <View key={item.id} style={styles.itemContainer} wrap={false}>
              <View style={styles.itemHeader}>
                <View>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  {item.description && (
                    <Text style={styles.workDescription}>{item.description}</Text>
                  )}
                </View>
                {item.date && (
                  <Text style={styles.itemDate}>{item.date}</Text>
                )}
              </View>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
); 