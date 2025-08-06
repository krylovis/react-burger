import React, { useState, useCallback } from 'react';
import { Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import style from './ProfilePage.module.scss';

interface IProfileForm {
  name: string,
  login: string,
  password: string,
}

export default function ProfilePage() {
  const [formData, setFormData] = useState<IProfileForm>({
    name: 'Марк',
    login: 'mail@stellar.burgers',
    password: '******',
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

  return (
    <div className={style.profilePage}>
      <MainForm>
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
