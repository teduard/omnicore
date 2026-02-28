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
import { useExpenses } from "../../../hooks/useExpenses.ts";

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
  
  const { selectedDate } = useExpenseStore();

  const defaultExpenseInsightsData: IExpenseInsightsData = {
    ExpenseItemsCount: 0,
    CouldHaveBeenAvoidedCount: 0,
    LoadingStatus: "not-started",
  };
  const [expenseInsightsData, setExpenseInsightsData] = React.useState(
    defaultExpenseInsightsData,
  );

  const [data, setData] = React.useState(new Array<IExpenseRow>());

  const {
    data: expenses = [],
    refetch,
  } = useExpenses(selectedDate);

  useEffect(() => {
    logger.debug("expense was updated");

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
  }, [expenses]);

  const updateExpenseHandler = () => {
    refetch()
  };

  return (
    <>
      <Grid gridDefinition={[{ colspan: { default: 12 } }]}>
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
