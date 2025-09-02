
"use client";

import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

// This context is now only responsible for opening and closing the Smart Buddy panel.
// Settings are handled separately.
interface SmartBuddyContextType {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SmartBuddyContext = createContext<SmartBuddyContextType | undefined>(undefined);

export function SmartBuddyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SmartBuddyContext.Provider value={{ isOpen, setIsOpen }}>
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
