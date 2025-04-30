import { ReactNode } from "react"

export interface WidgetConfigType {
    token: string
    environment: string
    configurationId: string
    aeroPassUserUuid: string
    isEmbeddedFlow: boolean
}

export interface StoreContextType {
    widgetConfig: WidgetConfigType | null;
    setWidgetConfigAction: (config: WidgetConfigType) => void;
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface StoreProviderProps {
    children: ReactNode;
}

export type AeroSyncWidgetProps = {
    onWidgetClose: () => void;
}

export type LoginProps = {
    onLogin: () => void;
}