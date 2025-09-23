import { useState } from 'react';
import style from './OrderList.module.scss';
import useModalState from '../../hooks/useModalState';
import { useAppSelector } from '../../services/store';
import { selectIngredientsObject } from '../../services/store/slices/ingredients/ingredients.slice';
import { TOrder } from '../../services/store/slices/types';
import { OrderItem, Modal, OrderInfo } from '../index';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

interface IProps {
  orders: TOrder[],
}

export default function OrderList({ orders }: IProps) {
  const [currentItem, setCurrentItem] = useState<TOrder | null>(null);
  const ingredientsObject = useAppSelector(selectIngredientsObject);
  const { isModalOpen, toggleModalState, handleCloseModal } = useModalState();

  const navigate = useNavigate();
  const location = useLocation()

  const handleOrderSelect = (order: TOrder) => {
    setCurrentItem(order);
    toggleModalState();

    navigate(`${ROUTES.FEED}/${order._id}`, {
      state: { backgroundLocation: location },
    });
  };

  const handleCloseItem = () => {
    setCurrentItem(null);
    navigate(ROUTES.FEED);
    handleCloseModal();
  };

  return (
    <>
      <ul className={style.orderList}>
        {orders.map((order) => {
          let costOfOrder = 0;
          const ingredientsImages = [];
          if (order.ingredients) {
            for (const item of order.ingredients) {
              if (ingredientsObject[item]) {
                ingredientsImages.push(ingredientsObject[item].image);
                costOfOrder += ingredientsObject[item].price;
              }
            }
          }

          return (
            <OrderItem
              key={order._id}
              order={order}
              costOfOrder={costOfOrder}
              ingredientsImages={ingredientsImages}
              orderClick={handleOrderSelect}
            />
          )
        })}
      </ul>

      {(isModalOpen && currentItem) &&
        <Modal closeModal={handleCloseItem}>
          <OrderInfo order={currentItem} />
        </Modal>
      }
    </>
  )
}