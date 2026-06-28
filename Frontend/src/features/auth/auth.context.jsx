import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api.js";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMe()
            .then((data) => {
                if (data?.user) setUser(data.user);
            })
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, setLoading, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}