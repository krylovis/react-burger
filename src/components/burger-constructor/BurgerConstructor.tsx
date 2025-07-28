import { useCallback } from "react";
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
  TIngredientId,
  updateIngredientForOrder,
} from '../../services/store/slices/ingredients/ingredients.slice';
import { fetchMakeOrder } from '../../services/store/slices/ingredients/ingredientsExtraReducers';

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

  let totalPrice = Object.values(ingredients).reduce((sum, { price }) => sum + (price as number), 0);
  if (bun) totalPrice += bun.price;

  const handleMakeOrder = async () => {
    toggleModalState();
    const data: { ingredients: string[] } = { ingredients: ingredients.map(({ _id }) => _id) };
    if (bun) data.ingredients.push(bun._id);

    try {
      await dispatch(fetchMakeOrder(data));
    } catch (e) {
      console.error(e);
    }
  };

  const moveDetailsItemHandler = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = ingredients[dragIndex];
    const newIngredients = [...ingredients];

    newIngredients.splice(dragIndex, 1);
    newIngredients.splice(hoverIndex, 0, dragCard);

    dispatch(updateIngredientForOrder({ data: newIngredients }));
  }, [ingredients, dispatch])

  return (
    <div className={container}>
      <ul ref={(item) => { dropTarget(item) }} className={list}>
        {bun && (<DetailsItem ingredient={bun} position="top" />)}

        {ingredients.map((ingredient, index) => (
          <DetailsItem
            key={ingredient._id + index}
            index={index}
            ingredient={ingredient}
            moveItem={moveDetailsItemHandler}
          />
        ))}

        {bun && (<DetailsItem ingredient={bun} position="bottom" />)}
      </ul>

      <div className={orderContainer}>
        <div className={style.price}>
          {totalPrice}
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="medium" onClick={handleMakeOrder}>
          Оформить заказ
        </Button>
      </div>

      {isModalOpen && <OrderDetails closeModal={handleCloseModal} />}
    </div>
  );
}
