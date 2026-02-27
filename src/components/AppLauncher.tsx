import { useEffect, type ReactNode } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

interface IAppLauncherProps {
  children: ReactNode;
}

const AppLauncher = ({ children }: IAppLauncherProps) => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { isAuthenticated } = authContext;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check if we are in 'standalone' mode from the manifest
    const isPWAEntry = searchParams.get("mode") === "standalone";

    // 2. If authenticated and entering via PWA icon, redirect to dashboard
    if (isPWAEntry) {
      if (isAuthenticated) {
        // Use { replace: true } so they can't 'back button' into the splash/redirect
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/login", { replace: true });
      }
    }
  }, [isAuthenticated, searchParams, navigate]);

  const isPWAEntry = searchParams.get("mode") === "standalone";

  if (isPWAEntry) {
    return <LoadingSpinner />;
  }

  return children;
};

export default AppLauncher;
