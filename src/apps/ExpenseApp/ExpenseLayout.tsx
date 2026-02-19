import { Badge, HelpPanel, SideNavigation,  
  Input, } from '@cloudscape-design/components';
import { MainLayout } from '../../layouts';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useNavigate } from "react-router-dom";

import {type IExpenseLayoutProps} from './interfaces/'

import { useBearStore } from '../../hooks'

const queryClient = new QueryClient()


import { ExpenseRoutes } from '../../routes';
import React from 'react';
import { DatabaseProvider } from '../../db/hooks/DatabaseContext';

function Tools() {
    return <HelpPanel header={<h2>Your Organization</h2>}>
        Detail about your organization
        <br/><br/>
        it's members and other details
        </HelpPanel>
}

function Navigation() {
    const navigate = useNavigate();
    const bears = useBearStore((s) => s.bears);

    return  <>
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
          header={{
            href: '#',
            text: 'Overview',
          }}
          items={[
            {
                          type: "link",
                          text: "Month expenses:",
                          href: "#/quota",
                          info: <Badge color="red">{bears}</Badge>
            },
            { type: "divider" },
            {
              type: "section-group",
              title: "Your Expenses",
              items: [
                { type: 'link', text: `Summary`, href: ExpenseRoutes.path },
                { type: 'link', text: `All expenses`, href: `${ExpenseRoutes.path}/cost` },
                { type: 'link', text: `All LOCAL expenses`, href: `${ExpenseRoutes.path}/local` },
                { type: 'link', text: `Add LOCAL expense`, href: `${ExpenseRoutes.path}/addlocal` },
                { type: 'link', text: `Add expense`, href: `${ExpenseRoutes.path}/add` },
              ]
            },
            { type: "divider" },
            {
              type: "section-group",
              title: "Budgets",
              items: [
                { type: 'link', text: `Configure budgets`, href: `${ExpenseRoutes.path}/budgets` },
                { type: 'link', text: `Alerts`, href: `${ExpenseRoutes.path}/alerts` },
              ]
            },

            { type: "divider" },
            {
              type: "section-group",
              title: "Categories",
              items: [
                { type: 'link', text: `All categories`, href: `${ExpenseRoutes.path}/categories` },
                { type: 'link', text: `Add category`, href: `${ExpenseRoutes.path}/categories/add` },
              ]
            },
          ]}
        />
        </>
}

// function OrganizationSplitPanel() {
//     return <SplitPanel header={"Organization help"}>
//                  <h2>Organization</h2>
//                  <Spinner size="large" />
//            </SplitPanel>
// }

function ExpenseLayout(props: IExpenseLayoutProps) {
  const [searchValue,setSearchValue] = React.useState("");

    return <>
      <DatabaseProvider>
        <QueryClientProvider client={queryClient}>
            <MainLayout
                content={ props.content }
                breadcrumbs = { props.breadcrumbs }
                //breadcrumbs = { <Breadcrumbs /> }
                
                tools = { <Tools />}
                toolsHide={true}

                search={false}
              //   {
              //   <Input
              //     ariaLabel="Input field"
              //     clearAriaLabel="Clear"
              //     value={searchValue}
              //     onChange={({ detail }) => setSearchValue(detail.value)}
              //     type="search"
              //     placeholder="Ask AI about your spending..." 
              //     //value={searchValue}
              //   />
              // }
                
                navigation = { <Navigation />}
                splitPanel = {false} //{ <OrganizationSplitPanel /> }
            />
        </QueryClientProvider>
        </DatabaseProvider>
    </>
}

export default ExpenseLayout;