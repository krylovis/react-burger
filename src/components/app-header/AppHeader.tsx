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
              extraClass={`${style.header__button}${activeTab === 'constructor' ? ` ${style.activeBtn}` : ''}`}
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => onSetActiveTab('constructor')}
            >
              <BurgerIcon type={activeTab === 'constructor' ? 'primary' : 'secondary'} />
              Конструктор
            </Button>
            <Button
              extraClass={`${style.header__button}${activeTab === 'orders-list' ? ` ${style.activeBtn}` : ''}`}
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={() => onSetActiveTab('orders-list')}
            >
              <ListIcon type={activeTab === 'orders-list' ? 'primary' : 'secondary'} />
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
