import { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';
import style from './App.module.scss';
import {
  MainPage,
  OrderFeed,
  OrderPage,
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
import { WS_CONNECTION_START } from '../../services/store/middleware/web-socket/types';

export default function App() {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  let initialTabState = '';
  if ([ROUTES.MAIN, ROUTES.FEED].includes(location.pathname)) {
    initialTabState = location.pathname
  }

  const [activeTab, setActiveTab] = useState(initialTabState);
  const isUserLoading = useAppSelector(selectIsUserLoading);

  const dispatch = useAppDispath();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser());
      await dispatch(fetchIngredientsData());
      await dispatch({ type: WS_CONNECTION_START });
    }

    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, [dispatch])

  const handleSetActiveTab = (selectedTab: string) => {
    if ([ROUTES.MAIN, ROUTES.FEED].includes(location.pathname)) {
      if (activeTab === selectedTab) return;
    }

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
                element={<ProtectedRoute element={() => (<ProfilePage tab={'profile'} />)} />}
              />

              <Route
                path={ROUTES.PROFILE_ORDERS}
                element={<ProtectedRoute element={() => (<ProfilePage tab={'orders'} />)} />}
              />

              <Route path={ROUTES.INGREDIENT_ID} element={<IngredientPage />} />
              <Route path={ROUTES.FEED_ID} element={<OrderPage />} />
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
