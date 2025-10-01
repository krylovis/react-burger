import { useState, useCallback, memo } from 'react';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ProfilePage.module.scss';
import { useAppDispath } from '../../services/store';
import { ROUTES } from '../../utils/constants';
import { fetchLogout } from '../../services/store/slices/auth/authExtraReducers';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
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

  const handleSetActiveTab = useCallback(async (value: string) => {
    if (value === location.pathname) return;

    setActiveTab(value);
    navigate(value);
  }, []);

  return (
    <div className={style.profilePage}>
      <nav className={style.profilePage__nav}>
        <Button
          extraClass={`${style.profilePage__button}${activeTab === ROUTES.PROFILE ? ` ${style.activeBtn}` : ''}`}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => handleSetActiveTab(ROUTES.PROFILE)}
        >
          Профиль
        </Button>

        <Button
          extraClass={`${style.profilePage__button}${activeTab.includes(ROUTES.PROFILE_ORDERS) ? ` ${style.activeBtn}` : ''}`}
          htmlType="button"
          type="secondary"
          size="medium"
          onClick={() => handleSetActiveTab(ROUTES.PROFILE_ORDERS)}
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

      <Outlet />
    </div>
  );
}

export default memo(ProfilePage);