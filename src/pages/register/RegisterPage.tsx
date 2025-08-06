import React, { useState, useCallback, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import style from './RegisterPage.module.scss';

interface IRegisterForm {
  name: '',
  email: '',
  password: '',
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<IRegisterForm>({ name: '', email: '', password: '' });

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
    <div className={style.registerPage}>
      <MainForm
        formTitle="Регистрация"
        submitText="Зарегистрироваться"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          placeholder="Имя"
          onChange={handleSetValue}
          value={formData.name}
          name="name"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
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
          <span className={style.linkText}>Уже зарегистрированы?</span>
          <NavLink className={style.link} to={ROUTES.LOGIN}>Войти</NavLink>
        </div>
      </div>
    </div>
  );
}
