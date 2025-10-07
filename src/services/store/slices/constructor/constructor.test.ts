import constructorReducer, {
  initialConstructorState,
  setIngredientsForOrder,
  deleteIngredientForOrder,
  updateIngredientForOrder,
  setOrderNumber,
  resetOrderNumber,
  resetIngredientForOrder,
  IConstructorState
} from './constructor.slice';

const initialState: IConstructorState = {
  bun: null,
  orderIngredients: [],
  orderNumber: null
};

const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
}

const main = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0
}

describe('constructor slice test', () => {
  it('initial constructor state', () => {
    expect(constructorReducer(undefined, { type: '' }))
      .toEqual(initialConstructorState);
  })

  it('set ingredients (bun) for order', () => {
    const nextState = constructorReducer(initialState, setIngredientsForOrder({ item: bun }));
    expect(nextState.bun).toEqual(bun);
  })

  it('set ingredients (main) for order', () => {
    const nextState = constructorReducer(initialState, setIngredientsForOrder({ item: main }));
    expect(nextState.orderIngredients).toEqual([...nextState.orderIngredients]);
  })

  it('delete ingredient for order', () => {
    const setState = constructorReducer(initialState, setIngredientsForOrder({ item: main }));
    const deleteState = constructorReducer(setState, deleteIngredientForOrder({ index: 0 }));

    expect(deleteState.orderIngredients).toEqual([...initialState.orderIngredients]);
  })

  it('update ingredient for order', () => {
    const nextState = constructorReducer(initialState, updateIngredientForOrder({ data: [{...main, key: '1' }, {...main, key: '2' }] }));
    expect(nextState.orderIngredients).toEqual([...nextState.orderIngredients]);
  })

  it('set order number', () => {
    const nextState = constructorReducer(initialState, setOrderNumber({ order: { number: '12345' } }));
    expect(nextState.orderNumber).toEqual('12345');
  })

  it('reset order number', () => {
    const setState = constructorReducer(initialState, setOrderNumber({ order: { number: '12345' } }));
    const nextState = constructorReducer(setState, resetOrderNumber());

    expect(nextState.orderNumber).toEqual(null);
  })

  it('reset ingredient for order', () => {
    const setMainState = constructorReducer(initialState, setIngredientsForOrder({ item: main }));
    const setBunState = constructorReducer(setMainState, setIngredientsForOrder({ item: bun }));
    const resetState = constructorReducer(setBunState, resetIngredientForOrder());

    expect(resetState).toEqual(initialState);
  })
});