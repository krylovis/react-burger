export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export interface IParams {
  baseUrl: string,
  headers: Record<string, string>,
  endpoint?: string,
}

export interface IRequest {
  path: string,
  options?: RequestInit,
}

export interface IReqData {
  [key: string]: string | number | FormData | string[],
}