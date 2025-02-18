// src/components/ui/toaster.tsx
import React, { useState, useEffect } from 'react';

export const Toaster = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('Message envoyé avec succès!');
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`absolute top-4 right-4 p-4 bg-green-500 text-white rounded-md ${message ? 'block' : 'hidden'}`}>
      {message}
    </div>
  );
};
