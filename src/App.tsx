import 'twin.macro';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute, { ProtectedRouteProps } from './pages/ProtectedRoute';

const App = () => {
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    authenticationPath: '/auth',
  };
  return (
    <Layout>
      <Routes>
        <Route element={<AuthPage />} path="/auth" />
        <Route element={<AuthPage register />} path="/register" />
        <Route
          element={
            <ProtectedRoute
              {...defaultProtectedRouteProps}
              outlet={<Dashboard />}
            />
          }
          path="/"
        />
      </Routes>
    </Layout>
  );
};

export default App;
