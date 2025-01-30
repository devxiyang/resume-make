import { createContext, useContext, ReactNode, useState } from 'react';
import { ResumeData } from '@/types/resume';
import { initialResumeData } from "@/lib/initial-data";

const ResumeContext = createContext<{
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
} | null>(null);
export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalDetails: {
      name: `${initialResumeData.personal.firstName} ${initialResumeData.personal.lastName}`,
      role: initialResumeData.personal.jobTitle,
      location: "",
      url: initialResumeData.personal.professionalWebsite || initialResumeData.personal.personalWebsite,
      email: initialResumeData.personal.email,
      phone: initialResumeData.personal.phone
    },
    about: initialResumeData.personal.summary,
    education: initialResumeData.education,
    experiences: initialResumeData.experiences,
    skills: initialResumeData.skills
  });

  return (
    <ResumeContext.Provider value={{ resumeData, setResumeData }}>
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume必须在ResumeProvider内使用');
  }
  return context;
} 