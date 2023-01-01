import { Route, Routes } from 'react-router-dom';
import { AdminPage, LoginPage } from './pages/index';
import OrderPage from './pages/OrderPage';
import { ProductPage } from './pages/ProductPage';

const App = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPage />}>
        <Route index element={<ProductPage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="order" element={<OrderPage />} />
      </Route>
      <Route path="/admin/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
