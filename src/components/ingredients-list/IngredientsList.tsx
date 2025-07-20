import style from './IngredientsList.module.scss';
import { IngredientDetails } from '../index';
import { useState } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useModalState from '../../hooks/useModalState';

type TIngredient = Record<string, string | number>;
interface IProps {
  list: TIngredient[],
  title: string,
}

export default function IngredientsList({ list, title }: IProps) {
  const [currentItem, setCurrentItem] = useState<TIngredient | null>(null);
  const { isModalOpen, toggleModalState, handleCloseModal } = useModalState();

  const handleSelectItem = (item: TIngredient) => {
    setCurrentItem(item);
    toggleModalState();
  };

  const handleCloseItem = () => {
    setCurrentItem(null);
    handleCloseModal();
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>

      <ul className={style.list}>
        {list.map((item) => {
          const { _id, image, price, name } = item;

          return (
            <li
              key={_id}
              title={name as string}
              className={style.item}
              onClick={() => handleSelectItem(item)}
            >
              <img src={image as string} alt={`Фото ингредиента: ${{ name }}`} className={style.image} />
              <div className={style.price}>
                {price}
                <CurrencyIcon type="primary" />
              </div>

              <p className={style.name}>{name}</p>
            </li>
          )
        })}
      </ul>

      {(isModalOpen && currentItem) && <IngredientDetails item={currentItem} handleCloseItem={handleCloseItem} />}
    </div>
  );
}
