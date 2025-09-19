import React, { useState, useCallback, FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import style from './ResetPassword.module.scss';
import passwordResetApi from '../../utils/api/PasswordResetApi';
import { IReqData } from '../../utils/api/types';

interface IResetForm {
  password: '',
  token: '',
}

export default function ResetPasswordPage() {
  const [formData, setFormData] = useState<IResetForm | IReqData>({ password: '', token: '' });
  const navigate = useNavigate();

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
    try {
      const data = await passwordResetApi.resetPasswordRequest(formData as IReqData);
      if (data?.success) {
        navigate(ROUTES.LOGIN);
      }
    } catch (error) {
      console.error(error);
    }
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
          value={formData.password as string}
          name={'password'}
        />
        <Input
          type="text"
          placeholder="Введите код из письма"
          onChange={handleSetValue}
          value={formData.token as string}
          name="token"
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
