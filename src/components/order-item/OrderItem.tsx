import style from './OrderItem.module.scss';
import { TOrder } from '../../services/store/slices/types';

interface IProps {
  order: TOrder,
  ingredientsImages: string[],
  orderClick: (item: TOrder) => void;
}

export default function OrderItem({ order, ingredientsImages, orderClick }: IProps) {
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

      <ul className={style.ingredients}>
        {ingredientsImages.map((image, index) => {
          if (index < 5) {
            return <img key={index} src={image as string} alt={`Фото ингредиента: ${{ name }}`} className={style.ingredientImage} />;
          } else if (index === 5) {
            return (
              <div key={index} className={style.lastIngredient}>
                <img src={image as string} alt={`Фото ингредиента: ${{ name }}`} className={style.ingredientImage} />
                <span className={style.ingredientsCount}>+{ingredientsCount - 5}</span>
              </div>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </li>
  );
}
