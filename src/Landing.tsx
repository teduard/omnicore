import RelatedProducts from "./components/RelatedProducts";
import LandingPageLayout from './layouts/LandingPageLayout';
import { HeroHeader } from "./components/HeroHeader";

function Landing() {
  return (
    <>
      <LandingPageLayout
        content={<RelatedProducts />}
        header={<HeroHeader />}
      />
    </>
  )
}

export default Landing