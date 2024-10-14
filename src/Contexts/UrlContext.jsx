import { createContext, useState } from "react";

export const UrlContext = createContext();

export function UrlContextManager({ children }) {
    const url = "http://localhost:3001/api";

    return (
        <UrlContext.Provider value={url}>
            { children }
        </UrlContext.Provider>
    );
}

