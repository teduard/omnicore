import './About.css'
import '@cloudscape-design/global-styles/index.css';
import './styles/base.scss';
import './styles/top-navigation.scss';

import LandingPageLayout from './layouts/LandingPageLayout';
import { AboutHeader } from './components/AboutHeader';

function About() {
  return (
    <>
      <LandingPageLayout
        content={
          <>
          <AboutHeader />
          </>
        }
        header={false}
      />
    </>
  )
}

export default About