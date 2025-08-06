import React, { useState, useCallback, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import style from './ResetPassword.module.scss';

interface IResetForm {
  password: '',
  code: '',
}

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState<IResetForm>({ password: '', code: '' });

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
    <div className={style.resetPassword}>
      <MainForm
        formTitle="Восстановление пароля"
        submitText="Восстановить"
        onSubmit={handleSubmit}
      >
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={handleSetValue}
          value={formData.password}
          name={'password'}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={handleSetValue}
          value={formData.code}
          name="code"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
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
