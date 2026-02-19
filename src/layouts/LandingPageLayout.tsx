import { /*Link,*/ useNavigate } from "react-router-dom";
import logo from '/assets/logo.png'

import {useEffect} from 'react';
import '../App.css'

import { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import "tailwindcss";

import {
  ContentLayout,
} from '@cloudscape-design/components';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import '@cloudscape-design/global-styles/index.css';
import '../styles/base.scss';
import '../styles/top-navigation.scss';

import GoogleLoginButton from "../components/GoogleLoginButton";

import { useBearStore } from '../hooks'
import RelatedProducts from "../components/RelatedProducts";
import type { ILandingPageLayoutProps } from "./interfaces";

const LOCALE = 'en';

interface IDemoMainBarPortalProps {
  children: ReactNode;
}
const DemoHeaderPortal = ({ children }: IDemoMainBarPortalProps) => {
  const domNode = document.querySelector('#h')!;
  return createPortal(children, domNode);
};

const DemoFooterPortal = ({ children }: IDemoMainBarPortalProps) => {
  const domNode = document.querySelector('#footer')!;
  return createPortal(children, domNode);
};

const i18nStrings = {
  searchIconAriaLabel: 'Search',
  searchDismissIconAriaLabel: 'Close search',
  overflowMenuTriggerText: 'More',
  overflowMenuTitleText: 'All',
  overflowMenuBackIconAriaLabel: 'Back',
  overflowMenuDismissIconAriaLabel: 'Close menu',
};

const signedOutProfileActions = [
  { id: 'sign-in-with-google', text: 'Sign In with Google', href: '#'},
];

const profileActions = [
  { id: 'profile', text: 'Profile', href: '/dashboard/profile' },
  { id: 'preferences', text: 'Preferences', href: "/dashboard/preferences" },
  {
    id: 'support-group',
    text: 'Support',
    items: [
      {
        id: 'documentation',
        text: 'Documentation',
        href: '/docs',
        //external: true,
        //externalIconAriaLabel: ' (opens in new tab)',
      },
      // { id: 'feedback', text: 'Feedback', href: '#', external: true, externalIconAriaLabel: ' (opens in new tab)' },
      // { id: 'support', text: 'Customer support' },
    ],
  },
  { id: 'signout', text: 'Sign out', href: 'http://localhost:9080/api/logout' },
];

function LandingPageLayout(props: ILandingPageLayoutProps) {
  const navigate = useNavigate();

  const cookies:any = document.cookie.split(';').reduce(
        (cookies:any, cookie:any) => {
            const [name, val] = cookie.split('=').map( (c:any) => c.trim());
            cookies[name] = val;
            return cookies;
        }, {});
    
  let SessionInitiated:boolean = false;
  let SessionUsername:string|undefined = "username";
  let SessionEmail:string|undefined = "email";

  if(cookies["SessionInitiated"] === "true") {
    SessionInitiated = true;
    SessionUsername = decodeURIComponent(cookies["SessionUsername"]);
    SessionEmail = decodeURIComponent(cookies["SessionEmail"]);
  }

  const [userData, setUserData] = useState(
    { type: 'button', iconName: 'user-profile', title: 'Account', ariaLabel: 'Account', href: '/login' },
  );

  const headerVariant = 'divider';

  useEffect( () => {
    if(SessionInitiated) {
      setUserData(
        {
              type: 'menu-dropdown',
              text: SessionUsername,
              description: SessionEmail,
              iconName: 'user-profile',
              items: profileActions,
              title: SessionUsername
            }
      )
    } else {
      console.log("not auth");
      setUserData(
        
        { type: 'button', iconName: 'user-profile', title: 'Account', ariaLabel: 'Account', href: '/login' },

      )
    }
  },
  [SessionInitiated]);

  return (
    <>
     <I18nProvider locale={LOCALE} messages={[messages]}>
    <DemoHeaderPortal>
        <TopNavigation
          i18nStrings={i18nStrings}
          identity={{
            href: '/',
            title: 'OmniCore',
            logo: { src: logo, alt: 'OmniCore' },
          }}
          utilities={[
          {
            type: "button",
            text: "Dashboard",
            href: "/dashboard",
            externalIconAriaLabel: " (opens in a new tab)"
          },
          {
            type: "button",
            text: "About",
            href: "/about",
            externalIconAriaLabel: " (opens in a new tab)"
          },
          {
            type: "button",
            text: "Blog",
            href: "/blog",
            //external: true,
            externalIconAriaLabel: " (opens in a new tab)"
          },
          { type: 'button', 
            iconName: 'settings', 
            title: 'Settings', 
            ariaLabel: 'Settings' 
          },
            userData
          ]}
        />
      </DemoHeaderPortal>
      <ContentLayout
              headerVariant={headerVariant}
              header={props.header}
              defaultPadding={true}
              maxContentWidth={1000}
              disableOverlap={true}
            >       
          <main className="product-page-content">
            <br/>
            {props.content}  
          </main>
       </ContentLayout>
                
      <DemoFooterPortal>
        <TopNavigation
          i18nStrings={i18nStrings}
          identity={{
            href: '#',
            title: '© 2026 OmniCore',
          }}
          >
          </TopNavigation>
      </DemoFooterPortal>

      </I18nProvider>
    </>
  )
}

export default LandingPageLayout