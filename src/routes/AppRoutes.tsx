import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { HomePage } from '../pages/HomePage';
import { ProductListingPage } from '../pages/ProductListingPage';
import { ProductViewPage } from '../pages/ProductViewPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { AboutPage } from '../pages/AboutPage';
import { MyOrdersPage } from '../pages/MyOrdersPage';
import { MyInfoPage } from '../pages/MyInfoPage';
import { CreateAccountPage } from '../pages/CreateAccountPage';
import { CategoriesPage } from '../pages/CategoriesPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { SuccessPage } from '../pages/SuccessPage';
import { CareerPage } from '../pages/CareerPage';
import { BlogPage } from '../pages/BlogPage';
import { SecurityPage } from '../pages/SecurityPage';
import { FavoritesPage } from '../pages/FavoritesPage';
import { PaymentMethodsPage } from '../pages/PaymentMethodsPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { OrderDetailsPage } from '../pages/OrderDetailsPage';
import { InstallPage } from '../pages/InstallPage';
import { ScrollToTop } from '../components/Layout/ScrollToTop';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<CreateAccountPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="payment-methods" element={<PaymentMethodsPage />} />
          <Route path="orders/payment-methods" element={<PaymentMethodsPage />} />
          <Route path="products" element={<ProductListingPage />} />
          <Route path="products/:id" element={<ProductViewPage />} />
          <Route path="wishlist" element={<FavoritesPage />} />
          <Route path="orders" element={<MyOrdersPage />} />
          <Route path="orders/:id" element={<OrderDetailsPage />} />
          <Route path="orders/info" element={<MyInfoPage />} />
          <Route path="install" element={<InstallPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<SuccessPage />} />
          <Route path="*" element={<div>Página não encontrada</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
