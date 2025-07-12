import { Logo, Button, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import style from './AppHeader.module.scss';
import { Container } from '../index';


interface IProps {
  activeTab: string;
  onSetActiveTab: (value: string) => void;
}

export default function AppHeader({ activeTab, onSetActiveTab }: IProps) {
  return (
    <div className={style.header}>
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
