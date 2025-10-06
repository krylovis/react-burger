import authReducer, { initialAuthState } from './auth.slice';

const testUser = {
  user: {
    email: 'email',
    name: 'name'
  },
  isAuth: true,
  isLoading: false,
}

describe('auth slice test', () => {
  it('initial auth state', () => {
    expect(authReducer(undefined, { type: '' })).toEqual(initialAuthState);
  });

  it('set user', () => {
    expect(authReducer(testUser, { type: 'setUser', ...testUser }))
      .toEqual(testUser)
  })

  it('logout user', () => {
    expect(authReducer(initialAuthState, { type: 'logoutUser' }))
      .toEqual(initialAuthState)
  })
});