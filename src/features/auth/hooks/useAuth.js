import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkSession as checkSessionAction,
  clearAuthError,
  login as loginAction,
  logout as logoutAction,
  register as registerAction,
} from '../state/authSlice.js';

export function useAuth() {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.auth);

  return {
    user,
    status,
    error,
    register: (credentials) => dispatch(registerAction(credentials)).unwrap(),
    login: (credentials) => dispatch(loginAction(credentials)).unwrap(),
    logout: () => dispatch(logoutAction()).unwrap(),
    clearError: () => dispatch(clearAuthError()),
    checkSession: useCallback(() => dispatch(checkSessionAction()), [dispatch]),
  };
}
