import { useState, useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash-es';
import { useResume } from '@/context/resume-context';

export interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void;
  onChange?: (values: T) => void;
  onBlur?: () => void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  onChange,
  onBlur,
  validate,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const { setIsEditing } = useResume();

  // 创建防抖的 onChange
  const debouncedOnChange = useRef(
    debounce((values: T) => {
      if (onChange) {
        onChange(values);
      }
      setIsEditing(false);
    }, 1000)
  ).current;

  // 清理防抖
  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
      setIsEditing(false);
    };
  }, [debouncedOnChange, setIsEditing]);

  // Update values when initialValues change
  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  const handleChange = useCallback((field: keyof T, value: any) => {
    // 如果是字符串且全是空格，则不触发更新
    if (typeof value === 'string' && !value.trim()) {
      return;
    }

    setIsEditing(true);
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    
    if (validate) {
      const validationErrors = validate(newValues);
      setErrors(prev => ({ ...prev, [field]: validationErrors[field] }));
    }

    // 使用防抖的 onChange
    debouncedOnChange(newValues);
  }, [values, validate, debouncedOnChange, setIsEditing]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (validate) {
      const validationErrors = validate(values);
      setErrors(prev => ({ ...prev, [field]: validationErrors[field] }));
    }
    if (onBlur) {
      onBlur();
    }
  }, [values, validate, onBlur]);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }

    onSubmit(values);
  }, [values, validate, onSubmit]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValues,
  };
} 