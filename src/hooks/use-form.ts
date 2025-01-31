import { useState, useCallback, useRef, useEffect } from 'react';

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit?: (values: T) => void;
  onChange?: (values: T) => void;
  validate?: (values: T) => Partial<Record<keyof T, string>>;
  debounceMs?: number;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  onChange,
  validate,
  debounceMs = 300,
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const timeoutRef = useRef<NodeJS.Timeout>();

  // Update values when initialValues change
  useEffect(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = useCallback((field: keyof T, value: any) => {
    const newValues = { ...values, [field]: value };
    setValues(newValues);
    
    if (validate) {
      const validationErrors = validate(newValues);
      setErrors(prev => ({ ...prev, [field]: validationErrors[field] }));
    }

    // Debounce the onChange callback
    if (onChange) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        onChange(newValues);
      }, debounceMs);
    }
  }, [values, validate, onChange, debounceMs]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (validate) {
      const validationErrors = validate(values);
      setErrors(prev => ({ ...prev, [field]: validationErrors[field] }));
    }
  }, [values, validate]);

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

    onSubmit?.(values);
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