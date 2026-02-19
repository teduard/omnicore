import {type StatusIndicatorProps} from "@cloudscape-design/components";

export namespace LoadingStateProps {
    export type Status = 'loading' | 'error' | 'success' | 'not-started';
}

export interface IExpenseRow {
    expenseId: number,
    entryDate: string,
    amount: number,
    category: string,
    comment: string,
    couldHaveBeenAvoided: true,
}

export interface IExpenseTableData {
    expenseData: Array<IExpenseRow>;
    LoadingStatus: LoadingStateProps.Status,
}

export interface IExpenseInsights {
    TotalItems: number,
    CouldHaveBeenAvoided: number,
}

export interface IExpenseInsightsData {
  ExpenseItemsCount: number,
  CouldHaveBeenAvoidedCount: number,
  LoadingStatus: LoadingStateProps.Status,
}

export interface IExpenseInsightsItem {
  name: string,
  statusText: string,
  status: StatusIndicatorProps.Type,
}

// Expense Category Aggregate
export interface IExpenseCategoryAggregateRow {
    categoryName: string,
    categoryAmount: number,
}

export interface IExpenseCategoryAggregate {
    expenseAggregate: Array<IExpenseCategoryAggregateRow>,
    expenseTotal: number,
    LoadingStatus: LoadingStateProps.Status,
}

// pie chart
export interface IExpenseChartData {
    // expenseAggregate: Array<IExpenseCategoryAggregateRow>,
    // expenseTotal: number,
    LoadingStatus: LoadingStateProps.Status,
}

export interface IChartDataRow {
  name: string,
  y: number,
  color: string,
};