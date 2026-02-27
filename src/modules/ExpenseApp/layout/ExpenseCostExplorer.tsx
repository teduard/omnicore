import React, { useContext, useEffect, type SetStateAction } from "react";
import Grid from "@cloudscape-design/components/grid";
import ExpenseCostExplorerTable from "../components/ExpenseCostExplorerTable.tsx";

import type {
  IExpenseRow,
  IExpenseCategoryAggregate,
  IExpenseCategoryAggregateRow,
} from "../interfaces/data.ts";

import { type IExpenseInsightsData } from "../interfaces/data.ts";
import ExpenseCostExplorerSelector from "../components/ExpenseCostExplorerSelector.tsx";
import ExpenseLayout from "../ExpenseLayout.tsx";
import { ExpenseRoutes } from "../../../routes/index.tsx";

import { useDatabase } from "../../../db/hooks/useDatabase.tsx";
import { useExpenseStore } from "../../../hooks/store.ts";
import { AuthContext } from "../../../contexts/AuthContext.tsx";
import { logger } from "../../../lib/logger.ts";
import AppBreadcrumbs from "../../../components/AppBreadcrumbs.tsx";

const defaultExpenseCategoryAggregateData: IExpenseCategoryAggregate = {
  expenseAggregate: new Array<IExpenseCategoryAggregateRow>(),
  expenseTotal: 0,
  LoadingStatus: "not-started",
};

type ContentType = {
  updateCategoryAggregate: (p: unknown) => void;
};

function Content({ updateCategoryAggregate }: ContentType) {
  const authContext = useContext(AuthContext);
   if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  const { user } = authContext;

  const { execute, isReady } = useDatabase();

  const { selectedDate } = useExpenseStore();

  const defaultExpenseInsightsData: IExpenseInsightsData = {
    ExpenseItemsCount: 0,
    CouldHaveBeenAvoidedCount: 0,
    LoadingStatus: "not-started",
  };
  const [expenseInsightsData, setExpenseInsightsData] = React.useState(
    defaultExpenseInsightsData,
  );

  const [expenses, setExpenses] = React.useState(new Array<IExpenseRow>());

  const [data, setData] = React.useState(new Array<IExpenseRow>());

  const updateExpenseHandler = () => {
    //const apiEndpoint = `${import.meta.env.VITE_API_URL}/api/expense/get_all`;

    logger.debug("refresh data in updateExpenseHandler")

    setExpenseInsightsData({
      ...defaultExpenseInsightsData,
      LoadingStatus: "loading",
    });

    updateCategoryAggregate({
      ...defaultExpenseCategoryAggregateData,
      LoadingStatus: "loading",
    });

    setData([]);

    const tokens: string[] = selectedDate.split("-");
    const year = parseInt(tokens[0]);
    const month = parseInt(tokens[1]);

    const d = new Date(year, month, 0);
    const endDate = `${d.getFullYear()}-${d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1}-${d.getDate()}}`;

    const res = execute(`
      select e.*,c.name, c.category_id from Expenses e
join Categories c
on e.category_id = c.category_id
where e.user_id = ${user.UserId}
and e.created_date >= '${selectedDate}-01' and e.created_date <= '${endDate}'
      `);

    const expenseData: Array<IExpenseRow> = new Array<IExpenseRow>();

    if (!res || res.length === 0) {
      logger.debug("no expenses on local");
      setExpenses([]);
    } else {
      res[0].values.map((row: any[]) => {
        expenseData.push({
          expenseId: row[0],

          entryDate: row[6],
          amount: row[3],
          category: {
            name: row[8],
            categoryId: row[9],
          },
          comment: row[4],
          couldHaveBeenAvoided: row[5],
        });
      });

      setExpenses(expenseData);
    }
  };

  useEffect(() => {
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

    setData(newItems);

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

    updateCategoryAggregate({
      ...defaultExpenseCategoryAggregateData,
      expenseAggregate: expenseAggregate,
      expenseTotal: expenseTotal || 0,
      LoadingStatus: "success",
    });
  }, [expenses]);

  useEffect(() => {
    if (isReady) {
      updateExpenseHandler();
    }
  }, [isReady]);

  const showInsights = false;

  return (
    <>
      <Grid gridDefinition={[{ colspan: { default: 12 } }]}>
        {showInsights && (
          <ExpenseCostExplorerSelector
            ExpenseItemsCount={expenseInsightsData.ExpenseItemsCount}
            CouldHaveBeenAvoidedCount={
              expenseInsightsData.CouldHaveBeenAvoidedCount
            }
            LoadingStatus={expenseInsightsData.LoadingStatus}
          />
        )}

        <ExpenseCostExplorerTable
          expenseData={data}
          LoadingStatus={expenseInsightsData.LoadingStatus}
          onMonthChange={updateExpenseHandler}
        />
      </Grid>
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: ExpenseRoutes.path },
        { text: "All expenses", href: `${ExpenseRoutes.path}/cost` },
      ]}
    />
  );
}

function ExpenseCostExplorer() {
  const aggregateHandler = (p: SetStateAction<IExpenseCategoryAggregate>) => {
    setExpenseCategoryAggregate(p);
  };

  const [expenseCategoryAggregate, setExpenseCategoryAggregate] =
    React.useState(defaultExpenseCategoryAggregateData);

  return (
    <>
      <ExpenseLayout
        content={<Content updateCategoryAggregate={aggregateHandler} />}
        breadcrumbs={<Breadcrumbs />}
      />
    </>
  );
}

export default ExpenseCostExplorer;
