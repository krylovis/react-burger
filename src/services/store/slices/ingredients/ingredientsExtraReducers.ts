import { createAsyncThunk } from '@reduxjs/toolkit';
import ingredientsApi from '../../../../utils/api/IngredientsApi';
import { setIngredients } from './ingredients.slice';

export const fetchIngredientsData = createAsyncThunk('ingredients/fetchIngredientsData',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await ingredientsApi.getIngredients();
      dispatch(setIngredients(response));
      return response;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  }
);
