// src/components/ui/sonner.tsx
import React, { useState, useEffect } from 'react';

export const Sonner = () => {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Simuler l'affichage d'un message
    const timer = setTimeout(() => {
      setMessage('Nouvelle notification reçue!');
    }, 1500); // Après 1.5 secondes, montre le message

    // Nettoyer le timer après l'effet
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute top-20 right-4 p-4 bg-yellow-500 text-black rounded-md transition-all ${message ? 'opacity-100' : 'opacity-0'}`}
      style={{ transition: 'opacity 0.5s ease' }}
    >
      {message}
    </div>
  );
};
