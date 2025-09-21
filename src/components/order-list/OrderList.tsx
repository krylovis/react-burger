import style from './OrderList.module.scss';
import { useAppSelector } from '../../services/store';
import { selectIngredientsObject } from '../../services/store/slices/ingredients/ingredients.slice';
import { TOrder } from '../../services/store/slices/types';
import { OrderItem } from '../index';

interface IProps {
  orders: TOrder[],
}

export default function OrderList({ orders }: IProps) {
  const ingredientsObject = useAppSelector(selectIngredientsObject);
  console.log('ingredientsObject', ingredientsObject);

  const handleOrderSelect = (order: TOrder) => {
    console.log('order', order);
    // setCurrentItem(item);
    // toggleModalState();

    // navigate(`${ROUTES.INGREDIENTS}/${item._id}`, {
    //   state: { backgroundLocation: location },
    // });
  };

  return (
    <ul className={style.orderList}>
      {orders.map((order) => {
        const ingredientsImages = [];
        if (order.ingredients) {
          for (const item of order.ingredients) {
            if (ingredientsObject[item]) {
              ingredientsImages.push(ingredientsObject[item].image);
            }
          }
        }

        return (
          <OrderItem
            key={order._id}
            order={order}
            ingredientsImages={ingredientsImages}
            orderClick={handleOrderSelect}
          />
        )
      })}
    </ul>
  )
}