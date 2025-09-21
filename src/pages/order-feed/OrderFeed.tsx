import { useEffect } from 'react';
import style from './OrderFeed.module.scss';
import { OrderList } from '../../components';
import { WS_CONNECTION_START } from '../../services/store/middleware/web-socket/types';
import { useAppDispath, useAppSelector } from '../../services/store';
import { selectOrdersData } from '../../services/store/slices/orders/orders.slice';

export default function OrderFeed() {
  const dispatch = useAppDispath();

  const ordersData = useAppSelector(selectOrdersData);
  console.log('ordersData', ordersData);

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
        <OrderList orders={ordersData?.orders || []} />
      </div>
    </div>
  );
}
