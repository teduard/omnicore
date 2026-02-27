import type { IExpenseService } from "../types";
import type {
  IExpenseDbRow,
  IExpenseRow,
} from "../../modules/ExpenseApp/interfaces/data";
import { logger } from "../../lib/logger";
import { getMonthDateRange } from "../../lib/dateUtils";

const query = <T>(db, sql: string, params?: any): T[] => {
  const stmt = db.prepare(sql);

  if (params) stmt.bind(params);

  const rows: T[] = [];

  while (stmt.step()) {
    rows.push(stmt.getAsObject() as T);
  }

  stmt.free();
  return rows;
};

const execute = (
  db,
  sql: string,
  params?: unknown[] | Record<string, unknown>
): { changes: number; lastInsertRowId: number } => {
  const stmt = db.prepare(sql);

  if (params) stmt.bind(params);

  stmt.step(); // execute

  const result = {
    changes: db.getRowsModified(),
    lastInsertRowId: db.exec(
      "SELECT last_insert_rowid() as id"
    )[0]?.values[0]?.[0] as number
  };

  stmt.free();

  return result;
}

const createLocalExpenseService = (db): IExpenseService => ({
  getExpenses: async (selectedDate) => {
    const expenseData: Array<IExpenseRow> = new Array<IExpenseRow>();
    const { start, end } = getMonthDateRange(selectedDate);

    try {
      logger.debug("start = ", start);
      logger.debug("end = ", end);

      const expenses = query<IExpenseDbRow>(
        db.db,
        `SELECT e.*,c.name, c.category_id FROM Expenses e
         join Categories c
         on e.category_id = c.category_id
         WHERE 
         e.created_date >= ? and e.created_date <= ?`,
        [start, end],
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
    const res = execute(db.db, 
      `INSERT INTO Expenses
         (category_id, user_id, amount, comment,
          could_have_been_avoided, created_date, updated_date)
       VALUES (?, 1, ?, ?, ?, ?, ?)`,
      [
        payload.categoryId,
        payload.amount,
        payload.comment,
        payload.couldHaveBeenAvoided ? 1 : 0,
        payload.date,
        payload.date,
      ]
    );

      console.log("calling db.persist")
    db.persist();
  }

  //   updateExpense: async (payload) => {
  //   }

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
});

export { createLocalExpenseService };
