import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  INVALIDATION_KEY,
  type InvalidationMessage,
} from "../lib/queryChannel";
import { logger } from "../lib/logger";
import { useDatabase } from "../db/hooks/useDatabase";

export const useCrossTabInvalidation = () => {
  const queryClient = useQueryClient();
  const { reloadFromStorage } = useDatabase();

  useEffect(() => {
    const handleStorage = async (event: StorageEvent) => {
      logger.debug(`msg ${INVALIDATION_KEY} picked up:`, event);

      logger.debug("val:", !event.newValue);
      logger.debug(
        "event.key !== INVALIDATION_KEY : ",
        event.key !== INVALIDATION_KEY,
      );

      if (event.key !== INVALIDATION_KEY || !event.newValue) return;

      logger.debug("....handling it");

      try {
        const message: InvalidationMessage = JSON.parse(event.newValue);

        await reloadFromStorage();

        queryClient.invalidateQueries({ queryKey: message.queryKey });
      } catch (e) {
        logger.debug("error invalidating query", e);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [queryClient, reloadFromStorage]);
};
