import { useState, forwardRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import style from './IngredientsList.module.scss';
import { IngredientDetails } from '../index';
import useModalState from '../../hooks/useModalState';
import { Modal, IngredientItem } from '../index';
import { ROUTES } from '../../utils/constants';
import { TIngredient } from '../../services/store/slices/types';

interface IProps {
  list: TIngredient[],
  title: string,
}

const BurgerIngredientType = forwardRef<HTMLDivElement, IProps>(({ list, title }, ref) => {
  const [currentItem, setCurrentItem] = useState<TIngredient | null>(null);
  const { isModalOpen, toggleModalState, handleCloseModal } = useModalState();

  const navigate = useNavigate();
  const location = useLocation()

  const handleSelectItem = (item: TIngredient) => {
    setCurrentItem(item);
    toggleModalState();

    navigate(`${ROUTES.INGREDIENTS}/${item._id}`, {
      state: { backgroundLocation: location },
    });
  };

  const handleCloseItem = () => {
    setCurrentItem(null);
    navigate('/');
    handleCloseModal();
  };

  return (
    <div ref={ref} className={style.container}>
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
})

export default BurgerIngredientType;