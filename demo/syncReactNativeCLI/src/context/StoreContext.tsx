import React, { createContext, useState, useContext } from 'react';
import { WidgetConfigType, StoreContextType } from '../types/widget.interface'

// Create a context for your store
const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
    const [widgetConfig, setWidgetConfig] = useState<WidgetConfigType | null>(null);

    const setWidgetConfigAction = (config: WidgetConfigType) => {
        setWidgetConfig(config);
      };

  return (
    <StoreContext.Provider
      value={{
        widgetConfig,
        setWidgetConfigAction 
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
