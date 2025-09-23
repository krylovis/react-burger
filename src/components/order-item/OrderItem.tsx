import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './OrderItem.module.scss';
import { TOrder } from '../../services/store/slices/types';
import classNames from 'classnames';

interface IProps {
  order: TOrder,
  costOfOrder: number,
  ingredientsImages: string[],
  orderClick: (item: TOrder) => void;
}

export default function OrderItem({
  order, ingredientsImages, costOfOrder, orderClick
}: IProps) {
  const { name, number, createdAt } = order;

  const formatter = new Intl.DateTimeFormat('ru-RU', { day: '2-digit', hour: "numeric", minute: "numeric", })
  const formatTime = createdAt ? formatter.format(new Date(createdAt)) : '';
  const ingredientsCount = ingredientsImages.length;

  return (
    <li
      title={name}
      className={style.order}
      onClick={() => orderClick(order)}
    >
      <div className={style.header}>
        <p className={style.number}>#{number}</p>
        <p className={style.date}>{formatTime}</p>
      </div>

      <p className={style.name}>{name}</p>

      <div className={style.footerContainer}>
        <ul className={style.ingredients}>
          {ingredientsImages.map((image, index) => {
            if (index < 6) {
              const isLastIngredient = (index === 5);

              return (
                <li
                  key={index}
                  className={classNames(style.ingredientContainer, {
                    [style.lastIngredient]: isLastIngredient,
                  })}
                >
                  <img src={image as string} alt={`Фото ингредиента: ${{ name }}`} className={style.ingredientImage} />
                  {isLastIngredient && (<span className={style.ingredientsCount}>+{ingredientsCount - 5}</span>)}
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>

        <div className={style.cost}>
          {costOfOrder}
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  );
}
