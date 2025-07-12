import style from './BurgerConstructor.module.scss';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const TABS: Record<string, string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

export default function BurgerConstructor() {
  const [currentTab, setCurrentTab] = useState('bun');

  return (
    <div className={style.burgerConstructor}>
      <h1 className={style.title}>Соберите бургер</h1>

      <div className={style.tabs}>
        {Object.keys(TABS).map((key) => (
          <Tab
            value={key}
            active={currentTab === key}
            onClick={setCurrentTab}
          >
            {TABS[key]}
          </Tab>
        ))}
      </div>
    </div>
  );
}
