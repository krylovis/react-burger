import ordersReducer, { initialState } from './orders.slice';

describe('orders slice test', () => {
  it('initial auth state', () => {
    expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
  });
});