import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { HomePage } from "../pages/Public/HomePage";
import { ProductListingPage } from "../pages/Product/ProductListingPage";
import { ProductViewPage } from "../pages/Product/ProductViewPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { AboutPage } from "../pages/Public/AboutPage";
import { MyOrdersPage } from "../pages/user/MyOrdersPage";
import { MyInfoPage } from "../pages/user/MyInfoPage";
import { CreateAccountPage } from "../pages/auth/CreateAccountPage";
import { CategoriesPage } from "../pages/Product/CategoriesPage";
import { CheckoutPage } from "../pages/checkout/CheckoutPage";
import { CartPage } from "../pages/checkout/CartPage";
import { SuccessPage } from "../pages/checkout/SuccessPage";
import { CareerPage } from "../pages/Public/CareerPage";
import { BlogPage } from "../pages/Public/BlogPage";
import { SecurityPage } from "../pages/Legal/SecurityPage";
import { FavoritesPage } from "../pages/user/FavoritesPage";
import { PaymentMethodsPage } from "../pages/user/PaymentMethodsPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { OrderDetailsPage } from "../pages/checkout/OrderDetailsPage";
import { InstallPage } from "../pages/Public/InstallPage";
import { NotFoundPage } from "../pages/Public/NotFoundPage";
import { SpecialOfferPage } from "../pages/Public/SpecialOfferPage";
import { ScrollToTop } from "../components/Layout/ScrollToTop";

import { AdminLayout } from "../layouts/AdminLayout";
import { DashboardPage } from "../pages/admin/DashboardPage";
import { ProductsPage } from "../pages/admin/ProductsPage";
import { ProductFormPage } from "../pages/admin/ProductFormPage";
import { CategoriesPage as AdminCategoriesPage } from "../pages/admin/CategoriesPage";
import { OrdersPage } from "../pages/admin/OrdersPage";
import { UsersPage } from "../pages/admin/UsersPage";
import { AdminLoginPage } from "../pages/admin/AdminLoginPage";
import { AdminForgotPasswordPage } from "../pages/admin/AdminForgotPasswordPage";
import { AdminAuthProvider } from "../context/AdminAuthContext";
import { UserAuthProvider } from "../context/UserAuthContext";

import { ProtectedAdminRoute } from "../components/Admin/ProtectedAdminRoute";
import { SiteSettingsPage } from "../pages/admin/SiteSettingsPage";
import { BannersPage } from "../pages/admin/BannersPage";
import { FeaturedCollectionsPage } from "../pages/admin/FeaturedCollectionsPage";
import { SpecialOfferPage as AdminSpecialOfferPage } from "../pages/admin/SpecialOfferPage";
import { AuthPagesSettings } from "../pages/admin/AuthPagesSettings";
import { PWASettingsPage } from "../pages/admin/PWASettingsPage";
import { FooterLinksPage } from "../pages/admin/FooterLinksPage";
import { PagesPage } from "../pages/admin/PagesPage";
import { PageFormPage } from "../pages/admin/PageFormPage";
import { ReviewsPage } from "../pages/admin/ReviewsPage";
import { ThemeSync } from "../components/UI/ThemeSync";
import { PWAManifestManager } from "../components/PWA/PWAManifestManager";
import { DynamicPage } from "../pages/Public/DynamicPage";

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <UserAuthProvider>
          <ThemeSync />
          <PWAManifestManager />
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/signup" element={<CreateAccountPage />} />

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/forgot-password"
              element={<AdminForgotPasswordPage />}
            />

            <Route
              path="/admin"
              element={
                <ProtectedAdminRoute>
                  <AdminLayout />
                </ProtectedAdminRoute>
              }
            >
              <Route index element={<DashboardPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="products/new" element={<ProductFormPage />} />
              <Route path="products/:id" element={<ProductFormPage />} />
              <Route path="categories" element={<AdminCategoriesPage />} />
              <Route path="orders" element={<OrdersPage />} />
              <Route path="users" element={<UsersPage />} />
              <Route path="banners" element={<BannersPage />} />
              <Route
                path="featured-collections"
                element={<FeaturedCollectionsPage />}
              />
              <Route path="special-offer" element={<AdminSpecialOfferPage />} />
              <Route path="auth-pages" element={<AuthPagesSettings />} />
              <Route path="pwa" element={<PWASettingsPage />} />
              <Route path="footer-links" element={<FooterLinksPage />} />
              <Route path="pages" element={<PagesPage />} />
              <Route path="pages/new" element={<PageFormPage />} />
              <Route path="pages/:id" element={<PageFormPage />} />
              <Route path="reviews" element={<ReviewsPage />} />
              <Route path="settings" element={<SiteSettingsPage />} />
            </Route>

            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="security" element={<SecurityPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="career" element={<CareerPage />} />
              <Route path="payment-methods" element={<PaymentMethodsPage />} />
              <Route
                path="orders/payment-methods"
                element={<PaymentMethodsPage />}
              />
              <Route path="products" element={<ProductListingPage />} />
              <Route path="products/:id" element={<ProductViewPage />} />
              <Route path="special-offer" element={<SpecialOfferPage />} />
              <Route path="wishlist" element={<FavoritesPage />} />
              <Route path="orders" element={<MyOrdersPage />} />
              <Route path="orders/:id" element={<OrderDetailsPage />} />
              <Route path="orders/info" element={<MyInfoPage />} />
              <Route path="install" element={<InstallPage />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="checkout/success" element={<SuccessPage />} />
              <Route path="page/:slug" element={<DynamicPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </UserAuthProvider>
      </AdminAuthProvider>
    </BrowserRouter>
  );
};
