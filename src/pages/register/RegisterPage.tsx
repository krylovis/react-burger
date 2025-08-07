import React, { useState, useCallback, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import style from './RegisterPage.module.scss';
import { IReqData } from '../../utils/api/AuthApi';
import { useAppDispath } from '../../services/store';
import { fetchRegister } from '../../services/store/slices/auth/authExtraReducers';
import { useNavigate } from 'react-router-dom';

interface IRegisterForm {
  name: string,
  email: string,
  password: string,
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<IRegisterForm | IReqData>({ name: '', email: '', password: '' });

  const navigate = useNavigate();
  const dispatch = useAppDispath();

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
      const data = await dispatch(fetchRegister(formData as IReqData)).unwrap();

      if (data) {
        navigate(ROUTES.MAIN);
      }
    } catch (error) {
      console.error(error);
    }
  }, [formData, dispatch]);

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
          value={formData.name as string}
          name="name"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
        <EmailInput
          placeholder={'E-mail'}
          onChange={handleSetValue}
          value={formData.email as string}
          name={'email'}
        />
        <PasswordInput
          placeholder={'Пароль'}
          onChange={handleSetValue}
          value={formData.password as string}
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
