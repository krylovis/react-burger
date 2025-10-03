import style from './OrderPage.module.scss';
import { useEffect, memo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { OrderInfo } from '../../components';
import { useAppDispath, useAppSelector } from '../../services/store';
import { selectOrderById } from '../../services/store/slices/orders/orders.slice';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/store/middleware/web-socket/types';
import { WS_ORDERS_URL, WS_ALL_ORDERS_URL } from '../../utils/constants';
import { getCookie } from '../../utils/cookies';

function OrderPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useAppDispath();

  const isToken = location.pathname.includes('orders');
  const order = useAppSelector((state) => selectOrderById(state, id));

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    const url = isToken ? `${WS_ORDERS_URL}?token=${accessToken?.replace('Bearer ', '')}` : WS_ALL_ORDERS_URL;

    dispatch({ type: WS_CONNECTION_START, payload: url });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  return (
    <div className={style.orderPage}>
      {order && (<OrderInfo order={order} />)}
    </div>
  );
}

export default memo(OrderPage);