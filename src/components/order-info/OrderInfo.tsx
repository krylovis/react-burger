import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderInfo.module.scss';
import { TOrder } from '../../services/store/slices/types';
import { selectIngredientsObject } from '../../services/store/slices/ingredients/ingredients.slice';
import { useAppSelector } from '../../services/store';
import { ORDER_STATUSES } from '../../utils/constants';

interface IProps {
  order: TOrder,
}

export default function OrderInfo({ order }: IProps) {
  const { name, number, status, createdAt, ingredients } = order;
  const ingredientsObject = useAppSelector(selectIngredientsObject);

  let costOfOrder = 0;
  if (order.ingredients) {
    for (const item of order.ingredients) {
      if (ingredientsObject[item]) {
        costOfOrder += ingredientsObject[item].price;
      }
    }
  }

  const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', hour: "numeric", minute: "numeric", })
  const formatTime = createdAt ? formatter.format(new Date(createdAt)) : '';

  return (
    <div className={style.orderInfo}>
      <h2 className={style.subtitle}>#{number}</h2>

      <div className={style.header}>
        <h1 className={style.title}>{name}</h1>
        <span className={style.status}>{ORDER_STATUSES[status]}</span>
      </div>

      <div className={style.content}>
        <span className={style.listTitle}>Состав:</span>

        <ul className={style.ingredients}>
          {ingredients.map((id, index) => (<li key={index}>{id}</li>))}
        </ul>
      </div>

      <div className={style.footer}>
        <span className={style.date}>{formatTime}</span>

        <div className={style.cost}>
          {costOfOrder}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
