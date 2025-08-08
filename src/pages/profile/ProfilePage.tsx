import React, { useState, useCallback } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import style from './ProfilePage.module.scss';
import { useAppSelector, useAppDispath } from '../../services/store';
import { selectUser } from '../../services/store/slices/auth/auth.slice';
import { ROUTES } from '../../utils/constants';
import { fetchLogout } from '../../services/store/slices/auth/authExtraReducers';
import { useNavigate } from 'react-router-dom';

interface IProfileForm {
  name: string,
  login: string,
  password: string,
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispath();
  const user = useAppSelector(selectUser);
  const [activeTab, setActiveTab] = useState('profile');

  const [formData, setFormData] = useState<IProfileForm>({
    name: user?.name || '',
    login: user?.email || '',
    password: '******'
  });

  const handleSetValue = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setFormData((oldValues) => {
      const newValues = {
        ...oldValues,
        [name]: value,
      };

      return newValues;
    });
  }, []);

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

      <MainForm type='profile'>
        <Input
          icon={'EditIcon'}
          type="text"
          placeholder="Имя"
          onChange={handleSetValue}
          value={formData.name}
          name="name"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <Input
          icon={'EditIcon'}
          type="text"
          placeholder="Логин"
          onChange={handleSetValue}
          value={formData.login}
          name="login"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <PasswordInput
          icon={'EditIcon'}
          placeholder={'Пароль'}
          onChange={handleSetValue}
          value={formData.password}
          name={'password'}
        />
      </MainForm>
    </div>
  );
}
