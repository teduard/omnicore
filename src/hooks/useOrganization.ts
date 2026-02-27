import { useEffect, useState } from "react";

import { useQueryClient } from '@tanstack/react-query';
import { logger } from "../lib/logger";

interface IOrganizationResponse {
  organizationId: number,
  name: string,
  active: boolean;
  fetched: boolean;
}

function useOrganization() {
  const [isOnline, setIsOnline] = useState(true);

  const queryClient = useQueryClient();
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/organization`

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
  
  const [organizationData, setOrganizationData] = useState(
    {
      name: "",
      organizationId: 0,
      active: true,
      fetched: false,
    }
  );

  useEffect(() => {
    queryClient.fetchQuery({
      queryKey: ['users'],
      queryFn: async ():Promise<IOrganizationResponse> => fetch(apiUrl,
            {
              method: "GET",
              credentials: "include",
            }
            )
            .then(r => r.json())
    }).then(r => {
      setOrganizationData({
        name: r.name,
        organizationId: r.organizationId,
        active: r.active,
        fetched: true
      })
    });

    // setOrganizationData({
    //   name: "gigi",
    //   organizationId: 0,
    //   active: true
    // })
  }, []);

  return {isOnline, organizationData};
}


export default useOrganization;