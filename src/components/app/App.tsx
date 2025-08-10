import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import style from './App.module.scss';
import {
  MainPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  NotFoundPage,
  IngredientPage,
} from '../../pages';
import { AppHeader, Container, ProtectedRoute } from '../index';
import { ROUTES } from '../../utils/constants';
import { useAppDispath } from '../../services/store';
import { fetchUser } from '../../services/store/slices/auth/authExtraReducers';
import { fetchIngredientsData } from '../../services/store/slices/ingredients/ingredientsExtraReducers';

export default function App() {
  const [activeTab, setActiveTab] = useState('constructor');

  const dispatch = useAppDispath();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  try {
    dispatch(fetchUser());
    dispatch(fetchIngredientsData());
  } catch (error) {
    console.error(error);
  }

  const handleSetActiveTab = (newValues: string) => {
    if (activeTab === newValues) return;
    setActiveTab(newValues);
  };

  return (
    <div className={style.app}>
      <AppHeader activeTab={activeTab} onSetActiveTab={handleSetActiveTab} />

      <Container>
        <Routes location={state?.backgroundLocation || location}>
          <Route
            path={ROUTES.PROFILE}
            element={<ProtectedRoute element={() => (<ProfilePage />)} />}
          />
          <Route path={ROUTES.INGREDIENT_ID} element={<IngredientPage />} />
          <Route path={ROUTES.MAIN} element={<MainPage />} />
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
