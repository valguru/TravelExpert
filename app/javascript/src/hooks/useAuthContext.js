import { useContext } from 'react';
import { AuthContext } from '../context';

export const useAuthContext = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext error. Using outside provider');
  }

  return authContext;
};
