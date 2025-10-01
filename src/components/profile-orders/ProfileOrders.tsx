import { useEffect, memo } from 'react';
import { useAppDispath, useAppSelector } from '../../services/store';
import { WS_ORDERS_URL } from '../../utils/constants';
import { OrderList } from '../../components';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/store/middleware/web-socket/types';
import { getCookie } from '../../utils/cookies';
import {
  selectOrders,
} from '../../services/store/slices/orders/orders.slice';

function ProfileOrders() {
  const dispatch = useAppDispath();
  const orders = useAppSelector(selectOrders);

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    dispatch({ type: WS_CONNECTION_START, payload: `${WS_ORDERS_URL}?token=${accessToken?.replace('Bearer ', '')}` });

    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <OrderList orders={orders} />
  )
}

export default memo(ProfileOrders);