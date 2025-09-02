"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import hi from '@/locales/hi.json';

const translations = { en, hi };

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    const keys = key.split('.');
    let result = translations[language];
    for (const k of keys) {
      result = result[k];
      if (!result) {
        // Fallback to English if translation not found
        let fallbackResult = translations.en;
        for (const fk of keys) {
            fallbackResult = fallbackResult[fk];
            if(!fallbackResult) return key;
        }
        return fallbackResult;
      }
    }
    return result;
  };
  
  const tProxy = new Proxy({} as any, {
    get(_, prop: string) {
      return new Proxy({} as any, {
        get(_, subProp: string) {
           const fullKey = `${prop}.${subProp}`;
           const translation = t(fullKey);
           
           if(typeof translation === 'string') {
             return (vars: Record<string, string>) => {
                if(!vars) return translation;
                let str = translation;
                for(const key in vars){
                    str = str.replace(`{${key}}`, vars[key]);
                }
                return str;
             }
           }
           return translation;
        }
      })
    }
  })

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
