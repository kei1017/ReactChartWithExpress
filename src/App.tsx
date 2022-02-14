import 'twin.macro';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/DashboardPage';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route element={<AuthPage />} path="/" />
        <Route element={<Dashboard />} path="/dashboard" />
      </Routes>
    </Layout>
  );
};

export default App;
