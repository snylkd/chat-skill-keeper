// src/components/ui/textarea.tsx
import React from 'react';

interface TextareaProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ value, onChange, placeholder, disabled, className = '' }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`border p-2 rounded-md w-full resize-none ${className}`}
    />
  );
};
