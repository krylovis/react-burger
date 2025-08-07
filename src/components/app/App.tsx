import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import style from './App.module.scss';
import {
  MainPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
} from '../../pages';
import { AppHeader, Container } from '../index';
import { ROUTES } from '../../utils/constants';
import { useAppDispath } from '../../services/store';
import { fetchUser } from '../../services/store/slices/auth/authExtraReducers';

export default function App() {
  const [activeTab, setActiveTab] = useState('constructor');

  const dispatch = useAppDispath();
  dispatch(fetchUser());

  const handleSetActiveTab = (newValues: string) => {
    if (activeTab === newValues) return;
    setActiveTab(newValues);
  };

  return (
    <div className={style.app}>
      <AppHeader activeTab={activeTab} onSetActiveTab={handleSetActiveTab} />

      <Container>
        <Routes>
          <Route path={ROUTES.MAIN} element={<MainPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Routes>
      </Container>
    </div>
  );
}
