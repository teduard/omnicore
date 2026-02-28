import { useContext } from "react";
import { DataSourceContext } from "../contexts/DataSourceContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDatabase } from "../db/hooks/useDatabase";
import type {
  DeleteExpensePayload,
  NewExpensePayload,
} from "../services/types";
import { broadcastInvalidation } from "../lib/queryChannel";
import { logger } from "../lib/logger";

export const EXPENSE_KEYS = {
  all: () => ["expenses"] as const,
  byMonth: (date: string) => ["expenses", date] as const,
};

export const useExpenses = (selectedDate: string) => {
  const context = useContext(DataSourceContext);

  const { service } = context;

  const { isReady } = useDatabase();

  return useQuery({
    //queryKey: EXPENSE_KEYS.all(),
    queryKey: EXPENSE_KEYS.byMonth(selectedDate),
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
        queryKey: EXPENSE_KEYS.all(),
      });

      broadcastInvalidation(EXPENSE_KEYS.all());
    },
  });
};

export const useDeleteExpenses = () => {
  const context = useContext(DataSourceContext);

  const { service } = context;
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DeleteExpensePayload) => {
      logger.debug("mutationFN");
      return service.deleteExpense(payload);
    },
    onSuccess: () => {
      logger.debug("invalidate query");
      queryClient.invalidateQueries({
        queryKey: EXPENSE_KEYS.all(),
      });

      broadcastInvalidation(EXPENSE_KEYS.all());
    },
  });
};
