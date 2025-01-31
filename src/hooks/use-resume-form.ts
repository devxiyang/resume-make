import { useCallback } from 'react';
import { useResume } from '@/context/resume-context';
import { useForm } from './use-form';
import { Experience, Education, Project, Skill, CustomSection } from '@/lib/types';

type FormType = 'experience' | 'education' | 'project' | 'skill' | 'customSection';

interface UseResumeFormOptions<T> {
  type: FormType;
  initialValues: T;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useResumeForm<T extends Experience | Education | Project | Skill | CustomSection>({
  type,
  initialValues,
  validate,
}: UseResumeFormOptions<T>) {
  const { updateItem } = useResume();

  const handleSubmit = useCallback((values: T) => {
    if (values.id) {
      updateItem(type, values);
    }
  }, [type, updateItem]);

  const form = useForm({
    initialValues,
    onSubmit: handleSubmit,
    validate,
    onChange: (values: T) => {
      // Only update if we have an id (meaning it's an existing item)
      if (values.id) {
        updateItem(type, values);
      }
    },
    debounceMs: 300,
  });

  return form;
}

// 验证函数
export const validateExperience = (values: Experience) => {
  const errors: Partial<Record<keyof Experience, string>> = {};
  
  if (!values.company) {
    errors.company = 'Company is required';
  }
  if (!values.position) {
    errors.position = 'Position is required';
  }
  if (!values.startDate) {
    errors.startDate = 'Start date is required';
  }
  if (!values.endDate && !values.currentlyWork) {
    errors.endDate = 'End date is required when not currently working';
  }
  
  return errors;
};

export const validateEducation = (values: Education) => {
  const errors: Partial<Record<keyof Education, string>> = {};
  
  if (!values.school) {
    errors.school = 'School is required';
  }
  if (!values.degree) {
    errors.degree = 'Degree is required';
  }
  if (!values.startDate) {
    errors.startDate = 'Start date is required';
  }
  if (!values.endDate) {
    errors.endDate = 'End date is required';
  }
  
  return errors;
};

export const validateProject = (values: Project) => {
  const errors: Partial<Record<keyof Project, string>> = {};
  
  if (!values.name) {
    errors.name = 'Project name is required';
  }
  if (!values.description) {
    errors.description = 'Description is required';
  }
  
  return errors;
};

export const validateSkill = (values: Skill) => {
  const errors: Partial<Record<keyof Skill, string>> = {};
  
  if (!values.name) {
    errors.name = 'Skill name is required';
  }
  
  return errors;
};

export const validateCustomSection = (values: CustomSection) => {
  const errors: Partial<Record<keyof CustomSection, string>> = {};
  
  if (!values.title) {
    errors.title = 'Section title is required';
  }
  
  return errors;
}; 