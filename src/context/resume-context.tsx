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
    customSectionItem: string | null;
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
  addCustomSectionItem: (sectionId: string) => void;
  deleteCustomSectionItem: (sectionId: string, itemId: string) => void;
  selectCustomSectionItem: (sectionId: string, itemId: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export function ResumeProvider({ children, initialData }: { children: ReactNode; initialData: ResumeData }) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialData);
  const [selectedTemplate, setSelectedTemplate] = useState("sharp");
  const [selectedIds, setSelectedIds] = useState<{
    experience: string | null;
    education: string | null;
    project: string | null;
    skill: string | null;
    customSection: string | null;
    customSectionItem: string | null;
  }>({
    experience: null,
    education: null,
    project: null,
    skill: null,
    customSection: null,
    customSectionItem: null,
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
        title: `Custom Section ${resumeData.customSections.length + 1}`,
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

  const addCustomSectionItem = (sectionId: string) => {
    const newItemId = `item-${Date.now()}`;
    setResumeData(prev => {
      const section = prev.customSections.find(s => s.id === sectionId);
      if (!section) return prev;

      const newItem = {
        id: newItemId,
        title: '',
        description: ''
      };

      const updatedSection = {
        ...section,
        items: [...section.items, newItem]
      };

      return {
        ...prev,
        customSections: prev.customSections.map(s => 
          s.id === sectionId ? updatedSection : s
        )
      };
    });

    // Automatically select the new item
    setSelectedIds(prev => ({
      ...prev,
      customSection: sectionId,
      customSectionItem: newItemId
    }));
  };

  const deleteCustomSectionItem = (sectionId: string, itemId: string) => {
    setResumeData(prev => {
      const section = prev.customSections.find(s => s.id === sectionId);
      if (!section) return prev;

      const updatedSection = {
        ...section,
        items: section.items.filter(item => item.id !== itemId)
      };

      return {
        ...prev,
        customSections: prev.customSections.map(s => 
          s.id === sectionId ? updatedSection : s
        )
      };
    });
  };

  const selectCustomSectionItem = (sectionId: string, itemId: string) => {
    setSelectedIds(prev => ({ ...prev, customSectionItem: itemId }));
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
        addCustomSectionItem,
        deleteCustomSectionItem,
        selectCustomSectionItem,
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