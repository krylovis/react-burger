import style from './IngredientDetails.module.scss';
import { Modal } from '../index';

type TIngredient = Record<string, string | number>;

interface IProps {
  item: TIngredient,
  handleCloseItem: () => void,
}

const FEATURES: Record<string, string> = {
  calories: 'Калории, ккал',
  proteins: 'Белки, г',
  fat: 'Жиры, г',
  carbohydrates: 'Углеводы, г',
};

export default function IngredientDetails({ handleCloseItem, item }: IProps) {
  const { image, name } = item;

  return (
    <Modal title="Детали ингредиента" closeModal={handleCloseItem}>
      <div className={style.container}>
        <img src={image as string} alt="img" className={style.ingredientImage} />
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
    </Modal>
  );
}
