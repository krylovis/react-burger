import ordersReducer, { initialState } from './orders.slice';

describe('orders slice test', () => {
  it('Начальное состояние хранилища', () => {
    expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
  });
});