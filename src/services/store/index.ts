import { configureStore, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ingredientsReducer from './slices/ingredients/ingredients.slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: AppState;
//   dispatch: AppDispatch;
// }>();
