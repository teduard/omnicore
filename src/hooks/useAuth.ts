import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { DataSourceContext } from '../contexts/DataSourceContext';
import { AuthContext } from '../contexts/AuthContext';
import type { LoginPayload } from '../services/types';

export const useLogin = () => {
  const { authService } = useContext(DataSourceContext);
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  return useMutation({
    mutationFn: (payload: LoginPayload) => authService.login(payload),
    onSuccess: (user) => {
      if (user) {
        setUser(user);
        setIsAuthenticated(true);
      }
    },
  });
};