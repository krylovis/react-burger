import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './IngredientItem.module.scss';

type TIngredient = Record<string, string | number>;
interface IProps {
  item: TIngredient,
  itemClick: (item: TIngredient) => void;
}

export default function IngredientItem({ item, itemClick }: IProps) {
  const { _id, image, price, name } = item;

  return (
    <li
      key={_id}
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
