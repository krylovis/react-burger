import style from './BurgerIngredients.module.scss';
import { useState } from 'react';
import { IngredientsList } from '../index';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TABS: Record<string, string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

interface IProps {
  ingredients: Record<string, string | number>[],
}

export default function BurgerIngredients({ ingredients }: IProps) {
  const [currentTab, setCurrentTab] = useState('bun');

  return (
    <div className={style.burgerIngredients}>
      <h1 className={style.title}>Соберите бургер</h1>

      <div className={style.tabs}>
        {Object.keys(TABS).map((key) => (
          <Tab
            key={key}
            value={key}
            active={currentTab === key}
            onClick={setCurrentTab}
          >
            {TABS[key]}
          </Tab>
        ))}
      </div>

      <div className={style.listsContainer}>
        {Object.keys(TABS).map((key) => (
          <IngredientsList
            key={key}
            list={ingredients.filter(({ type }) => (type === key))}
            title={TABS[key]}
          />
        ))}
      </div>
    </div>
  );
}
