import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi, { IReqData } from '../../../../utils/api/AuthApi';
import { setCookie } from '../../../../utils/cookies';
import { setUser } from './auth.slice';

export const fetchLogin = createAsyncThunk('auth/login',
  async (data: IReqData, { rejectWithValue, dispatch }) => {
    try {
      const response = await authApi.loginRequest(data);

      dispatch(setUser(response.user));
      setCookie('accessToken', response.accessToken);
      setCookie('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  });

export const fetchRegister = createAsyncThunk('auth/register',
  async (data: IReqData, { rejectWithValue, dispatch }) => {
    try {
      const response = await authApi.registerRequest(data);

      dispatch(setUser(response.user));
      setCookie('accessToken', response.accessToken);
      setCookie('refreshToken', response.refreshToken);
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  });

export const fetchUser = createAsyncThunk('auth/getUser',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await authApi.getUserRequest();
      dispatch(setUser(response.user));
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  });
