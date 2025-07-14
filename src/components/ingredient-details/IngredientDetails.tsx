import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './IngredientDetails.module.scss';
import { DetailsItem } from '../index';

interface IProps {
  ingredients: Record<string, string | number>[],
}

export default function IngredientDetails({ ingredients }: IProps) {
  const { container, orderContainer, list } = style;
  const bun = ingredients.find(({ type }) => type === 'bun');
  const total = ingredients.reduce((sum, { price }) => sum + (price as number), 0);

  return (
    <div className={container}>
      <ul className={list}>
        {bun && (<DetailsItem ingredient={bun} position="up" />)}

        {ingredients.map((item, index) => (
          (item.type !== 'bun') && (<DetailsItem key={`${item._id}-${index}`} ingredient={item} />)
        ))}

        {bun && (<DetailsItem ingredient={bun} position="down" />)}
      </ul>

      <div className={orderContainer}>
        <div className={style.price}>
          {total}
          <CurrencyIcon type="primary" />
        </div>

        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </div>
  );
}
