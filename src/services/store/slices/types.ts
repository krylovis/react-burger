export type TIngredientId = string;

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

export interface TOrderIngredient extends TIngredient {
  key: string;
}