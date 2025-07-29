import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredientsData } from './ingredientsExtraReducers';

export type TIngredientId = string;

export type TIngredient = {
  _id: TIngredientId,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
};

export interface IIngredientsState {
  ingredients: TIngredient[];
  ingredientsObject: Record<TIngredientId, TIngredient>;
  isLoading: boolean,
  error: string | null,
};

const initialIngredientsState: IIngredientsState = {
  ingredients: [],
  ingredientsObject: {},
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredientsState,
  reducers: {
    setIngredients(state, action: PayloadAction<{ data: TIngredient[] }>) {
      const { data } = action.payload;
      state.ingredients = data || [];
      state.ingredientsObject = data.reduce((acc: Record<TIngredientId, TIngredient>, item) => {
        acc[item._id] = item;
        return acc;
      }, {});
      state.isLoading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredientsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredientsData.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredientsData.rejected, (state, action) => {
        state.error = action.payload as string;
        state.isLoading = false;
      })
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIngredientsObject: (state) => state.ingredientsObject,
    selectIngredientsError: (state) => state.error,
    selectIngredientsLoading: (state) => state.isLoading,
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export const {
  selectIngredients,
  selectIngredientsObject,
  selectIngredientsError,
  selectIngredientsLoading
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;