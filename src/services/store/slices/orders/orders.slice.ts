import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrderId, TAllOrders, TOrder } from '../types';

interface IOrdersState {
  data: TAllOrders,
  ordersObject: Record<TOrderId, TOrder>,
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
  ordersObject: {},
  isConnected: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<{ data: TAllOrders }>) => {
      const { data } = action.payload;

      state.data = data;
      state.ordersObject = data.orders
        .reduce((acc: Record<TOrderId, TOrder>, item) => {
          acc[item._id] = item;
          return acc;
        }, {});
    },
  },
  selectors: {
    selectOrders: (state) => state.data.orders,
    selectOrdersObject: (state) => state.ordersObject,
    selectOrderById: (state, id) => {
      return state.ordersObject[id] || null;
    },
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
  selectOrdersObject,
  selectOrderById,
  selectTotal,
  selectTotalToday,
  selectStatusDoneOrders,
  selectStatusPendingOrders,
  selectOrdersData,
} = ordersSlice.selectors;

export default ordersSlice.reducer;