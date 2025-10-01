import style from './ProfileOrders.module.scss';
import { useEffect } from 'react';
import { useAppDispath, useAppSelector } from '../../services/store';
import { WS_ORDERS_URL } from '../../utils/constants';
import { OrderList } from '../../components';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/store/middleware/web-socket/types';
import { getCookie } from '../../utils/cookies';
import { ROUTES } from '../../utils/constants';
import {
  selectOrders,
} from '../../services/store/slices/orders/orders.slice';

export default function ProfileOrders() {
  const dispatch = useAppDispath();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    dispatch({ type: WS_CONNECTION_START, payload: `${WS_ORDERS_URL}?token=${accessToken?.replace('Bearer ', '')}` });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const orders = useAppSelector(selectOrders);

  return (
    <OrderList route={ROUTES.PROFILE_ORDERS} orders={orders} />
  )
}