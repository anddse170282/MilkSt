// src/App.jsx
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InputUserInformation from './pages/InputUserInformation';
import Login from './pages/Login';
import Layout from './components/Layout';
import Cart from './pages/giohang';
import Pay from './pages/thanhtoan';
import SearchPage from './pages/SearchPage';
import MoMoPaymentPage from './pages/MoMoPayment';  // Import MoMoPaymentPage
import ProductInfo from './pages/ProductInfo';  // Import ProductInfo
import CustomerForm from './pages/CustomerForm';
import PaymentResult from './pages/PaymentResult';
import OrderHistory from './pages/OrderHistory';
import './App.css'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/customerform" element={<CustomerForm />} />
        <Route path="*" element={<LayoutWrapper />} />
      </Routes>
    </BrowserRouter>
  );
}

const LayoutWrapper = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/input" element={<InputUserInformation />} />
      <Route path="/pay" element={<Pay />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/momo-payment/:amount" element={<MoMoPaymentPage />} />
      <Route path="/search-page" element={<SearchPage />} />
      <Route path="/product-info/:id" element={<ProductInfo />} />
      <Route path="/payment-result/" element={<PaymentResult />} />
      <Route path="/orderhistory/" element={<OrderHistory />} />
      {/* Add more routes here */}
    </Routes>
  </Layout>
);

export default App;
