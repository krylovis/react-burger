import { v4 as uuidv4 } from 'uuid';
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
    ingredients: Record<string, TIngredient>,
  };
  isLoading: boolean,
  error: string | null,
};

const initialIngredientsState: IIngredientsState = {
  ingredients: [],
  ingredientsObject: {},
  orderObject: { bun: null, ingredients: {}},
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
        const uid = uuidv4();
        state.orderObject.ingredients[uid] = { ...state.ingredientsObject[id] };
      }
    },
    deleteIngredientForOrder(state, action: PayloadAction<{ itemId: string }>) {
      const { itemId } = action.payload;
      
      if (state.orderObject.ingredients[itemId]) {
        delete state.orderObject.ingredients[itemId];
      }
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

export const { setIngredients, setIngredientsForOrder, deleteIngredientForOrder } = ingredientsSlice.actions;
export const {
  selectIngredients,
  selectBun,
  selectOrderIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} = ingredientsSlice.selectors;

export default ingredientsSlice.reducer;