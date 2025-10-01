import { API_URL } from '../constants';
import { BaseApi } from './BaseApi';
import { IReqData } from './types';
import { getCookie } from '../cookies';

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

class OrdersApi extends BaseApi {
  constructor() {
    super({
      headers: HEADERS,
      baseUrl: API_URL,
      endpoint: '/orders',
    });
  }

  public makeOrder(data: IReqData) {
    return this.post('', {
      headers: {
        ...HEADERS,
        'Authorization': getCookie('accessToken')!
      },
      body: JSON.stringify(data)
    });
  }
}

const ordersApi = new OrdersApi();
export default ordersApi;
