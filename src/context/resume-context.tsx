import { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, Experience, Education, Project, Skill, CustomSection } from '@/lib/types';
import { format } from "date-fns";

interface ResumeContextType {
  resumeData: ResumeData;
  selectedTemplate: string;
  selectedIds: {
    experience: string | null;
    education: string | null;
    project: string | null;
    skill: string | null;
    customSection: string | null;
  };
  updateResumeData: (data: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => void;
  setSelectedTemplate: (template: string) => void;
  addItem: (type: 'experience' | 'education' | 'project' | 'skill' | 'customSection') => void;
  deleteItem: (type: 'experience' | 'education' | 'project' | 'skill' | 'customSection', id: string) => void;
  selectItem: (type: 'experience' | 'education' | 'project' | 'skill' | 'customSection', id: string) => void;
  updateItem: (
    type: 'experience' | 'education' | 'project' | 'skill' | 'customSection',
    item: Experience | Education | Project | Skill | CustomSection
  ) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children, initialData }: { children: ReactNode; initialData: ResumeData }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState("sharp");
  const [selectedIds, setSelectedIds] = useState({
    experience: null,
    education: null,
    project: null,
    skill: null,
    customSection: null,
  });

  const updateResumeData = (data: Partial<ResumeData> | ((prev: ResumeData) => ResumeData)) => {
    if (typeof data === 'function') {
      setResumeData(data);
    } else {
      setResumeData(prev => ({ ...prev, ...data }));
    }
  };

  const addItem = (type: 'experience' | 'education' | 'project' | 'skill' | 'customSection') => {
    const newId = `${type}-${Date.now()}`;
    const newItem = {
      experience: {
        id: newId,
        company: "",
        position: "",
        startDate: format(new Date(), "MMM yyyy"),
        endDate: "Present",
        currentlyWork: true,
        description: "",
        bulletPoints: [],
      },
      education: {
        id: newId,
        school: "",
        degree: "",
        state: "",
        startDate: format(new Date(), "MMM yyyy"),
        endDate: format(new Date(), "MMM yyyy"),
        description: "",
      },
      project: {
        id: newId,
        name: "",
        description: "",
        bulletPoints: [],
        technologies: [],
      },
      skill: {
        id: newId,
        name: "",
        description: "",
      },
      customSection: {
        id: newId,
        title: "",
        items: [],
      },
    }[type];

    setResumeData(prev => {
      if (type === 'experience') {
        return { ...prev, experiences: [...prev.experiences, newItem as Experience] };
      } else if (type === 'education') {
        return { ...prev, education: [...prev.education, newItem as Education] };
      } else if (type === 'project') {
        return { ...prev, projects: [...prev.projects, newItem as Project] };
      } else if (type === 'skill') {
        return { ...prev, skills: [...prev.skills, newItem as Skill] };
      } else {
        return { ...prev, customSections: [...prev.customSections, newItem as CustomSection] };
      }
    });
    setSelectedIds(prev => ({ ...prev, [type]: newId }));
  };

  const deleteItem = (type: 'experience' | 'education' | 'project' | 'skill' | 'customSection', id: string) => {
    setResumeData(prev => {
      if (type === 'experience') {
        return { ...prev, experiences: prev.experiences.filter(item => item.id !== id) };
      } else if (type === 'education') {
        return { ...prev, education: prev.education.filter(item => item.id !== id) };
      } else if (type === 'project') {
        return { ...prev, projects: prev.projects.filter(item => item.id !== id) };
      } else if (type === 'skill') {
        return { ...prev, skills: prev.skills.filter(item => item.id !== id) };
      } else {
        return { ...prev, customSections: prev.customSections.filter(item => item.id !== id) };
      }
    });

    if (selectedIds[type] === id) {
      setSelectedIds(prev => {
        const remainingItems = type === 'experience' ? resumeData.experiences
          : type === 'education' ? resumeData.education
          : type === 'project' ? resumeData.projects
          : type === 'skill' ? resumeData.skills
          : resumeData.customSections;
        
        const filteredItems = remainingItems.filter(item => item.id !== id);
        return {
          ...prev,
          [type]: filteredItems.length > 0 ? filteredItems[0].id : null,
        };
      });
    }
  };

  const selectItem = (type: 'experience' | 'education' | 'project' | 'skill' | 'customSection', id: string) => {
    setSelectedIds(prev => ({ ...prev, [type]: id }));
  };

  const updateItem = (
    type: 'experience' | 'education' | 'project' | 'skill' | 'customSection',
    item: Experience | Education | Project | Skill | CustomSection
  ) => {
    setResumeData(prev => {
      if (type === 'experience') {
        return { ...prev, experiences: prev.experiences.map(existing => existing.id === item.id ? item as Experience : existing) };
      } else if (type === 'education') {
        return { ...prev, education: prev.education.map(existing => existing.id === item.id ? item as Education : existing) };
      } else if (type === 'project') {
        return { ...prev, projects: prev.projects.map(existing => existing.id === item.id ? item as Project : existing) };
      } else if (type === 'skill') {
        return { ...prev, skills: prev.skills.map(existing => existing.id === item.id ? item as Skill : existing) };
      } else {
        return { ...prev, customSections: prev.customSections.map(existing => existing.id === item.id ? item as CustomSection : existing) };
      }
    });
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        selectedTemplate,
        selectedIds,
        updateResumeData,
        setSelectedTemplate,
        addItem,
        deleteItem,
        selectItem,
        updateItem,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}