import { /*Link,*/ useNavigate } from "react-router-dom";
import logo from '/assets/logo.png'

import {useEffect} from 'react';
import './App.css'

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
import './styles/base.scss';
import './styles/top-navigation.scss';

import CustomFooter from './components/CustomFooter';
import { HeroHeader } from "./components/HeroHeader";
import ProductOverview from "./components/ProductOverview";
import React from "react";
import GoogleLoginButton from "./components/GoogleLoginButton";

import { useBearStore } from './hooks'
import RelatedProducts from "./components/RelatedProducts";

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
  { id: 'profile', text: 'Profile' },
  { id: 'preferences', text: 'Preferences' },
  { id: 'security', text: 'Security' },
  {
    id: 'support-group',
    text: 'Support',
    items: [
      {
        id: 'documentation',
        text: 'Documentation',
        href: '#',
        external: true,
        externalIconAriaLabel: ' (opens in new tab)',
      },
      { id: 'feedback', text: 'Feedback', href: '#', external: true, externalIconAriaLabel: ' (opens in new tab)' },
      { id: 'support', text: 'Customer support' },
    ],
  },
  { id: 'signout', text: 'Sign out', href: 'http://localhost:9080/api/logout' },
];


function Content(props:any) {
  const {bears, feed, food} = useBearStore()

  const headerVariant = 'divider';
  
  return <ContentLayout
        headerVariant={headerVariant}
        header={<HeroHeader />}
        defaultPadding={true}
        maxContentWidth={1000}
        disableOverlap={true}
      >
        {props.children}
      </ContentLayout>

}

function App() {
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
    { type: 'button', iconName: 'user-profile', title: 'Account', ariaLabel: 'Account' },
  );

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
      setUserData(
        
{ type: 'button', iconName: 'user-profile', title: 'Account', ariaLabel: 'Account' },

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
            href: '#',
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
            href: "https://example.com/",
            external: true,
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
      <Content>
        
          <main className="product-page-content">
            <br/>
      
            {/*
              <h1 className="text-xl font-bold underline">
                Sign in form
              </h1>
              <hr/>
              <GoogleLoginButton/>           
              <br/><br/> 
            */}

            <RelatedProducts />
            
            </main>
      </Content>
                
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

export default App