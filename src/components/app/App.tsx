import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import { MainPage } from '../../pages';
import { AppHeader, Container } from '../index';

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
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Container>
    </div>
  );
}
