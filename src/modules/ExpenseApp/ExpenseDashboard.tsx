import React, { useEffect } from "react";
import { useState } from "react";
import Grid from "@cloudscape-design/components/grid";
import { useExpenseStore } from "../../hooks/index";
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  ProgressBar,
  SpaceBetween,
} from "@cloudscape-design/components";

import type {
  IExpenseRow,
  IExpenseCategoryAggregate,
  IExpenseCategoryAggregateRow,
} from "./interfaces/data.ts";
import Container from "@cloudscape-design/components/container";
import Header from "@cloudscape-design/components/header";
import { type IExpenseInsightsData } from "./interfaces/data.ts";
import ExpenseInsight from "./components/ExpenseInsight.tsx";
import ExpensePivot from "./components/ExpensePivot.tsx";
import ExpensePieChart from "./components/ExpensePieChart.tsx";
import { DashboardRoutes, ExpenseRoutes } from "../../routes/index.tsx";
import MonthPicker from "../../components/MonthPicker.tsx";
import ExpenseLayout from "./ExpenseLayout.tsx";
import ExpenseTable from "./components/ExpenseTable.tsx";
import { EXPENSE_KEYS, useExpenses } from "../../hooks/useExpenses.ts";
import { logger } from "../../lib/logger.ts";
import AppBreadcrumbs from "../../components/AppBreadcrumbs.tsx";

function Content() {
  const { selectedDate } = useExpenseStore();
  const [monthProgress, setMonthProgress] = useState("");
  const [numericMonthProgress, setNumericMonthProgress] = useState(0);

  const { data: new_expenses = [], isLoading, isStale, refetch, status } = useExpenses(selectedDate);
  const [expenses, setExpenses] = React.useState(new Array<any>());

  // days in month
  useEffect(() => {
    const currentDate = new Date();
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const selectedYear = parseInt(selectedDate.split("-")[0]);
    const selectedMonth = parseInt(selectedDate.split("-")[1]) - 1;

    if (currentYear == selectedYear && currentMonth == selectedMonth) {
      // fill in remaining days
      const startdate1 = new Date(currentYear, currentMonth, 1);
      const date1 = new Date(currentYear, currentMonth, currentDay);
      const date2 = new Date(selectedYear, selectedMonth + 1, 0);

      const oneDay = 1000 * 60 * 60 * 24;
      const diffInTime = date2.getTime() - date1.getTime() + oneDay;
      const diffInDays = Math.round(diffInTime / oneDay);

      setMonthProgress(`There are ${diffInDays} days till the end of month.`);

      const time_in_month = date2.getTime() - startdate1.getTime() + oneDay;
      const days_in_month = Math.round(time_in_month / oneDay);
      const progress = ((days_in_month - diffInDays) / days_in_month) * 100;

      setNumericMonthProgress(progress);
    } else {
      // show complete month
      setMonthProgress("This month has passed");
      setNumericMonthProgress(100);
    }
  }, [selectedDate]);

  const defaultExpenseInsightsData: IExpenseInsightsData = {
    ExpenseItemsCount: 0,
    CouldHaveBeenAvoidedCount: 0,
    LoadingStatus: "not-started",
  };
  const [expenseInsightsData, setExpenseInsightsData] = React.useState(
    defaultExpenseInsightsData,
  );

  const defaultExpenseCategoryAggregateData: IExpenseCategoryAggregate = {
    expenseAggregate: new Array<IExpenseCategoryAggregateRow>(),
    expenseTotal: 0,
    LoadingStatus: "not-started",
  };

  const [expenseCategoryAggregate, setExpenseCategoryAggregate] =
    React.useState(defaultExpenseCategoryAggregateData);

  const [data, setData] = React.useState(new Array<IExpenseRow>());

  const updateExpenseHandler = () => {
    logger.debug("in expenseDashboard updateExpenseHandler")

    if(isStale) {
      refetch();
    }

    //const apiEndpoint =
    //`${import.meta.env.VITE_API_URL}/api/expense/get_all?date=${selectedDate}`;

    setExpenseInsightsData({
      ...defaultExpenseInsightsData,
      LoadingStatus: "loading",
    });

    setExpenseCategoryAggregate({
      ...defaultExpenseCategoryAggregateData,
      LoadingStatus: "loading",
    });

    logger.debug("new_expenses = ", new_expenses)

    setExpenses(new_expenses);
    updateDisplay();
  };

  const updateDisplay = () => {
    const newItems: Array<IExpenseRow> = new Array<IExpenseRow>();

    expenses.forEach((item) => {
      const newEntry: IExpenseRow = {
        expenseId: item.expenseId,
        entryDate: item.entryDate,
        amount: item.amount,
        category: item.category.name,
        comment: item.comment,
        couldHaveBeenAvoided: item.couldHaveBeenAvoided,
      };

      newItems.push(newEntry);
    });

    setData(newItems.slice(Math.max(newItems.length - 10, 0)));

    setExpenseInsightsData({
      ExpenseItemsCount: expenses.length,
      CouldHaveBeenAvoidedCount: expenses.filter(
        (item) => item.couldHaveBeenAvoided === true,
      ).length,
      LoadingStatus: "success",
    });

    const expenseTotal = expenses
      .reduce((acc, item) => acc + item.amount, 0)
      .toFixed(2);

    const expenseAggregate: Array<IExpenseCategoryAggregateRow> =
      new Array<IExpenseCategoryAggregateRow>();

    // extract categories
    const categories: Set<string> = expenses.reduce(
      (acc, item) => acc.add(item.category.name),
      new Set<string>(),
    );

    categories.forEach((c) => {
      const newCategoryItem: IExpenseCategoryAggregateRow = {
        categoryName: c,
        categoryAmount: 0,
      };

      newCategoryItem.categoryAmount = parseFloat(
        expenses
          .filter((item) => item.category.name === c)
          .reduce((acc, item) => acc + item.amount, 0)
          .toFixed(2),
      );

      expenseAggregate.push(newCategoryItem);
    });

    // for each category compute total
    setExpenseCategoryAggregate({
      ...defaultExpenseCategoryAggregateData,
      expenseAggregate: expenseAggregate,
      expenseTotal: expenseTotal || 0,
      LoadingStatus: "success",
    });
  }

  useEffect(() => {
    updateDisplay();
  }, [expenses]);

  useEffect(() => {
    if (!isLoading) updateExpenseHandler();
  }, [isLoading]);

const queryClient = useQueryClient();

  return (
    <>
      <Grid
        gridDefinition={[
          { colspan: { default: 12 } },
          { colspan: { default: 12 } },
        ]}
      >
        <Container header={<Header variant="h1">Current status #{status}# {isLoading + ""} | {isStale + ""}</Header>}>
          <Grid
            gridDefinition={[
              { colspan: { default: 12, xs: 7 } },
              { colspan: { default: 12, xs: 5 } },
            ]}
          >
            <div>
            <Button onClick={() => {
                  queryClient.invalidateQueries({
                      queryKey: EXPENSE_KEYS.all,
                    });
            }}>refetch data</Button>

              <ProgressBar
                value={numericMonthProgress}
                additionalInfo={monthProgress}
                label="Month progress"
              />
              {/* <h4>You have exceeded the budget on these categories</h4>
              <SpaceBetween direction="horizontal" size="xs">
                <Badge color="severity-high">Food</Badge>
                <Badge color="severity-high">House</Badge>
              </SpaceBetween> */}
            </div>

            <SpaceBetween direction="vertical" size="l">
              <MonthPicker onRefresh={updateExpenseHandler} />
              {/* <Button variant="primary" onClick={handleStatus}>
                <Icon name="download" /> PDF Report
              </Button> */}
              {/* <RPDF content={<Badge color="severity-low">Food</Badge>}/> */}
            </SpaceBetween>
          </Grid>
        </Container>

        <Grid
          gridDefinition={[
            {
              colspan: {
                default: 12,
                m: 7,
                s: 8,
                l: 6,
                xl: 6,
                xxs: 12,
                xs: 12,
              },
            },
            {
              colspan: {
                default: 12,
                m: 5,
                s: 4,
                l: 6,
                xl: 6,
                xxs: 12,
                xs: 12,
              },
            },
          ]}
        >
          <SpaceBetween size="l">
            <ExpensePieChart
              LoadingStatus={expenseCategoryAggregate.LoadingStatus}
              expenseAggregate={expenseCategoryAggregate.expenseAggregate}
              expenseTotal={expenseCategoryAggregate.expenseTotal}
            />
            <ExpenseTable
              expenseData={data}
              LoadingStatus={expenseInsightsData.LoadingStatus}
              onMonthChange={() => {
                logger.debug("empty month change");
              }}
            />
          </SpaceBetween>

          <SpaceBetween size="l">
            <ExpenseInsight
              ExpenseItemsCount={expenseInsightsData.ExpenseItemsCount}
              CouldHaveBeenAvoidedCount={
                expenseInsightsData.CouldHaveBeenAvoidedCount
              }
              LoadingStatus={expenseInsightsData.LoadingStatus}
            />

            <ExpensePivot
              LoadingStatus={expenseCategoryAggregate.LoadingStatus}
              expenseAggregate={expenseCategoryAggregate.expenseAggregate}
              expenseTotal={expenseCategoryAggregate.expenseTotal}
            />
          </SpaceBetween>
        </Grid>
      </Grid>
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        {
          text: "Dashboard",
          href:
            import.meta.env.BASE_URL + `${DashboardRoutes.path}`,
        },
        { text: "Expense", href: ExpenseRoutes.path },
      ]}
    />
  );
}

function ExpenseDashboard() {
  return (
    <>
      <ExpenseLayout content={<Content />} breadcrumbs={<Breadcrumbs />} />
    </>
  );
}

export default ExpenseDashboard;
