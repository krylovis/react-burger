import { createSlice } from '@reduxjs/toolkit';
import { TAllOrders } from '../types';

interface IOrdersState {
  data: TAllOrders,
  isConnected: boolean;
  error: string | null;
};

const initialState: IOrdersState = {
  data: {
    success: false,
    orders: [],
    total: 0,
    totalToday: 0
  },
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
    selectOrders: (state) => state.data.orders,
    selectStatusDoneOrders: (state) => state.data.orders
      .map(({ status, number }) => (status === 'done') && number).filter((item) => item) as number[],
    selectStatusPendingOrders: (state) => state.data.orders
      .map(({ status, number }) => (status === 'pending') && number).filter((item) => item) as number[],
    selectTotal: (state) => state.data.total,
    selectTotalToday: (state) => state.data.totalToday,
    selectOrdersData: (state) => state.data,
  },
});

export const { setOrders } = ordersSlice.actions;

export const {
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectStatusDoneOrders,
  selectStatusPendingOrders,
  selectOrdersData,
} = ordersSlice.selectors;

export default ordersSlice.reducer;