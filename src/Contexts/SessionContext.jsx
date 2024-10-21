import { createContext, useState } from "react";

export const SessionContext = createContext();

export function SessionContextManager({ children }) {
    const [logged, setLogged] = useState(false);
    const [user, setUser] = useState(null);

    const session = {
        logged,
        setLogged,
        user,
        setUser,

        start_session: (usr_obj) => {
            setUser(usr_obj);
            setLogged(true);
        },

        end_session: () => {
            setUser(null);
            setLogged(false);
        }
    }

    return (
        <SessionContext.Provider value={session}>
            { children }
        </SessionContext.Provider>
    );
}

