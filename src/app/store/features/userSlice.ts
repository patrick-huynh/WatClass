import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: number | null;
  username: string | null;
  role: 'student' | 'professor' | 'admin' | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  userId: null,
  username: null,
  role: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ userId: number; username: string; role: 'student' | 'professor' | 'admin' }>) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.userId = null;
      state.username = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
