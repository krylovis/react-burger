import { Modal, OrderInfo } from '..';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectOrderById } from '../../services/store/slices/orders/orders.slice';

export default function ProfileOrderModal() {
  const { id } = useParams();
  const order = useAppSelector((state) => selectOrderById(state, id));

  const navigate = useNavigate();
  function handleCloseItem() {
    navigate('/profile/orders');
  };

  return (
    <Modal closeModal={handleCloseItem}>
      {order && (<OrderInfo order={order} />)}
    </Modal>
  )
}
