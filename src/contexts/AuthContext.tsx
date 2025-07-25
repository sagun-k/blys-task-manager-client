import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UserDto } from "../api/dtos/UserDto";
import { AuthenticationServices } from "../api/services/AuthenticationService";
import { ToasUtils } from "../utils/ToastUtils";
import LoadingScreen from "../components/LoadingScreen";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthContextType {
  user: UserDto | undefined;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDto | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const login = async (email: string, password: string) => {
    try {
      const userData = await AuthenticationServices.login(email, password);
      setUser(userData);
    } catch (error) {
      ToasUtils.showErrorToast("Error logging in", error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await AuthenticationServices.register(email, password, name);
      ToasUtils.showSuccessToast(
        "Successfully register user, please login"
      );
    } catch (error) {
      throw error;
    }
  };

  const checkAuth = async () => {
    try {
      const user = await AuthenticationServices.checkAuth();
      setUser(user);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await AuthenticationServices.logOut();
      setUser(undefined);
    } catch (err) {
      ToasUtils.showErrorToast("Error logging out", err);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
