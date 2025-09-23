import style from './OrderFeed.module.scss';
import { OrderList, OrderStatus } from '../../components';
import { useAppSelector } from '../../services/store';
import {
  selectOrders,
  selectTotal,
  selectTotalToday,
  selectStatusDoneOrders,
  selectStatusPendingOrders,
} from '../../services/store/slices/orders/orders.slice';

export default function OrderFeed() {
  const orders = useAppSelector(selectOrders);
  const total = useAppSelector(selectTotal);
  const totalToday = useAppSelector(selectTotalToday);
  const statusDoneOrders = useAppSelector(selectStatusDoneOrders);
  const statusPendingOrders = useAppSelector(selectStatusPendingOrders);

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
