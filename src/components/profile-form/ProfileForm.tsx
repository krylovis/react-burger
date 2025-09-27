import style from './ProfileForm.module.scss';
import React, { useState, useCallback, FormEvent, useRef } from 'react';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { MainForm } from '../../components';
import { IReqData } from '../../utils/api/types';
import { fetchUpdateUser } from '../../services/store/slices/auth/authExtraReducers';
import { selectUser } from '../../services/store/slices/auth/auth.slice';
import { useAppSelector, useAppDispath } from '../../services/store';

interface IProfileForm {
  [key: string]: string;
}

export default function ProfileForm() {
  const dispatch = useAppDispath();
  const user = useAppSelector(selectUser);
  const [nameDisabled, setNameDisabled] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const loginInputRef = useRef<HTMLInputElement>(null);

  const defaultFormState: IProfileForm = {
    name: user?.name || '',
    email: user?.email || '',
    password: '******'
  }

  const [formData, setFormData] = useState<IProfileForm>(defaultFormState);

  const onNameBlur = () => {
    setNameDisabled(true);
  };

  const onLoginBlur = () => {
    setLoginDisabled(true);
  };

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

  const onSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    const newData: IReqData = {};
    for (const key in formData) {
      if (formData[key] !== defaultFormState[key]) {
        newData[key] = formData[key];
      }
    }

    try {
      await dispatch(fetchUpdateUser(newData)).unwrap();
    } catch (error) {
      console.error(error);
    }
  }, [formData]);

  const onIconClick = useCallback((value: string) => {
    if (value === 'name') {
      setTimeout(() => nameInputRef?.current?.focus(), 0);
      setNameDisabled(false);
    } else if (value === 'email') {
      setTimeout(() => loginInputRef?.current?.focus(), 0);
      setLoginDisabled(false);
    }
  }, []);

  const onCancel = useCallback(async () => {
    setFormData(defaultFormState);
  }, []);

  return (
    <MainForm onSubmit={onSubmit} type='profile'>
      <Input
        ref={nameInputRef}
        disabled={nameDisabled}
        icon={'EditIcon'}
        type="text"
        placeholder="Имя"
        value={formData.name}
        name="name"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        onChange={handleSetValue}
        onBlur={onNameBlur}
        onIconClick={() => onIconClick('name')}
      />
      <Input
        ref={loginInputRef}
        disabled={loginDisabled}
        icon={'EditIcon'}
        type="text"
        placeholder="Логин"
        value={formData.email}
        name="email"
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
        onChange={handleSetValue}
        onBlur={onLoginBlur}
        onIconClick={() => onIconClick('email')}
      />
      <PasswordInput
        icon={'EditIcon'}
        placeholder={'Пароль'}
        value={formData.password}
        name={'password'}
        onChange={handleSetValue}
      />

      <div className={style.btnContainer}>
        <Button
          htmlType='button'
          type='secondary'
          onClick={onCancel}
        >
          Отмена
        </Button>
        <Button
          htmlType='submit'
          type='primary'
        >
          Сохранить
        </Button>
      </div>
    </MainForm>
  )
}