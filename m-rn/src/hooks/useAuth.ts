import {useAppSelector, useAppDispatch} from '@hooks/index';
import {loginUser, registerUser, logoutUser, clearAuth} from '@store/slices/authSlice';
import {LoginForm, RegisterForm} from '@types/index';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);

  const login = async (credentials: LoginForm) => {
    return dispatch(loginUser(credentials)).unwrap();
  };

  const register = async (userData: RegisterForm) => {
    return dispatch(registerUser(userData)).unwrap();
  };

  const logout = async () => {
    return dispatch(logoutUser()).unwrap();
  };

  const clearAuthData = () => {
    dispatch(clearAuth());
  };

  return {
    ...auth,
    login,
    register,
    logout,
    clearAuthData,
  };
};

export default useAuth;