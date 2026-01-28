import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Tab = 'assets' | 'design' | 'systems' | 'levels' | 'ui' | 'audio' | 'multiplayer' | 'optimization';

interface DashboardContextType {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeTab, setActiveTab] = useState<Tab>('systems');

  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
