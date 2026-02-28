import { type StatusIndicatorProps } from "@cloudscape-design/components";

export namespace LoadingStateProps {
  export type Status = "loading" | "error" | "success" | "not-started";
}

export interface ICategoryDetail {
  name: string;
  categoryId: number;
}

export interface IExpenseRow {
  expenseId: number;
  entryDate: string;
  amount: number;
  category: ICategoryDetail;
  comment: string;
  couldHaveBeenAvoided: true;
}

export interface IExpenseDbRow {
  expense_id: number;
  created_date: string;
  amount: number;
  category_id: number;
  name: string;
  comment: string;
  could_have_been_avoided: true;
  user_id: number;
}

export interface IPreferencesRow {
  preferencesId: number;
  userId: number;
  theme: number;
  layoutDensity: string;
  embeddings: string;
  webllm: boolean;
  currency: string;
  createdDate: Date;
  updatedDate: Date;
}

export interface IPreferencesDbRow {
  preferences_id: number;
  user_id: number;
  theme: number;
  layout_density: string;
  embeddings: string;
  webllm: boolean;
  currency: string;
  created_date: Date;
  updated_date: Date;
}

export interface IExpenseTableData {
  expenseData: Array<IExpenseRow>;
  LoadingStatus: LoadingStateProps.Status;
  onMonthChange: () => void;
}

export interface IExpenseInsights {
  TotalItems: number;
  CouldHaveBeenAvoided: number;
}

export interface IExpenseInsightsData {
  ExpenseItemsCount: number;
  CouldHaveBeenAvoidedCount: number;
  LoadingStatus: LoadingStateProps.Status;
}

export interface IExpenseInsightsItem {
  name: string;
  statusText: string;
  status: StatusIndicatorProps.Type;
}

// Expense Category Aggregate
export interface IExpenseCategoryAggregateRow {
  categoryName: string;
  categoryAmount: number;
}

export interface IExpenseCategoryAggregate {
  expenseAggregate: Array<IExpenseCategoryAggregateRow>;
  expenseTotal: number;
  LoadingStatus: LoadingStateProps.Status;
}

// pie chart
export interface IExpenseChartData {
  // expenseAggregate: Array<IExpenseCategoryAggregateRow>,
  // expenseTotal: number,
  LoadingStatus: LoadingStateProps.Status;
}

export interface IChartDataRow {
  name: string;
  y: number;
  color: string;
}
