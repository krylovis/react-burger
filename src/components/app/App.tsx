import { useState } from 'react';
import style from './App.module.scss';
import { useAppDispath } from '../../services/store';
import { fetchIngredientsData } from '../../services/store/slices/ingredients/ingredientsExtraReducers';
import { AppHeader, Container, BurgerConstructor, BurgerIngredients } from '../index';

export default function App() {
  const [activeTab, setActiveTab] = useState('constructor');

  const dispatch = useAppDispath();
  dispatch(fetchIngredientsData());

  const handleSetActiveTab = (newValues: string) => {
    if (activeTab === newValues) return;
    setActiveTab(newValues);
  };

  return (
    <div className={style.app}>
      <AppHeader activeTab={activeTab} onSetActiveTab={handleSetActiveTab} />

      <Container>
        <main className={style.appContainer}>
          <BurgerIngredients />
          {/* <BurgerConstructor /> */}
        </main>
      </Container>
    </div>
  );
}
