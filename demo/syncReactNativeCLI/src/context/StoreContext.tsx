import React, { createContext, useState, useContext } from 'react';
import { WidgetConfigType, StoreContextType, StoreProviderProps } from '../types/widget.interface'

// Create a context for your store
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }: StoreProviderProps) => {
    const [widgetConfig, setWidgetConfig] = useState<WidgetConfigType | null>(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const setWidgetConfigAction = (config: WidgetConfigType) => {
        // control the widget config update
        setWidgetConfig(config);
      };

  return (
    <StoreContext.Provider
      value={{
        widgetConfig,
        setWidgetConfigAction,
        isDarkMode,
        setIsDarkMode,
        isAuthenticated,
        setIsAuthenticated
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
