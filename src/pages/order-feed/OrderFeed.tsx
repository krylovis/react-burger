import { useEffect } from 'react';
import style from './OrderFeed.module.scss';
import { OrderList, OrderStatus } from '../../components';
import { WS_CONNECTION_START } from '../../services/store/middleware/web-socket/types';
import { useAppDispath, useAppSelector } from '../../services/store';
import {
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectStatusDoneOrders,
  selectStatusPendingOrders,
} from '../../services/store/slices/orders/orders.slice';

export default function OrderFeed() {
  const dispatch = useAppDispath();

  const orders = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);
  const statusDoneOrders = useAppSelector(selectStatusDoneOrders);
  const statusPendingOrders = useAppSelector(selectStatusPendingOrders);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch({ type: WS_CONNECTION_START });
    }

    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch]);

  return (
    <div className={style.orderFeed}>
      <h1 className={style.title}>Лента заказов</h1>

      <div className={style.container}>
        <OrderList orders={orders} />
        <OrderStatus doneList={statusDoneOrders} pendingList={statusPendingOrders} total={total} totalToday={totalToday} />
      </div>
    </div>
  );
}
