import React, { useState, useCallback, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { EmailInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import style from './ForgotPassword.module.scss';

interface IForgotPasswordForm {
  email: string,
}

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState<IForgotPasswordForm>({ email: '' });

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
    <div className={style.forgotPassword}>
      <MainForm
        formTitle="Восстановление пароля"
        submitText="Восстановить"
        onSubmit={handleSubmit}
      >
        <EmailInput
          placeholder={'Укажите e-mail'}
          onChange={handleSetValue}
          value={formData.email}
          name={'email'}
        />
      </MainForm>

      <div className={style.footer}>
        <div className={style.linkContainer}>
          <span className={style.linkText}>Вспомнили пароль?</span>
          <NavLink className={style.link} to={ROUTES.LOGIN}>Войти</NavLink>
        </div>
      </div>
    </div>
  );
}
