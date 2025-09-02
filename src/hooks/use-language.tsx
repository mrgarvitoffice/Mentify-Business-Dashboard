
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';

const translations = { en, hi };

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: any; // Using 'any' for the proxy object
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper function to access nested properties of an object
const getNestedTranslation = (obj: any, keys: string[]) => {
  return keys.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const createTranslationProxy = useCallback((path: string[] = []): any => {
    return new Proxy(() => {}, {
      get: (_, prop: string) => {
        return createTranslationProxy([...path, prop]);
      },
      apply: (_, __, args: [Record<string, string | number> | undefined]) => {
        const key = path.join('.');
        let translation = getNestedTranslation(translations[language], path);

        // Fallback to English if translation is not found
        if (translation === undefined) {
          translation = getNestedTranslation(translations.en, path);
        }
        
        if (translation === undefined) {
          return key; // Return the key if it's not found in English either
        }

        if (typeof translation === 'string') {
          const [vars] = args;
          if (!vars) return translation;
          let str = translation;
          for (const key in vars) {
            str = str.replace(`{${key}}`, String(vars[key]));
          }
          return str;
        }

        return translation;
      }
    });
  }, [language]);
  
  const tProxy = React.useMemo(() => createTranslationProxy(), [createTranslationProxy]);


  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: tProxy }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
