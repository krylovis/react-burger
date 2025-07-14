import { useState } from 'react';
import style from './App.module.scss';
import { AppHeader, Container, BurgerConstructor, IngredientDetails } from '../index';
import { data, selectedData } from '../../utils/data';

export default function App() {
  const [activeTab, setActiveTab] = useState('constructor');

  const handleSetActiveTab = (newValues: string) => {
    if (activeTab === newValues) return;
    setActiveTab(newValues);
  };

  return (
    <div className={style.app}>
      <AppHeader activeTab={activeTab} onSetActiveTab={handleSetActiveTab} />

      <Container>
        <section className={style.appContainer}>
          <BurgerConstructor ingredients={data} />
          <IngredientDetails ingredients={selectedData} />
        </section>
      </Container>
    </div>
  );
}
