import { useNavigate } from "react-router-dom";
import logo from '/assets/logo.png'
import React, {useEffect, type Dispatch, type SetStateAction} from 'react';
import '../../../App.css'
import { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import Grid from "@cloudscape-design/components/grid";

import {
    Badge,
    BreadcrumbGroup,
    HelpPanel,
    SideNavigation,
    AppLayoutToolbar,
    Icon,
    Button,
} from '@cloudscape-design/components';

import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import TopNavigation from '@cloudscape-design/components/top-navigation';

import '@cloudscape-design/global-styles/index.css';
import '../../../styles/base.scss';
import '../../../styles/top-navigation.scss';

import ExpenseCostExplorerTable from "../components/ExpenseCostExplorerTable";

const LOCALE = 'en';

import type { IExpenseRow, IExpenseCategoryAggregate, IExpenseCategoryAggregateRow } from "../interfaces/data";

import {type IExpenseInsightsData} from '../interfaces/data';
import ExpenseCostExplorerSelector from "../components/ExpenseCostExplorerSelector";
import ExpenseCostExplorerPivot from "../components/ExpenseCostExplorerPivot";
import ExpenseLayout from "../ExpenseLayout";
import { ExpenseRoutes } from "../../../routes";

import {useDatabase} from "../../../db/hooks/useDatabase.tsx"

//import {type LoadingStateProps} from '../interfaces/data';

interface IDemoMainBarPortalProps {
  children: ReactNode;
}

const DemoHeaderPortal = ({ children }: IDemoMainBarPortalProps) => {
  const domNode = document.querySelector('#h')!;
  return createPortal(children, domNode);
};

/*
expense_id INTEGER PRIMARY KEY,
category_id INTEGER,
user_id INTEGER, 
entry_date DATE,
updated_date DATE, 
amount REAL, 
comment TEXT,
could_have_been_avoided BOOLEAN
name TEXT, 
created_date DATE
*/

interface ExpenseItem {
    expense_id: number;  
    // user_id: number;
    // category_id: number;
    // entry_date: Date;
    // updated_date: Date;
    amount: number;
    // comment: string;
    // could_have_been_avoided: boolean;
    // created_date: Date;
}

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
  {
    id: 'support-group',
    text: 'Support',
    items: [
      {
        id: 'documentation',
        text: 'Documentation',
        href: '/docs',
      },
    ],
  },
  { id: 'signout', text: 'Sign out', href: '/signout' },
];

 const defaultExpenseCategoryAggregateData: IExpenseCategoryAggregate = {
    expenseAggregate: new Array<IExpenseCategoryAggregateRow>(),
    expenseTotal: 0,
    LoadingStatus: 'not-started'
  }

type ContentType = {
  updateCategoryAggregate: (p:unknown)=>void
}

function Content(
  {updateCategoryAggregate}:ContentType
) {
  const { execute, isReady, Database } = useDatabase();

  const defaultExpenseInsightsData: IExpenseInsightsData = {
    ExpenseItemsCount: 0,
    CouldHaveBeenAvoidedCount: 0,
    LoadingStatus: 'not-started'
  }
  const [expenseInsightsData, setExpenseInsightsData] = React.useState(defaultExpenseInsightsData)

   const [expenses, setExpenses] = React.useState(new Array<IExpenseRow>());
  
  const [data, setData] = React.useState(new Array<IExpenseRow>());

    const updateExpenseHandler = () => {
      const apiEndpoint = "http://localhost:9080/api/expense/get_all";
  
      setExpenseInsightsData({
        ...defaultExpenseInsightsData,
        LoadingStatus: 'loading'
      });

      updateCategoryAggregate({
        ...defaultExpenseCategoryAggregateData,
        LoadingStatus: 'loading'
      });

/*
expense_id INTEGER PRIMARY KEY,
category_id INTEGER,
user_id INTEGER, 
entry_date DATE,
updated_date DATE, 
amount REAL, 
comment TEXT,
could_have_been_avoided BOOLEAN
name TEXT, 
created_date DATE
*/
      setData([]);

    const res = execute(`
      select e.*,c.name, c.category_id from Expenses e
join Categories c
on e.category_id = c.category_id
      `);
    const expenseData:Array<IExpenseRow> = new Array<IExpenseRow>();
    
      console.log("res = ", res)

    if(!res || res.length === 0) {
        console.log("no expenses on local");
    } else {
        res[0].values.map(row => {
              expenseData.push({
                expenseId: row[0],
                
                entryDate: row[6],
                amount: row[3],
                category: {
                  name: row[8],
                  categoryId: row[9]
                },
                comment: row[4],
                couldHaveBeenAvoided: row[5],
                //expense_id: row[0],
                // user_id: row[1],
                //amount: 100.23,
                // created_date: row[3]

                // expense_id: number;  
                // usecategory_idr_id: number;
                // category_id: number;
                // entry_date: Date;
                // updated_date: Date;
                // comment: string;
                // could_have_been_avoided: boolean;
                // created_date: Date;
            })
        })
        console.log("expenseData:", expenseData);

        setExpenses(expenseData);
    }
      // fetch(apiEndpoint, 
      //   {
      //     method: "GET",
      //     credentials: "include",
      //   })
      // .then( (r) => r.json())
      // .then( (r) => {
      //   setExpenses(r)
      // });
    }

    useEffect( () => {
      const newItems:Array<IExpenseRow> = new Array<IExpenseRow>();

      expenses.forEach(item => {
        const newEntry: IExpenseRow = {
            expenseId: item.expenseId,
            entryDate: item.entryDate,
            amount: item.amount,
            category: item.category.name,
            comment: item.comment,
            couldHaveBeenAvoided: item.couldHaveBeenAvoided,
        }

        newItems.push(newEntry);
      });

      setData(newItems);

      setExpenseInsightsData({
          ExpenseItemsCount: expenses.length ,
          CouldHaveBeenAvoidedCount: expenses.filter(item => item.couldHaveBeenAvoided === true).length,
          LoadingStatus: 'success'
        });
      
        const expenseTotal = expenses.reduce((acc,item) => acc + item.amount, 0).toFixed(2);

        const expenseAggregate:Array<IExpenseCategoryAggregateRow> = new Array<IExpenseCategoryAggregateRow>();

        // extract categories
        const categories:Set<string> = expenses.reduce(
          (acc, item) => acc.add(item.category.name),
          new Set<string>()
        );

        categories.forEach(c => {
          const newCategoryItem:IExpenseCategoryAggregateRow = {
            categoryName: c,
            categoryAmount: 0,
          };

          newCategoryItem.categoryAmount = parseFloat(expenses.filter(item => item.category.name === c)
            .reduce( (acc, item) => acc + item.amount, 0).toFixed(2));

          expenseAggregate.push(newCategoryItem);
        });

        updateCategoryAggregate({
          ...defaultExpenseCategoryAggregateData,
          expenseAggregate: expenseAggregate,
          expenseTotal: expenseTotal || 0,
          LoadingStatus: 'success'
        });
    }, [expenses])
  
    useEffect( () => {
      if(isReady) {
        updateExpenseHandler();
      }
    },[isReady])


    const showInsights = false;

  return <>
  <Button variant="primary" onClick={updateExpenseHandler}>
          <Icon name="refresh" />&nbsp;&nbsp;Refresh</Button> 
          <br/><br/>

    <Grid gridDefinition={[
        { colspan: { default: 12 } },
        // { colspan: { default: 4 } },       
      ]}>
        {showInsights && <ExpenseCostExplorerSelector 
          ExpenseItemsCount={expenseInsightsData.ExpenseItemsCount}
          CouldHaveBeenAvoidedCount={expenseInsightsData.CouldHaveBeenAvoidedCount}
          LoadingStatus={expenseInsightsData.LoadingStatus}/>
        }
        
        
        <ExpenseCostExplorerTable expenseData={data} LoadingStatus={expenseInsightsData.LoadingStatus}/>

        {/* <ExpenseCostExplorerPivot 
          LoadingStatus={expenseCategoryAggregate.LoadingStatus}
          expenseAggregate={expenseCategoryAggregate.expenseAggregate}
          expenseTotal={expenseCategoryAggregate.expenseTotal}
        /> */}
    </Grid> 
    </>
}

function Breadcrumbs() {
  const navigate = useNavigate();
 return <BreadcrumbGroup
                  items={[
                      { text: 'Dashboard', href: ExpenseRoutes.path },
                      { text: 'All expenses', href: `${ExpenseRoutes.path}/cost` },
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

function ExpenseCostExplorerLocal() {
   const aggregateHandler = (p:SetStateAction<IExpenseCategoryAggregate>) => {
    setExpenseCategoryAggregate(p);
  }

  const [expenseCategoryAggregate, setExpenseCategoryAggregate] = React.useState(defaultExpenseCategoryAggregateData);

 return <>
  
      <ExpenseLayout
        content={<Content updateCategoryAggregate={aggregateHandler} /> }
        breadcrumbs = { <Breadcrumbs /> }
      />
    </>
}

function _ExpenseCostExplorer() {
  const [toolsOpen, setToolsOpen] = useState(false);
  const navigate = useNavigate();

  const [expenseCategoryAggregate, setExpenseCategoryAggregate] = React.useState(defaultExpenseCategoryAggregateData);

  const aggregateHandler = (p:SetStateAction<IExpenseCategoryAggregate>) => {
    setExpenseCategoryAggregate(p);
  }

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
          utilities={[
            {
          type: "button",
          text: "All tools",
          href: "https://example.com/",
          externalIconAriaLabel: " (opens in a new tab)"
        },
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
                { text: 'Cost Explorer', href: '#'}
              ]}
              expandAriaLabel="Show path"
              ariaLabel="Breadcrumbs"
            />
          }
      content={
        <Content 
          updateCategoryAggregate={aggregateHandler}/>
      }

      toolsOpen={toolsOpen}
      onToolsChange={({ detail }) => setToolsOpen(detail.open)}
      //toolsOpen={true}
      tools={<></>
      // <HelpPanel header={<h2>Expense filter</h2>}>
      //    <ExpenseCostExplorerPivot 
      //     LoadingStatus={expenseCategoryAggregate.LoadingStatus}
      //     expenseAggregate={expenseCategoryAggregate.expenseAggregate}
      //     expenseTotal={expenseCategoryAggregate.expenseTotal}
      //   />
      // </HelpPanel>
      }
      

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
          header={{
            href: '#',
            text: 'Overview',
          }}
          items={[
            {
              type: "link",
              text: "Month expenses:",
              href: "#/quota",
              info: <Badge color="red">3200</Badge>
            },

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
      
          ]}
        />
        </>
      }
      />
      </I18nProvider>
    </>    
  )
}

export default ExpenseCostExplorerLocal
