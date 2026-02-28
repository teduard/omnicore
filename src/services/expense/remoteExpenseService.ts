import { logger } from "../../lib/logger";
import type { IExpenseService } from "../types";

export const createRemoteExpenseService = (baseUrl: string): IExpenseService => ({
  getExpenses: async (selectedDate) => {
    logger.info("in remote")
    const res = await fetch(`${baseUrl}/api/expenses?date=${selectedDate}`, { credentials: "include" });
    return res.json();
  },

  addExpense: async (_payload) => {
    throw new Error("addExpense not implemented");
  },

  updateExpense: async (_payload) => {
    throw new Error("updateExpense not implemented");
  },

  deleteExpense: async (_expenseId) => {
    throw new Error("deleteExpense not implemented");
  },

  getExpenseById: async (_expenseId) => {
    throw new Error("getExpenseById not implemented");
  }
});