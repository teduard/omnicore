import './About.css'
import '@cloudscape-design/global-styles/index.css';
import './styles/base.scss';
import './styles/top-navigation.scss';
import GoogleLoginButton from "./components/GoogleLoginButton";

import LandingPageLayout from './layouts/LandingPageLayout';
import LoginForm from './components/LoginForm';

function Login() {
  return (
    <>
      <LandingPageLayout
        content={
          <>
          <LoginForm />
          <GoogleLoginButton />
          </>
        }
        header={false}
      />
    </>
  )
}

export default Login