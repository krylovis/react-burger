import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectIsAuth } from '../../services/store/slices/auth/auth.slice';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../utils/constants';

export default function ProtectedRoute({ element, anonymous = false }, ) {
  const isAuth = useAppSelector(selectIsAuth);
  
  const location = useLocation();
  const from = location.state?.from || '/';

  if (anonymous && isAuth) {
    return <Navigate to={ from } />;
  }

  if (!anonymous && !isAuth) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location}}/>;
  }

  return element;
}