import { useDatabase } from "../db/hooks/useDatabase";
import type {
  IAuthService,
  ICategoryService,
  IExpenseService,
  IPreferencesService,
} from "../services/types";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../lib/storageKeys";
import { createContext, useMemo } from "react";
import { createRemoteExpenseService } from "../services/expense/remoteExpenseService";
import { createLocalExpenseService } from "../services/expense/localExpenseService";
import { createLocalPreferencesService } from "../services/preferences/localPreferencesService";
import { createLocalAuthService } from "../services/auth/localAuthService";
import { createLocalCategoryService } from "../services/category/localCategoryService";

type DataSource = "local" | "remote";

export interface DataSourceContextValue {
  service: IExpenseService;
  source: DataSource;
  setSource: (source: DataSource) => void;
  preferencesService: IPreferencesService;
  authService: IAuthService;
  categoryService: ICategoryService;
}

const DataSourceContext = createContext<DataSourceContextValue | null>(null);

const DataSourceProvider = ({ children }) => {
  const { db, isReady, persist, execute } = useDatabase();

  const [source, setSource] = useLocalStorage<DataSource>(
    STORAGE_KEYS.DATA_SOURCE,
    "local",
  );

  const categoryService = useMemo(() => {
    return createLocalCategoryService({ db, isReady, persist, execute });
  }, [db, isReady, execute, persist]);

  const service = useMemo(() => {
    const DB_OBJ = {
      db: db,
      isReady: isReady,
      persist: persist,
      execute: execute,
    };

    if (source == "local") {
      return createLocalExpenseService(DB_OBJ);
    }

    return createRemoteExpenseService(import.meta.env.VITE_API_URL);
  }, [source, db, isReady, execute, persist]);

  const preferencesService = useMemo(() => {
    const DB_OBJ = {
      db: db,
      isReady: isReady,
      persist: persist,
      execute: execute,
    };

    return createLocalPreferencesService(DB_OBJ);
  }, [source, db, isReady, execute, persist]);

  const authService = useMemo(() => {
    return createLocalAuthService({ db, isReady, persist, execute });
  }, [db, isReady, execute, persist]);

  const value = {
    service,
    source,
    setSource,
    preferencesService,
    authService,
    categoryService,
  };

  return (
    <DataSourceContext.Provider value={value}>
      {children}
    </DataSourceContext.Provider>
  );
};

export { DataSourceProvider, DataSourceContext };
