import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from "react-dnd";
import style from './IngredientItem.module.scss';
import { useAppSelector } from '../../services/store';
import { selectOrderIngredients, selectBun } from '../../services/store/slices/constructor/constructor.slice';
import { TIngredient } from '../../services/store/slices/types';
interface IProps {
  item: TIngredient,
  itemClick: (item: TIngredient) => void;
}

export default function IngredientItem({ item, itemClick }: IProps) {
  const bun = useAppSelector(selectBun);
  const ingredients = useAppSelector(selectOrderIngredients);

  let count = null;

  if (item.type === 'bun' && bun?._id === item._id) {
    count = 1;
  } else {
    count = ingredients.filter(({ _id }) => _id === item._id).length;
  }

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
      {count > 0 && (<Counter count={count} />)}
      <img src={image as string} alt={`Фото ингредиента: ${{ name }}`} className={style.image} />
      <div className={style.price}>
        {price}
        <CurrencyIcon type="primary" />
      </div>

      <p className={style.name}>{name}</p>
    </li>
  );
}
