import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import initSqlJs from 'sql.js';
import sqliteUrl from "../../assets/sql-wasm.wasm?url";

const DatabaseContext = createContext(null);

const DatabaseProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // 1. Load and Initialize
  useEffect(() => {
    const initDB = async () => {
      console.log("init db")
      try {
        const SQL = await initSqlJs({
          // You may need to point to the wasm file depending on your build setup
          locateFile: () => sqliteUrl
        });

        const savedData = localStorage.getItem('sqlite_db');
        
        if (savedData) {
          // Convert Base64 string back to Uint8Array
          const binaryData = Uint8Array.from(atob(savedData), c => c.charCodeAt(0));
          setDb(new SQL.Database(binaryData));
        } else {
          setDb(new SQL.Database());
        }
        setIsReady(true);
      } catch (err) {
        console.error("Failed to initialize database:", err);
      }
    };

    initDB();
  }, []);

  // 2. Persistence Helper
  const persist = useCallback(() => {
    if (db) {
      const data = db.export();
      // Convert Uint8Array to Base64 string
      const base64 = btoa(String.fromCharCode.apply(null, data));
      localStorage.setItem('sqlite_db', base64);
    }
  }, [db]);

    useEffect(() => {
    if (isReady) {
        console.log("db isReady om SQL.tsx");
        // Initialize database structure if it does not exist
        db.exec(`CREATE TABLE IF NOT EXISTS 
            Categories (
                category_id INTEGER PRIMARY KEY,
                user_id INTEGER, 
                name TEXT, 
                created_date DATE)
            `);
        
// expenses: expense_id, category_id, user_id, entry_date, updated_date, amount, comment, could_have_been_avoided
        //db.exec(`drop table IF EXISTS Expenses `);

        db.exec(`CREATE TABLE IF NOT EXISTS 
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

        // db.exec(`INSERT INTO Expenses 
        //     (expense_id, category_id, user_id,
        //     amount, comment, could_have_been_avoided, created_date, updated_date) VALUES 
        //     (1, 1, 1, 100.33, 'something normal', true, '2026/02/18', '2026/02/19')`)

        const res = db.exec("SELECT * FROM Expenses where user_id=1");
        console.log("RES = ", res);
        
        // db.exec(`INSERT INTO Categories (category_id, user_id, name) VALUES 
        //     ('1', 1, 'House')`)
      }
  }, [db]);

  const value = { db, isReady, persist };

  return (
    <DatabaseContext value={value}>
      {children}
    </DatabaseContext>
  );
};

export {DatabaseContext, DatabaseProvider}