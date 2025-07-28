import style from './BurgerIngredients.module.scss';
import { useState, useRef, useCallback, RefObject, useMemo } from 'react';
import { IngredientsList } from '../index';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppSelector } from '../../services/store';
import { selectIngredients } from '../../services/store/slices/ingredients/ingredients.slice';

interface ITabs {
  key: string,
  title: string,
  ref: RefObject<HTMLDivElement | null>,
}
export default function BurgerIngredients() {
  const [currentTab, setCurrentTab] = useState('bun');
  const ingredients = useAppSelector((state) => selectIngredients(state));

  const tabClickHandler = (ref: RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const tabsRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const tabs: ITabs[] = useMemo(() => [
    { key: 'bun', title: 'Булки', ref: bunRef },
    { key: 'sauce', title: 'Соусы', ref: sauceRef },
    { key: 'main', title: 'Начинки', ref: mainRef },
  ], [])

  const onScroll = useCallback(() => {
    const containerTop = tabsRef.current?.getBoundingClientRect().top!;

    const closestHeading = tabs.reduce((closestHeading, heading) => {
      const offsetTop = heading.ref.current?.getBoundingClientRect().top! - containerTop;
      const closestOffset = closestHeading.ref.current?.getBoundingClientRect().top! - containerTop;

      if (closestOffset < 0 || offsetTop < closestOffset) return heading;
      return closestHeading;
    }, tabs[0]);

    setCurrentTab(closestHeading.key);
  }, [tabs]);

  return (
    <div className={style.burgerIngredients}>
      <h1 className={style.title}>Соберите бургер</h1>

      <div className={style.tabs} ref={tabsRef}>
        {tabs.map(({ key, title, ref }) => (
          <Tab
            key={key}
            value={key}
            active={currentTab === key}
            onClick={() => tabClickHandler(ref)}
          >
            {title}
          </Tab>
        ))}
      </div>

      <div className={style.listsContainer} onScroll={onScroll}>
        {tabs.map(({ key, title }, index) => (
          <IngredientsList
            key={key}
            ref={(element) => { tabs[index].ref.current = element }}
            list={ingredients.filter(({ type }) => (type === key))}
            title={title}
          />
        ))}
      </div>
    </div>
  );
}
