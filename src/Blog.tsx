import './About.css'
import '@cloudscape-design/global-styles/index.css';
import './styles/base.scss';
import './styles/top-navigation.scss';
import LandingPageLayout from './layouts/LandingPageLayout';

function Blog() {
  return (
    <>
      <LandingPageLayout
        content={
          <>Blog</>
        }
        header={false}
      />
    </>
  )
}

export default Blog