import style from './MainPage.module.scss';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerConstructor, BurgerIngredients } from '../../components';

export default function MainPage() {
  return (
    <div className={style.mainPage}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
}
