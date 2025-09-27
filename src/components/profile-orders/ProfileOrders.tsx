import style from './ProfileOrders.module.scss';
import { useEffect } from 'react';
import { useAppDispath, useAppSelector } from '../../services/store';
import { WS_ORDERS_URL } from '../../utils/constants';
import { OrderList } from '../../components';
import { WS_CONNECTION_START } from '../../services/store/middleware/web-socket/types';
import { getCookie } from '../../utils/cookies';
import { ROUTES } from '../../utils/constants';
import {
  selectOrders,
} from '../../services/store/slices/orders/orders.slice';

export default function ProfileOrders() {
  const dispatch = useAppDispath();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = getCookie('accessToken');
      await dispatch({
        type: WS_CONNECTION_START,
        payload: `${WS_ORDERS_URL}?token=${accessToken}`
      });
    }

    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const orders = useAppSelector(selectOrders);

  return (
    <OrderList route={ROUTES.PROFILE_ORDERS} orders={orders} />
  )
}