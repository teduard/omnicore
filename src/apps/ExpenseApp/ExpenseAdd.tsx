import { /*Link,*/ useNavigate } from "react-router-dom";
//import { useState } from 'react'
import logo from '/assets/logo.png'
// import viteLogo from '/vite.svg'
import {useEffect} from 'react';
import '../../App.css'

import /*React,*/ { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';


// import Header from "@cloudscape-design/components/header";
// import Container from "@cloudscape-design/components/container";
// import SpaceBetween from "@cloudscape-design/components/space-between";
//import Input from "@cloudscape-design/components/input";
//import Button from "@cloudscape-design/components/button";

import {
  //AppLayout,
  Badge,
  BreadcrumbGroup,
  // Container,
  // ContentLayout,
  // Flashbar,
  // Header,
  HelpPanel,
  // Link,
  SideNavigation,
  //SideNavigationProps,
  // SplitPanel,
  // Spinner,
  Button,
  AppLayoutToolbar,
  // CopyToClipboard,
  // TopNavigation,
  // Input
} from '@cloudscape-design/components';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';

//import Box from '@cloudscape-design/components/box';
//import BreadcrumbGroup from '@cloudscape-design/components/breadcrumb-group';
//import SideNavigation, { SideNavigationProps } from '@cloudscape-design/components/side-navigation';
//import SpaceBetween from '@cloudscape-design/components/space-between';
//import Table, { TableProps } from '@cloudscape-design/components/table';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import '@cloudscape-design/global-styles/index.css';


import '../../styles/base.scss';
import '../../styles/top-navigation.scss';

//import CustomFooter from './CustomFooter';

import { applyMode, applyDensity, Density, Mode } from '@cloudscape-design/global-styles';
import { type Theme, applyTheme } from '@cloudscape-design/components/theming';
import ExpenseForm from "./ExpenseForm";
import ExpenseLayout from "./ExpenseLayout";
import { DashboardRoutes, ExpenseRoutes } from "../../routes";
//import ExpenseChart from "./ExpenseChart";

const LOCALE = 'en';

interface IDemoMainBarPortalProps {
  children: ReactNode;
}

// const [dialogVisible, setDialogVisible] = useState(false);

// const onFollowHandler: SideNavigationProps['onFollow'] = event => {
//     event.preventDefault();
//     //if (event.detail.href === '#/density_settings') {
//       setDialogVisible(false);
//     //}
//   };

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
  { id: 'profile', text: 'Profile', href: '/profile' },
  { id: 'preferences', text: 'Preferences', href: "/preferences" },
  // { id: 'plan', text: 'Your plan', href: "/your-plan" },
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
  { id: 'signout', text: 'Sign out', href: '/signout' },
];


function Content() {
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
        {/* <div>Add Expense</div>
        <Button onClick={switchTheme}>Current theme: {selectedTheme}</Button> */}
        
        {/* <ExpenseChart/>
        <br/><br/><br/> */}
        {/* <br/> */}
        <ExpenseForm/>
        </>
}

function _ExpenseAdd() {
  //const [count, setCount] = useState(0)
  //const [value, setValue] = useState("");
  //const [searchValue, setSearchValue] = useState('');
  const [toolsOpen, setToolsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
    <I18nProvider locale={LOCALE} messages={[messages]}>
    <DemoHeaderPortal>
        <TopNavigation
          className="custom-main-header"
          i18nStrings={i18nStrings}
          identity={{
            href: '#',
            title: 'OmniCore',
            logo: { src: logo, alt: 'OmniCore' },
          }}
          // search={
          //   <>
          //     <Button variant="primary">About</Button>
          //     <Button variant="primary">Tools</Button>
          //     <Button variant="primary">Blog</Button>
              
              
          //   </>
           
          // }
          utilities={[
            {
          type: "button",
          text: "All tools",
          href: "https://example.com/",
          //external: true,
          externalIconAriaLabel: " (opens in a new tab)"
        },
        // {
        //   type: "button",
        //   text: "Docs",
        //   href: "https://example.com/",
        //   //external: true,
        //   externalIconAriaLabel: " (opens in a new tab)"
        // },
        {
          type: "button",
          text: "Blog",
          href: "https://example.com/",
          external: true,
          externalIconAriaLabel: " (opens in a new tab)"
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
    breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: 'Expense Dashboard', href: '#' },
            //{ text: 'Screenshot API', href: '#' },
          ]}
          expandAriaLabel="Show path"
          ariaLabel="Breadcrumbs"
        />
      }
      content={
        <Content/>
      }

      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      //toolsOpen={true}
      tools={<HelpPanel header={<h2>Overview</h2>}>Help content</HelpPanel>}
      

      // splitPanelPreferences={{position:"side"}}
      // splitPanel={
      //   <SplitPanel header={"split panel title"}>
      //       <Spinner size="large" />
      //       <h2>split panel content</h2>
      // </SplitPanel>
      //   }

      navigation={
        <>
        <SideNavigation
          activeHref={location.pathname}
          onFollow={(event) => {
            // 1. Check if it's an internal link
            if (!event.detail.external) {
              // 2. Stop the browser from reloading the page
              event.preventDefault();
              // 3. Let React Router handle the URL change
              navigate(event.detail.href);
            }
          }}
          // onFollow={onFollowHandler}
          header={{
            href: '#',
            text: 'Overview',
          }}
          items={[
            {
              type: "link",
              text: "Month expenses:",
              href: "#/quota",
              info: <Badge color="green">3200</Badge>
            },
            // {
            //   type: "link",
            //   text: "go to app",
            //   href: "/",
            //   info: <></>
            // },
            // {
            //   type: "link",
            //   text: "WebShot",
            //   href: "/webshot",
            //   info: <></>
            // },
            { type: "divider" },
            {
              
              type: "section-group",
              title: "Your Expenses",
              items: [
                { type: 'link', text: `Summary`, href: `/expense` },
                { type: 'link', text: `All expenses`, href: `/expense/cost` },
                { type: 'link', text: `Add expense`, href: `/expense/add` },
              ]
            },
            // { type: "divider" },
            // {
            //   type: "section-group",
            //   title: "Guides",
            //   items: [
            //     { type: 'link', text: `Getting started`, href: `/guide-getting-started` },
            //     { type: 'link', text: `API`, href: `/guide-api` },
            //     { type: 'link', text: `Screenshots`, href: `/guide-screenshot` },
            //     { type: 'link', text: `Render PDFs`, href: `/guide-render-pdf` }, 
            //     { type: 'link', text: `Query builder`, href: `/guide-query-builder` },
            //     // { type: 'link', text: `Python`, href: `#python` }, 
            //     // { type: 'link', text: `Kotlin`, href: `#kotlin` },
            //     // { type: 'link', text: `Azure`, href: `#azure` }, 
            //   ]
            // },
            // { type: "divider" },
            // {
            //   type: "section-group",
            //   title: "",
            //   items: [
            //     { type: 'link', text: `About`, href: `/about` },
            //     { type: 'link', text: `Contact Us`, href: `/contact` },
            //     { type: 'link', text: `Support`, href: `/support` },
            //     { type: 'link', text: `Terms of Service`, href: `/terms` },
            //     { type: 'link', text: `© 2026 OmniCore`, href: '#' },
            //   ]
            // }
          ]}
        />
        {/* {dialogVisible && <DensityPreferencesDialog onDismiss={() => setDialogVisible(false)} />} */}
        </>
      }
      />

      {/* <DemoFooterPortal>
        <TopNavigation
          i18nStrings={i18nStrings}
          identity={{
            href: '#',
            title: 'footer',
            //logo: { src: logo, alt: 'footer' },
          }}
          >
          </TopNavigation>
      
                <></>
      </DemoFooterPortal> */}
{/* <CustomFooter></CustomFooter> */}
      </I18nProvider>
    {/* <SpaceBetween size="m">
      <Header variant="h1">Hello World!</Header>

      <Container>
        <SpaceBetween size="s">
          <span>Start editing to see some magic happen</span>
          <Input
            value={value}
            onChange={(event) => setValue(event.detail.value)}
          />
          <Button variant="primary">Click me</Button>
        </SpaceBetween>
      </Container>
    </SpaceBetween> */}
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> 
      <h1>OmniCore</h1>
      <Button>Hello!</Button>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>

    
  )
}

function Breadcrumbs() {
 const navigate = useNavigate();
    return <BreadcrumbGroup
                  items={[
                      { text: 'Dashboard', href: ExpenseRoutes.path },
                      { text: 'Add expense', href: `${ExpenseRoutes.path}/add` },
                  ]}
                  expandAriaLabel="Show path"
                  ariaLabel="Breadcrumbs"
                  onFollow={(event) => {
                    // 1. Check if it's an internal link
                    if (!event.detail.external) {
                      // 2. Stop the browser from reloading the page
                      event.preventDefault();
                      // 3. Let React Router handle the URL change
                      navigate(event.detail.href);
                    }
                  }}
                />
}

function ExpenseAdd() {
  return(
    <ExpenseLayout
        content={ <Content /> }
        breadcrumbs = { <Breadcrumbs /> }
      />
  )}

export default ExpenseAdd
