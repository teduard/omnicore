import { useEffect, useState } from "react";

import { useQueryClient } from '@tanstack/react-query';

interface IOrganizationResponse {
  organizationId: number,
  name: string,
  active: boolean;
  fetched: boolean;
}

function useOrganization() {
  const [isOnline, setIsOnline] = useState(true);

  const queryClient = useQueryClient();
  const apiUrl = "http://localhost:9080/api/organization"

  useEffect(() => {
    function handleOnline() {
      console.log("in hook, handle online");
      setIsOnline(true);
    }
    function handleOffline() {
      console.log("in hook, handle offline");
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