import { Badge, BreadcrumbGroup, HelpPanel, SideNavigation,  
    SplitPanel,
  Spinner, } from '@cloudscape-design/components';
import { MainLayout } from '../../layouts';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";

import {type IOrganizationLayoutProps} from './interfaces'

import {DashboardRoutes} from '../../routes'

const queryClient = new QueryClient()

function Breadcrumbs() {
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    //{ text: 'Organization', href: '/organization' },
                  ]}
                  expandAriaLabel="Show path"
                  ariaLabel="Breadcrumbs"
                />
}

function Tools() {
    return <HelpPanel header={<h2>Your Organization</h2>}>
        Detail about your organization
        
        it's members and other details
        </HelpPanel>
}

function Navigation() {
    const navigate = useNavigate();

    return  <>
        <SideNavigation
          activeHref={location.pathname}
          onFollow={(event) => {
            // 1. Check if it's an internal link
            if (!event.detail.external) {
              // 2. Stop the browser from reloading the page
              event.preventDefault();
              // 3. Let React Router handle the URL change
              
              console.log("event.detail.href = ", event.detail.href)
              
              // console.log("new URL(import.meta.url).pathname ", new URL(import.meta.url).origin)
              console.log("final:", new URL(import.meta.url).origin + event.detail.href)

              const finalHref = event.detail.href.replace(import.meta.env.BASE_URL, '');

              navigate(finalHref);
            }
          }}
          header={{
            href: '#',
            text: 'Overview',
          }}
          items={[
            { 
                type: 'link', 
                text: `Summary`, 
                href: import.meta.env.BASE_URL + DashboardRoutes.path 
            },
            {
                type: "link",
                text: "Your profile",
                href: import.meta.env.BASE_URL + `${DashboardRoutes.path}/profile`,
                //info: <Badge color="green">2</Badge>
            },
            { 
                type: 'link', 
                text: `Preferences`, 
                href: import.meta.env.BASE_URL + `${DashboardRoutes.path}/preferences` 
            },
            { type: "divider" },
            { 
                type: 'link', 
                text: `System settings`, 
                href: import.meta.env.BASE_URL + `${DashboardRoutes.path}/system` 
            },
            { 
                type: 'link', 
                text: `Your team`, 
                href: import.meta.env.BASE_URL + `${DashboardRoutes.path}/team` 
            },
            // { type: "divider" },
            // { 
            //     type: 'link', 
            //     text: `Enable Ollama`, 
            //     href: import.meta.env.BASE_URL + `${DashboardRoutes.path}/ollama` 
            // },
          ]}
        />
        </>
}

function OrganizationSplitPanel() {
    return <SplitPanel header={"Organization help"}>
                 <h2>Organization</h2>
                 <Spinner size="large" />
           </SplitPanel>
}

function Layout(props: IOrganizationLayoutProps) {
    return <>
        <QueryClientProvider client={queryClient}>
            <MainLayout
                content={ props.content }
                breadcrumbs = { props.breadcrumbs }
                //breadcrumbs = { <Breadcrumbs /> }
                
                search={false}

                tools = { <Tools />}
                toolsHide={true}
                
                navigation = { <Navigation />}
                splitPanel = {false} //{ <OrganizationSplitPanel /> }
            />
        </QueryClientProvider>
    </>
}

{/*
    <ErrorBoundary
      onError={({ error: e }) => console.log(e)}
    >
      {!error ? (
        <Button onClick={() => setError(true)}>
          Simulate error
        </Button>
      ) : (
        <>{{}}</>
      )}
    </ErrorBoundary>
    */}

export default Layout;