import { API_URL } from '../constants';
import { BaseApi } from './BaseApi';
import { getCookie } from '../cookies';

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

export interface IReqData {
  [key: string]: string | number | FormData | string[],
}

class AuthApi extends BaseApi {
  constructor() {
    super({
      headers: HEADERS,
      baseUrl: API_URL,
      endpoint: '/auth',
    });
  }

  public loginRequest(data: IReqData) {
    return this.post('/login', { body: JSON.stringify(data) });
  }

  public getUserRequest() {
    return this.get('/user', {
      headers: {
        'Authorization': getCookie('accessToken')!
      }
    });
  }

  public refreshTokenRequest() {
    return this.post('/token', {
      body: JSON.stringify({ token: getCookie('refreshToken') })
    });
  }

  public registerRequest(data: IReqData) {
    return this.post('/register', { body: JSON.stringify(data) });
  }

  public logoutRequest(data: IReqData) {
    return this.post('/logout', { body: JSON.stringify(data) });
  }

  public tokenRequest(data: IReqData) {
    return this.post('/token', { body: JSON.stringify(data) });
  }
}

const authApi = new AuthApi();
export default authApi;
