import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import style from './IngredientItem.module.scss';

type TIngredient = Record<string, string | number>;
interface IProps {
  item: TIngredient,
  itemClick: (item: TIngredient) => void;
}

export default function IngredientItem({ item, itemClick }: IProps) {
  const { image, price, name } = item;

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { itemId: item._id }
  });

  return (
    <li
      ref={(element) => { dragRef(element) }}
      title={name as string}
      className={style.item}
      onClick={() => itemClick(item)}
    >
      <img src={image as string} alt={`Фото ингредиента: ${{ name }}`} className={style.image} />
      <div className={style.price}>
        {price}
        <CurrencyIcon type="primary" />
      </div>

      <p className={style.name}>{name}</p>
    </li>
  );
}
