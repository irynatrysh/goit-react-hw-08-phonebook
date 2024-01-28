import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { refreshUser } from '../redux/auth/operations';
import { RestrictedRoute } from './Utilites/RestrictedRoute';
import { PrivateRoute } from './Utilites/PrivateRoute';
import { Home, Contacts, Auth } from '../pages';
import { Layout } from './Layout/Layout';
import { useDispatch } from 'react-redux';

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/auth"
            element={<RestrictedRoute redirectTo="/contacts" component={<Auth />} />}
          />
          <Route
            path="/contacts"
            element={<PrivateRoute redirectTo="/login" component={<Contacts />} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}
