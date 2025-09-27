import { useState, useCallback } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ProfilePage.module.scss';
import { useAppDispath } from '../../services/store';
import { ROUTES } from '../../utils/constants';
import { fetchLogout } from '../../services/store/slices/auth/authExtraReducers';
import { useNavigate } from 'react-router-dom';
import { ProfileForm, ProfileOrders } from '../../components';

interface IProps {
  tab: string;
}

export default function ProfilePage({ tab }: IProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const [activeTab, setActiveTab] = useState(tab);

  const handleLogout = useCallback(async () => {
    setActiveTab('logout')

    try {
      const data = await dispatch(fetchLogout()).unwrap();
      if (data) {
        navigate(ROUTES.MAIN);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSetActiveTab = (value: string) => {
    setActiveTab(value);

    if (value === 'profile') navigate(ROUTES.PROFILE);
    if (value === 'orders') navigate(ROUTES.PROFILE_ORDERS);
  };

  return (
    <div className={style.profilePage}>
      <nav className={style.profilePage__nav}>
        <Button
          extraClass={`${style.profilePage__button}${activeTab === 'profile' ? ` ${style.activeBtn}` : ''}`}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => handleSetActiveTab('profile')}
        >
          Профиль
        </Button>
        <Button
          extraClass={`${style.profilePage__button}${activeTab === 'orders' ? ` ${style.activeBtn}` : ''}`}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => handleSetActiveTab('orders')}
        >
          История заказов
        </Button>
        <Button
          extraClass={`${style.profilePage__button}${activeTab === 'logout' ? ` ${style.activeBtn}` : ''}`}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={handleLogout}
        >
          Выход
        </Button>
      </nav>

      {activeTab === 'profile' && (<ProfileForm />)}
      {activeTab === 'orders' && (<ProfileOrders />)}
    </div>
  );
}
