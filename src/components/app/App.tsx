import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';
import style from './App.module.scss';
import {
  MainPage,
  OrderFeed,
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
import { useAppDispath, useAppSelector } from '../../services/store';
import { fetchUser } from '../../services/store/slices/auth/authExtraReducers';
import { selectIsUserLoading } from '../../services/store/slices/auth/auth.slice';
import { fetchIngredientsData } from '../../services/store/slices/ingredients/ingredientsExtraReducers';

export default function App() {
  const [activeTab, setActiveTab] = useState(ROUTES.MAIN);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  const dispatch = useAppDispath();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser());
      await dispatch(fetchIngredientsData());
    }

    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch])

  const handleSetActiveTab = (selectedTab: string) => {
    if (activeTab === selectedTab) return;

    setActiveTab(selectedTab);
    navigate(selectedTab);
  };

  return (
    <>
      {isUserLoading ?
        <Triangle
          visible={true}
          height="260"
          width="260"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass={style.loader}
        /> : <div className={style.app}>
          <AppHeader activeTab={activeTab} onSetActiveTab={handleSetActiveTab} />

          <Container>
            <Routes location={state?.backgroundLocation || location}>
              <Route
                path={ROUTES.PROFILE}
                element={<ProtectedRoute element={() => (<ProfilePage />)} />}
              />
              <Route path={ROUTES.INGREDIENT_ID} element={<IngredientPage />} />
              <Route path={ROUTES.MAIN} element={<MainPage />} />
              <Route path={ROUTES.FEED} element={<OrderFeed />} />
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
              <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
              <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />
              <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
            </Routes>
          </Container>
        </div>}
    </>
  );
}
