import { useCallback, useContext } from "react";
import { DatabaseContext } from "./DatabaseContext";

const useDatabase = () => {
  const context = useContext(DatabaseContext);

  if (!context) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }

  const { db, isReady, persist } = context;

  const execute = useCallback((sql, params = []) => {
    if (!db) return null;
    const result = db.exec(sql, params);
    persist();
    return result;
  }, [db, persist]);

  return { db, isReady, execute, persist };
};

export {useDatabase}