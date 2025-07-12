import style from './App.module.scss';
import { AppHeader } from '../index';

export default function App() {
  return (
    <div className={style.app}>
      <AppHeader />
    </div>
  );
}
