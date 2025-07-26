import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchIngredientsData } from './ingredientsExtraReducers';

type TIngredientId = string;

type TIngredients = {
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

interface IIngredientsState {
  ingredients: TIngredients[];
  // ingredientsForOrder: TIngredientId[];
  isLoading: boolean,
  error: string | null,
};

const initialIngredientsState: IIngredientsState = {
  ingredients: [],
  // ingredientsForOrder: [],
  isLoading: false,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialIngredientsState,
  reducers: {
    setIngredients(state, action: PayloadAction<{ data: TIngredients[] }>) {
      const { data } = action.payload;
      state.ingredients = data || [];
      state.isLoading = false;
      state.error = null;
    },
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
    // selectIngredientsForOrder: (state) => state.ingredientsForOrder,
    selectIngredientsError: (state) => state.error,
    selectIngredientsLoading: (state) => state.isLoading,
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export const {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;