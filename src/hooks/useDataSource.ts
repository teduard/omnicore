import { useContext } from "react";
import { DataSourceContext, type DataSourceContextValue } from "../contexts/DataSourceContext";

export const useDataSource = (): DataSourceContextValue => {
  const context = useContext(DataSourceContext);
  if (!context) {
    throw new Error("useDataSource must be used within a DataSourceProvider");
  }
  return context;
};