import { useState, useEffect } from 'react';
import style from './App.module.scss';
import { AppHeader, Container, BurgerConstructor, BurgerIngredients } from '../index';
import ingredientsApi from '../../utils/api/IngredientsApi';

export default function App() {
  type TProps = Record<string, string | number>[];
  const [activeTab, setActiveTab] = useState('constructor');
  const [ingredients, setIngredients] = useState({ data: [] });
  const [selectedData, setSelectedData] = useState<TProps>([]);

  function getItems(arr: TProps) {
    const testItems = [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa0946',
    ];

    const result: TProps = [];
    for (const id of testItems) {
      const item = arr.find(({ _id }) => _id === id);
      if (item) result.push(item);
    }

    return result;
  }

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const { data } = await ingredientsApi.getIngredients();
        if (data) {
          setIngredients({ data });
          setSelectedData(getItems(data));
        }
      } catch (e) {
        console.error(e);
      }
    }

    getIngredients();
  }, []);

  const handleSetActiveTab = (newValues: string) => {
    if (activeTab === newValues) return;
    setActiveTab(newValues);
  };

  return (
    <div className={style.app}>
      <AppHeader activeTab={activeTab} onSetActiveTab={handleSetActiveTab} />

      <Container>
        <main className={style.appContainer}>
          <BurgerIngredients ingredients={ingredients.data} />
          <BurgerConstructor ingredients={selectedData} />
        </main>
      </Container>
    </div>
  );
}
