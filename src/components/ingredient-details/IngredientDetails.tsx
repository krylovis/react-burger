import style from './IngredientDetails.module.scss';
import { DetailsItem } from '../index';

interface IProps {
  ingredients: Record<string, string | number>[],
}

export default function IngredientDetails({ ingredients }: IProps) {
  const { container, list } = style;
  const bun = ingredients.find(({ type }) => type === 'bun')

  return (
    <div className={container}>
      <ul className={list}>
        {bun && (<DetailsItem ingredient={bun} position="up" />)}

        {ingredients.map((item, index) => (
          (item.type !== 'bun') && (<DetailsItem key={`${item._id}-${index}`} ingredient={item} />)
        ))}

        {bun && (<DetailsItem ingredient={bun} position="down" />)}
      </ul>
    </div>
  );
}
