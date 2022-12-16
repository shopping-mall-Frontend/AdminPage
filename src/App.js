import { Route, Routes } from 'react-router-dom';

import { AdminPage, LoginPage } from './pages/index';

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
