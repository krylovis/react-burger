export const API_URL = 'https://norma.nomoreparties.space/api';
export const WS_ALL_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all';
export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders';

export const ROUTES = {
  MAIN: '/',
  FEED: '/feed',
  FEED_ID: '/feed/:id',
  LOGIN: '/login',
  PROFILE: '/profile',
  PROFILE_ORDERS: 'orders',
  PROFILE_ORDERS_ID: '/profile/orders/:id',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  INGREDIENTS: '/ingredients',
  INGREDIENT_ID: '/ingredients/:id',
  NOT_FOUND: '*',
}

export const ORDER_STATUSES: { [key: string]: string } = {
  pending: 'Готовится',
  done: 'Выполнен',
  created: 'Создан',
}
