import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AppHeader.module.scss';
import { Container } from '../index';

export default function AppHeader() {
  return (
    <div className={style.header}>
      <Container>
        <div className={style.header__container}>
          <nav className={style.header__nav}>
            <Button extraClass={style.header__button} htmlType="button" type="secondary" size="medium">
              <BurgerIcon type="secondary" />
              Конструктор
            </Button>
            <Button extraClass={style.header__button} htmlType="button" type="secondary" size="medium">
              <ListIcon type="secondary" />
              Лента заказов
            </Button>
          </nav>

          <Logo className={style.header__logo} />

          <Button extraClass={style.header__button} htmlType="button" type="secondary" size="medium">
            <ProfileIcon type="secondary" />
            Личный кабинет
          </Button>
        </ div>
      </Container>
    </div>
  );
}
