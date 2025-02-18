// src/components/ui/tooltip.tsx
import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const TooltipProvider: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 bg-gray-800 text-white text-xs rounded">
        {content}
      </div>
    </div>
  );
};
