import { API_URL } from '../constants';
import { BaseApi } from './BaseApi';

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

export interface IReqData {
  [key: string]: string | number | FormData | string[],
}

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
