import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import style from './AppHeader.module.scss';
import { Container } from '../index';
import { ROUTES } from '../../utils/constants';

interface IProps {
  activeTab: string;
  onSetActiveTab: (value: string) => void;
}

export default function AppHeader({ activeTab, onSetActiveTab }: IProps) {
  return (
    <header className={style.header}>
      <Container>
        <div className={style.header__container}>
          <nav className={style.header__nav}>
            <Button
              extraClass={`${style.header__button}${activeTab === ROUTES.MAIN ? ` ${style.activeBtn}` : ''}`}
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => onSetActiveTab(ROUTES.MAIN)}
            >
              <BurgerIcon type={activeTab === ROUTES.MAIN ? 'primary' : 'secondary'} />
              Конструктор
            </Button>
            <Button
              extraClass={`${style.header__button}${activeTab === ROUTES.FEED ? ` ${style.activeBtn}` : ''}`}
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => onSetActiveTab(ROUTES.FEED)}
            >
              <ListIcon type={activeTab === ROUTES.FEED ? 'primary' : 'secondary'} />
              Лента заказов
            </Button>
          </nav>

          <Link to={ROUTES.MAIN}><Logo className={style.header__logo} /></Link>

          <Link className={style.header__link} to={ROUTES.PROFILE}>
            <Button extraClass={style.header__button} htmlType="button" type="secondary" size="medium">
              <ProfileIcon type="secondary" />
              Личный кабинет
            </Button>
          </Link>
        </ div>
      </Container>
    </header>
  );
}
