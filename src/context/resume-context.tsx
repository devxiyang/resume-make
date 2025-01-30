import { createContext, useContext, ReactNode, useState } from 'react';
import { ResumeData } from '@/lib/types';

const ResumeContext = createContext<{
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
} | null>(null);

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      name: '',
      jobTitle: '',
      email: '',
      phone: '',
      address: '',
      linkedin: '',
      professionalWebsite: '',
      personalWebsite: '',
      summary: ''
    },
    experiences: [],
    education: [],
    projects: [],
    skills: []
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
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}