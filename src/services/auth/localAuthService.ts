import { dbQuery } from "../utils";
import type { IAuthService, IUserInfo, LoginPayload } from "../types";

interface IUserDbRow {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  town: string;
  phone: string;
}

const createLocalAuthService = (db): IAuthService => {
  return {
    login: async (payload: LoginPayload): Promise<IUserInfo | null> => {
      const rows = dbQuery<IUserDbRow>(
        db.db,
        `SELECT user_id, first_name, last_name, email, town, phone
         FROM Users
         WHERE email = ? AND password_hash = ?`,
        [payload.email, payload.password],
      );

      if (!rows.length) return null;

      const row = rows[0];
      return {
        UserId: row.user_id,
        FirstName: row.first_name,
        LastName: row.last_name,
        Email: row.email,
        Town: row.town,
        Phone: row.phone,
      };
    },
  };
};

export { createLocalAuthService };
