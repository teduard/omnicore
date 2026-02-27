import LandingPageLayout from "../layouts/LandingPageLayout";
import LoginForm from "../components/LoginForm";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
   if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <LandingPageLayout
        content={
          <>
            <LoginForm />
          </>
        }
        header={false}
      />
    </>
  );
}

export default Login;
