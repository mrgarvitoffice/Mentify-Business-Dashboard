
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type FontSize = 'sm' | 'base' | 'lg';

interface FontSizeContextType {
  fontSize: FontSize;
  setFontSize: (fontSize: FontSize) => void;
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(undefined);

export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  // Set initial state to 'sm'. This helps prevent a flash of incorrect font size on load.
  const [fontSize, setFontSize] = useState<FontSize>('sm');

  // This function now correctly applies the class to the root element.
  const handleSetFontSize = useCallback((newSize: FontSize) => {
    setFontSize(newSize);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-font-size', newSize);
      document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
      document.documentElement.classList.add(`text-${newSize}`);
    }
  }, []);

  useEffect(() => {
    // On mount, check local storage and apply the stored size, or default to 'sm'.
    const storedFontSize = localStorage.getItem('app-font-size') as FontSize | null;
    handleSetFontSize(storedFontSize || 'sm');
  }, [handleSetFontSize]);

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
