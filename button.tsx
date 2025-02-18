// src/components/ui/button.tsx
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, type = 'button', size = 'medium', className = '', onClick, disabled = false }) => {
  const sizeClasses = {
    small: 'py-2 px-4 text-sm',
    medium: 'py-3 px-6 text-base',
    large: 'py-4 px-8 text-lg',
  };

  return (
    <button
      type={type}
      className={`bg-blue-500 text-white rounded-md ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
