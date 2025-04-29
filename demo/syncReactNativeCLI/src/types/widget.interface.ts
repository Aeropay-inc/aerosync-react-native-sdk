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
}