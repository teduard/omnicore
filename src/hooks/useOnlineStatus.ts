import { useEffect, useState } from "react";
import { logger } from "../lib/logger";

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
        logger.debug("in hook, handle online");
      setIsOnline(true);
    }
    function handleOffline() {
        logger.debug("in hook, handle offline");
      setIsOnline(false);
    }
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}

export default useOnlineStatus;