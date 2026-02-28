import type { IExpenseService } from "../types";
import type {
  IExpenseDbRow,
  IExpenseRow,
} from "../../modules/ExpenseApp/interfaces/data";
import { logger } from "../../lib/logger";
import { getMonthDateRange } from "../../lib/dateUtils";
import { dbExecute, dbQuery } from "../utils";

const createLocalExpenseService = (db): IExpenseService => {
  const getSession = () => {
    const raw = localStorage.getItem("SessionUser");
    if (!raw) throw new Error("No active session");
    return JSON.parse(raw);
  };

  return {
  getExpenses: async (selectedDate) => {
    const { UserId } = getSession();
    const expenseData: Array<IExpenseRow> = new Array<IExpenseRow>();
    const { start, end } = getMonthDateRange(selectedDate);

    try {
      const expenses = dbQuery<IExpenseDbRow>(
        db.db,
        `SELECT e.*,c.name, c.category_id FROM Expenses e
         join Categories c
         on e.category_id = c.category_id
         WHERE 
         e.created_date >= ? and e.created_date <= ?
         and e.user_id = ?`,
        [start, end, UserId],
      );

      expenses.map((row) => {
        expenseData.push({
          expenseId: row.expense_id,
          category: {
            name: row.name,
            categoryId: row.category_id,
          },
          entryDate: row.created_date,
          amount: row.amount,
          comment: row.comment,
          couldHaveBeenAvoided: row.could_have_been_avoided,
        });
      });
    } catch (e) {
      logger.debug("error:", e);
    }

    return expenseData;
  },

 addExpense: async (payload) => {  
  const { UserId } = getSession();
    dbExecute(db.db, 
      `INSERT INTO Expenses
         (category_id, user_id, amount, comment,
          could_have_been_avoided, created_date, updated_date)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        payload.categoryId,
        UserId,
        payload.amount,
        payload.comment,
        payload.couldHaveBeenAvoided ? 1 : 0,
        payload.date,
        payload.date,
      ]
    );

    db.persist();
  },

  updateExpense: async (payload) => {
    const { UserId } = getSession();
   dbExecute(db.db, 
      `UPDATE Expenses
        set 
        category_id = ?,
        amount = ?,
        comment = ?,
        created_date = ?
        could_have_been_avoided = ?
        WHERE expense_id = ?
        and user_id = ?
        `, 
        // needs the update_date to be now
      [
        payload.categoryId,
        payload.amount,
        payload.comment,
        payload.date,
        payload.couldHaveBeenAvoided ? 1 : 0,
        payload.date,
        payload.expenseId,
        UserId
      ]
    );

    db.persist();
  },

  deleteExpense: async (payload) => {
    const { UserId } = getSession();
    // the user_id would be taken from the existing session/jwt and not be exposed to the ui
    
    logger.debug("in deleteExpense, userId = ", UserId);
    logger.debug("payload:", payload)

    const r = dbExecute(db.db, 
      `DELETE FROM Expenses WHERE expense_id = ? and user_id = ?`,
      [
        payload.expenseId, UserId
      ]
    );

    logger.debug("r = ", r);

    const expenses = dbQuery<IExpenseDbRow>(
        db.db,
        `SELECT e.*,c.name, c.category_id FROM Expenses e
         join Categories c
         on e.category_id = c.category_id
         WHERE 
         e.user_id = ?`,
        [UserId],
      );
    console.log(expenses)

    db.persist();
  },

  /*
deleteExpense: async (expenseId) => {
    db.exec("DELETE FROM Expenses WHERE expense_id = ?", [expenseId]);
    persist();
  },

  getCategories: async () => {
    const result = db.exec(
      "SELECT * FROM Categories WHERE user_id = 1 ORDER BY name ASC"
    );
    if (!result.length || !result[0].values.length) return [];
    return result[0].values.map(mapCategoryRow);
  },

  addCategory: async (name) => {
    db.exec(
      `INSERT INTO Categories (user_id, name, created_date)
       VALUES (1, ?, date('now'))`,
      [name]
    );
    persist();
  },

  deleteCategory: async (categoryId) => {
    db.exec("DELETE FROM Categories WHERE category_id = ?", [categoryId]);
    persist();
  },
  */
}
};

export { createLocalExpenseService };
