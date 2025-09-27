import { useState, useCallback } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ProfilePage.module.scss';
import { useAppDispath } from '../../services/store';
import { ROUTES } from '../../utils/constants';
import { fetchLogout } from '../../services/store/slices/auth/authExtraReducers';
import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '../../components';

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const [activeTab, setActiveTab] = useState('profile');

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

  return (
    <div className={style.profilePage}>
      <nav className={style.profilePage__nav}>
        <Button
          extraClass={`${style.profilePage__button}${activeTab === 'profile' ? ` ${style.activeBtn}` : ''}`}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => setActiveTab('profile')}
        >
          Профиль
        </Button>
        <Button
          extraClass={`${style.profilePage__button}${activeTab === 'orders-history' ? ` ${style.activeBtn}` : ''}`}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => setActiveTab('orders-history')}
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

      <ProfileForm />
    </div>
  );
}
