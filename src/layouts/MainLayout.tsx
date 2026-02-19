import { /*Link,*/ useNavigate } from "react-router-dom";
//import { useState } from 'react'
import logo from '/assets/logo.png'
// import viteLogo from '/vite.svg'
import React, {useEffect} from 'react';

import /*React,*/ { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import Grid from "@cloudscape-design/components/grid";

import {useOnlineStatus} from "../hooks";

import {
  Badge,
  BreadcrumbGroup,
  HelpPanel,
  SideNavigation,
  Button,
  AppLayoutToolbar,
  SpaceBetween,
  Icon,
  ContentLayout,
} from '@cloudscape-design/components';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import '@cloudscape-design/global-styles/index.css';
import '../App.css';
import '../styles/base.scss';
import '../styles/top-navigation.scss';

import { applyMode, applyDensity, Density, Mode } from '@cloudscape-design/global-styles';
import { type Theme, applyTheme } from '@cloudscape-design/components/theming';
import {type IMainLayoutProps} from "./interfaces";

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


function Content() {
  const isOnline = useOnlineStatus();

  const handleStatus = () => {
    if(isOnline) {
      window.dispatchEvent(new Event('offline'));
      
      console.log("dispatch event for offline");
    } else {
      window.dispatchEvent(new Event('online'));

      console.log("dispatch event for online");
    }
  }
  const switchTheme = () => {
  if(selectedTheme == Mode.Dark) {
    setSelectedTheme(Mode.Light);
  } else {
    setSelectedTheme(Mode.Dark);
  }
}

  const [selectedTheme, setSelectedTheme] = useState(Mode.Light);
    const theme: Theme = {
      tokens: {
      // Values are applied globally, except for visual contexts
      colorBackgroundLayoutMain: {
          // Specify value for light and dark mode
          light: 'white',
          dark: 'blue'
      },
      // Shorter syntax to apply the same value for both light and dark mode
      colorTextAccent: '#0073bb',
   },
   contexts: {
      // Values for visual contexts. Unless specified, default values will be applied
      'top-navigation': {
         tokens: {
            //colorTextAccent: '#f00',
            colorBackgroundContainerContent: '#1e324f',
         },
      },
      //header: {...},
      //flashbar: {...},
      //alert: {...},
   },
   };

  useEffect(() => {
    //window.location = "https://google.com";
    //applyMode(Mode.Dark);
    //applyMode(Mode.Light);
    //applyDensity(Density.Compact);
    //applyDensity(Density.Comfortable);

    applyMode(selectedTheme);

    //const { reset } = 
    applyTheme({theme});
  },[selectedTheme])

  return <>
    <Grid gridDefinition={[
      { colspan: { default: 12 } },
      { colspan: { default: 12 } },       
    ]}>
        <Button variant="primary" onClick={handleStatus}>
          {isOnline ? 'online' : 'ofline'}
          </Button>

        <Grid gridDefinition={[
            { colspan: { default: 12, m:7, s: 8, l:6, xl: 6, xxs: 12, xs:12 } },
            { colspan: { default: 12, m:5, s:4, l:6,  xl: 6, xxs: 12, xs:12 } },       
          ]}>
          <SpaceBetween size="l">
        
          </SpaceBetween>

          <SpaceBetween size="l">
        
          </SpaceBetween>

        </Grid> 
    </Grid>
  </>
}

function MainLayout ( props:IMainLayoutProps ) {
  const [toolsOpen, setToolsOpen] = useState(false);
  const headerVariant = 'divider';

  return (
    <>
    <I18nProvider locale={LOCALE} messages={[messages]}>
    <DemoHeaderPortal>
        <TopNavigation
          search={props.search}

          className="custom-main-header"
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
          //externalIconAriaLabel: " (opens in a new tab)"
        },
        {
          type: "button",
          text: "Blog",
          href: "/blog",
          //external: true,
          //externalIconAriaLabel: " (opens in a new tab)"
        },

        

            {
              type: 'button',
              iconName: 'notification',
              ariaLabel: 'Notifications',
              badge: true,
              disableUtilityCollapse: true,
            },
            { type: 'button', iconName: 'settings', title: 'Settings', ariaLabel: 'Settings' },
            {
              type: 'menu-dropdown',
              text: 'Admin',
              description: 'admin@gmail.com',
              iconName: 'user-profile',
              items: profileActions,
            },
          ]}
        />
      </DemoHeaderPortal>

      <AppLayoutToolbar
        headerSelector="#h"
        stickyNotifications
        contentType="table"
        breadcrumbs={props.breadcrumbs}
        content={
          <ContentLayout
                        headerVariant={headerVariant}
                        //header={props.header}
                        defaultPadding={true}
                        maxContentWidth={1000}
                        disableOverlap={true}
                      >       
                    <main className="product-page-content">
                      <br/>
                      {props.content}  
                    </main>
                 </ContentLayout>
        }
        toolsOpen={toolsOpen}
        onToolsChange={({ detail }) => setToolsOpen(detail.open)}
        tools={props.tools}     
        toolsHide={props.toolsHide}
        
        splitPanelPreferences={{position:"side"}}
        splitPanel = {props.splitPanel}
        
        navigation={<>{props.navigation}</>}
      />
      </I18nProvider>
    </>    
  )
}

export default MainLayout
