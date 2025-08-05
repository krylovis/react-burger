import style from './MainPage.module.scss';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor, BurgerIngredients } from '../../components';
import { useAppDispath } from '../../services/store';
import { fetchIngredientsData } from '../../services/store/slices/ingredients/ingredientsExtraReducers';

export default function MainPage() {
  const dispatch = useAppDispath();
  dispatch(fetchIngredientsData());

  return (
    <div className={style.mainPage}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
}
