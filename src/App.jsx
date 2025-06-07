import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { RestrictedRoute } from './components/RestrictedRoute/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './redux/contacts/operations.js';
import { AppBar } from './components/AppBar/AppBar.jsx';
import { setAuthHeader, refreshUser } from './redux/auth/operations.js';
import { setToken } from './redux/auth/slice.js';
import { Toaster } from 'react-hot-toast';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();

  const { token, isLoggedIn, isRefreshing } = useSelector(state => state.auth);

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    if (!localToken) return;

    const cleanToken = localToken.replace(/^"|"$/g, '');

    if (cleanToken && !token) {
      dispatch(setToken(cleanToken));
      setAuthHeader(cleanToken);
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (token) {
      setAuthHeader(token);
    }
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchContacts());
    }
  }, [dispatch, isLoggedIn]);

  if (isRefreshing) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <AppBar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/register"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<RegisterPage />}
                />
              }
            />
            <Route
              path="/login"
              element={
                <RestrictedRoute
                  redirectTo="/contacts"
                  component={<LoginPage />}
                />
              }
            />
            <Route
              path="/contacts"
              element={
                <PrivateRoute
                  redirectTo="/login"
                  component={<ContactsPage />}
                />
              }
            />
          </Routes>
        </Suspense>
      </div>
    </>
  );
};

export default App;
