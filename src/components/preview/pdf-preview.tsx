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

// 注册中文字体
Font.register({
  family: 'CustomFont',
  src: '/fonts/NotoSansMonoCJKhk-Regular.otf'
});

// 定义颜色和尺寸常量
const COLORS = {
  primary: '#000000',           // 最深，用于名字和标题
  secondary: '#333333',         // 次深，用于重要内容
  tertiary: '#555555',          // 用于普通内容
  quaternary: '#777777',        // 用于次要内容
  muted: '#999999',            // 最浅，用于辅助信息
  border: '#00000015',         // 分割线颜色
  background: '#ffffff',
} as const;

const SPACING = {
  page: 35,        // 页面边距
  section: 6,     // 更紧凑的section间距
  item: 4,         // 更小的item间距
  text: 2,         // 更小的文本间距
} as const;

// 创建PDF样式表
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: COLORS.background,
    padding: SPACING.page,
    fontSize: 10,
    color: COLORS.primary,
    lineHeight: 1.2,
    fontFamily: 'Times-Roman', // 使用内置字体
  },
  header: {
    marginBottom: SPACING.section,
    alignItems: 'center',  // 居中对齐
  },
  name: {
    fontFamily: 'Times-Bold',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.primary,
    textAlign: 'center',
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,       // 增加底部间距
    color: COLORS.primary,
    textAlign: 'center',
  },
  contactContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 0,  // 移除gap，因为我们会在item中控制间距
    marginTop: 0,
  },
  contactItem: {
    fontSize: 9,
    color: COLORS.primary,
    display: 'flex',
    alignItems: 'center',
  },
  dividerDot: {
    color: COLORS.primary,
    fontSize: 8,
    alignSelf: 'center',
    paddingHorizontal: 6,  // 点的两边使用相同的内边距
  },
  summary: {
    fontSize: 10,
    marginTop: SPACING.section,  // 增加概述的上边距
    color: COLORS.tertiary,
    lineHeight: 1.5,            // 增加行高
  },
  section: {
    marginBottom: `${SPACING.section}px`,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 8,
    borderBottom: '0.5px solid ' + COLORS.border,
    color: COLORS.primary,
    paddingBottom: 2,
  },
  lastSection: {
    marginBottom: `${SPACING.section}px`,
    paddingBottom: `${SPACING.section}px`,
  },
  itemContainer: {
    marginBottom: SPACING.section,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  itemPosition: {
    fontSize: 10,
    color: COLORS.quaternary,
    marginLeft: 16,
    marginRight: 16,
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: `${SPACING.text}px`,
    color: COLORS.tertiary,
  },
  itemDate: {
    fontSize: 9,
    color: COLORS.tertiary,
    textAlign: 'right',
  },
  bulletList: {
    marginLeft: 8,
    fontSize: 9,
    marginBottom: 1,
    color: COLORS.tertiary,
    lineHeight: 1.3,
  },
  workDescription: {
    fontSize: 9,
    color: COLORS.tertiary,
    marginTop: 2,
    lineHeight: 1.3,
  },
  companyText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 2,  // 添加底部间距
  },
  dividerText: {
    fontSize: 11,
    color: COLORS.muted,
    marginHorizontal: 8,
  },
  positionText: {
    fontSize: 9,
    color: COLORS.secondary,
    marginBottom: 4,  // 添加底部间距
  },
  // 新增样式用于项目标题和链接
  projectHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.text,
  },
  projectLink: {
    fontSize: 10,
    color: COLORS.tertiary,
    textDecoration: 'underline',
  },
  // 优化技能部分的样式
  skillCategory: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  skillName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 4,
  },
  skillDescription: {
    fontSize: 9,
    color: COLORS.tertiary,
    flex: 1,
  },
});

// 修改个人信息的渲染部分
const PersonalInfoSection = ({ data }: { data: ResumeData['personal'] }) => {
  const contactInfo = [
    data.email,
    data.phone,
    data.personalWebsite,
    data.linkedin,
  ].filter(Boolean);

  return (
    <View style={styles.header}>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.jobTitle}>{data.jobTitle}</Text>
      <View style={styles.contactContainer}>
        {contactInfo.map((info, index) => (
          <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.contactItem}>{info}</Text>
            {index < contactInfo.length - 1 && (
              <Text style={styles.dividerDot}>•</Text>
            )}
          </View>
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
            <View key={exp.id} style={[styles.itemContainer, { marginBottom: SPACING.section }]} wrap={false}>
              <View style={[styles.itemHeader, { marginBottom: SPACING.text }]}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.companyText}>{exp.company}</Text>
                  <Text style={styles.positionText}>{exp.position}</Text>
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