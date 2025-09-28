import { useEffect } from 'react';
import style from './OrderFeed.module.scss';
import { OrderList, OrderStatus } from '../../components';
import { useAppDispath, useAppSelector } from '../../services/store';
import {
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectStatusDoneOrders,
  selectStatusPendingOrders,
} from '../../services/store/slices/orders/orders.slice';
import { WS_CONNECTION_START } from '../../services/store/middleware/web-socket/types';
import { WS_ALL_ORDERS_URL } from '../../utils/constants';
import { ROUTES } from '../../utils/constants';

export default function OrderFeed() {
  const dispatch = useAppDispath();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch({ type: WS_CONNECTION_START, payload: WS_ALL_ORDERS_URL });
    }

    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  const orders = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);
  const statusDoneOrders = useAppSelector(selectStatusDoneOrders);
  const statusPendingOrders = useAppSelector(selectStatusPendingOrders);

  return (
    <div className={style.orderFeed}>
      <h1 className={style.title}>Лента заказов</h1>

      <div className={style.container}>
        <OrderList route={ROUTES.FEED} orders={orders} />
        <OrderStatus doneList={statusDoneOrders} pendingList={statusPendingOrders} total={total} totalToday={totalToday} />
      </div>
    </div>
  );
}
