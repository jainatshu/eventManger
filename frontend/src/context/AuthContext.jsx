import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/login`, { email, password }, { withCredentials: true });
      const res = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
      setUser(res.data);
    } catch (error) {
      throw error.response?.data?.error || "Login failed";
    }
  };

  const register = async (name, email, password) => {
    try {
      await axios.post(`${API_BASE_URL}/auth/register`, { name, email, password }, { withCredentials: true });
      const res = await axios.get(`${API_BASE_URL}/auth/me`, { withCredentials: true });
      setUser(res.data);
    } catch (error) {
      throw error.response?.data?.error || "Registration failed";
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
