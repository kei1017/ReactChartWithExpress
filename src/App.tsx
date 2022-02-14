import 'twin.macro';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<AuthPage />} path="/" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<AuthPage register />} path="/register" />
      </Routes>
    </Layout>
  );
};

export default App;
