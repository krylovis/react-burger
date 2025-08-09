import style from './IngredientPage.module.scss';
import { useParams } from 'react-router-dom'
import { IngredientDetails } from '../../components';
import { useAppSelector } from '../../services/store';
import { selectIngredientById } from '../../services/store/slices/ingredients/ingredients.slice';

export default function IngredientPage() {
  const { id } = useParams();
  const item = useAppSelector((state) => selectIngredientById(state, id));

  return (
    <div className={style.ingredientPage}>
      <h1 className={style.ingredientTitle}>Детали ингредиента</h1>
      {item && (<IngredientDetails item={item} />)}
    </div>
  );
}
