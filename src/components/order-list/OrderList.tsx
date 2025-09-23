import style from './OrderList.module.scss';
import { useAppSelector } from '../../services/store';
import { selectIngredientsObject } from '../../services/store/slices/ingredients/ingredients.slice';
import { TOrder } from '../../services/store/slices/types';
import { OrderItem } from '../index';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

interface IProps {
  orders: TOrder[],
}

export default function OrderList({ orders }: IProps) {
  const ingredientsObject = useAppSelector(selectIngredientsObject);

  const navigate = useNavigate();
  const location = useLocation()

  const handleOrderSelect = (order: TOrder) => {
    // setCurrentItem(item);
    // toggleModalState();

    navigate(`${ROUTES.FEED}/${order._id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <ul className={style.orderList}>
      {orders.map((order) => {
        let costOfOrder = 0;
        const ingredientsImages = [];
        if (order.ingredients) {
          for (const item of order.ingredients) {
            if (ingredientsObject[item]) {
              ingredientsImages.push(ingredientsObject[item].image);
              costOfOrder += ingredientsObject[item].price;
            }
          }
        }

        return (
          <OrderItem
            key={order._id}
            order={order}
            costOfOrder={costOfOrder}
            ingredientsImages={ingredientsImages}
            orderClick={handleOrderSelect}
          />
        )
      })}
    </ul>
  )
}