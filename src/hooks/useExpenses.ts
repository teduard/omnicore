import { useContext } from "react";
import { DataSourceContext } from "../contexts/DataSourceContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDatabase } from "../db/hooks/useDatabase";
import type { NewExpensePayload } from "../services/types";
import { broadcastInvalidation } from "../lib/queryChannel";

export const EXPENSE_KEYS = {
  all: ["expenses"] as const,
  byMonth: ["month"] as const,
  categories: ["categories"] as const,
};

export const useExpenses = (selectedDate: string) => {
  const context = useContext(DataSourceContext);

  const { service } = context;

  const { isReady } = useDatabase();

  return useQuery({
    queryKey: [EXPENSE_KEYS.all, selectedDate],
    queryFn: async () => {
      const res = await service.getExpenses(selectedDate);
      return res;
    },
    enabled: isReady,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export const useAddExpenses = () => {
  const context = useContext(DataSourceContext);

  const { service } = context;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NewExpensePayload) => {
      return service.addExpense(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EXPENSE_KEYS.all,
      });

      broadcastInvalidation(EXPENSE_KEYS.all);
    },
  });
};
