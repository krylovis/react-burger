import style from './IngredientPage.module.scss';
import { IngredientDetails } from '../../components';

export default function IngredientPage() {
  return (
    <div className={style.ingredientPage}>
      <h1 className={style.ingredientTitle}>Детали ингредиента</h1>

      <IngredientDetails />
    </div>
  );
}
