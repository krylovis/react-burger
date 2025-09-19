import { METHODS, IParams, IRequest } from './types';
export class BaseApi {
  _baseUrl: string;

  _endpoint: string;

  _url: string;

  _headers: Record<string, string>;

  _baseOptions: RequestInit;

  constructor({ baseUrl, headers, endpoint = '' }: IParams) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._endpoint = endpoint;
    this._url = `${this._baseUrl}${endpoint}`;
    this._baseOptions = {
      headers: this._headers,
    };
  }

  async _getResponse(res: Response) {
    const contentType = res.headers.get('Content-Type');

    if (!res.ok) {
      return res.json().then((error) => Promise.reject(error));
    }

    if (contentType?.includes('json')) {
      return res.json();
    } if (contentType?.includes('text')) {
      return res.text();
    }

    return res;
  }

  _request({ path, options }: IRequest) {
    return fetch(`${this._url}${path}`, { ...this._baseOptions, ...options })
      .then(this._getResponse);
  }

  public get(path: string, data?: RequestInit) {
    return this._request({ path, options: { method: METHODS.GET, ...data } });
  }

  public post(path: string, data?: RequestInit) {
    return this._request({ path, options: { method: METHODS.POST, ...data } });
  }

  public put(path: string, data: RequestInit) {
    return this._request({ path, options: { method: METHODS.PUT, ...data } });
  }

  public patch(path: string, data: RequestInit) {
    return this._request({ path, options: { method: METHODS.PATCH, ...data } });
  }

  public delete(path: string, data: RequestInit) {
    return this._request({ path, options: { method: METHODS.DELETE, ...data } });
  }
}
