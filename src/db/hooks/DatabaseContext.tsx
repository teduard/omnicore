import {
  createContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import initSqlJs from "sql.js";
import sqliteUrl from "../../assets/sql-wasm.wasm?url";
import { logger } from "../../lib/logger";

interface IDatabaseProviderProps {
  children: ReactNode;
}

const DatabaseContext = createContext(null);

const UpdateLock = "LocalStorageDbLock";

async function saveDbAtomic(dbData: string) {
  await navigator.locks.request(UpdateLock, async () => {
      localStorage.setItem("sqlite_db", dbData);
  });
}

const DatabaseProvider = ({ children }: IDatabaseProviderProps) => {
  const [db, setDb] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const reloadFromStorage = useCallback(async () => {
    const savedData = localStorage.getItem("sqlite_db");
    if (!savedData) return;

    const SQL = await initSqlJs({ locateFile: () => sqliteUrl });
    const binaryData = Uint8Array.from(atob(savedData), (c) => c.charCodeAt(0));
    setDb(new SQL.Database(binaryData));
  }, []);

  // 1. Load and Initialize
  useEffect(() => {
    const initDB = async () => {
      logger.debug("init db");
      try {
        const SQL = await initSqlJs({
          // You may need to point to the wasm file depending on your build setup
          locateFile: () => sqliteUrl,
        });

        const savedData = localStorage.getItem("sqlite_db");

        if (savedData) {
          // Convert Base64 string back to Uint8Array
          const binaryData = Uint8Array.from(atob(savedData), (c) =>
            c.charCodeAt(0),
          );
          setDb(new SQL.Database(binaryData));
        } else {
          const newDb = new SQL.Database();

          newDb.exec(`CREATE TABLE IF NOT EXISTS 
              Users (
                  user_id INTEGER PRIMARY KEY,
                  first_name TEXT,
                  last_name TEXT,
                  email text,
                  town text, 
                  phone TEXT,
                  password_hash TEXT,
                  active BOOLEAN,
                  created_date DATE,
                  updated_date DATE)
              `);

          newDb.exec(`INSERT INTO Users (user_id, first_name, last_name, email, town, phone, password_hash, active, created_date, updated_date) VALUES 
            (1, 'John', 'Doe', 'john.doe@gmail.com', 'New York', '(213) 555-1234', 'P@ssw0rd#3', true, '2025-06-08', '2025-06-08')`);

          newDb.exec(`CREATE TABLE IF NOT EXISTS 
              Preferences (
                  preferences_id INTEGER PRIMARY KEY,
                  user_id INTEGER,
                  theme TEXT,
                  layout_density TEXT,
                  currency TEXT,
                  embeddings boolean,
                  webllm boolean,
                  created_date DATE,
                  updated_date DATE)
              `);
          
          newDb.exec(`INSERT INTO Preferences 
              (preferences_id, user_id, theme, layout_density, currency, embeddings, webllm, created_date, updated_date) VALUES 
              (1,1,"light","normal","USD",false, false, '2026-01-19', '2026-02-19')`);

          // init db tables
          newDb.exec(`CREATE TABLE IF NOT EXISTS 
              Categories (
                  category_id INTEGER PRIMARY KEY,
                  user_id INTEGER, 
                  name TEXT, 
                  created_date DATE)
              `);

          newDb.exec(`CREATE TABLE IF NOT EXISTS 
              Expenses (
                  expense_id INTEGER PRIMARY KEY,
                  category_id INTEGER,
                  user_id INTEGER,
                  amount REAL, 
                  comment TEXT,
                  could_have_been_avoided BOOLEAN,
                  created_date DATE,
                  updated_date DATE)
              `);

          newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
            (1, 'Food&Drink', '2026-02-19')`);
          newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Utilities', '2026-02-19')`);
          newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Rent', '2026-02-19')`);
          newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Shopping', '2026-02-19')`);
          newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Entertainment', '2026-02-19')`);
          newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Health & Fitness', '2026-02-19')`);
          newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Travel', '2026-02-19')`);

          newDb.exec(`INSERT INTO Expenses 
              (expense_id, category_id, user_id,
              amount, comment, could_have_been_avoided, created_date, updated_date) VALUES 
              (1, 1, 1, 100.33, 'Bread, butter', true, '2026-01-19', '2026-02-19'),
              (2, 2, 1, 100.33, 'something normal', true, '2026-01-10', '2026-02-19'),
              (3, 2, 1, 200, 'something normal', true, '2026-02-19', '2026-02-19'),
              (4, 3, 1, 12, 'something normal', true, '2026-02-11', '2026-02-19'),
              (5, 4, 1, 45, 'something normal', true, '2026-02-12', '2026-02-19'),
              (6, 5, 1, 34, 'something normal', true, '2026-02-13', '2026-02-19')
              `);

          for (let i = 7; i < 20; i++) {
            newDb.exec(`INSERT INTO Expenses 
              (expense_id, category_id, user_id,
              amount, comment, could_have_been_avoided, created_date, updated_date) VALUES 
              (${i}, ${(i % 7) + 1}, 1, ${50 + i}, 'Bread, butter ${i}', true, '2026-02-23', '2026-02-23')`);
          }

          for (let i = 20; i < 40; i++) {
            newDb.exec(`INSERT INTO Expenses 
              (expense_id, category_id, user_id,
              amount, comment, could_have_been_avoided, created_date, updated_date) VALUES 
              (${i}, ${(i % 7) + 1}, 1, ${10 + i}, 'Bread, butter ${i}', true, '2026-01-23', '2026-01-23')`);
          }

          setDb(newDb);
        }
        setIsReady(true);
      } catch (err) {
        console.error("Failed to initialize database:", err);
      }
    };

    initDB();
  }, []);

  // 2. Persistence Helper
  const persist = useCallback(async () => {
    if (db) {
      logger.debug("in persist callback");
      const data = db.export();
      // Convert Uint8Array to Base64 string
      const base64 = btoa(String.fromCharCode.apply(null, data));

      saveDbAtomic(base64);
    }
  }, [db]);

  useEffect(() => {
    const handleStorageChange = async (event: StorageEvent) => {
      if (event.key == "sqlite_db") {
        logger.debug("sqlite_db event picked up: ", event);

        const SQL = await initSqlJs({
          // You may need to point to the wasm file depending on your build setup
          locateFile: () => sqliteUrl,
        });

        const savedData = event.newValue

        if (savedData) {
          // Convert Base64 string back to Uint8Array
          const binaryData = Uint8Array.from(atob(savedData), (c) =>
            c.charCodeAt(0),
          );
          setDb(new SQL.Database(binaryData));
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const value = { db, isReady, persist, reloadFromStorage };

  return <DatabaseContext value={value}>{children}</DatabaseContext>;
};

export { DatabaseContext, DatabaseProvider };
