import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { INVALIDATION_KEY, type InvalidationMessage } from "../lib/queryChannel";
import { logger } from "../lib/logger";

export const useCrossTabInvalidation = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== INVALIDATION_KEY || !event.newValue) return;

      try {
        const message: InvalidationMessage = JSON.parse(event.newValue);
        queryClient.invalidateQueries({ queryKey: message.queryKey });
      } catch(e) {
        logger.debug("error invalidating query", e);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [queryClient]);
};