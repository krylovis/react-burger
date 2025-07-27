import { useDrop } from "react-dnd";
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.scss';
import { DetailsItem, OrderDetails } from '../index';
import useModalState from '../../hooks/useModalState';
import { useAppSelector } from '../../services/store';
import { useAppDispath } from '../../services/store';
import {
  selectOrderIngredients,
  selectBun,
  setIngredientsForOrder,
  TIngredientId
} from '../../services/store/slices/ingredients/ingredients.slice';

export default function BurgerConstructor() {
  const dispatch = useAppDispath();
  const onDropHandler = (itemId: TIngredientId) => {
    dispatch(setIngredientsForOrder({ id: itemId }));
  }

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop({ itemId }: { itemId: TIngredientId }) {
      onDropHandler(itemId);
    },
  });

  const { isModalOpen, toggleModalState, handleCloseModal } = useModalState();
  const ingredients = useAppSelector((state) => selectOrderIngredients(state));
  const bun = useAppSelector((state) => selectBun(state));

  const { container, orderContainer, list } = style;
  const total = Object.values(ingredients).reduce((sum, { price }) => sum + (price as number), 0);

  return (
    <div className={container}>
      <ul ref={(item) => { dropTarget(item) }} className={list}>
        {bun && (<DetailsItem ingredient={bun} position="top" />)}

        {Object.keys(ingredients).map((key) => (
          <DetailsItem key={key} id={key} ingredient={ingredients[key]} />
        ))}

        {bun && (<DetailsItem ingredient={bun} position="bottom" />)}
      </ul>

      <div className={orderContainer}>
        <div className={style.price}>
          {total}
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="medium" onClick={toggleModalState}>
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && <OrderDetails closeModal={handleCloseModal} />}
    </div>
  );
}
