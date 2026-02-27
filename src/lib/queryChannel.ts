const INVALIDATION_KEY = "rq_invalidate";

interface InvalidationMessage {
  queryKey: readonly unknown[];
  timestamp: number;
}

export const broadcastInvalidation = (queryKey: readonly unknown[]) => {
  const message: InvalidationMessage = {
    queryKey,
    timestamp: Date.now(),
  };
  
  localStorage.setItem(INVALIDATION_KEY, JSON.stringify(message));
};

export { INVALIDATION_KEY };
export type { InvalidationMessage };