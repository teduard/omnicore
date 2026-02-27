import type { IExpenseRow } from "../modules/ExpenseApp/interfaces/data";

export interface NewExpensePayload {
  categoryId: number;
  amount: number;
  comment: string;
  date: string;
  couldHaveBeenAvoided: boolean;
}

export interface IExpenseService {
  getExpenses(selectedDate: string): Promise<IExpenseRow[]>;
  addExpense(payload: NewExpensePayload): Promise<void>;
  updateExpense(payload: NewExpensePayload): Promise<void>;
  deleteExpense(expenseId: number): Promise<void>;
}