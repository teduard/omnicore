import LandingPageLayout from '../layouts/LandingPageLayout';
import { AboutHeader } from '../components/AboutHeader';

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