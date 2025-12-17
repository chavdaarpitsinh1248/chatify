import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("user");
            if (stored) setAuth(JSON.parse(stored));
        } catch {
            localStorage.removeItem("user");
        }
    }, []);

    const login = ({ token, user }) => {
        const authData = { token, user };
        setAuth(authData);
        localStorage.setItem("user", JSON.stringify(authData));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                token: auth?.token,
                user: auth?.user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
