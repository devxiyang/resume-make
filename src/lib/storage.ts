import { Experience } from "@/lib/types";

interface ResumeData {
  personal: {
    firstName: string;
    lastName: string;
    // ...其他字段
  };
  experiences: Experience[];
  // ...其他模块
}

export const saveResume = (data: ResumeData) => {
  try {
    localStorage.setItem('resumeData', JSON.stringify(data));
  } catch (error) {
    console.error('保存失败:', error);
  }
};

export const loadResume = (): ResumeData | null => {
  const data = localStorage.getItem('resumeData');
  if (!data) return null;
  
  return transformLegacyData(JSON.parse(data)); // 处理旧版数据结构
}; 

function transformLegacyData(data: unknown): ResumeData | null {
  // Add proper type checking and transformation logic here
  return data as ResumeData; // Temporary type assertion
}
