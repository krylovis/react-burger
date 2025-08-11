import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ingredientsReducer from './slices/ingredients/ingredients.slice';
import constructorReducer from './slices/constructor/constructor.slice';
import authReducer from './slices/auth/auth.slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();

