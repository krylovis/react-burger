import style from './IngredientDetails.module.scss';
import { TIngredient } from '../../services/store/slices/types';
import { useAppSelector } from '../../services/store';
import { selectIngredientById } from '../../services/store/slices/ingredients/ingredients.slice';
import { useParams } from 'react-router-dom';

const FEATURES: Record<string, string> = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
};

export default function IngredientDetails() {
  const { id } = useParams();
  const item = useAppSelector((state) => selectIngredientById(state, id));

  if (item) {
    const { name, image } = item;

    return (
      <div className={style.container}>
        <img src={image as string} alt={`Фото ингредиента: ${{ name }}`} className={style.ingredientImage} />
        <p className={style.name}>{name}</p>

        <ul className={style.features}>
          {Object.keys(FEATURES).map((key) => (
            <li className={style.feature} key={key}>
              <span>{FEATURES[key]}</span>
              <span>{item[key as keyof TIngredient]}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null
  }
}
