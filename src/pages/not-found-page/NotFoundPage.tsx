import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';
import { ROUTES } from '../../utils/constants';

export default function NotFoundPage() {
  return (
    <section className={style.error}>
      <h1 className={style.error__title}>404</h1>
      <p className={style.error__subtitle}>Не туда попали</p>
      <Link className={style.error__link} to={ROUTES.MAIN}>
        На главную
      </Link>
    </section>
  );
}
