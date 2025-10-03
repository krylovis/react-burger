import { ORDER_STATUSES } from '../../../utils/constants';

export type TIngredientId = string;
export type TOrderStatus = keyof typeof ORDER_STATUSES;
export type TOrderId = string;

export type TIngredient = {
  _id: TIngredientId,
  name: string,
  type: string,
  proteins: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  price: number,
  image: string,
  image_mobile: string,
  image_large: string,
  __v: number
};

export type TOrder = {
  _id: TOrderId,
  ingredients: string[],
  status: TOrderStatus,
  number: number,
  name: string,
  createdAt: string,
  updatedAt: string,
};

export type TAllOrders = {
  success: boolean,
  orders: TOrder[],
  total: number,
  totalToday: number
};

export interface TOrderIngredient extends TIngredient {
  key: string;
}