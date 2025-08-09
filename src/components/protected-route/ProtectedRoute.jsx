import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../services/store';
import { selectIsAuth } from '../../services/store/slices/auth/auth.slice';

export default function ProtectedRoute({ element: Component, ...props }) {
  const isAuth = useAppSelector(selectIsAuth);
  return isAuth ? <Component {...props}/> : <Navigate to="/login" replace/>;
}