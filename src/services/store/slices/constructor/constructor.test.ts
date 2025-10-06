import constructorReducer, { initialConstructorState } from './constructor.slice';

describe('constructor slice test', () => {
  it('Начальное состояние хранилища', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialConstructorState);
  });
});