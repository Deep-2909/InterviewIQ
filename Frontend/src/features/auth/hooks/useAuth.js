import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, logout, register, getMe } from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, loading, setLoading, setUser } = context;

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const data = await login({ email, password });

            if (data.error) throw new Error(data.error);

            setUser(data.user);
        }
        catch (error) {
            throw new Error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const data = await register({ username, email, password });

            if (data.error) throw new Error(data.error);

            setUser(data.user);
        }
        catch (error) {
            throw new Error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            const data = await logout();

            if (data.error) throw new Error(data.error);

            setUser(null);
        }
        catch (error) {
            throw new Error(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout }
}
