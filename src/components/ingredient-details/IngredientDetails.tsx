import style from './IngredientDetails.module.scss';

type TIngredient = Record<string, string | number>;

interface IProps {
  item: TIngredient,
}

const FEATURES: Record<string, string> = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
};

export default function IngredientDetails({ item }: IProps) {
  const { image, name } = item;

  return (
    <div className={style.container}>
      <img src={image as string} alt={`Фото ингредиента: ${{ name }}`} className={style.ingredientImage} />
      <p className={style.name}>{name}</p>

      <ul className={style.features}>
        {Object.keys(FEATURES).map((key) => (
          <li className={style.feature} key={key}>
            <span>{FEATURES[key]}</span>
            <span>{item[key]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
