
"use client";

import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface SmartBuddyContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  showSettings: boolean;
  setShowSettings: Dispatch<SetStateAction<boolean>>;
}

const SmartBuddyContext = createContext<SmartBuddyContextType | undefined>(undefined);

export function SmartBuddyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <SmartBuddyContext.Provider value={{ isOpen, setIsOpen, showSettings, setShowSettings }}>
      {children}
    </SmartBuddyContext.Provider>
  );
}

export function useSmartBuddy() {
  const context = useContext(SmartBuddyContext);
  if (context === undefined) {
    throw new Error('useSmartBuddy must be used within a SmartBuddyProvider');
  }
  return context;
}
