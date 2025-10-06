import ingredientsReducer, { initialIngredientsState } from './ingredients.slice';

describe('ingredients slice test', () => {
  it('Начальное состояние хранилища', () => {
    expect(ingredientsReducer(undefined, { type: '' })).toEqual(initialIngredientsState);
  });
});