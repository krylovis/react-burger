import style from './IngredientsList.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IProps {
  list: Record<string, string | number>[],
  title: string,
}

export default function IngredientsList({ list, title }: IProps) {
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>

      <ul className={style.list}>
        {list.map(({ _id, image, price, name }) => (
          <li
            key={_id}
            className={style.item}
          >
            <img src={image as string} alt="img" className={style.image} />
            <div className={style.price}>
              {price}
              <CurrencyIcon type="primary" />
            </div>

            <p className={style.name}>{name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
