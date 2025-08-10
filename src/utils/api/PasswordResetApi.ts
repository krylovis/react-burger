import { API_URL } from '../constants';
import { BaseApi } from './BaseApi';

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

export interface IReqData {
  [key: string]: string | number | FormData | string[],
}

class PasswordResetApi extends BaseApi {
  constructor() {
    super({
      headers: HEADERS,
      baseUrl: API_URL,
      endpoint: '/password-reset',
    });
  }

  public checkEmailRequest(data: IReqData) {
    return this.post('', { body: JSON.stringify(data) });
  }

  public resetPasswordRequest(data: IReqData) {
    return this.post('/reset', { body: JSON.stringify(data) });
  }
}

const passwordResetApi = new PasswordResetApi();
export default passwordResetApi;
