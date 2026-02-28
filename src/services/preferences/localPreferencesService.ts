import { logger } from "../../lib/logger";
import type {
  IPreferencesDbRow,
  IPreferencesRow,
} from "../../modules/ExpenseApp/interfaces/data";
import type { IPreferences, IPreferencesService, NewPreferencesPayload } from "../types";
import { dbExecute, dbQuery } from "../utils";
//import { dbExecute, dbQuery } from "../utils";

const createLocalPreferencesService = (db): IPreferencesService => {
  const getSession = () => {
    const raw = localStorage.getItem("SessionUser");
    if (!raw) throw new Error("No active session");
    return JSON.parse(raw);
  };

  return {
    getPreferences: async () => {
      const { UserId } = getSession();

      let result: IPreferencesRow | null = null;

      try {
        const expenses = dbQuery<IPreferencesDbRow>(
          db.db,
          `SELECT preferences_id, user_id, currency, theme, layout_density, embeddings, webllm, created_date, updated_date from preferences
           WHERE user_id = ?`,
          [UserId],
        );

        expenses.map((row) => {
          logger.debug("row = ", row);
          result = {
            preferencesId: row.preferences_id,
            userId: UserId,
            theme: row.theme,
            layoutDensity: row.layout_density,
            embeddings: row.embeddings,
            webllm: row.webllm,
            currency: row.currency,
            createdDate: row.created_date,
            updatedDate: row.updated_date,
          };
        });
      } catch (e) {
        logger.debug("error:", e);
      }

      return result;
    },

    //updatePreferences(payload: NewPreferencesPayload): Promise<void>;

    updatePreferences: async (payload: NewPreferencesPayload) => {
        logger.debug("payload pref = ", payload)
        
      const { UserId } = getSession();
            dbExecute(
              db.db,
              `UPDATE Preferences
              set 
              theme = ?,
              layout_density = ?,
              currency = ?
              WHERE preferences_id = ?
              and user_id = ?
              `,
              // needs the update_date to be now
              [
                payload.theme,
                payload.layoutDensity,
                payload.currency,
                payload.preferencesId,
                UserId,
              ],
            );
      
            db.persist();
    },
  };
};
export { createLocalPreferencesService };
