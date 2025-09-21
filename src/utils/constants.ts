export const API_URL = 'https://norma.nomoreparties.space/api';
export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';

export const ROUTES = {
  MAIN: '/',
  FEED: '/feed',
  LOGIN: '/login',
  PROFILE: '/profile',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  INGREDIENTS: '/ingredients',
  INGREDIENT_ID: '/ingredients/:id',
  NOT_FOUND: '*',
}

export const ORDER_STATUSES: { [key: string]: string } = {
  created: 'Готовится',
  done: 'Выполнен'
}
