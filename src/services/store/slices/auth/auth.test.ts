import authReducer, { initialAuthState } from './auth.slice';

describe('auth slice test', () => {
  it('Начальное состояние хранилища', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialAuthState);
  });
});