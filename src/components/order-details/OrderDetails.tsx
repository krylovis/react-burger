import style from './OrderDetails.module.scss';
import { Modal } from '../index';

interface IProps {
  closeModal: () => void,
}

export default function OrderDetails({ closeModal }: IProps) {
  return (
    <Modal closeModal={closeModal}>
      <div className={style.container}>
        {/* */}
      </div>
    </Modal>
  );
}
