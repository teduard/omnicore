import { type ReactNode, StrictMode } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { DataSourceProvider } from "../contexts/DataSourceContext";
import { UserProvider } from "../contexts/UserContext";
import { DatabaseProvider } from "../db/hooks/DatabaseContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { useCrossTabInvalidation } from "../hooks/useCrossTabInvalidation";
import { WebLLMProvider } from "../contexts/WebLLMContext";

function CrossTabSync() {
  useCrossTabInvalidation();
  return null;
}

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <StrictMode>
    <DatabaseProvider>
      <AuthProvider>
        <UserProvider>
          <DataSourceProvider>
            <QueryClientProvider client={queryClient}>
              <WebLLMProvider>
                <CrossTabSync />
                {children}
              </WebLLMProvider>
            </QueryClientProvider>
          </DataSourceProvider>
        </UserProvider>
      </AuthProvider>
    </DatabaseProvider>
  </StrictMode>
);
