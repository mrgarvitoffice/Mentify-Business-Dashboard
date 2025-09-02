
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

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const tCallback = useCallback((key: string) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k as keyof typeof result];
      } else {
        // Fallback to English if translation not found
        let fallbackResult = translations.en;
        for (const fk of keys) {
          if (fallbackResult && typeof fallbackResult === 'object' && fk in fallbackResult) {
            fallbackResult = fallbackResult[fk as keyof typeof fallbackResult];
          } else {
            return key; // Return the key if not found in fallback either
          }
        }
        return fallbackResult;
      }
    }
    return result;
  }, [language]);
  
  const tProxy = React.useMemo(() => new Proxy({} as any, {
    get(_, prop: string) {
      return new Proxy({} as any, {
        get(_, subProp: string) {
           const fullKey = `${prop}.${subProp}`;
           const translation = tCallback(fullKey);
           
           if(typeof translation === 'string') {
             return (vars?: Record<string, string>) => {
                if(!vars) return translation;
                let str = translation;
                for(const key in vars){
                    str = str.replace(`{${key}}`, vars[key]);
                }
                return str;
             }
           }
           // Return the function for nested keys that are functions
           if (typeof translation === 'function') {
                return translation;
           }

           // for simple non-function values
           return () => translation;
        }
      })
    }
  }), [tCallback]);


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
