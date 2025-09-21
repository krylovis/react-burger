import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import ingredientsReducer from './slices/ingredients/ingredients.slice';
import constructorReducer from './slices/constructor/constructor.slice';
import authReducer from './slices/auth/auth.slice';
import ordersReducer from './slices/orders/orders.slice';
import { socketMiddleware } from './middleware/web-socket/socketMiddleware';
import { WS_ORDERS_URL } from '../../utils/constants';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: constructorReducer,
  auth: authReducer,
  orders: ordersReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  .concat(socketMiddleware(WS_ORDERS_URL)),
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppDispath = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>; 

