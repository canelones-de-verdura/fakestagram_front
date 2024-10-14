import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextManager({ children }) {
    const [loggedUser, setLoggedUser] = useState(null);

    const user = {
        loggedUser,
        setLoggedUser,
    }

    return (
        <UserContext.Provider value={user}>
            { children }
        </UserContext.Provider>
    );
}

