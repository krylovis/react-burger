import style from './IngredientsList.module.scss';
import { IngredientDetails } from '../index';
import { useState } from 'react';
import useModalState from '../../hooks/useModalState';
import { Modal, IngredientItem } from '../index';

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
        {list.map((item) => (
          <IngredientItem
            key={item._id}
            item={item}
            itemClick={handleSelectItem}
          />
        ))}
      </ul>

      {(isModalOpen && currentItem) &&
        <Modal
          title="Детали ингредиента"
          closeModal={handleCloseItem}
        >
          <IngredientDetails item={currentItem} />
        </Modal>}
    </div>
  );
}
