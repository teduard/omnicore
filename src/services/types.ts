import type { IExpenseRow } from "../modules/ExpenseApp/interfaces/data";

export interface NewExpensePayload {
  expenseId?: number;
  categoryId: number;
  amount: number;
  comment: string;
  date: string;
  couldHaveBeenAvoided: boolean;
}

export interface NewPreferencesPayload {
  preferencesId: string;
  userId: number;
  theme: string;
  layoutDensity: string;
  currency: string;
}

export interface DeleteExpensePayload {
  expenseId: number;
}

export interface IExpenseService {
  getExpenses(selectedDate: string): Promise<IExpenseRow[]>;
  addExpense(payload: NewExpensePayload): Promise<void>;
  getExpenseById(expenseId: number): Promise<IExpenseRow | null>;
  updateExpense(payload: NewExpensePayload): Promise<void>;
  deleteExpense(payload: DeleteExpensePayload): Promise<void>;
}

export interface IPreferences {
  preferencesId: number;
  userId: number;
  theme: number;
  layoutDensity: string;
  embeddings: string;
  webllm: boolean;
  createdDate: Date;
  updatedDate: Date;
}

export interface IPreferencesService {
  getPreferences(): Promise<IPreferences | null>;
  updatePreferences(payload: NewPreferencesPayload): Promise<void>;
}
