import { useState, useCallback, memo } from 'react';
import style from './OrderList.module.scss';
import useModalState from '../../hooks/useModalState';
import { useAppSelector } from '../../services/store';
import { selectIngredientsObject } from '../../services/store/slices/ingredients/ingredients.slice';
import { TOrder } from '../../services/store/slices/types';
import { OrderItem, Modal, OrderInfo } from '../index';
import { useNavigate, useLocation } from 'react-router-dom';

interface IProps {
  orders: TOrder[],
}

function OrderList({ orders }: IProps) {
  const [currentItem, setCurrentItem] = useState<TOrder | null>(null);
  const ingredientsObject = useAppSelector(selectIngredientsObject);
  const { isModalOpen, toggleModalState, handleCloseModal } = useModalState();

  const navigate = useNavigate();
  const location = useLocation()

  const handleOrderSelect = useCallback(async (order: TOrder) => {
    setCurrentItem(order);
    toggleModalState();

    navigate(order._id, {
      state: { backgroundLocation: location },
    });
  }, []);

  const handleCloseItem = useCallback(async () => {
    setCurrentItem(null);
    navigate(-1);
    handleCloseModal();
  }, []);

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

export default memo(OrderList);