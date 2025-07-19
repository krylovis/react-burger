import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './BurgerConstructor.module.scss';
import { DetailsItem, Modal } from '../index';
import useModalState from '../../hooks/useModalState';

interface IProps {
  ingredients: Record<string, string | number>[],
}

export default function BurgerConstructor({ ingredients }: IProps) {
  const { isModalOpen, toggleModalState, handleCloseModal } = useModalState();

  const { container, orderContainer, list } = style;
  const bun = ingredients.find(({ type }) => type === 'bun');
  const total = ingredients.reduce((sum, { price }) => sum + (price as number), 0);

  return (
    <div className={container}>
      <ul className={list}>
        {bun && (<DetailsItem ingredient={bun} position="up" />)}

        {ingredients.map((item, index) => (
          (item.type !== 'bun') && (<DetailsItem key={`${item._id}-${index}`} ingredient={item} />)
        ))}

        {bun && (<DetailsItem ingredient={bun} position="down" />)}
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

      {isModalOpen && <Modal closeModal={handleCloseModal}>123</Modal>}
    </div>
  );
}
