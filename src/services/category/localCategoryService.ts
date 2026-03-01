import { dbExecute, dbQuery } from "../utils";
import type {
  ICategoryService,
  NewCategoryPayload,
  UpdateCategoryPayload,
  DeleteCategoryPayload,
} from "../types";
import type {
  ICategoryDbRow,
  ICategoryRow,
} from "../../modules/ExpenseApp/interfaces/data";

const createLocalCategoryService = (db): ICategoryService => {
  const getSession = () => {
    const raw = localStorage.getItem("SessionUser");
    if (!raw) throw new Error("No active session");
    return JSON.parse(raw);
  };

  const mapRow = (row: ICategoryDbRow): ICategoryRow => ({
    categoryId: row.category_id,
    userId: row.user_id,
    name: row.name,
    createdDate: row.created_date,
    expenseCount: row.expense_count,
  });

  return {
    getCategories: async () => {
      const { UserId } = getSession();
      const rows = dbQuery<ICategoryDbRow>(
        db.db,
        `SELECT c.category_id, c.user_id, c.name, c.created_date,
                COUNT(e.expense_id) as expense_count
         FROM Categories c
         LEFT JOIN Expenses e
           ON c.category_id = e.category_id AND c.user_id = e.user_id
         WHERE c.user_id = ?
         GROUP BY c.category_id
         ORDER BY c.category_id ASC`,
        [UserId],
      );
      return rows.map(mapRow);
    },

    getCategoryById: async (categoryId) => {
      const { UserId } = getSession();
      const rows = dbQuery<ICategoryDbRow>(
        db.db,
        `SELECT c.category_id, c.user_id, c.name, c.created_date,
                COUNT(e.expense_id) as expense_count
         FROM Categories c
         LEFT JOIN Expenses e
           ON c.category_id = e.category_id AND c.user_id = e.user_id
         WHERE c.category_id = ? AND c.user_id = ?
         GROUP BY c.category_id`,
        [categoryId, UserId],
      );
      return rows.length ? mapRow(rows[0]) : null;
    },

    addCategory: async (payload) => {
      const { UserId } = getSession();

      const existing = dbQuery(
        db.db,
        `SELECT category_id FROM Categories
     WHERE user_id = ? AND LOWER(name) = LOWER(?)`,
        [UserId, payload.name.trim()],
      );

      if (existing.length) {
        throw new Error(`A category named "${payload.name}" already exists.`);
      }

      dbExecute(
        db.db,
        `INSERT INTO Categories (user_id, name, created_date)
         VALUES (?, ?, date('now'))`,
        [UserId, payload.name],
      );
      db.persist();
    },

    updateCategory: async (payload) => {
      const { UserId } = getSession();

      const existing = dbQuery(
        db.db,
        `SELECT category_id FROM Categories
     WHERE user_id = ? AND LOWER(name) = LOWER(?) AND category_id != ?`,
        [UserId, payload.name.trim(), payload.categoryId],
      );

      if (existing.length) {
        throw new Error(`A category named "${payload.name}" already exists.`);
      }

      dbExecute(
        db.db,
        `UPDATE Categories
         SET name = ?
         WHERE category_id = ? AND user_id = ?`,
        [payload.name, payload.categoryId, UserId],
      );

      db.persist();
    },

    deleteCategory: async (payload) => {
      const { UserId } = getSession();
      dbExecute(
        db.db,
        `DELETE FROM Categories
         WHERE category_id = ? AND user_id = ?`,
        [payload.categoryId, UserId],
      );
      db.persist();
    },
  };
};

export { createLocalCategoryService };
