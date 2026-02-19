import { useNavigate } from "react-router-dom";
import logo from '/assets/logo.png'

import React, {useEffect} from 'react';
import '../../App.css'
import { type ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

import Grid from "@cloudscape-design/components/grid";

import useOnlineStatus from "./interfaces/hooks";
import { useBearStore,useExpenseStore } from '../../hooks'

import {
  Badge,
  BreadcrumbGroup,
  ProgressBar,
  SpaceBetween,
} from '@cloudscape-design/components';

import '@cloudscape-design/global-styles/index.css';
import '../../styles/base.scss';
import '../../styles/top-navigation.scss';

import type { IExpenseTableData,IExpenseRow, IExpenseCategoryAggregate, IExpenseCategoryAggregateRow } from "./interfaces/data";
import ExpenseChart from "./ExpenseChart";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";

import {type IExpenseInsightsData} from './interfaces/data';
import ExpenseInsight from "./components/ExpenseInsight";

import ExpensePivot from "./components/ExpensePivot";
import ExpensePieChart from "./components/ExpensePieChart";

import {type LoadingStateProps} from './interfaces/data';
import { DashboardRoutes, ExpenseRoutes } from "../../routes";
//import DateRange from "../../components/DateRange";
import MonthPicker from "../../components/MonthPicker";
import ExpenseLayout from "./ExpenseLayout";
import ExpenseTable from "./components/ExpenseTable";
import { applyMode, Mode } from "@cloudscape-design/global-styles";
import { applyTheme, type Theme } from "@cloudscape-design/components/theming";
import CategoriesTable from "./components/CategoriesTable";

function _Content() {
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

  const defaultExpenseInsightsData: IExpenseInsightsData = {
    ExpenseItemsCount: 0,
    CouldHaveBeenAvoidedCount: 0,
    LoadingStatus: 'not-started'
  }
  const [expenseInsightsData, setExpenseInsightsData] = React.useState(defaultExpenseInsightsData)

  const defaultExpenseCategoryAggregateData: IExpenseCategoryAggregate = {
    expenseAggregate: new Array<IExpenseCategoryAggregateRow>(),
    expenseTotal: 0,
    LoadingStatus: 'not-started'
  }

  const [expenseCategoryAggregate, setExpenseCategoryAggregate] = React.useState(defaultExpenseCategoryAggregateData);

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

  const [expenses, setExpenses] = React.useState(new Array<any>());
  
  const [data, setData] = React.useState(new Array<IExpenseRow>());

    const updateExpenseHandler = () => {
      const apiEndpoint = "http://localhost:9080/api/expense/get_all?date=" + selectedDate;
  
      setExpenseInsightsData({
        ...defaultExpenseInsightsData,
        LoadingStatus: 'loading'
      });

      setExpenseCategoryAggregate({
        ...defaultExpenseCategoryAggregateData,
        LoadingStatus: 'loading'
      });

      fetch(apiEndpoint, 
        {
          method: "GET",
          credentials: "include",
        })
      .then( (r) => r.json())
      .then( (r) => {
        setExpenses(r)
      });
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

      //setData(newItems);
      setData(newItems.slice(Math.max(newItems.length - 10, 0)));

      //const f = expenses.filter(item => item.couldHaveBeenAvoided === true);
      //console.log(f);

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

        //console.log('expenses:', expenses);

        categories.forEach(c => {
          const newCategoryItem:IExpenseCategoryAggregateRow = {
            categoryName: c,
            categoryAmount: 0,
          };

          // console.log("c = ", c);
          // console.log(expenses.filter(item => item.category.name == c))

          newCategoryItem.categoryAmount = parseFloat(expenses.filter(item => item.category.name === c)
            .reduce( (acc, item) => acc + item.amount, 0).toFixed(2));

          expenseAggregate.push(newCategoryItem);

          //console.log(newCategoryItem);
        });
       
        // console.log('categories:', categories);
        // console.log('expenseAggregate:', expenseAggregate);

        // for each category compute total
        setExpenseCategoryAggregate({
          ...defaultExpenseCategoryAggregateData,
          expenseAggregate: expenseAggregate,
          expenseTotal: expenseTotal || 0,
          LoadingStatus: 'success'
        });
    }, [expenses])
  
    useEffect( () => {
      updateExpenseHandler();
    },[])

  const {selectedDate, updateDate} = useExpenseStore()


  return <>
    <Grid gridDefinition={[
      { colspan: { default: 12 } },
      { colspan: { default: 12 } },       
    ]}>
      
      <Container
            header={
              <Header
                variant="h1"
                //description="Organization details"
              >
                Current status
              </Header>
            }
          >
             <Grid gridDefinition={[
            { colspan: { default: 7 } },
            { colspan: { default: 5 } },       
          ]}>
            <div>
              <ProgressBar
                value={36}
                additionalInfo="There are 13 days till the end of month"
                //description="Progress bar description"
                label="Month progress"
              />
              <h4>Your are likely to exceed the budget on these categories</h4>
              <SpaceBetween direction="horizontal" size="xs">
                <Badge color="severity-low">Food</Badge>
                <Badge color="severity-low">House</Badge>
              </SpaceBetween>
            </div>

            <div>

              <MonthPicker onRefresh={updateExpenseHandler}/>

              </div>

          </Grid>
              {/* <Button variant="primary" onClick={handleStatus}>
          {isOnline ? 'online' : 'ofline'}
          </Button> */}
            </Container>

        <Grid gridDefinition={[
            { colspan: { default: 12, m:7, s: 8, l:6, xl: 6, xxs: 12, xs:12 } },
            { colspan: { default: 12, m:5, s:4, l:6,  xl: 6, xxs: 12, xs:12 } },       
          ]}>
          <SpaceBetween size="l">
              
              <ExpensePieChart
                LoadingStatus={expenseCategoryAggregate.LoadingStatus}
                expenseAggregate={expenseCategoryAggregate.expenseAggregate}
                expenseTotal={expenseCategoryAggregate.expenseTotal}
              />
              <ExpenseTable expenseData={data} LoadingStatus={expenseInsightsData.LoadingStatus}/>
          </SpaceBetween>

          <SpaceBetween size="l">
            <ExpenseInsight 
              ExpenseItemsCount={expenseInsightsData.ExpenseItemsCount}
              CouldHaveBeenAvoidedCount={expenseInsightsData.CouldHaveBeenAvoidedCount}
              LoadingStatus={expenseInsightsData.LoadingStatus}/>
          
            <ExpensePivot 
              LoadingStatus={expenseCategoryAggregate.LoadingStatus}
              expenseAggregate={expenseCategoryAggregate.expenseAggregate}
              expenseTotal={expenseCategoryAggregate.expenseTotal}
            />
          </SpaceBetween>

        </Grid> 
    </Grid>
  </>
}


function Breadcrumbs() {
    const navigate = useNavigate();
    return <BreadcrumbGroup
                  items={[
                      { text: 'Dashboard', href: DashboardRoutes.path },
                      { text: 'Expense', href: `${ExpenseRoutes.path}` },
                      { text: 'All Categories', href: `${ExpenseRoutes.path}/categories` },
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

function Content() {
  return <>
    <CategoriesTable />
  </>
}

function ExpenseCategories() {
  return (
    <>
      <ExpenseLayout
        content={ <Content /> }
        breadcrumbs = { <Breadcrumbs /> }
      />
    </>
  )
}

export default ExpenseCategories
