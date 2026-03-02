import type {
  ICategoryRow,
  IExpenseRow,
} from "../modules/ExpenseApp/interfaces/data";
import { z } from "zod";

// User Authentication
export const UserInfoSchema = z.object({
  UserId: z.number(),
  FirstName: z.string(),
  LastName: z.string(),
  Email: z.string(),
  Town: z.string(),
  Phone: z.string(),
});

export interface LoginPayload {
  email: string;
  password: string;
}

export interface IUserInfo {
  UserId: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Town: string;
  Phone: string;
}

export interface IAuthService {
  login(payload: LoginPayload): Promise<IUserInfo | null>;
}

// Expense items
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
  webllm: boolean;
  embeddings: boolean;
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

// User preferences
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
  isSessionReady: boolean;
}

// Categories
export interface NewCategoryPayload {
  name: string;
}

export interface UpdateCategoryPayload {
  categoryId: number;
  name: string;
}

export interface DeleteCategoryPayload {
  categoryId: number;
}

export interface ICategoryService {
  getCategories(): Promise<ICategoryRow[]>;
  getCategoryById(categoryId: number): Promise<ICategoryRow | null>;
  addCategory(payload: NewCategoryPayload): Promise<void>;
  updateCategory(payload: UpdateCategoryPayload): Promise<void>;
  deleteCategory(payload: DeleteCategoryPayload): Promise<void>;
}
