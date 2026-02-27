import { logger } from "../../lib/logger";
import type { IExpenseService } from "../types";

export const createRemoteExpenseService = (baseUrl: string): IExpenseService => ({
  getExpenses: async (selectedDate) => {
    logger.info("in remote")
    const res = await fetch(`${baseUrl}/api/expenses?date=${selectedDate}`, { credentials: "include" });
    return res.json();
  },

  addExpense: async (_payload) => {
   
  }
});