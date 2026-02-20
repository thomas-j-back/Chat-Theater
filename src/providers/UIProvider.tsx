import { createContext, useState } from "react";
import type { UIContextType } from "@/types/Contexts";

export const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <UIContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </UIContext.Provider>
    )
}