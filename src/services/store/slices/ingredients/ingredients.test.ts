import ingredientsReducer, { initialIngredientsState } from './ingredients.slice';

describe('ingredients slice test', () => {
  it('initial ingredients state', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialIngredientsState);
  });
});