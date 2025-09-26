import { Environment } from "aerosync-react-native-sdk"
import { ReactNode } from "react"

export interface WidgetConfigType {
    token: string
    environment: Environment
    configurationId: string
    aeroPassUserUuid: string
    isEmbeddedFlow: boolean
    stateCode?: string
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
    onBankLink: (data: string) => void;
}

export type EmbeddedWidgetProps = {
    onWidgetBankClick: () => void;
}

export type LoginProps = {
    onLogin: () => void;
}