import { useState } from 'react';
import style from './App.module.scss';
import { AppHeader, Container, BurgerConstructor } from '../index';
import { data } from '../../utils/data';

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
        </section>
      </Container>
    </div>
  );
}
