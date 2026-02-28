import type { IExpenseRow } from "../modules/ExpenseApp/interfaces/data";

export interface NewExpensePayload {
  expenseId?: number;
  categoryId: number;
  amount: number;
  comment: string;
  date: string;
  couldHaveBeenAvoided: boolean;
}

export interface DeleteExpensePayload {
  expenseId: number;
}

export interface IExpenseService {
  getExpenses(selectedDate: string): Promise<IExpenseRow[]>;
  addExpense(payload: NewExpensePayload): Promise<void>;
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
  getPreferences(userId: number): Promise<IPreferences[]>;
  updatePreferences(payload: IPreferences): Promise<void>;
}
