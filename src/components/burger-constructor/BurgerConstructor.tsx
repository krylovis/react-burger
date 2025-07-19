import style from './BurgerConstructor.module.scss';
import { useState } from 'react';
import { BurgerIngredients } from '../index';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TABS: Record<string, string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

interface IProps {
  ingredients: Record<string, string | number>[],
}

export default function BurgerConstructor({ ingredients }: IProps) {
  const [currentTab, setCurrentTab] = useState('bun');

  return (
    <div className={style.burgerConstructor}>
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
          <BurgerIngredients
            key={key}
            list={ingredients.filter(({ type }) => (type === key))}
            title={TABS[key]}
          />
        ))}
      </div>
    </div>
  );
}
