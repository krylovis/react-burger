import React, { useState, useCallback, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import style from './LoginPage.module.scss';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

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

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    console.log('formData', formData);
  }, [formData]);

  return (
    <div className={style.loginPage}>
      <MainForm
        formTitle="Вход"
        submitText="Войти"
        onSubmit={handleSubmit}
      >
        <EmailInput
          placeholder={'E-mail'}
          onChange={handleSetValue}
          value={formData.email}
          name={'email'}
        />
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleSetValue}
          value={formData.password}
          name={'password'}
        />
      </MainForm>

      <div className={style.footer}>
        <div className={style.linkContainer}>
          <span className={style.linkText}>Вы — новый пользователь?</span>
          <NavLink className={style.link} to={ROUTES.REGISTER}>Зарегистрироваться</NavLink>
        </div>

        <div className={style.linkContainer}>
          <span className={style.linkText}>Забыли пароль?</span>
          <NavLink className={style.link} to={ROUTES.FORGOT_PASSWORD}>Восстановить пароль</NavLink>
        </div>
      </div>
    </div>
  );
}
