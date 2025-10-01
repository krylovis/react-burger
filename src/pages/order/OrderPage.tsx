import style from './OrderPage.module.scss';
import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { OrderInfo } from '../../components';
import { useAppSelector } from '../../services/store';
import { selectOrderById } from '../../services/store/slices/orders/orders.slice';

function OrderPage() {
  const { id } = useParams();
  const order = useAppSelector((state) => selectOrderById(state, id));

  return (
    <div className={style.orderPage}>
      {order && (<OrderInfo order={order} />)}
    </div>
  );
}

export default memo(OrderPage);