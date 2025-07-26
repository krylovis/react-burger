import style from './BurgerIngredients.module.scss';
import { useState } from 'react';
import { IngredientsList } from '../index';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { selectIngredients } from '../../services/store/slices/ingredients/ingredients.slice';

const TABS: Record<string, string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState('bun');
  const ingredients = useAppSelector((state) => selectIngredients(state));

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
