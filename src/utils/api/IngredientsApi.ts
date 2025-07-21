import { API_URL } from '../constants';
import { BaseApi } from './BaseApi';

const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
};

export interface IReqData {
  [key: string]: string | number | FormData,
}

class IngredientsApi extends BaseApi {
  constructor() {
    super({
      headers: HEADERS,
      baseUrl: API_URL,
      endpoint: '/ingredients',
    });
  }

  public getIngredients() {
    return this.get('');
  }
}

const ingredientsApi = new IngredientsApi();
export default ingredientsApi;
