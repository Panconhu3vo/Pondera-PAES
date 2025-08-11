import React, { createContext, useState } from "react";

// Crea el contexto
export const PonderacionContext = createContext();

// Crea el proveedor del contexto
export const PonderacionProvider = ({ children }) => {
    const [ponderaciones, setPonderaciones] = useState(null);

    // El valor que se compartirá con todos los componentes
    const value = {
        ponderaciones,
        setPonderaciones,
    };

    return (
        <PonderacionContext.Provider value={value}>
            {children}
        </PonderacionContext.Provider>
    );
};
