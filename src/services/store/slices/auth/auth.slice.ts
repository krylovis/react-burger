import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../ingredients/ingredients.slice';

export interface TOrderIngredient extends TIngredient {
  key: string;
}

interface IUser {
  email: string,
  name: string
};

interface IAuthState {
  user: IUser | null,
  isAuth: boolean;
};

const initialAuthState: IAuthState = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isAuth = !!action.payload;
    },
    logoutUser(state) {
      state.user = null;
      state.isAuth = false;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuth: (state) => state.isAuth,
  },
});

export const { setUser, logoutUser } = authSlice.actions;

export const {
  selectUser,
  selectIsAuth,
} = authSlice.selectors;

export default authSlice.reducer;