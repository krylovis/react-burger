import { createAsyncThunk } from '@reduxjs/toolkit';
import ordersApi, { IReqData } from '../../../../utils/api/OrdersApi';
import { setOrderNumber } from './constructor.slice';

export const fetchMakeOrder = createAsyncThunk('burgerConstructor/fetchMakeOrder',
  async (data: IReqData, { rejectWithValue, dispatch }) => {
    try {
      const response = await ordersApi.makeOrder(data);
      dispatch(setOrderNumber(response));
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  });
