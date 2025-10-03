import { Modal, IngredientDetails } from '..';
import { useNavigate } from 'react-router-dom';

export default function IngredientModal() {
  const navigate = useNavigate();
  function handleCloseItem() {
    navigate(-1);
  };

  return (
    <Modal title="Детали ингредиента" closeModal={handleCloseItem}>
      <IngredientDetails />
    </Modal>
  )
}
