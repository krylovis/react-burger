import { useState } from 'react';
import style from './App.module.scss';
import { AppHeader } from '../index';

export default function App() {
  const [activeTab, setActiveTab] = useState('constructor');

  const handleSetActiveTab = (newValues: string) => {
    if (activeTab === newValues) return;
    setActiveTab(newValues);
  };

  return (
    <div className={style.app}>
      <AppHeader activeTab={activeTab} onSetActiveTab={handleSetActiveTab} />
    </div>
  );
}
