
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type FontSize = 'sm' | 'base' | 'lg';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<FontSize>('sm');

  useEffect(() => {
    const storedFontSize = localStorage.getItem('app-font-size') as FontSize | null;
    if (storedFontSize) {
      handleSetFontSize(storedFontSize);
    } else {
      handleSetFontSize('sm');
    }
  }, []);

  const handleSetFontSize = useCallback((newSize: FontSize) => {
    setFontSize(newSize);
    localStorage.setItem('app-font-size', newSize);
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    document.documentElement.classList.add(`text-${newSize}`);
  }, []);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize: handleSetFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
}

export function useFontSize() {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error('useFontSize must be used within a FontSizeProvider');
  }
  return context;
}
