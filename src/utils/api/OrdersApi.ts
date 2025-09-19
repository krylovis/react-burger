import { API_URL } from '../constants';
import { BaseApi } from './BaseApi';
import { IReqData } from './types';

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
    return this.post('', { body: JSON.stringify(data) });
  }
}

const ordersApi = new OrdersApi();
export default ordersApi;
