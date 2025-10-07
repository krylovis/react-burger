import ingredientsReducer, { initialIngredientsState, IIngredientsState, setIngredients } from './ingredients.slice';
import ingredientsData from '../../../../utils/ingredients.json';

const initialState: IIngredientsState = {
  ingredients: [],
  ingredientsObject: {},
  isLoading: true,
  error: null,
};

describe('ingredients slice test', () => {
  it('initial ingredients state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialIngredientsState);
  });

  it('set ingredients', () => {
    const nextState = ingredientsReducer(initialState, setIngredients({ data: ingredientsData.data }));
    expect(nextState.ingredients).toEqual(ingredientsData.data);
  });
});