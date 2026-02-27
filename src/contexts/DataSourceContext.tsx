import { useDatabase } from "../db/hooks/useDatabase";
import type { IExpenseService } from "../services/types";
import useLocalStorage from "../hooks/useLocalStorage";
import { STORAGE_KEYS } from "../lib/storageKeys";
import { createContext, useMemo } from "react";
import { createRemoteExpenseService } from "../services/expense/remoteExpenseService";
import { createLocalExpenseService } from "../services/expense/localExpenseService";

type DataSource = "local" | "remote";

interface DataSourceContextValue {
  service: IExpenseService;
  source: DataSource;
  setSource: (source: DataSource) => void;
}

const DataSourceContext = createContext<DataSourceContextValue>(null);

const DataSourceProvider = ({children}) => {
    const { db, isReady, persist, execute } = useDatabase();

    const DB_OBJ = {
        db:db,
        isReady: isReady,
        persist: persist,
        execute: execute,
    }

    const [source, setSource] = useLocalStorage<DataSource>(STORAGE_KEYS.DATA_SOURCE, "local");

    const service = useMemo(() => {
        if(source == "local") {
            return createLocalExpenseService(DB_OBJ);
        }

        return createRemoteExpenseService(import.meta.env.VITE_API_URL);
    }, [source, db, isReady, DB_OBJ])
    
    const value = {service, source, setSource};

    return (
        <DataSourceContext.Provider value={value}>
            {children}
        </DataSourceContext.Provider>
    )
}

export { DataSourceProvider, DataSourceContext }