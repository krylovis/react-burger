import { createSlice } from '@reduxjs/toolkit';
import { TAllOrders, TOrder } from '../types';

interface IOrdersState {
  orders: TOrder[],
  data: TAllOrders | null,
  isConnected: boolean;
  error: string | null;
};

const initialState: IOrdersState = {
  orders: [],
  data: null,
  isConnected: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.data = action.payload;
    },
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersData: (state) => state.data,
  },
});

export const { setOrders } = ordersSlice.actions;

export const {
  selectOrders,
  selectOrdersData,
} = ordersSlice.selectors;

export default ordersSlice.reducer;