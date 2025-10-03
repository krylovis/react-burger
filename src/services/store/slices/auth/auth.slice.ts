import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from './authExtraReducers';

interface IUser {
  email: string,
  name: string
};

interface IAuthState {
  user: IUser | null,
  isAuth: boolean;
  isLoading: boolean;
};

const initialAuthState: IAuthState = {
  user: null,
  isAuth: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuth = !!action.payload;
      state.isLoading = true;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuth: (state) => state.isAuth,
    selectIsUserLoading: (state) => state.isLoading,
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const {
  selectUser,
  selectIsAuth,
  selectIsUserLoading,
} = authSlice.selectors;

export default authSlice.reducer;