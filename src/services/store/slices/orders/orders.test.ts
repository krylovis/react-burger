import ordersReducer, { initialState, setOrders } from './orders.slice';
import ordersData from '../../../../utils/orders.json';

describe('orders slice test', () => {
  it('initial orders state', () => {
    expect(ordersReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('set orders', () => {
    const nextState = ordersReducer(initialState, setOrders({ data: ordersData }));

    expect(nextState.data.orders).toEqual(ordersData.orders);
    expect(typeof nextState.data.total).toBe('number');
    expect(typeof nextState.data.totalToday).toBe('number');
    expect(typeof nextState.data.success).toBe('boolean');
  });
});