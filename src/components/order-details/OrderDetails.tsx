import classNames from 'classnames';
import style from './OrderDetails.module.scss';
import { Modal } from '../index';
import checkGraphics from '../../images/check-graphics.svg';

interface IProps {
  closeModal: () => void,
}

export default function OrderDetails({ closeModal }: IProps) {
  const orderNumberClass = classNames(style.text, style.orderNumber);
  const idTextClass = classNames(style.text, style.orderId);
  const secondaryTextClass = classNames(style.text, style.textSecondary);

  return (
    <Modal closeModal={closeModal}>
      <div className={style.container}>
        <p className={orderNumberClass}>034536</p>
        <p className={idTextClass}>идентификатор заказа</p>

        <img
          className={style.image}
          src={checkGraphics as string}
          alt="Картинка подтверждения заказа"
        />

        <p className={style.text}>Ваш заказ начали готовить</p>
        <p className={secondaryTextClass}>Дождитесь готовности на орбитальной станции</p>
      </div>
    </Modal>
  );
}
