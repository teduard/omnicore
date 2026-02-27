import { createContext, useState, useEffect, type ReactNode } from "react";
import { logger } from "../lib/logger";

interface IUserInfo {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Town: string;
  Phone: string;
}

interface AuthContextValue {
  user: IUserInfo;
  setUser: (source: IUserInfo) => void
  isAuthenticated: boolean;
  setIsAuthenticated: (source: boolean) => void;
  logout: () => void;
  login: (userInfo:IUserInfo) => void;
}

interface IAuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const UpdateLock = "LocalStorageLock";

async function setSessionAtomic(isAuth: boolean, userData: IUserInfo) {
  await navigator.locks.request(UpdateLock, async () => {
    if (isAuth === true) {
      localStorage.setItem("SessionIsAuthenticated", "true");

      if (userData) {
        localStorage.setItem("SessionUser", JSON.stringify(userData));
      }
    } else {
      localStorage.removeItem("SessionIsAuthenticated");
      localStorage.removeItem("SessionUser");
    }
  });
}

const AuthProvider = ( {children}: IAuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("SessionIsAuthenticated") === "true" || false,
  );
  const [user, setUser] = useState<IUserInfo | null>(
    JSON.parse(localStorage.getItem("SessionUser")) || null,
  );
  const login = (userInfo: IUserInfo) => setUser(userInfo);
  const logout = () => setUser(null);

  const value = {
    user,
    setUser,
    login,
    logout,
    isAuthenticated,
    setIsAuthenticated,
  };

  useEffect(() => {
    if (isAuthenticated) {
      setSessionAtomic(true, user);
    } else {
      setSessionAtomic(false, null);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key == "SessionIsAuthenticated") {
        logger.debug("SessionIsAuthenticated event picked up: ", event);

        const newValue = event.newValue === "true" ? true : false;

        if (newValue !== isAuthenticated) {
          setSessionAtomic(newValue, user);
          setIsAuthenticated(newValue);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, [isAuthenticated, user]);

  return <AuthContext value={value}>{children}</AuthContext>;
};

export { AuthContext, AuthProvider };
