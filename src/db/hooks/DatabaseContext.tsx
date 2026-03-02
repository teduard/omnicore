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
import { getCurrentYearMonthDay } from "../../lib/dateUtils";

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

function getRandInt(max) {
  return Math.floor(Math.random() * max);
}

const insertSeedData = (newDb) => {
  const curDay = new Date();
  const curDayFormat = getCurrentYearMonthDay(curDay);

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
            (1, 'John', 'Doe', 'john.doe@gmail.com', 'New York', '(213) 555-1234', 'P@ssw0rd#3', true, '${curDayFormat}', '${curDayFormat}')`);

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
              (1,1,"light","normal","USD",false, false, '${curDayFormat}', '${curDayFormat}')`);

  newDb.exec(`CREATE TABLE IF NOT EXISTS 
              Categories (
                  category_id INTEGER PRIMARY KEY,
                  user_id INTEGER, 
                  name TEXT, 
                  created_date DATE,
                  UNIQUE (user_id, name))
              `);

  newDb.exec(`CREATE TABLE IF NOT EXISTS 
              Expenses (
                  expense_id INTEGER PRIMARY KEY,
                  category_id INTEGER,
                  user_id INTEGER,
                  amount REAL, 
                  comment TEXT,
                  could_have_been_avoided BOOLEAN,
                  embeddings BLOB,
                  created_date DATE,
                  updated_date DATE)
              `);

  newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
            (1, 'Food & Drink', '${curDayFormat}')`);
  newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Utilities', '${curDayFormat}')`);
  newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Rent', '${curDayFormat}')`);
  newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Shopping', '${curDayFormat}')`);
  newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Entertainment', '${curDayFormat}')`);
  newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Health & Fitness', '${curDayFormat}')`);
  newDb.exec(`INSERT INTO Categories (user_id, name, created_date) VALUES 
             (1, 'Travel', '${curDayFormat}')`);

  const dataItems = [
    [
      "Whole Foods",
      "Local Bakery",
      "Beers",
      "Wine",
      "Water",
      "Prezels",
      "Sunday Brunch Bistro",
      "Corner Bodega",
      "Whole Foods",
      "Bread and butter",
      "McDonalds and fries",
      "Dinner with friends",
      "Starbucks",
      "Biscuits and avocado",
      "Soup at dinner",
      "Lunch at work",
      "Weekly shopping",
      "Fruits and vegetable",
    ],
    [
      "Cables",
      "Electric Bill",
      "Trash & Recycling",
      "iCloud Storage",
      "Electric Bill",
      "Internet",
    ],
    [
      "Monthy rent",
      "Security Deposit",
      "Parking Fee",
      "Locksmith Service",
      "Common Area Maintenainance",
    ],
    [
      "Clothes",
      "A new TV",
      "Home Depot",
      "IKEA",
      "Local Hardware Store",
      "New books from Amazon",
    ],
    [
      "Popcorn at cinema",
      "Netflix",
      "Bowling Alley",
      "Escape Room",
      "Comedy Club",
      "Steam Games",
    ],
    [
      "Gym membership",
      "Suppliments",
      "bought new weights",
      "Yoga Class",
      "Swimming Pool Entry",
      "New Running Shoes",
    ],
    [
      "Airplain tickts",
      "Booked hotel",
      "Car rentals and museum tickets",
      "Uber to Airport",
      "City Tour Bus",
      "National Park Pass",
    ],
  ];

  const entryDay = new Date(curDay);
  let entryDayFormat = getCurrentYearMonthDay(curDay);

  for (let i = 0; i < 500; i++) {
    newDb.exec(`INSERT INTO Expenses 
              (category_id, user_id,
              amount, comment, could_have_been_avoided, created_date, updated_date) VALUES 
              (${(i % 7) + 1}, 1, ${5 + ((50 + i) % (getRandInt(30) + 5))}, '${dataItems[i % 7][i % dataItems[i % 7].length]}', true, '${entryDayFormat}', '${curDayFormat}')`);

    if (i > 10 && i % getRandInt(10) == 0) {
      entryDay.setDate(entryDay.getDate() - 1);
      entryDayFormat = getCurrentYearMonthDay(entryDay);
    }
  }
};

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
          locateFile: () => sqliteUrl,
        });

        const savedData = localStorage.getItem("sqlite_db");

        if (savedData) {
          const binaryData = Uint8Array.from(atob(savedData), (c) =>
            c.charCodeAt(0),
          );
          setDb(new SQL.Database(binaryData));
        } else {
          const newDb = new SQL.Database();

          insertSeedData(newDb);

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
      const base64 = btoa(String.fromCharCode.apply(null, data));

      saveDbAtomic(base64);
    }
  }, [db]);

  useEffect(() => {
    const handleStorageChange = async (event: StorageEvent) => {
      if (event.key == "sqlite_db") {
        logger.debug("sqlite_db event picked up: ", event);

        const SQL = await initSqlJs({
          locateFile: () => sqliteUrl,
        });

        const savedData = event.newValue;

        if (savedData) {
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
