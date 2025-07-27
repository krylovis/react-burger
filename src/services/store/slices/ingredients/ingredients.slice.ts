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

interface IIngredientsState {
  ingredients: TIngredient[];
  ingredientsObject: Record<TIngredientId, TIngredient>;
  orderObject: {
    bun: TIngredient | null,
    ingredients: TIngredient[],
  };
  isLoading: boolean,
  error: string | null,
};

const initialIngredientsState: IIngredientsState = {
  ingredients: [],
  ingredientsObject: {},
  orderObject: { bun: null, ingredients: [] },
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
    },
    setIngredientsForOrder(state, action: PayloadAction<{ id: TIngredientId }>) {
      const { id } = action.payload;

      if(!state?.ingredientsObject[id]) return;
      if(state?.ingredientsObject[id].type === 'bun') {
        state.orderObject.bun = state.ingredientsObject[id]
      } else {
        state.orderObject.ingredients.push({ ...state.ingredientsObject[id] });
      }
    },
    deleteIngredientForOrder(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      if (state.orderObject.ingredients[index]) {
        state.orderObject.ingredients.splice(index, 1);
      }
    },
    updateIngredientForOrder(state, action: PayloadAction<{ data: TIngredient[] }>) {
      const { data } = action.payload;
      state.orderObject.ingredients = [...data];
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
    selectBun: (state) => state.orderObject.bun,
    selectOrderIngredients: (state) => state.orderObject.ingredients,
    selectIngredientsError: (state) => state.error,
    selectIngredientsLoading: (state) => state.isLoading,
  },
});

export const {
  setIngredients,
  setIngredientsForOrder,
  deleteIngredientForOrder,
  updateIngredientForOrder,
} = ingredientsSlice.actions;
export const {
  selectIngredients,
  selectBun,
  selectOrderIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;