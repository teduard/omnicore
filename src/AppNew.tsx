import './About.css'
import '@cloudscape-design/global-styles/index.css';
import './styles/base.scss';
import './styles/top-navigation.scss';
import RelatedProducts from "./components/RelatedProducts";

import LandingPageLayout from './layouts/LandingPageLayout';
import { HeroHeader } from "./components/HeroHeader";

function AppNew() {
  return (
    <>
      <LandingPageLayout
        content={<RelatedProducts />}
        header={<HeroHeader />}
      />
    </>
  )
}

export default AppNew