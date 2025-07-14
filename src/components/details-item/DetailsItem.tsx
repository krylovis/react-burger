import classNames from 'classnames';
import { DragIcon, CurrencyIcon, LockIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './DetailsItem.module.scss';

interface IProps {
  ingredient: Record<string, string | number>,
  position?: string,
}

export default function DetailsItem({ ingredient, position }: IProps) {
  const { type, image, name, price } = ingredient;
  const isBun = type === 'bun';

  let classList = classNames(style.container,);
  if (position) classList += ` ${style[`container_${position}`]}`;

  return (
    <li className={style.item}>
      <div className={style.iconContainer}>
        {!isBun && (<DragIcon type="primary" />)}
      </div>

      <div className={classList}>
        <img
          className={style.image}
          src={image as string}
          alt="img"
        />

        <p className={style.name}>{name}</p>

        <div className={style.price}>
          {price}
          <CurrencyIcon type="primary" />
        </div>

        {isBun ? (
          <LockIcon type="secondary" />
        ) : (
          <DeleteIcon type="primary" />
        )}
      </div>
    </li>
  );
}
