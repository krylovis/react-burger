import style from './OrderPage.module.scss';
import { useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfo } from '../../components';
import { useAppDispath, useAppSelector } from '../../services/store';
import { selectOrderById } from '../../services/store/slices/orders/orders.slice';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../../services/store/middleware/web-socket/types';
import { WS_ORDERS_URL } from '../../utils/constants';
import { getCookie } from '../../utils/cookies';

function OrderPage() {
  const { id } = useParams();
  const dispatch = useAppDispath();
  const order = useAppSelector((state) => selectOrderById(state, id));

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    dispatch({ type: WS_CONNECTION_START, payload: `${WS_ORDERS_URL}?token=${accessToken?.replace('Bearer ', '')}` });
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