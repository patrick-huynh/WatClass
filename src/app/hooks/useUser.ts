import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setUser, clearUser } from '../store/features/userSlice';

export const useUser = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const login = (userId: number, username: string, role: 'student' | 'professor' | 'admin') => {
    dispatch(setUser({ userId, username, role }));
  };

  const logout = () => {
    dispatch(clearUser());
  };

  return {
    user,
    login,
    logout,
  };
};
