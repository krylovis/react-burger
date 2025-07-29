import { Triangle } from 'react-loader-spinner';
import classNames from 'classnames';
import style from './OrderDetails.module.scss';
import { Modal } from '../index';
import checkGraphics from '../../images/check-graphics.svg';
import { useAppSelector } from '../../services/store';
import { selectOrderNumber, resetOrderNumber } from '../../services/store/slices/constructor/constructor.slice';
import { useAppDispath } from '../../services/store';

interface IProps {
  closeModal: () => void,
}

export default function OrderDetails({ closeModal }: IProps) {
  const orderNumberClass = classNames(style.text, style.orderNumber);
  const idTextClass = classNames(style.text, style.orderId);
  const secondaryTextClass = classNames(style.text, style.textSecondary);

  const number = useAppSelector(selectOrderNumber);

  const dispatch = useAppDispath();
  const handleCloseModal = () => {
    closeModal();
    dispatch(resetOrderNumber());
  }

  return (
    <Modal closeModal={handleCloseModal}>
      <div className={style.container}>
        {!number && <Triangle
          visible={true}
          height="260"
          width="260"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass={style.loader}
        />}

        <p className={orderNumberClass}>{number || '--------'}</p>
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
