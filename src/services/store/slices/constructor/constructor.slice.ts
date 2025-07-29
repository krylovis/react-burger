import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../ingredients/ingredients.slice';

interface IConstructorState {
  bun: TIngredient | null,
  orderIngredients: TIngredient[],
  orderNumber: number | null,
};

const initialConstructorState: IConstructorState = {
  bun: null,
  orderIngredients: [],
  orderNumber: null
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: initialConstructorState,
  reducers: {
    setIngredientsForOrder(state, action: PayloadAction<{ item: TIngredient }>) {
      const { item } = action.payload;
      if(!item) return;

      if(item.type === 'bun') {
        state.bun = {...item};
      } else {
        state.orderIngredients.push({ ...item });
      }
    },
    deleteIngredientForOrder(state, action: PayloadAction<{ index: number }>) {
      const { index } = action.payload;
      if (state.orderIngredients[index]) {
        state.orderIngredients.splice(index, 1);
      }
    },
    updateIngredientForOrder(state, action: PayloadAction<{ data: TIngredient[] }>) {
      const { data } = action.payload;
      state.orderIngredients = [...data];
    },
    setOrderNumber(state, action: PayloadAction<{ order: Record<string, string | number>}>) {
      const { order } = action.payload;
      state.orderNumber = order.number as number;
    },
    resetOrderNumber(state) {
      state.orderNumber = null;
    }
  },
  selectors: {
    selectBun: (state) => state.bun,
    selectOrderIngredients: (state) => state.orderIngredients,
    selectOrderNumber: (state) => state.orderNumber,
  },
});

export const {
  setIngredientsForOrder,
  deleteIngredientForOrder,
  updateIngredientForOrder,
  setOrderNumber,
  resetOrderNumber,
} = constructorSlice.actions;
export const {
  selectBun,
  selectOrderIngredients,
  selectOrderNumber,
} = constructorSlice.selectors;

export default constructorSlice.reducer;